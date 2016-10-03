import React, { Component, PropTypes } from 'react';

import kebab from '../../icons/ic_more_vert_24px.svg';
import Icon from '../Icon';

export default class OverflowMenu extends Component {
  static propTypes = {
    children: PropTypes.array,
  };
  static childContextTypes = {
    menuHide: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.menuToggle = this.menuToggle.bind(this);
    this.menuHide = this.menuHide.bind(this);
    this.menuItemClick = this.menuItemClick.bind(this);
    this.menuShow = this.menuShow.bind(this);
  }
  getChildContext() {
    return { menuHide: this.menuHide };
  }
  menuToggle(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  }
  menuShow() {
    this.setState({ menuOpen: true });
  }
  menuHide() {
    this.setState({
      menuOpen: false,
    });
  }
  menuItemClick(child) {
    console.log('menu item clicked', child.props);
    this.menuHide();
  }
  render() {
    const { children } = this.props;
    const wrapperStyle = {
      position: 'relative',
      float: 'right',
    };
    const toggleStyle = {
      display: 'inline-block',
      float: 'right',
      fill: '#fff',
      cursor: 'pointer',
    };
    const menuStyle = {
      backgroundColor: '#fff',
      color: '#242424',
      fontSize: '1.2rem',
      borderRadius: '2px',
      textAlign: 'left',
      position: 'absolute',
      top: '16px',
      right: '0px',
      listStyle: 'none',
      margin: '5px',
      padding: '10px',
    };
    const listStyle = {
      width: 'auto',
      // backgroundColor: 'red',
    };
    const itemStyle = {
      listStyleType: 'none',
      width: 'auto',
      display: 'block',
      clear: 'both',
      whiteSpace: 'nowrap',
      margin: '8px 0',
      padding: '0 5px',
      // backgroundColor: 'blue',
    };
    return (
      <div style={wrapperStyle} tabIndex="1" onBlur={this.menuHide}>
        <a onClick={this.menuToggle} style={toggleStyle}><Icon glyph={kebab} /></a>
      {/* <div style={wrapperStyle}>
        <a onClick={this.menuShow} style={toggleStyle}><Icon glyph={kebab} /></a> */}
        {this.state.menuOpen &&
          <div style={menuStyle}>
            <ul style={listStyle}>
              {children.map((child, index) => <li key={index} style={itemStyle}>{child}</li>)}
            </ul>
          </div>
        }
      </div>
    );
  }
}
