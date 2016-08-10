import React, { Component } from 'react';

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.path = `../../icons/${this.props.src}`;
  }
  render() {
    return (
      <div>
        <img src={this.path} alt={this.props.alt}></img>
      </div>
    );
  }
}
