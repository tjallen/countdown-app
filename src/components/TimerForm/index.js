/* eslint-disable no-param-reassign */

import React, { Component, PropTypes } from 'react';

import TimerFormInput from './TimerFormInput';

export default class TimerForm extends Component {
  static propTypes = {
    updateTime: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // handle change of input fields & update local state
  handleChange(evt) {
    const type = evt.target.id;
    let inputValue = parseInt(evt.target.value, 10);
    const max = parseInt(evt.target.max, 10);
    /*
    if max broken with keypresses, revert to max value
    breaks eslint rule: http://eslint.org/docs/rules/no-param-reassign
    but will do for now
    */
    if (inputValue > max) {
      evt.target.value = max;
    }
    // if field cleared we reset to 0
    if (isNaN(inputValue)) {
      inputValue = 0;
    }
    // dynamically setState using ES6 computed property name
    this.setState({
      [type]: inputValue,
    }, this.changeCallback);
  }
  changeCallback() {
    this.props.updateTime(this.state.hours, this.state.minutes, this.state.seconds);
  }
  render() {
    return (
      <div onChange={this.handleChange}>
        <TimerFormInput
          id="hours"
          type="number"
          min={0}
          max={24}
        />
        <TimerFormInput
          id="minutes"
          type="number"
          min={0}
          max={59}
        />
        <TimerFormInput
          id="seconds"
          type="number"
          min={0}
          max={59}
        />
      </div>
    );
  }
}
