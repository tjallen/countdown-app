import React, { Component, PropTypes } from 'react';

export default class OverflowMenuItem extends Component {
  static contextTypes = {
    menuHide: PropTypes.func,
    myContext: PropTypes.string,
  };
  static propTypes = {
    onClick: PropTypes.func,
    preventMenuHide: PropTypes.bool,
    children: PropTypes.node,
  };
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { onClick, preventMenuHide } = this.props;
    if (typeof onClick === 'function') onClick();
    if (preventMenuHide) return;
    this.context.menuHide();
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <span onClick={this.handleClick}>
          {children}
        </span>
      </div>
    );
  }
}
