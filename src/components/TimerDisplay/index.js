import React, { PropTypes } from 'react';
import styles from './styles.scss';

const TimerDisplay = (props) => {
  const perc = `${props.perc}%`;
  const percStyles = {
    width: perc,
  };
  return (
    <div>
      <h2 className={styles.timer}>{props.time}</h2>
      <div className={styles.percbg}>
        <div className={styles.percfilled} style={percStyles}></div>
      </div>
    </div>
  );
};
TimerDisplay.propTypes = {
  time: PropTypes.string.isRequired,
  perc: PropTypes.number,
};

export default TimerDisplay;
