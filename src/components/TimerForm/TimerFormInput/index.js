import React, { PropTypes } from 'react';
import styles from './TimerFormInput.scss';

const TimerFormInput = ({
  id,
  min,
  max,
  step = 1,
  defaultValue = 0,
  type = 'number',
  label,
}) =>
  <div>
    <label htmlFor={id} className={styles.label}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
    <input
      className={styles.input}
      id={id}
      type={type}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
    ></input>
  </div>;
TimerFormInput.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};
export default TimerFormInput;
