import React, { PropTypes } from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';

const TimerControls = ({
  onTimerPause, onTimerStart, onTimerClear, onTimerRestart, stopped, playing, totalTime,
}) => {
  let playOrPause;
  let clearButton;
  let restartButton;
  if (totalTime > 0) {
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
  onTimerClear: PropTypes.func,
  onTimerPause: PropTypes.func,
  onTimerRestart: PropTypes.func,
  onTimerStart: PropTypes.func,
  playing: PropTypes.bool,
  stopped: PropTypes.bool,
  totalTime: PropTypes.number,
};

export default TimerControls;
