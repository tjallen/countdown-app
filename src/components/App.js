import React, { Component } from 'react';
// css modules
import styles from './App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      timerCount: '0',
    };
    this.tick = this.tick.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerStop = this.onTimerStop.bind(this);
    this.onTimerClear = this.onTimerClear.bind(this);
  }
  componentDidMount() {
    console.log('mounted');
    this.timerInterval = null;
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onTimerStart() {
    const OG = Date.now();
    this.timerInterval = setInterval(() => this.tick(OG), 1000);
  }
  onTimerStop() {
    console.log('stopped at', this.state.timerCount);
    clearInterval(this.timerInterval);
  }
  onTimerClear() {
    console.log('clear');
  }
  tick(ogDate) {
    console.log('tick');
    const d = Math.floor((Date.now() - ogDate) / 1000);
    this.setState({
      timerCount: d,
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <h2>Timer count: {this.state.timerCount}</h2>
        <button onClick={this.onTimerStart}>Start timer</button>
        <button onClick={this.onTimerStop}>Stop timer</button>
        <button onClick={this.onTimerClear}>Reset timer</button>
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
