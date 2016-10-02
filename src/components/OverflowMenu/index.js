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
  }
  toggleMenu(e) {
    const menuOpen = !this.state.menuOpen;
    e.preventDefault();
    this.setState({
      menuOpen,
    });
    console.log('oepn menu');
  }
  render() {
    const { children } = this.props;
    const wrapperStyle = {
      position: 'relative',
      border: '1px solid orange',
    };
    const kebabStyle = {
      display: 'inline-block',
      float: 'right',
      fill: '#fff',
    };
    const menuStyle = {
      backgroundColor: '#242424',
      textAlign: 'left',
      position: 'absolute',
      top: '15px',
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
      margin: '0 0 5px 0',
      // backgroundColor: 'blue',
    };
    return (
      <div style={wrapperStyle}>
        <a onClick={this.toggleMenu} style={kebabStyle}><Icon glyph={kebab} /></a>
        <div style={menuStyle}>
          <ul style={listStyle}>
            {children.map((child) => <li style={itemStyle}>{child}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
