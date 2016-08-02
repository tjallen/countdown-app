import React, { Component } from 'react';
// css modules
import styles from './App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      formattedTime: this.formatTime(0),
      paused: false,
      stopped: true,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStartClick = this.onTimerStartClick.bind(this);
    this.onTimerPauseClick = this.onTimerPauseClick.bind(this);
    this.onTimerClearClick = this.onTimerClearClick.bind(this);
  }
  componentDidMount() {
    // define timerInterval but don't set it yet
    this.timerInterval = null;
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onTimerStartClick() {
    let offset = 0;
    // if paused, offset start date by the num of seconds it was paused at
    // otherwise just use Date.now()
    if (this.state.paused) {
      offset = this.state.seconds * 1000;
    }
    const timerStartDate = (Date.now() - offset);
    this.timerInterval = setInterval(() => this.tick(timerStartDate), 1000);
    this.setState({
      paused: false,
      stopped: false,
    });
  }
  onTimerPauseClick() {
    this.setState({
      paused: true,
      seconds: this.state.seconds,
    }, clearInterval(this.timerInterval));
  }
  onTimerClearClick() {
    this.setState({
      seconds: 0,
      stopped: true,
      formattedTime: this.formatTime(0),
    }, clearInterval(this.timerInterval));
  }
  // tick method run by interval to update timer once a second
  tick(timerStartDate) {
    const seconds = Math.floor((Date.now() - timerStartDate) / 1000);
    this.setState({
      seconds,
      formattedTime: this.formatTime(seconds),
    });
  }
  // take time in seconds and format to hh:mm:ss
  formatTime(seconds) {
    if (seconds === 0) {
      return '00:00:00';
    }
    let mins = Math.floor(seconds / 60);
    const secs = this.zeroPad(seconds % 60);
    const hours = this.zeroPad(Math.floor(mins / 60));
    mins = this.zeroPad(mins % 60);
    const output = `${hours}:${mins}:${secs}`;
    return output;
  }
  // add padding zero to h/m/s if needed
  zeroPad(num) {
    if (num >= 10) {
      return num;
    }
    const paddedNum = `0${num}`;
    return paddedNum;
  }
  render() {
    const isStopped = this.state.stopped;
    const isPaused = this.state.paused;
    const isPlaying = this.state.seconds > 0 && !isPaused;
    let startButtonText;
    if (isPaused) {
      startButtonText = 'Resume';
    } else {
      startButtonText = 'Start';
    }
    return (
      <div className={styles.container}>
        <h2>{this.state.formattedTime}</h2>
        <button
          onClick={this.onTimerStartClick}
          disabled={isPlaying}
        >{startButtonText}</button>
        <button
          onClick={this.onTimerPauseClick}
          disabled={isPaused || isStopped}
        >Pause</button>
        <button
          onClick={this.onTimerClearClick}
          disabled={isStopped}
        >Reset</button>
        <ul>
          <li>Hourly</li>
          <li>Pomorodo</li>
          <li>Custom</li>
          <li>Chime</li>
        </ul>
      </div>
    );
  }
}
