import React, { PropTypes } from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';
import loop from '../../icons/ic_loop_24px.svg';

const TimerControls = ({
  onTimerPause, onTimerStart, onTimerClear, stopped, playing, totalTime, toggleLoop, looping,
}) => {
  let playOrPause;
  if (totalTime > 0) {
    if (playing) {
      playOrPause = <TimerButton action={onTimerPause} glyph={pause} title="Pause" type="pause" />;
    } else {
      playOrPause = <TimerButton action={onTimerStart} glyph={play} title="Play" type="play" />;
    }
  }
  return (
    <div className="timercontrols">
      {playOrPause}
      {!stopped &&
        <div>
          <TimerButton
            action={onTimerClear}
            glyph={clear}
            title="Clear timer"
          />
          <TimerButton
            action={() => onTimerStart(totalTime)}
            glyph={restart}
            title="Restart timer"
          />
          <TimerButton
            action={toggleLoop}
            glyph={loop}
            title="Toggle timer loop"
            type="toggle"
            active={looping}
          />
        </div>
    }
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
  looping: PropTypes.bool,
  totalTime: PropTypes.number,
};

export default TimerControls;
