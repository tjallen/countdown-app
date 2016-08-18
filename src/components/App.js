import React, { Component } from 'react';
// css modules
import styles from './App.scss';

// audio files
import chime from '../files/chime.mp3';

// child components
import TimerDisplay from './TimerDisplay';
import TimerInput from './TimerInput';
import AudioControls from './AudioControls';
import TimerControls from './TimerControls';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      remainingSeconds: 5,
      totalSeconds: null,
      paused: false,
      stopped: true,
      loop: false,
      chime,
      volume: '0.1',
      muted: false,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onTimerClear = this.onTimerClear.bind(this);
    this.onTimerRestart = this.onTimerRestart.bind(this);
    this.toggleChimeMute = this.toggleChimeMute.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }
  componentWillMount() {
    // define timerInterval but don't set it yet
    this.timerInterval = null;
    this.state.totalSeconds = this.state.remainingSeconds;
  }
  componentDidMount() {
    // initialize audio element
    this.audioElement.volume = this.state.volume;
    this.audioElement.muted = this.state.muted;
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onTimerStart() {
    this.totalSeconds = this.state.remainingSeconds;
    let offset = 0;
    // if paused, offset start date by the num of seconds it was paused at
    // otherwise just use Date.now()
    if (this.state.paused) {
      offset = (this.state.totalSeconds - this.state.remainingSeconds) * 1000;
    }
    const timerStartDate = (Date.now() - offset);
    this.timerInterval = setInterval(() => this.tick(timerStartDate), 1000);
    this.setState({
      paused: false,
      stopped: false,
    });
  }
  onTimerPause() {
    this.setState({
      paused: true,
      remainingSeconds: this.state.remainingSeconds,
    }, clearInterval(this.timerInterval));
  }
  onTimerClear() {
    this.setState({
      remainingSeconds: 0,
      totalSeconds: 0,
      stopped: true,
      paused: false,
      formattedTime: this.formatTime(0),
    }, clearInterval(this.timerInterval));
  }
  onTimerRestart() {
    console.log('restart - wheres my code dogg?');
  }
  onVolumeChange(event) {
    this.setState({
      volume: event.target.value,
    });
    this.audioElement.volume = event.target.value;
  }
  toggleChimeMute() {
    this.setState({
      muted: !this.audioElement.muted,
    });
    this.audioElement.muted = !this.audioElement.muted;
  }
  // tick method run by interval to update timer once a second
  tick(timerStartDate) {
    // on the penultimate tick, prepare a callback for the final tick
    let callback;
    if (this.state.remainingSeconds === 1) {
      callback = this.timerCompleted();
    }
    const passedSeconds = Math.round((Date.now() - timerStartDate) / 1000);
    const remainingSeconds = this.state.totalSeconds - passedSeconds;
    console.log('passedSeconds', passedSeconds);
    console.log('remainingSeconds', remainingSeconds);
    this.setState({
      remainingSeconds,
    }, callback);
  }
  // fire the chime, message etc when target seconds is arrived at
  timerCompleted() {
    console.log('target seconds reached!', Date.now());
    this.onTimerClear();
    if (this.state.loop) {
      console.log('loop plz');
    } else if (!this.state.loop) {
      console.log('do not loop');
    }
  }
  // take time in seconds and format to hh:mm:ss
  formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    const secs = this.zeroPad(seconds % 60);
    const hours = this.zeroPad(Math.floor(mins / 60));
    mins = this.zeroPad(mins % 60);
    const output = `${hours}:${mins}:${secs}`;
    return output;
  }
  // add padding zero to hh:mm:ss if needed
  zeroPad(num) {
    if (num >= 10) {
      return num;
    }
    const paddedNum = `0${num}`;
    return paddedNum;
  }
  // update state.targetSeconds from user h/m/s inputs
  updateTime(hours, minutes) {
    console.log(`UT. hrs: ${hours}, mins: ${minutes}`);
    const s = (hours * 3600) + (minutes * 60);
    this.setState({
      totalSeconds: s,
      remainingSeconds: s,
    });
  }
  render() {
    // helper/readability vars for jsx
    let { totalSeconds, remainingSeconds } = this.state;
    totalSeconds = this.formatTime(totalSeconds);
    remainingSeconds = this.formatTime(remainingSeconds);
    const { muted: isMuted, stopped: isStopped, paused: isPaused } = this.state;
    const isPlaying = !isStopped && !isPaused;
    let timerDisplayConditional;
    if (isStopped) {
      timerDisplayConditional = <TimerDisplay time={totalSeconds} />;
    } else {
      timerDisplayConditional = <TimerDisplay time={remainingSeconds} />;
    }
    // dbg
    // console.log(`Mute:${isMuted}, Stop:${isStopped}, Pause:${isPaused}, Play:${isPlaying}`);
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          {timerDisplayConditional}
          <TimerInput
            updateTime={this.updateTime}
          />
        </div>
        <div className={styles.sub}>
          <TimerControls
            onTimerStart={this.onTimerStart}
            onTimerPause={this.onTimerPause}
            onTimerClear={this.onTimerClear}
            onTimerRestart={this.onTimerRestart}
            isPlaying={isPlaying}
            isPaused={isPaused}
            isStopped={isStopped}
          />
          <br />
          <hr />
          <AudioControls
            isMuted={isMuted}
            onToggleChimeMute={this.toggleChimeMute}
            volumeValue={this.state.volume}
            onVolumeChange={this.onVolumeChange}
          />
        </div>
        <audio
          ref={(c) => (this.audioElement = c)}
        >
          html5 <code>audio</code> element isn't supported by your browser, dayum.
          <source src={this.state.chime} type="audio/mpeg">
          </source>
        </audio>
      </div>
    );
  }
}
