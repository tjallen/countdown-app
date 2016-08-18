import React, { PropTypes } from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';

const TimerControls = (props) => {
  let playOrPause;
  if (props.isPlaying) {
    playOrPause = <TimerButton action={props.onTimerPause} glyph={pause} />;
  } else {
    playOrPause = <TimerButton action={props.onTimerStart} glyph={play} />;
  }
  return (
    <div>
      <TimerButton
        action={props.onTimerClear}
        glyph={clear}
      />
      {playOrPause}
      <TimerButton
        action={props.onTimerRestart}
        glyph={restart}
      />
      <button
        onClick={props.onTimerClear}
        disabled={props.isStopped}
      >Clear</button>
      <button
        onClick={props.onTimerRestart}
        disabled={props.isStopped}
      >Restart</button>
    </div>
  );
};
TimerControls.propTypes = {
  onTimerStart: PropTypes.func,
  onTimerPause: PropTypes.func,
  onTimerClear: PropTypes.func,
  onTimerRestart: PropTypes.func,
  isStopped: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isPaused: PropTypes.bool,
};

export default TimerControls;
