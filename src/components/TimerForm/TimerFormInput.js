import React, { PropTypes } from 'react';

const TimerFormInput = ({ id, min, max, step = 1, defaultValue = 0, type = 'number', label }) =>
  <div>
    <input
      id={id}
      type={type}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
    ></input>
    <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
  </div>;
TimerFormInput.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  step: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};
export default TimerFormInput;
