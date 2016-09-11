/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';

import CustomSliderThumb from './CustomSliderThumb';
import CustomSliderTrack from './CustomSliderTrack';

import styles from './CustomSlider.scss';

export default class CustomSlider extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
  }
  constructor(props) {
    super(props);
    const value = (this.props.value !== undefined ? this.props.value : this.props.defaultValue);
    const { min, max, step } = this.props;
    const range = max - min;
    this.state = {
      drag: false,
      height: 5,
      value,
      min,
      max,
      range,
      step,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }
  onMouseDown(evt) {
    const leftMouseButton = 0;
    if (evt.button !== leftMouseButton) return;
    this.updateSliderValue(evt);
    this.setState({
      drag: true,
    });
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    evt.preventDefault();
  }
  /*
  take evt.pageX
  get slider percentage from that
  update state with percentage
  maybe update state with the actual value
  */
  updateSliderValue(evt) {
    // const xMinusOffset = evt.pageX - this.refs.slider.offsetLeft;
    const x = evt.pageX;
    const totalLength = this.getSliderLength();
    const percent = +(x / totalLength).toFixed(2);
    // const value = this.calculateMatchingNotch(percent);
    const value = this.valueFromPercent(percent);
    // work out where best to use the matching notch - probably in this method
    console.log(this.calculateMatchingNotch(value));
    this.setState({
      percent,
      value,
    });
  }
  /*
  convert percentage -> value if needed
  return the value
  */
  valueFromPercent(perc) {
    const { range, min } = this.state;
    const val = (range * perc) + min;
    console.log(`${range} * ${perc} + ${min} = ${val}`);
    return val;
  }
  /*
    take a float/decimal value
    work out where the step notches would be
    calculate which is the nearest notch for the value
    return .. the notch?
  */
  calculateMatchingNotch(value) {
    const { step, max, min } = this.state;
    let match;
    const values = [];
    for (let i = min; i <= max; i++) {
      values.push(i);
    }
    const notches = [];
    // find how many entries in values are divisible by step (+min,+max)
    for (const s of values) {
      if (s === min || s === max || s % step === 0) {
        notches.push(s);
      }
    }
    match = notches.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    console.log('in:', value, 'out:closest/notch:', match);
    return match;
  }
  /*
    value clamping to be revisited as a later step
  */
  clampValue(val, min = this.props.min, max = this.props.max) {
    let value = val;
    if (val > max) {
      value = max;
    } else if (val < min) {
      value = min;
    }
    return value;
  }
  mouseUp() {
    this.setState({
      drag: false,
    });
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  }
  mouseMove(evt) {
    if (!this.state.drag) return;
    this.updateSliderValue(evt);
  }
  getSliderLength() {
    const sl = this.refs.slider;
    // console.table([{ clientWidth: sl.clientWidth, offsetTop: sl.offsetTop, offsetLeft: sl.offsetLeft }]);
    return sl.clientWidth;
  }
  render() {
    return (
      <div
        ref="slider"
        className={styles.slider}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
      >
        <CustomSliderTrack className={styles.track} trackLength={this.state.value * 100} />
        <CustomSliderThumb
          thumbPosition={this.state.value * 100} height={this.state.height}
        />
      </div>
    );
  }
}

