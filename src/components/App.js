/* eslint-disable no-console, no-alert */

import React, { Component } from 'react';
// css module
import styles from './App.scss';

// audio files
import chime from '../files/chime.mp3';
import beep from '../files/beep.mp3';

// child components
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerForm from './TimerForm';
import AudioControls from './AudioControls';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      remainingTime: 0,
      totalTime: 0,
      paused: false,
      stopped: true,
      loop: true,
      chime: beep,
      volume: '0.1',
      muted: false,
      interval: 1000,
      timeoutId: null,
      percRemaining: 0,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onTimerClear = this.onTimerClear.bind(this);
    this.toggleChimeMute = this.toggleChimeMute.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
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
  onTimerStart(specified) {
    // if optional argument is used, prepare to start at a specific time
    if (typeof(specified) === 'number') {
      console.log(`onTimerStart recieved argument: ${specified}`);
      this.updateTime(specified);
    }
    clearTimeout(this.state.timeoutId);
    const { totalTime, remainingTime, interval, paused } = this.state;
    if (totalTime <= 0) {
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
      percRemaining: 0,
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
  toggleLoop() {
    this.setState({
      loop: !this.state.loop,
    });
  }
  // tick method run by looping setTimeout to update timer every ~1000ms
  tick(timerStartDate) {
    const total = this.state.totalTime;
    const delta = Date.now() - timerStartDate;
    const remainingTime = Math.max(total - delta, 0);
    const percRemaining = Math.max(100 - (delta / total) * 100, 0);
    console.log(`==== tick to [${remainingTime}] ====`);
    let timeoutId = null;
    if (remainingTime > 0) {
      // prep for next tick
      const nextInterval = (this.state.interval - (delta % this.state.interval));
      timeoutId = setTimeout(() => this.tick(timerStartDate), nextInterval);
    } else {
      // timer is completed: either prepare to loop or clear
      console.log(`timerCompleted after ${total}ms`);
      this.audioElement.play();
      if (this.state.loop) {
        timeoutId = setTimeout(() => {
          this.onTimerStart(total);
        }, 1000);
      } else {
        this.onTimerClear();
      }
    }
    this.setState({
      timeoutId,
      remainingTime,
      percRemaining,
    });
  }
  // takes time in milliseconds, renders to hh:mm:ss for readable time
  formatTime(ms) {
    const seconds = ms / 1000;
    let mins = Math.floor(seconds / 60);
    const secs = this.zeroPad(Math.round(seconds % 60));
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
  // update state.targetTime from user h/m/s inputs or directly from single arg
  updateTime(...theArgs) {
    let ms;
    let percRemaining = 100;
    if (theArgs.length === 1) {
      ms = theArgs[0];
    } else {
      const [hours, minutes, seconds] = theArgs;
      ms = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    }
    if (ms === 0) {
      percRemaining = 0;
    }
    this.setState({
      totalTime: ms,
      remainingTime: ms,
      percRemaining,
    });
    console.log(`time updated to ${ms}`);
  }
  render() {
    // helper/readability vars for jsx
    let { totalTime, remainingTime } = this.state;
    totalTime = this.formatTime(totalTime);
    remainingTime = this.formatTime(remainingTime);
    const { muted, stopped, paused } = this.state;
    const playing = !stopped && !paused;
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <TimerDisplay
            time={remainingTime}
            perc={this.state.percRemaining}
            playing={playing}
          />
          <TimerControls
            onTimerStart={this.onTimerStart}
            onTimerPause={this.onTimerPause}
            onTimerClear={this.onTimerClear}
            playing={playing}
            paused={paused}
            stopped={stopped}
            totalTime={this.state.totalTime}
            toggleLoop={this.toggleLoop}
          />
          {stopped && <TimerForm updateTime={this.updateTime} />}
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
