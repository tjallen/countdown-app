import React, { Component, PropTypes } from 'react';

import kebab from '../../icons/ic_more_vert_24px.svg';
import Icon from '../Icon';

export default class OverflowMenu extends Component {
  static propTypes = {
    children: PropTypes.array,
  };
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  toggleMenu(e) {
    const menuOpen = !this.state.menuOpen;
    e.preventDefault();
    this.setState({
      menuOpen,
    });
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
      <div style={wrapperStyle}>
        <a onClick={this.toggleMenu} style={toggleStyle}><Icon glyph={kebab} /></a>
        {this.state.menuOpen &&
        <div style={menuStyle}>
          <ul style={listStyle}>
            {children.map((child) => <li style={itemStyle}>{child}</li>)}
          </ul>
        </div>
      }
      </div>
    );
  }
}
