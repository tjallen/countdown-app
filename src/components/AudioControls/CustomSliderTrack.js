import React from 'react';
import styles from './CustomSlider.scss';

const CustomSliderTrack = ({ trackLength }) => {
  let trackStyles = {
    width: `${trackLength}%`,
  };
  return (
    <div className={styles.track} style={trackStyles}></div>
  );
};
CustomSliderTrack.propTypes = {
};
export default CustomSliderTrack;
