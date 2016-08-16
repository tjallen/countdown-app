import React, { Component } from 'react';

export default class TimerInput extends Component {
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.onChange = this.onChange.bind(this);
  }
  // handle change of input fields & update local state
  onChange(evt) {
    let inputValue = parseInt(evt.target.value, 10);
    // if field cleared we reset to 0
    if (isNaN(inputValue)) {
      inputValue = 0;
    }
    switch (evt.target.id) {
      case 'seconds': {
        this.setState({
          seconds: inputValue,
        });
        break;
      }
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
  render() {
    return (
      <div>
        <label htmlFor="hours">H</label>
        <input onChange={this.onChange} id="hours" type="number" min="0" max="99" step="1" defaultValue="0"></input>
        <label htmlFor="minutes">M</label>
        <input onChange={this.onChange} id="minutes" type="number" min="0" max="99" step="1" defaultValue="0"></input>
        <label htmlFor="seconds">S</label>
        <input onChange={this.onChange} id="seconds" type="number" min="0" max="99" step="1" defaultValue="0"></input>
      </div>
    );
  }
}
