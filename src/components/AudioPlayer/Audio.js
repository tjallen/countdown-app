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
    console.log(this.audioElement);
    this.audioElement.load();
    this.audioElement.addEventListener("loadeddata",console.log("DEBUG (loadeddata version): Audio Duration: " + this.audioElement.duration));
  }
  onLoadedData() {
    const dura = this.audioElement.duration;
    console.log('DEBUG, old', dura);
  }
  getDuration() {
    this.audioElement.load();
    const duration = this.audioElement.duration;
    console.log(duration);
    this.setState({
      duration,
    });
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
