import React, { Component } from 'react';
// css modules
import styles from './App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStartClick = this.onTimerStartClick.bind(this);
    this.onTimerPauseClick = this.onTimerPauseClick.bind(this);
    this.onTimerClearClick = this.onTimerClearClick.bind(this);
    this.formatTime = this.formatTime.bind(this);
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
    clearInterval(this.timerInterval);
  }
  onTimerClearClick() {
    console.log('clear');
  }
  tick(timerStartDate) {
    const seconds = Math.floor((Date.now() - timerStartDate) / 1000);
    console.log('tick, seconds:', seconds);
    console.log(this.formatTime(seconds));
    this.setState({
      seconds,
    });
  }
  formatTime(seconds) {
    // do some time formatting here
    // const output = `format:${hrs}:${mins}:${secs}`;
    // return output;
  }
  render() {
    return (
      <div className={styles.container}>
        <h2>{this.state.seconds}</h2>
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
