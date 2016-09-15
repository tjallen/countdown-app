import React, { Component, PropTypes } from 'react';

import MuteToggle from './MuteToggle';
// import VolumeSlider from './VolumeSlider';
import CustomSlider from './CustomSlider';

// audio files
import chime from './files/chime.mp3';
import beep from './files/beep.mp3';

export default class AudioPlayer extends Component {
  static propTypes = {
    muted: PropTypes.bool,
    onToggleChimeMute: PropTypes.func,
    onVolumeChange: PropTypes.func,
    volumeValue: PropTypes.number,
    audioPlaying: PropTypes.bool,
    onAudioComplete: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      volume: 5,
      audioPlaying: props.audioPlaying,
      chime,
      pauseInterval: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.toggleChimeMute = this.toggleChimeMute.bind(this);
  }
  componentDidMount() {
    // initialize audio element
    this.audioElement.volume = this.state.volume / 10;
    this.audioElement.muted = this.state.muted;
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { audioPlaying, volume } = this.state;
  //   return (nextProps.audioPlaying !== audioPlaying || nextState.volume !== volume);
  // }
  componentWillReceiveProps(nextProps) {
    const currentState = this.state.audioPlaying;
    const { audioPlaying } = nextProps;
    // should be redundant w/ shouldComponentUpdate but needs test
    if (audioPlaying === currentState) return;
    if (audioPlaying) {
      this.playAudio();
    } else if (!audioPlaying) {
      this.pauseAudio();
    }
  }
  playAudio() {
    const duration = this.audioElement.duration * 1000; // .duration uses secs
    const pauseInterval = setTimeout(this.pauseAudio, duration);
    this.audioElement.play();
    this.setState({
      pauseInterval,
    });
  }
  pauseAudio() {
    clearTimeout(this.state.pauseInterval);
    this.setState({
      pauseInterval: null,
    });
    this.audioElement.pause();
    this.props.onAudioComplete();
  }
  handleChange(newState) {
    const volume = newState.value;
    console.log('vol', volume);
    this.setState({
      volume, // / 10 for HTML5 audio element
    });
    this.audioElement.volume = volume / 10;
  }
  toggleChimeMute() {
    console.log('muteToggle');
    this.setState({
      muted: !this.state.muted,
    });
    this.audioElement.muted = !this.audioElement.muted;
  }
  render() {
    return (
      <div>
        <MuteToggle
          muted={this.state.muted}
          toggleChimeMute={this.toggleChimeMute}
        />
        <CustomSlider
          onChange={this.handleChange}
          height={8}
          min={0}
          max={10}
          step={1}
          defaultValue={this.state.volume}
        />
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

