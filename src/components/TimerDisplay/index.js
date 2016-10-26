import React, { Component, PropTypes } from 'react';

import styles from './TimerDisplay.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import TimerButton from '../TimerButton';
import ProgressIndicator from './ProgressIndicator';

export default class TimerDisplay extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
    perc: PropTypes.number,
    paused: PropTypes.bool,
    label: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.beginEdit = this.beginEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.plusOneMinute = this.plusOneMinute.bind(this);
    this.state = {
      label: 'label',
      editing: false,
    };
  }
  onChange(e) {
    const label = e.target.value;
    this.setState({
      label,
    });
  }
  beginEdit() {
    this.setState({ editing: true });
  }
  finishEdit() {
    this.setState({ editing: false });
  }
  plusOneMinute() {
    console.log('plusOneMinute()');
    // this.props.updateTime(currentTime + 1min);
  }
  render() {
    const { paused, perc, time } = this.props;
    const { label, editing } = this.state;
    let className = cx({
      timer: true,
      paused,
    });
    const labelWrap = {
      padding: '0px',
      margin: '0 0 5px 0',
      borderBottom: '2px solid transparent',
      transition: 'all .25s ease-out',
      minWidth: '105px',
    };
    const labelWrapEditing = {
      padding: '0px 0px 4px 0px',
      margin: '0 0 5px 0',
      borderBottom: '2px solid #FF5252',
      transition: 'all .25s ease-in',
      minWidth: '105px',
    };
    const labelDisplay = <span className={styles.title} onClick={this.beginEdit}>{label}</span>;
    const labelForm =
      <input autoFocus className={styles.input} type="text" value={label} onChange={this.onChange} onBlur={this.finishEdit}></input>;
    return (
      <div>
        <ProgressIndicator
          perc={perc}
        />
        <div className={styles.timewrap}>
          <div className={styles.timewrapinner}>
            <div className={styles.clockface}>
              {!editing
                ? <div style={labelWrap}>{labelDisplay}</div>
                : <div style={labelWrapEditing}>{labelForm}</div>
              }
              <h2 className={className}>{time}</h2>
              <TimerButton
                text="+1"
                title="Add one minute"
                action={this.plusOneMinute}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

