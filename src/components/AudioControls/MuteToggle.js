import React, { PropTypes } from 'react';

import Icon from '../Icon';

const MuteToggle = (props) =>
  <div>
    <button
    onClick={props.onToggleChimeMute}>{props.isMuted ? 'Unmute' : <Icon src="ic_volume_off_24px.svg" alt="myAltText"></Icon>}
    </button>
  </div>;

MuteToggle.propTypes = {
  onToggleChimeMute: PropTypes.func,
  isMuted: PropTypes.bool,
};

export default MuteToggle;
