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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
    const hours = this.state.hours;
    const minutes = this.state.minutes;
    console.log(`TI updated. hours: ${hours} minutes: ${minutes}`);
  }
  // handle change of input fields & update local state
  handleChange(evt) {
    let inputValue = parseInt(evt.target.value, 10);
    // if field cleared we reset to 0
    if (isNaN(inputValue)) {
      inputValue = 0;
    }
    switch (evt.target.id) {
      case 'minutes': {
        this.setState({
          minutes: inputValue,
        });
        break;
      }
      case 'hours': {
        this.setState({
          hours: inputValue,
        });
        break;
      }
      default:
      // nothing
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateTime(this.state.hours, this.state.minutes);
  }
  render() {
    return (
      <div onChange={this.handleChange}>
        <form onSubmit={this.handleSubmit}>
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
          <input type="submit" value="Start" />
        </form>
      </div>
    );
  }
}
