/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import CustomSliderThumb from './CustomSliderThumb';
import CustomSliderTrack from './CustomSliderTrack';

import styles from './CustomSlider.scss';

export default class CustomSlider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.number,
  }
  constructor(props) {
    super(props);
    const value = (props.value !== undefined ? props.value : props.defaultValue);
    this.state = {
      drag: false,
      height: 5,
      value,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    // this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseDown(evt) {
    // console.log('mouseDwn', evt.currentTarget);
    const leftMouseButton = 0;
    if (evt.button !== leftMouseButton) return;
    const x = evt.pageX;
    this.setState({
      drag: true,
    });
    this.updateValue(x);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    // console.log(evt.pageX, evt.target.offsetLeft, 'onMouseDown', x);
    evt.preventDefault();
  }
/*  onMouseLeave(evt) {
    // console.log('mouseLv', evt.target);
  }*/
  mouseUp(evt) {
    // console.log('mouseUp', evt.target);
    this.setState({
      drag: false,
    });
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  }
  mouseMove(evt) {
    const x = evt.pageX;
    if (!this.state.drag) return;
    // console.log();
    this.updateValue(x);
  }
  checkWithinBounds(val) {
    let checkedVal = val;
    if (val < this.props.min) {
      checkedVal = this.props.min;
    } else if (val > this.props.max) {
      checkedVal = this.props.max;
    }
    console.log('val checked', val, 'resolved to', checkedVal);
    return checkedVal;
  }
  updateValue(value) {
    console.log('updateValue', value);
    const checkedValue = this.checkWithinBounds(value);
    this.setState({
      value: value,
    });
  }
  getSliderLength() {
    const sl = this.refs.slider;
    return sl.clientWidth;
  }
  valueToPx(value) {
    const sliderLength = this.getSliderLength();
    const pxVal = (sliderLength / this.props.max) * value;
    return pxVal;
  }
  pxToValue() {
    console.log('pxToValue');
  }
/*  handleChange() {
    console.log('slider changes, send to parent plz');
  }*/
  render() {
    return (
      <div
        ref="slider"
        className={styles.slider}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
      >
        <CustomSliderTrack className={styles.track} trackLength={this.state.value} />
        <CustomSliderThumb
          thumbPosition={this.state.value} height={this.state.height}
        />
      </div>
    );
  }
}

