import React, { PropTypes } from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';

const TimerControls = (props) => {
  const {
    onTimerPause, onTimerStart, onTimerClear, onTimerRestart, stopped, playing, totalSeconds,
  } = props;
  let playOrPause;
  let clearButton;
  let restartButton;
  if (totalSeconds > 0) {
    if (playing) {
      playOrPause = <TimerButton action={onTimerPause} glyph={pause} />;
    } else {
      playOrPause = <TimerButton action={onTimerStart} glyph={play} />;
    }
  }
  if (!stopped) {
    clearButton = <TimerButton action={onTimerClear} glyph={clear} />;
    restartButton = <TimerButton action={onTimerRestart} glyph={restart} />;
  }
  return (
    <div>
      {clearButton}
      {playOrPause}
      {restartButton}
    </div>
  );
};
TimerControls.propTypes = {
  onTimerStart: PropTypes.func,
  onTimerPause: PropTypes.func,
  onTimerClear: PropTypes.func,
  onTimerRestart: PropTypes.func,
  stopped: PropTypes.bool,
  playing: PropTypes.bool,
  totalSeconds: PropTypes.number,
};

export default TimerControls;
