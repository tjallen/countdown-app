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
      interval: 1000,
      timeoutId: null,
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
    this.state.totalTime = this.state.remainingTime;
  }
  componentDidMount() {
    // initialize audio element
    this.audioElement.volume = this.state.volume;
    this.audioElement.muted = this.state.muted;
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }
  onTimerStart() {
    clearTimeout(this.state.timeoutId);
    const { totalTime, remainingTime, interval, paused } = this.state;
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
    this.setState({
      paused: false,
      stopped: false,
      timeoutId: setTimeout(() => this.tick(timerStartDate), interval),
    });
  }
  onTimerPause() {
    console.log('timerPause');
    this.setState({
      paused: true,
      remainingTime: this.state.remainingTime,
    }, clearTimeout(this.state.timeoutId));
  }
  onTimerClear() {
    clearTimeout(this.state.timeoutId);
    this.setState({
      remainingTime: 0,
      totalTime: 0,
      stopped: true,
      paused: false,
      timeoutId: null,
    });
  }
  onTimerRestart() {
    clearTimeout(this.state.timeoutId);
    const total = this.state.totalTime;
    this.setState({
      remainingTime: total,
      totalTime: total,
      timeoutId: null,
    }, this.onTimerStart);
  }
  onTimerStop() {
    clearTimeout(this.state.timeoutId);
    this.setState({
      remainingTime: 0,
      totalTime: 0,
      stopped: true,
      paused: false,
      timeoutId: null,
    });
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
  // tick method run by looping setTimeout to update timer every ~1000ms
  tick(timerStartDate) {
    // delta time / how long since timer started
    const delta = Date.now() - timerStartDate;
    // remaining time until 0; just 0 if last tick takes into minus
    const remainingTime = Math.max(this.state.totalTime - delta, 0);
    // fire complete method if we've reached 0
    if (remainingTime <= 0) {
      this.timerCompleted();
    }
    // how long should next interval be to compensate for drift
    const nextInterval = (this.state.interval - (delta % this.state.interval));
    // continue the setTimeout loop / fire next tick() and update state
    if (!this.state.paused && !this.state.stopped) {
      // store current timeout id in state
      const timeoutId = setTimeout(() => this.tick(timerStartDate), nextInterval);
      this.setState({
        timeoutId,
        remainingTime,
      });
    }
  }
  // fire the chime, message etc when target seconds is arrived at
  timerCompleted() {
    console.log('timerCompleted');
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
    const secs = this.zeroPad(Math.ceil(seconds % 60));
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
