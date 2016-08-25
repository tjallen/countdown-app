import React, { PropTypes } from 'react';

import Icon from '../Icon';
import mute from '../../icons/ic_volume_up_24px.svg';
import unMute from '../../icons/ic_volume_off_24px.svg';

const MuteToggle = (props) =>
  <div>
    <button
      onClick={props.onToggleChimeMute}
      title="Toggle mute"
    >
      {props.isMuted ? <Icon glyph={unMute} /> : <Icon glyph={mute} />}
    </button>
  </div>;

MuteToggle.propTypes = {
  onToggleChimeMute: PropTypes.func,
  isMuted: PropTypes.bool,
};

export default MuteToggle;
