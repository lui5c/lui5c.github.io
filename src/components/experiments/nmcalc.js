import React, { Component } from "react";

var height = 70;
var margin = height / 10;

const style_container = {
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 'auto',
  backgroundColor: '#F3F3F3',
  borderRadius: `${height/2}px`,
  padding: '10px',
  display: 'flex',
  flexFlow: 'row wrap',
  userSelect: 'none',
  boxShadow: '0px 0px 10px 0 lightgray',
  border: '1px solid lightgray',
}

const highlight = '#FAF9F8';
const shadow = '#E7E8E9';
const distance = 4;
const boxShadow = `-${distance}px -${distance}px 10px 0 ${highlight}, 
    ${distance}px ${distance}px 6px 0 ${shadow}`;
const border = `1px solid ${shadow}`;

const style_screen = {
  width: '100%',
  height: `${height}px`,
  margin: `${margin}px`,
  boxShadow: boxShadow,
  borderRadius: '75px',
  textAlign: 'right',
  lineHeight: `${height}px`,
  paddingRight: '30px',
  fontSize: `${height / 2}px`,
  border: border,
  transition: '1s',
}

const style_button = {
  height: `${height}px`,
  width: `${height}px`,
  borderRadius: "100%",
  textAlign: 'center',
  display: 'inline-block',
  fontSize: `${height/2}px`,
  lineHeight: `${height}px`,
  margin: `${margin}px`,
  boxShadow: boxShadow,
  cursor: 'pointer',
  border: border,
}

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() { this.setState({hover: true, }) }
  handleMouseLeave() { this.setState({ hover: false, }) }
  render() {
    return (
      <div
        style={{
          ...style_button,
          backgroundColor: this.state.hover ? shadow : '#F3F3F3',
        }}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        onClick={() => this.props.onClick()}
      >{this.props.display}</div>
      )
  }
}

const small_keys = [
  "c", "%","del", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", ".", "0", "=", "..."
];

const keys_exp = [
  "c", "%", "del", '/', '(', '7', '8', '9', '*', ')', '4', '5', '6', '-', 'ln', '1', '2', '3', '+', '**2', '.', '0', '=', '...', '+/-',
];

class NmCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      keys: small_keys,
      expanded: false,
    };
    this.renderScreen = this.renderScreen.bind(this);
    this.renderKeypad = this.renderKeypad.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  toggleExpanded() {
    this.setState(!this.state.expanded ? {
      keys: keys_exp,
      expanded: !this.state.expanded,
    } : {
      keys: small_keys,
      expanded: !this.state.expanded,
      }
    );
  }
  renderScreen() {
    return (
      <div style={style_screen}>
        {this.state.display.slice(0, 13)}
      </div>
      )
  }
  renderKeypad() {
    var buttons = [];
    var i = 0;
    for (i = 0; i < this.state.keys.length; i++) {
      buttons.push(this.renderButton(i));
    }
    return (buttons)
  }
  renderButton(i) {
    return (
      <Button
        display={this.state.keys[i]}
        onClick={() => this.handleClick(this.state.keys[i])}
        key={this.state.keys[i]}
      />
    )
  }
  handleClick(param) {
    //alert(param);
    if (param === '...') {
      this.toggleExpanded();
    }
    else if (param === 'del') {
      this.setState({
        display: this.state.display.slice(0, -1),
      })
    }
    else if (param === '=') {
      var set = '0';
      try {
        set = eval(this.state.display).toString();
      } catch (error) {
        set = "err";
      }
      this.setState({
        display: set,
      })
    }
    else if (param === 'c') {
      this.setState({
        display: "",
      })
    }
    else if (param === "%") {
      this.setState({
        display: eval(this.state.display / 100).toString(),
      })
    }
    else {
      this.setState({
        display: this.state.display + param,
      });
    }
  }
  render()  {
    var width = this.state.expanded ? `${40 + (height + margin + 2) * 5}px` : `${30 + (height + margin + 2) * 4}px`;
    return (
      <div
        style={{
            width: width,
          ...style_container,
          float: 'right',
            margin: '0px 0px 40px 30px',
        }}
      >
        {this.renderScreen()}
        {this.renderKeypad()}
      </div>
      )
  }
}

export default NmCalc