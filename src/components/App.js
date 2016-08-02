import React, { Component } from 'react';
// css modules
import styles from './App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      formattedTime: '00:00:00',
    };
    this.tick = this.tick.bind(this);
    this.onTimerStartClick = this.onTimerStartClick.bind(this);
    this.onTimerPauseClick = this.onTimerPauseClick.bind(this);
    this.onTimerClearClick = this.onTimerClearClick.bind(this);
  }
  componentDidMount() {
    console.log('mounted');
    this.timerInterval = null;
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onTimerStartClick() {
    // start from fresh
    if (this.state.seconds === 0) {
      const timerStartDate = Date.now();
      this.timerInterval = setInterval(() => this.tick(timerStartDate), 1000);
      this.setState({
        ticking: true,
      });
    } else {
      // start from paused
      console.log('lets resume from paused');
    }
  }
  onTimerPauseClick() {
    console.log('paused at', this.state.seconds);
  }
  onTimerClearClick() {
    this.setState({
      seconds: 0,
    });
    clearInterval(this.timerInterval); // to cb?
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
    return (
      <div className={styles.container}>
        <h2>{this.state.formattedTime}</h2>
        <button onClick={this.onTimerStartClick}>Start timer</button>
        <button onClick={this.onTimerPauseClick}>Pause timer</button>
        <button onClick={this.onTimerClearClick}>Reset timer</button>
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
