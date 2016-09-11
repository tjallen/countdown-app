import React, { Component, PropTypes } from 'react';

import MuteToggle from './MuteToggle';
import VolumeSlider from './VolumeSlider';
import CustomSlider from './CustomSlider';

export default class AudioControls extends Component {
  static propTypes = {
    muted: PropTypes.bool,
    onToggleChimeMute: PropTypes.func,
    onVolumeChange: PropTypes.func,
    volumeValue: PropTypes.number,
  };
  constructor() {
    super();
    this.state = {
      muted: false,
      volume: 5,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(newState) {
    console.log(newState);
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
      </div>
    );
  }
}

