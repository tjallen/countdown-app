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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.menuShow = this.menuShow.bind(this);
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
  // menuShow() {
  //   console.log('Menu show');
  //   this.setState({ menuOpen: true });
  // }
  menuHide() {
    this.setState({
      menuOpen: false,
    });
  }
  handleKeyDown(e) {
    if (e.keyCode === 27) this.menuHide();
  }
  render() {
    const { children } = this.props;
    const wrapperStyle = {
      position: 'relative',
      float: 'right',
      marginTop: '3px',
    };
    const toggleStyle = {
      display: 'inline-block',
      float: 'right',
      fill: '#fff',
      cursor: 'pointer',
    };
    const menuStyle = {
      backgroundColor: '#fff',
      boxShadow: '4px 8px 4px rgba(25, 25, 25, 0.2)',
      border: '1px solid grey',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
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
      padding: '0 10px',
    };
    const itemStyle = {
      listStyleType: 'none',
      width: 'auto',
      display: 'block',
      clear: 'both',
      whiteSpace: 'nowrap',
      margin: '8px 0',
      padding: '6px 20px',
      cursor: 'pointer',
      lineHeight: '20px',
    };
    return (
      <div
        onKeyDown={this.handleKeyDown}
        onBlur={this.menuHide}
        style={wrapperStyle}
        tabIndex="1"
      >
        <a onClick={this.menuToggle} style={toggleStyle}><Icon glyph={kebab} /></a>
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
