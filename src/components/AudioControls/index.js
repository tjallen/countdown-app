import React, { PropTypes } from 'react';

import MuteToggle from './MuteToggle';
import VolumeSlider from './VolumeSlider';

const AudioControls = ({ muted, onToggleChimeMute, onVolumeChange, volumeValue }) => <div>
  <MuteToggle
    muted={muted}
    onToggleChimeMute={onToggleChimeMute}
  />
  <VolumeSlider
    volumeValue={volumeValue}
    onVolumeChange={onVolumeChange}
  />
</div>;

AudioControls.propTypes = {
  muted: PropTypes.bool,
  onToggleChimeMute: PropTypes.func,
  onVolumeChange: PropTypes.func,
  volumeValue: PropTypes.string,
};

export default AudioControls;
