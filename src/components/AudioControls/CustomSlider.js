/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';

import CustomSliderThumb from './CustomSliderThumb';
import CustomSliderTrack from './CustomSliderTrack';

import styles from './CustomSlider.scss';

export default class CustomSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
      value: this.props.defaultValue,
      height: 5,
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
    console.log('val to check:', val);
    let checkedVal = val;
    if (val < this.props.min) {
      checkedVal = this.props.min;
    } else if (val > this.props.max) {
      checkedVal = this.props.max;
    }
    console.log('checked', checkedVal);
    return checkedVal;
  }
  updateValue(value) {
    const checkedValue = this.checkWithinBounds(value);
    this.setState({
      value: checkedValue,
    });
  }
/*  handleChange() {
    console.log('slider changes, send to parent plz');
  }*/
  render() {
    const sliderStyle = {
    };
    return (
      <div
        className={styles.slider}
        onMouseDown={this.onMouseDown}
        style={sliderStyle}
        onMouseLeave={this.onMouseLeave}
      >
        <CustomSliderTrack className={styles.track} width={this.state.value} />
        <CustomSliderThumb thumbX={this.state.value} height={this.state.height} />
      </div>
    );
  }
}

