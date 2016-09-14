import React from 'react';
import styles from './CustomSlider.scss';

const CustomSliderTrack = ({ trackLength, trackHeight }) => {
  let trackStyles = {
    width: `${trackLength}%`,
    height: `${trackHeight}px`,
  };
  return (
    <div className={styles.track} style={trackStyles}></div>
  );
};
CustomSliderTrack.propTypes = {
};
export default CustomSliderTrack;
