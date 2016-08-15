import React from 'react';

import TimerButton from '../TimerButton';
import play from '../../icons/ic_play_arrow_24px.svg';
import pause from '../../icons/ic_pause_24px.svg';
import clear from '../../icons/ic_delete_24px.svg';
import restart from '../../icons/ic_replay_24px.svg';

const TimerControls = (props) =>
  <div>
    <TimerButton
      action={props.onTimerStart}
      glyph={play}
    />
    <TimerButton
      action={props.onTimerPause}
      glyph={pause}
    />
    <TimerButton
      action={props.onTimerClear}
      glyph={clear}
    />
    <TimerButton
      action={props.onTimerRestart}
      glyph={restart}
    />
    <button
      onClick={props.onTimerStart}
      disabled={props.isPlaying}
    >{props.startButtonText}</button>
    <button
      onClick={props.onTimerPause}
      disabled={props.isPaused || props.isStopped}
    >Pause</button>
    <button
      onClick={props.onTimerClear}
      disabled={props.isStopped}
    >Clear</button>
    <button
      onClick={props.onTimerRestart}
      disabled={props.isStopped}
    >Restart</button>
  </div>;
export default TimerControls;
