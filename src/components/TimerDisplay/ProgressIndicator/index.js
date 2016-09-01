import React, { PropTypes } from 'react';
import styles from './ProgressIndicator.scss';

const ProgressIndicator = ({ perc }) => {
  const percPlayed = `${perc}%`;
  const percStyles = {
    width: percPlayed,
  };
  return (
    <div className={styles.percbg}>
      <div className={styles.percfilled} style={percStyles}></div>
    </div>
  );
};
ProgressIndicator.propTypes = {
  perc: PropTypes.number.isRequired,
};
export default ProgressIndicator;

