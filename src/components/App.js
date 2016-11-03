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
      loop: true,
      interval: 250,
      timeoutId: null,
      percRemaining: 0,
      completed: false,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onTimerClear = this.onTimerClear.bind(this);
    this.onTimerRestart = this.onTimerRestart.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.addOneMinute = this.addOneMinute.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.toggleTimerCompleted = this.toggleTimerCompleted.bind(this);
  }
  componentWillMount() {
    this.state.totalTime = this.state.remainingTime;
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }
  onTimerStart(optionalSpecifiedTime) {
    const { totalTime, remainingTime, interval, paused, pauseDelta } = this.state;
    // if paused && resuming (not restarting) prepare offset for start date
    const offset = (paused) ? (totalTime - remainingTime) + pauseDelta : 0;
    console.log('timerStart offset', offset);
    const timerStartDate = (Date.now() - offset);
    clearTimeout(this.state.timeoutId);
    if (totalTime <= 0) {
      console.log('!!! time must be above 0 seconds !!!');
      return;
    }
    if (typeof(optionalSpecifiedTime) === 'number') {
      this.updateTime(optionalSpecifiedTime);
    }
    this.tick(timerStartDate); // 0 tick change for resiliency; will need a delay on loop 1+
    this.setState({
      paused: false,
      stopped: false,
      timeoutId: setTimeout(() => this.tick(timerStartDate), interval),
    });
  }
  onTimerPause() {
    this.clearTimeout(this.state.timeoutId);
    const now = Date.now();
    const pauseDelta = now - this.state.lastTick;
    this.setState({
      paused: true,
      remainingTime: this.state.remainingTime,
      pauseDelta,
    });
  }
  onTimerRestart(total) {
    if (this.state.stopped) return;
    clearTimeout(this.state.timeoutId);
    this.onTimerClear();
    this.setState({
      remainingTime: total,
      totalTime: total,
      // timeoutId: null,
    }, this.onTimerStart);
  }
  onTimerClear() {
    if (this.state.completed) this.toggleTimerCompleted();
    clearTimeout(this.state.timeoutId);
    const remainingTime = 0;
    const totalTime = 0;
    const percRemaining = this.getPercRemaining(remainingTime, totalTime);
    this.setState({
      remainingTime,
      totalTime,
      stopped: true,
      paused: false,
      // timeoutId: null,
      percRemaining,
    });
  }
  getPercRemaining(current, total) {
    const perc = (current / total) * 100 || 0; // becomes NaN if divided by zero, we return 0 if so
    return perc;
  }
  toggleTimerCompleted() {
    console.log(`complete ${this.state.completed} => ${!this.state.completed}`);
    this.setState((prevState) => ({
      completed: !prevState.completed,
    }));
  }
  toggleLoop() {
    this.setState((prevState) => ({
      loop: !prevState.loop,
    }));
  }
  // temp for debug
  clearTimeout(id) {
    // console.log(`clearing ${id} =>`);
    clearTimeout(id);
  }
  // tick method run by looping setTimeout to update timer every ~1000ms
  tick(timerStartDate) {
    clearTimeout(this.state.timeoutId);
    const total = this.state.totalTime;
    const delta = Date.now() - timerStartDate;
    const remainingTime = Math.max(total - delta, 0);
    const closestSecond = Math.ceil(remainingTime / 1000); // debug
    const percRemaining = this.getPercRemaining(remainingTime, total);
    let timeoutId = null;
    let nextInterval;
    console.log(
      `>>> tick to [${closestSecond}]s (${remainingTime})ms ${delta}d`
    );
    // TIMER STILL RUNNING
    if (remainingTime > 0) {
      // prep for next tick
      nextInterval = (this.state.interval - (delta % this.state.interval));
      if (!this.state.paused) {
        timeoutId = setTimeout(() => this.tick(timerStartDate), nextInterval);
      }
    } else {
      // TIMER COMPLETED: LOOP OR CLEAR
      console.log(`timerCompleted after ${total}ms`);
      this.audioPlayer.playAudio();
      if (this.state.loop) {
        this.onTimerRestart(total);
      } else {
        this.toggleTimerCompleted();
      }
    }
    this.setState({
      timeoutId,
      remainingTime,
      percRemaining,
      lastTick: Date.now(),
      closestSecond,
      nextInterval,
    });
  }
  // update state.targetTime from user inputs
  updateTime(ms) {
    const totalTime = ms;
    const remainingTime = ms;
    const percRemaining = this.getPercRemaining(remainingTime, totalTime);
    this.setState({
      totalTime,
      remainingTime,
      percRemaining,
    });
    console.log(`time updated to ${ms}`);
  }
  // +1min btn
  addOneMinute() {
    /* in the completed state, totalTime is cached for use by onTimerRestart.
    so +1 would become totalTime+1min rather than just 1min
    */
    if (this.state.completed) {
      this.setState({
        totalTime: 60000,
        remainingTime: 60000,
      }, this.onTimerStart);
      this.toggleTimerCompleted();
    } else {
      // otherwise if the timer is running or paused, we use the safe prevState variant
      this.setState((prevState) => ({
        totalTime: prevState.totalTime + 60000,
        remainingTime: prevState.remainingTime + 60000,
      }));
    }
  }
  render() {
    const { stopped, paused, completed } = this.state;
    const playing = !stopped && !paused;
    return (
      <div className={styles.container}>
        <AppBar
          appTitle="countdown-app"
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
            toggleTimerCompleted={this.toggleTimerCompleted}
            completed={completed}
            stopped={stopped}
            addOneMinute={this.addOneMinute}
          />
          <TimerControls
            onTimerStart={this.onTimerStart}
            onTimerPause={this.onTimerPause}
            onTimerClear={this.onTimerClear}
            onTimerRestart={this.onTimerRestart}
            playing={playing}
            stopped={stopped}
            totalTime={this.state.totalTime}
            completed={completed}
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
