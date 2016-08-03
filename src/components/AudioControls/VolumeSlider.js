import React, { PropTypes } from 'react';

const VolumeSlider = (props) =>
  <div>
    Volume:
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      defaultValue={props.volumeValue}
      onChange={props.onVolumeChange}
    ></input>
  </div>;
export default VolumeSlider;

VolumeSlider.propTypes = {
  volumeValue: PropTypes.string,
  onVolumeChange: PropTypes.func,
};
