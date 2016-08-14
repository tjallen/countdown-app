import React from 'react';

const TimerControls = (props) =>
  <div>
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
