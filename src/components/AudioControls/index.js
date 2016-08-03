import React, { PropTypes } from 'react';

import MuteToggle from './MuteToggle';
import VolumeSlider from './VolumeSlider';

const AudioControls = (props) => <div>
  <MuteToggle
    isMuted={props.isMuted}
    onToggleChimeMute={props.onToggleChimeMute}
  />
  <VolumeSlider
    volumeValue={props.volumeValue}
    onVolumeChange={props.onVolumeChange}
  />
</div>;

AudioControls.propTypes = {
  onToggleChimeMute: PropTypes.func,
  isMuted: PropTypes.bool,
  volumeValue: PropTypes.string,
  onVolumeChange: PropTypes.func,
};

export default AudioControls;
