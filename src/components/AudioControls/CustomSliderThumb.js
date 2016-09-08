import React from 'react';
import styles from './CustomSlider.scss';

const CustomSliderThumb = ({ thumbPosition, height }) => {
  let thumbStyles = {
    left: `${thumbPosition}%`,
    top: `-${height - 1}px`,
  };
  return (
    <div className={styles.thumb} style={thumbStyles}></div>
  );
};
CustomSliderThumb.propTypes = {
};
export default CustomSliderThumb;
