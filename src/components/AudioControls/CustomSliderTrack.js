import React from 'react';
import styles from './CustomSlider.scss';

const CustomSliderTrack = ({ width }) => {
  let trackStyles = {
    width,
  };
  return (
    <div className={styles.track} style={trackStyles}></div>
  );
};
CustomSliderTrack.propTypes = {
};
export default CustomSliderTrack;
