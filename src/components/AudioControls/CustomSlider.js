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
    const { min, max } = this.props;
    const range = max - min;
    this.state = {
      drag: false,
      height: 5,
      value,
      min,
      max,
      range,
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
  updateSliderValue(evt) {
    const { max, min, range } = this.state;
    const xMinusOffset = evt.pageX - this.refs.slider.offsetLeft;
    const totalLength = this.getSliderLength();
    // use 1...
    const percentFromPxLength = (xMinusOffset / totalLength);
    const percent = (range * percentFromPxLength) + min;
    const value = this.calculateMatchingNotch(percentFromPxLength);
    this.setState({
      percent,
      value,
    });
  }
  valueFromPercent(perc) {
    const { range, min } = this.state;
    let val;
    val = (range * perc) + min;
    console.log(`${range} * ${perc} + ${min} = ${val}`);
    return val;
  }
  calculateMatchingNotch(value) {
    console.log('=== notch ===');
    const { step, max, min } = this.state;
    const bar = (((value - min) / step) * step) + min;
    let nearestNotch
    const allValues = [];
    for (let i = min; i <= max; i++) {
      allValues.push(i);
    }
    const matchingNotches = [];
    // find how many entries in allValues are divisible by step (+min,+max)
    for (const s of allValues) {
      if (s === min || s === max || s % step === 0) {
        matchingNotches.push(s);
      }
    }
    for (const n of matchingNotches) {
      console.log(n);
      if (value === n) {
        nearestNotch = n;
      }
    }
    console.log('in:', value, 'out:closest/notch:', nearestNotch);
    return nearestNotch;
  }
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
    // console.table([
    //   { clientWidth: sl.clientWidth },
    //   { offsetTop: sl.offsetTop },
    //   { offsetLeft: sl.offsetLeft },
    // ]);
    return sl.clientWidth;
  }
/*  valueToPx(value) {
    const sliderLength = this.getSliderLength();
    const pxVal = (sliderLength / this.props.max) * value;
    return pxVal;
  }*/
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

