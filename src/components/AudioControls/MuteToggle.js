import React, { PropTypes } from 'react';

const MuteToggle = (props) =>
  <div>
    <button onClick={props.onToggleChimeMute}>{props.isMuted ? 'Unmute' : 'Mute'}</button>
  </div>;

MuteToggle.propTypes = {
  onToggleChimeMute: PropTypes.func,
  isMuted: PropTypes.bool,
};

export default MuteToggle;
