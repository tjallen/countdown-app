import React, { Component } from 'react';
// css module
import styles from './App.scss';

// audio files
import chime from '../files/chime.mp3';

// child components
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerInput from './TimerInput';
import AudioControls from './AudioControls';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      remainingSeconds: 0,
      totalSeconds: 0,
      paused: false,
      stopped: true,
      loop: false,
      chime,
      volume: '0.1',
      muted: false,
      lastSecond: null,
      tickDelay: 1000,
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
    const { totalSeconds, remainingSeconds, tickDelay, paused } = this.state;
    if (totalSeconds === 0) {
      alert('time must be above 0 seconds');
      return;
    }
    // if paused, offset start date by the num of seconds it was paused at
    // otherwise just use Date.now()
    let offset = 0;
    if (paused) {
      offset = (totalSeconds - remainingSeconds) * 1000;
    }
    const timerStartDate = (Date.now() - offset);
    this.timerInterval = setInterval(() => this.tick(timerStartDate), tickDelay);
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
    }, clearInterval(this.timerInterval));
  }
  onTimerRestart() {
    this.onTimerPause();
    this.setState({
      remainingSeconds: this.state.totalSeconds,
    }, this.onTimerStart);
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
    console.log('========= new tick =========');
    console.log(`passed: ${passedSeconds} | remaining: ${remainingSeconds}`);
    if (remainingSeconds <= 0) {
      this.timerCompleted();
    }
    this.setState({
      remainingSeconds,
      lastSecond: remainingSeconds,
    }, callback);
  }
  // fire the chime, message etc when target seconds is arrived at
  timerCompleted() {
    if (this.state.loop) {
      this.onTimerRestart();
    } else if (!this.state.loop) {
      this.onTimerClear();
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
  updateTime(hours, minutes, seconds) {
    const s = (hours * 3600) + (minutes * 60) + seconds;
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
    const { muted, stopped, paused } = this.state;
    const playing = !stopped && !paused;
    // conditional rendering for TimerInput, TimerDisplay time prop
    let timerDisplayConditional;
    let timerInputConditional;
    if (stopped) {
      timerDisplayConditional = <TimerDisplay time={totalSeconds} />;
      timerInputConditional = <TimerInput updateTime={this.updateTime} />;
    } else {
      timerDisplayConditional = <TimerDisplay time={remainingSeconds} />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          {timerDisplayConditional}
          {timerInputConditional}
        </div>
        <div className={styles.sub}>
          <TimerControls
            onTimerStart={this.onTimerStart}
            onTimerPause={this.onTimerPause}
            onTimerClear={this.onTimerClear}
            onTimerRestart={this.onTimerRestart}
            playing={playing}
            paused={paused}
            stopped={stopped}
            totalSeconds={this.state.totalSeconds}
          />
          <br />
          <hr />
          <AudioControls
            muted={muted}
            onToggleChimeMute={this.toggleChimeMute}
            volumeValue={this.state.volume}
            onVolumeChange={this.onVolumeChange}
          />
        </div>
        <audio
          ref={(c) => (this.audioElement = c)}
        >
          html5 <code>audio</code> element not supported by your browser, dayum.
          <source src={this.state.chime} type="audio/mpeg">
          </source>
        </audio>
      </div>
    );
  }
}
