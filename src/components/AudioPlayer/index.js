import React, { Component, PropTypes } from 'react';

import Icon from '../Icon';
import ReactSimpleRange from 'react-simple-range';

import styles from './AudioPlayer.scss';

// files
// import westminster from './files/chime.mp3';
import singleBeep from './files/beep.mp3';
import volumeUp from '../../icons/ic_volume_up_24px.svg';
import volumeDown from '../../icons/ic_volume_down_24px.svg';
import volumeMuted from '../../icons/ic_volume_mute_24px.svg';

export default class AudioPlayer extends Component {
  static propTypes = {
    audioPlaying: PropTypes.bool,
    timerPlaying: PropTypes.bool,
    onAudioComplete: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      volume: 3,
      previousVolume: null,
      audioPlaying: props.audioPlaying,
      chime: singleBeep,
      pauseInterval: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
  }
  playAudio() {
    this.audioElement.play();
  }
  pauseAudio() {
    this.audioElement.pause();
  }
  handleChange(newState) {
    let volume;
    let muted;
    let previousVolume = null;
    // if we're setting volume using component state from CustomSlider
    if (newState.hasOwnProperty('value')) {
      if (newState.value > 0) {
        volume = newState.value;
        muted = false;
      } else {
        previousVolume = this.state.volume;
        volume = 0;
        muted = true;
      }
    } else {
      // else we're just toggling mute by inverting this.state
      muted = !this.state.muted;
      // muting: cache current volume for future unmute
      if (muted) {
        previousVolume = this.state.volume;
        volume = 0;
      // toggle unmute and return previous volume value
      } else if (!muted) {
        volume = this.state.previousVolume;
      }
    }
    this.setState({
      volume,
      muted,
      previousVolume,
    });
    this.audioElement.volume = volume / 10; // html5 audio api is 0-1
    this.audioElement.muted = muted;
  }
  render() {
    let currentVolumeIcon;
    const { muted, volume } = this.state;
    if (muted) {
      currentVolumeIcon = <Icon glyph={volumeMuted} className={styles.icon} />;
    } else {
      if (volume > 4) {
        currentVolumeIcon = <Icon glyph={volumeUp} className={styles.icon} />;
      } else {
        currentVolumeIcon = <Icon glyph={volumeDown} className={styles.icon} />;
      }
    }
    return (
      <div>
        <div className={styles.audiocontrolswrap}>
        {this.props.timerPlaying
        ? <div className={styles.audiocontrolsinner}>
          <div className={styles.iconwrap}>
            {currentVolumeIcon}
          </div>
          <div className={styles.sliderwrap}>
            <ReactSimpleRange
              onChange={this.handleChange}
              min={0}
              max={10}
              step={1}
              defaultValue={volume}
              disableThumb
              sliderColor="#C5CAE9"
              trackColor="#FF5252"
            />
          </div>
        </div>
        : null}
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

