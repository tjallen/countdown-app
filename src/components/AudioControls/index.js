import React, { Component, PropTypes } from 'react';

import MuteToggle from './MuteToggle';
import VolumeSlider from './VolumeSlider';
import CustomSlider from './CustomSlider';

export default class AudioControls extends Component {
  static propTypes = {
    muted: PropTypes.bool,
    onToggleChimeMute: PropTypes.func,
    onVolumeChange: PropTypes.func,
    volumeValue: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      muted: false,
      volume: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    console.log('change on ACs');
  }
  render() {
    const { onToggleChimeMute, volumeValue, muted, onVolumeChange } = this.props;
    return (
      <div onChange={this.handleChange}>
        <MuteToggle
          muted={muted}
          onToggleChimeMute={onToggleChimeMute}
        />
        <VolumeSlider
          volumeValue={volumeValue}
          onVolumeChange={onVolumeChange}
        />
        <CustomSlider
          volumeValue={volumeValue}
          onVolumeChange={onVolumeChange}
          width={100}
          min={0}
          max={100}
          step={10}
          defaultValue={25}
        />
      </div>
    );
  }
}

