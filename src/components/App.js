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
      remainingTime: 0,
      totalTime: 0,
      paused: false,
      stopped: true,
      loop: false,
      chime,
      volume: '0.1',
      muted: false,
      lastTime: null,
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
    this.state.totalTime = this.state.remainingTime;
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
    const { totalTime, remainingTime, tickDelay, paused } = this.state;
    if (totalTime === 0) {
      alert('time must be above 0 seconds');
      return;
    }
    // if paused, offset start date by the time it was paused at
    // otherwise just use Date.now()
    let offset = 0;
    if (paused) {
      offset = (totalTime - remainingTime);
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
      remainingTime: this.state.remainingTime,
    }, clearInterval(this.timerInterval));
  }
  onTimerClear() {
    this.setState({
      remainingTime: 0,
      totalTime: 0,
      stopped: true,
      paused: false,
    }, clearInterval(this.timerInterval));
  }
  onTimerRestart() {
    this.onTimerPause();
    this.setState({
      remainingTime: this.state.totalTime,
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
    if (this.state.remainingTime === 1) {
      callback = this.timerCompleted();
    }
    const timerDuration = Math.round((Date.now() - timerStartDate));
    const remainingTime = this.state.totalTime - timerDuration;
    console.log('========= new tick =========');
    console.log(`passed: ${timerDuration} | remaining: ${remainingTime}`);
    if (remainingTime <= 0) {
      this.timerCompleted();
    }
    this.setState({
      remainingTime,
      lastTime: remainingTime,
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
  // takes time in milliseconds, renders to hh:mm:ss for readable time
  formatTime(ms) {
    const seconds = ms / 1000;
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
  // update state.targetTime from user h/m/s inputs
  updateTime(hours, minutes, seconds) {
    const ms = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    this.setState({
      totalTime: ms,
      remainingTime: ms,
    });
  }
  render() {
    // helper/readability vars for jsx
    let { totalTime, remainingTime } = this.state;
    totalTime = this.formatTime(totalTime);
    remainingTime = this.formatTime(remainingTime);
    const { muted, stopped, paused } = this.state;
    const playing = !stopped && !paused;
    // conditional rendering for TimerInput, TimerDisplay time prop
    let timerDisplayConditional;
    let timerInputConditional;
    if (stopped) {
      timerDisplayConditional = <TimerDisplay time={totalTime} />;
      timerInputConditional = <TimerInput updateTime={this.updateTime} />;
    } else {
      timerDisplayConditional = <TimerDisplay time={remainingTime} />;
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
            totalTime={this.state.totalTime}
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
