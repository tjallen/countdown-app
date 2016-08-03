import React, { Component } from 'react';
// css modules
import styles from './App.scss';

// audio files
import chime from '../files/chime.mp3';

// child components
import AudioControls from './AudioControls';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      formattedTime: this.formatTime(0),
      paused: false,
      stopped: true,
      targetSeconds: 3,
      chime,
      volume: '0.1',
      looping: true,
      muted: false,
    };
    this.tick = this.tick.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onTimerClear = this.onTimerClear.bind(this);
    this.onTimerRestart = this.onTimerRestart.bind(this);
    this.toggleChimeMute = this.toggleChimeMute.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
  }
  componentDidMount() {
    // define timerInterval but don't set it yet
    this.timerInterval = null;
    // initialize audio element
    this.audioElement.volume = this.state.volume;
    // audio element debug info
    console.log(`muted: ${this.audioElement.muted}, volume: ${this.audioElement.volume}`);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  onTimerStart() {
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
  onTimerPause() {
    this.setState({
      paused: true,
      seconds: this.state.seconds,
    }, clearInterval(this.timerInterval));
  }
  onTimerClear() {
    this.setState({
      seconds: 0,
      stopped: true,
      paused: false,
      formattedTime: this.formatTime(0),
    }, clearInterval(this.timerInterval));
  }
  onTimerRestart() {
    this.onTimerClear();
    this.onTimerStart();
  }
  onVolumeChange(event) {
    console.log(event.target.value);
    this.setState({
      volume: event.target.value,
    });
  }
  toggleChimeMute() {
    this.audioElement.muted = !this.audioElement.muted;
    this.setState({
      muted: !this.audioElement.muted,
    });
  }
  toggleCountdown() {
    // toggle count up || count down
  }
  // tick method run by interval to update timer once a second
  tick(timerStartDate) {
    // prepare a callback for when the target second is about to be reached
    let callback;
    if (this.state.seconds === (this.state.targetSeconds - 1)) {
      callback = this.targetSecondsReached();
    }
    const seconds = Math.floor((Date.now() - timerStartDate) / 1000);
    this.setState({
      seconds,
      formattedTime: this.formatTime(seconds),
    }, callback);
  }
  // fire the chime, message etc when target seconds is arrived at
  targetSecondsReached() {
    this.onTimerPause();
    this.audioElement.play();
    console.log('target seconds reached!');
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
  // add padding zero to hh:mm:ss if needed
  zeroPad(num) {
    if (num >= 10) {
      return num;
    }
    const paddedNum = `0${num}`;
    return paddedNum;
  }
  render() {
    // destructure this.state into some helper variables for readability
    const { muted: isMuted, stopped: isStopped, paused: isPaused } = this.state;
    const isPlaying = this.state.seconds > 0 && !isPaused;
    let startButtonText;
    if (isPaused) {
      startButtonText = 'Resume';
    } else {
      startButtonText = 'Start';
    }
    // dbg
    console.log(isMuted, isStopped, isPaused, isPlaying);
    return (
      <div className={styles.container}>
        <h2>{this.state.formattedTime}</h2>
        <p>Timer controls</p>
        <button
          onClick={this.onTimerStart}
          disabled={isPlaying}
        >{startButtonText}</button>
        <button
          onClick={this.onTimerPause}
          disabled={isPaused || isStopped}
        >Pause</button>
        <button
          onClick={this.onTimerClear}
          disabled={isStopped}
        >Clear</button>
        <button
          onClick={this.onTimerRestart}
          disabled={isStopped}
        >Restart</button>
        <br />
        <p>Timer type</p>
        <button>Count down</button>
        <button>Count up</button>
        <button>Pomorodo</button>
        <button>Toggle loop</button>
        <p>chime controls</p>
        <AudioControls
          isMuted={this.state.muted}
          onToggleChimeMute={this.toggleChimeMute}
          volumeValue={this.state.volume}
          onVolumeChange={this.onVolumeChange}
        />
        <audio
          ref={(c) => (this.audioElement = c)}
        >
          html5 <code>audio</code> element isn't supported by your browser, dayum.
          <source src={this.state.chime} type="audio/mpeg">
          </source>
        </audio>
      </div>
    );
  }
}
