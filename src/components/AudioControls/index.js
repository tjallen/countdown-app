import React, { PropTypes } from 'react';

import MuteToggle from './MuteToggle';
import VolumeSlider from './VolumeSlider';

const AudioControls = (props) => <div>
  <MuteToggle
    muted={props.muted}
    onToggleChimeMute={props.onToggleChimeMute}
  />
  <VolumeSlider
    volumeValue={props.volumeValue}
    onVolumeChange={props.onVolumeChange}
  />
</div>;

AudioControls.propTypes = {
  onToggleChimeMute: PropTypes.func,
  muted: PropTypes.bool,
  volumeValue: PropTypes.string,
  onVolumeChange: PropTypes.func,
};

export default AudioControls;
