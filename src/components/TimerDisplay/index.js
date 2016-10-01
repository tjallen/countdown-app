import React, { Component, PropTypes } from 'react';

import styles from './TimerDisplay.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import ProgressIndicator from './ProgressIndicator';

export default class TimerDisplay extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
    perc: PropTypes.number,
    paused: PropTypes.bool,
  }
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.beginEdit = this.beginEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.state = {
      label: 'Label',
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
  render() {
    const { paused, perc, time } = this.props;
    const { label, editing } = this.state;
    let className = cx({
      timer: true,
      paused,
    });
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
              {!editing ? labelDisplay : labelForm}
              <h2 className={className}>{time}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

