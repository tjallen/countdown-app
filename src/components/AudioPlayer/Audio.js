import React, { Component, PropTypes } from 'react';

import beep from './files/beep.mp3';

export default class Audio extends Component {
  static propTypes = {
    src: PropTypes.string,
    type: PropTypes.string,
  }
  constructor() {
    super();
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <audio
          ref={(c) => (this.audioElement = c)}
          preload
        >
          html5 <code>audio</code> element not supported by your browser, dayum.
          <source src={beep} type={this.props.type}>
          </source>
        </audio>
      </div>
    );
  }
}
