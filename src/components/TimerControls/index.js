import React, { PropTypes } from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';
import styles from './TimerControls.scss';

const TimerControls = ({
  onTimerPause,
  onTimerStart,
  onTimerRestart,
  onTimerClear,
  stopped,
  playing,
  totalTime,
  completed,
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
    <div className={styles.timercontrols}>
      <div className={styles.playcontainer}>
        {!stopped &&
          <TimerButton
            action={onTimerClear}
            glyph={clear}
            title="Clear timer"
          />
        }
        {!completed && playOrPause}
        {!stopped &&
          <TimerButton
            action={() => onTimerRestart(totalTime)}
            glyph={restart}
            title="Restart timer"
          />
        }
      </div>
    </div>
  );
};
TimerControls.propTypes = {
  onTimerClear: PropTypes.func,
  onTimerPause: PropTypes.func,
  onTimerStart: PropTypes.func,
  onTimerRestart: PropTypes.func,
  playing: PropTypes.bool,
  stopped: PropTypes.bool,
  completed: PropTypes.bool,
  totalTime: PropTypes.number,
};

export default TimerControls;
