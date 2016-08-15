import React from 'react';
import styles from './styles.scss';

const TimerDisplay = (props) =>
  <div><h2 className={styles.timer}>{props.time}</h2></div>;
export default TimerDisplay;
