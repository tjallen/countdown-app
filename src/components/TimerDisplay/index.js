import React, { PropTypes } from 'react';
import styles from './styles.scss';

const TimerDisplay = (props) =>
  <div><h2 className={styles.timer}>{props.time}</h2></div>;
TimerDisplay.propTypes = {
  time: PropTypes.string.isRequired,
};

export default TimerDisplay;
