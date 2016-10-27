/* eslint-disable no-console, no-alert */

import React, { Component } from 'react';
// css module
import styles from './App.scss';

// child components
import AppBar from './AppBar';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerForm from './TimerForm';
import AudioPlayer from './AudioPlayer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      remainingTime: 0,
      totalTime: 0,
      paused: false,
      stopped: true,
      loop: false,
      interval: 1000,
      timeoutId: null,
      percRemaining: 0,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onTimerClear = this.onTimerClear.bind(this);
    this.onTimerRestart = this.onTimerRestart.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
  }
  componentWillMount() {
    this.state.totalTime = this.state.remainingTime;
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }
  onTimerStart(optionalSpecifiedTime) {
    const { totalTime, remainingTime, interval, paused } = this.state;
    // if paused && resuming (not restarting) prepare offset for start date
    const offset = (paused) ? (totalTime - remainingTime) : 0;
    const timerStartDate = (Date.now() - offset);
    clearTimeout(this.state.timeoutId);
    if (totalTime <= 0) {
      alert('time must be above 0 seconds');
      return;
    }
    if (typeof(optionalSpecifiedTime) === 'number') {
      this.updateTime(optionalSpecifiedTime);
    }
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
  onTimerRestart(total) {
    clearTimeout(this.state.timeoutId);
    this.onTimerClear();
    this.setState({
      remainingTime: total,
      totalTime: total,
      timeoutId: null,
    }, this.onTimerStart);
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
  toggleLoop() {
    this.setState((prevState) => ({
      loop: !prevState.loop,
    }));
  }
  // tick method run by looping setTimeout to update timer every ~1000ms
  tick(timerStartDate) {
    const total = this.state.totalTime;
    const delta = Date.now() - timerStartDate;
    const remainingTime = Math.max(total - delta, 0);
    const percRemaining = Math.max(100 - (delta / total) * 100, 0);
    let timeoutId = null;
    // console.log(`==== tick to [${remainingTime}] ====`);
    if (remainingTime > 0) {
      // prep for next tick
      const nextInterval = (this.state.interval - (delta % this.state.interval));
      timeoutId = setTimeout(() => this.tick(timerStartDate), nextInterval);
    } else {
      // timer is completed: either prepare to loop or clear
      console.log(`timerCompleted after ${total}ms`);
      this.audioPlayer.playAudio();
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
  // update state.targetTime from user h/m/s inputs or directly from single arg
  updateTime(...theArgs) {
    let ms;
    let percRemaining = 100;
    if (theArgs.length === 1) {
      ms = theArgs[0];
    } else {
      const [hours, minutes, seconds] = theArgs;
      ms = (
        (Math.min(hours, 24) * 3600) + (Math.min(minutes, 59) * 60) + Math.min(seconds, 59)
      ) * 1000;
    }
    if (ms === 0) {
      percRemaining = 0;
    }
    this.setState({
      totalTime: ms,
      remainingTime: ms,
      percRemaining,
    });
    // console.log(`time updated to ${ms}`);
  }
  render() {
    const { stopped, paused } = this.state;
    const playing = !stopped && !paused;
    return (
      <div className={styles.container}>
        <AppBar
          appTitle="Chime"
          toggleLoop={this.toggleLoop}
          toggleLabel={this.toggleLabel}
          loopStatus={this.state.loop}
        />
        <div className={styles.main}>
          <TimerDisplay
            remainingTime={this.state.remainingTime}
            perc={this.state.percRemaining}
            paused={paused}
            updateTime={this.updateTime}
          />
          <TimerControls
            onTimerStart={this.onTimerStart}
            onTimerPause={this.onTimerPause}
            onTimerClear={this.onTimerClear}
            onTimerRestart={this.onTimerRestart}
            playing={playing}
            paused={paused}
            stopped={stopped}
            totalTime={this.state.totalTime}
            toggleLoop={this.toggleLoop}
            looping={this.state.loop}
          />
          {stopped && <TimerForm updateTime={this.updateTime} />}
          <AudioPlayer
            timerPlaying={!stopped}
            ref={(c) => (this.audioPlayer = c)}
          />
        </div>
      </div>
    );
  }
}
