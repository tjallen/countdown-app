import React, { PropTypes } from 'react';

const VolumeSlider = (props) =>
  <div>
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={props.volumeValue}
      onChange={props.onVolumeChange}
    ></input>
  </div>;
export default VolumeSlider;

VolumeSlider.propTypes = {
  volumeValue: PropTypes.string,
  onVolumeChange: PropTypes.func,
};
