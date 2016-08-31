import React, { PropTypes } from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';
import loop from '../../icons/ic_loop_24px.svg';

const TimerControls = ({
  onTimerPause, onTimerStart, onTimerClear, stopped, playing, totalTime, toggleLoop,
}) => {
  let playOrPause;
  let clearButton;
  let restartButton;
  let loopToggle;
  if (totalTime > 0) {
    if (playing) {
      playOrPause = <TimerButton action={onTimerPause} glyph={pause} title="Pause" />;
    } else {
      playOrPause = <TimerButton action={onTimerStart} glyph={play} title="Play" />;
    }
  }
  if (!stopped) {
    clearButton = <TimerButton action={onTimerClear} glyph={clear} title="Clear timer" />;
    restartButton =
      <TimerButton action={() => onTimerStart(totalTime)} glyph={restart} title="Restart timer" />;
    loopToggle = <TimerButton action={toggleLoop} glyph={loop} title="Toggle timer loop" />;
  }
  return (
    <div className="TimerControls">
      {playOrPause}
      <br />
      {clearButton}
      {restartButton}
      {loopToggle}
    </div>
  );
};
TimerControls.propTypes = {
  onTimerClear: PropTypes.func,
  onTimerPause: PropTypes.func,
  onTimerStart: PropTypes.func,
  toggleLoop: PropTypes.func,
  playing: PropTypes.bool,
  stopped: PropTypes.bool,
  totalTime: PropTypes.number,
};

export default TimerControls;
