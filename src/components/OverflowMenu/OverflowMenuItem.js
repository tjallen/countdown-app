import React, { Component, PropTypes } from 'react';

import Icon from '../Icon';

import inactiveIcon from '../../icons/ic_check_box_outline_blank_black_24px.svg';
import activeIcon from '../../icons/ic_check_box_black_24px.svg';

export default class OverflowMenuItem extends Component {
  static contextTypes = {
    menuHide: PropTypes.func,
    myContext: PropTypes.string,
  };
  static propTypes = {
    onClick: PropTypes.func,
    preventMenuHide: PropTypes.bool,
    active: PropTypes.bool,
    toggle: PropTypes.bool,
    children: PropTypes.node,
  };
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const { onClick, preventMenuHide } = this.props;
    if (typeof onClick === 'function') onClick();
    // if (preventMenuHide) return;
    // this.context.menuHide();
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    const { children, active, toggle } = this.props;
    let status;
    const itemStyle = {
      position: 'relative',
    };
    const iconWrapper = {
      position: 'absolute',
      left: '-26px',
      top: '-1px',
      fill: '#FF5252',
    };
    if (toggle) {
      if (active) {
        status = <Icon glyph={activeIcon} width={16} height={16} />;
      } else {
        status = <Icon glyph={inactiveIcon} width={16} height={16} />;
      }
    }
    return (
      <div>
        <span style={itemStyle} onMouseDown={this.handleClick}>
          <div style={iconWrapper}>{status}</div>
          {children}
        </span>
      </div>
    );
  }
}
