import React, { Component, PropTypes } from 'react';

export default class TimerInput extends Component {
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
        <input
          id="hours"
          type="number"
          min="0"
          max="24"
          step="1"
          defaultValue="0"
        ></input>
        <label htmlFor="hours">Hours</label>
        <br />
        <input
          id="minutes"
          type="number"
          min="0"
          max="59"
          step="1"
          defaultValue="0"
        ></input>
        <label htmlFor="minutes">Minutes</label>
        <br />
        <input
          id="seconds"
          type="number"
          min="0"
          max="59"
          step="1"
          defaultValue="0"
        ></input>
        <label htmlFor="seconds">Secs</label>
      </div>
    );
  }
}
