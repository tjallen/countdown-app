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
  }
  componentDidMount() {
    // initialize audio element
    this.audioElement.volume = this.state.volume / 10;
    this.audioElement.muted = this.state.muted;
  }
  componentWillReceiveProps(nextProps) {
    const currentState = this.state.audioPlaying;
    const { audioPlaying } = nextProps;
    if (audioPlaying === currentState) return;
    switch (audioPlaying) {
      case true: {
        this.playAudio();
        break;
      }
      case false: {
        this.pauseAudio();
        break;
      }
      default: // nuttin
    }
  }
  playAudio() {
    const duration = this.audioElement.duration * 1000; // .duration prop is in seconds
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
      volume, // divide by 10 in render method and pass to <Audio /> wrapper c
    });
  }
  toggleChimeMute() {
    this.setState({
      muted: !this.audioElement.muted,
    });
    this.audioElement.muted = !this.audioElement.muted;
  }
  render() {
    const { onToggleChimeMute, volumeValue, muted, onVolumeChange } = this.props;
    return (
      <div>
        <MuteToggle
          muted={muted}
          onToggleChimeMute={onToggleChimeMute}
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

