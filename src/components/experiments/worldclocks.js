import React, { Component } from "react";
import './worldclocks.scss';

class Hand extends Component {
  getStyle(amt) {
    var style = {
      transform: `rotate(${amt * 360}deg)`,
        }
    return style;
  }
  render(){
    return (<div
      style={this.getStyle(this.props.amount)}
      className={`${this.props.type} hand`}
    ></ div>) 
    }
}

class Clock extends Component {
  //pass in a timezone OR '+'
  constructor(props) {
    super(props);
    let hours, minutes, seconds = -1;
    // set hours,min,sec if necessary
    if (this.props.type !== "+") {
      hours = this.props.type[0];
      minutes = this.props.type[1];
      seconds = this.props.type[2];
    }
    this.state = {
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
      type: this.props.type,
      mouseRotationDeg: 0,
      transition: 'smooth',
      //handCodes: (0, +) (1, hour) (2, minute) (3, second)
      handCode: this.props.type === '+' ? 0 : 4,
      //style
      style: {
        transform: 'scale(0,0)',
      }
    };
    this.updateTime = this.updateTime.bind(this);
    this.renderClock = this.renderClock.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };
  componentDidMount() {
    //execute cute size expand
    setTimeout(() => this.setState({
      style: {
        transform: 'scale(1,1)',
      }
    }), 100);
    if (this.props.type !== "+")
      setInterval(this.updateTime, 1000);
  }
  updateTime() {
    this.setState({
      time: {
        seconds: this.state.time.seconds + 1,
        minutes: this.state.time.minutes,
        hours: this.state.time.hours,
      }
    });
    if (this.state.time.seconds % 60 === 0) {
      this.setState({
        time: {
          seconds: this.state.time.seconds, 
          minutes: this.state.time.minutes + 1,
          hours: this.state.time.hours,
        }
      });
    }
    if (this.state.time.minutes % 60 === 0 && this.state.time.seconds % 60 === 0) {
      this.setState({
        time: {
          seconds: this.state.time.seconds,
          minutes: this.state.time.minutes,
          hours: this.state.time.hours + 1,
        }
      });
    }
  }
  renderClock() {
    return (
      <div
        className={'clock'}
        onClick={() => {
          this.setState({
            transition: 'long',
          });
          this.handleClick();
          setTimeout(() => {
            this.setState({
              transition: 'smooth',
            });
          }, 1000);
        }}
      >
        <Hand type={`hour ${this.state.transition}-transition`} amount={
          this.state.time.hours / 12 + ((this.state.time.minutes / 60) * 1/12)  } />
        <Hand type={`minute ${this.state.transition}-transition`} amount={(Number(this.state.time.minutes) / 60)} />
        <Hand type={`second ${this.state.transition}-transition`} amount={(Number(this.state.time.seconds) / 60)} />
        <div className={'pin'}></div>
      </div>
      )
  }
  handleClick() {
    if (this.state.handCode === 0) {
      //change to choosing hour
      this.setState({
        handCode: this.state.handCode + 1,
      })
    }
    else if (this.state.handCode === 1) {
      let hours = Math.floor(12 * this.state.mouseRotationDeg / 360);
      this.setState({
        time: {
          seconds: this.state.time.seconds,
          minutes: this.state.time.minutes,
          hours: hours,
        },
        //change to choosing minute
        handCode: this.state.handCode + 1,
      })
    }
    else if (this.state.handCode === 2) {
      //change to choosing second
      let minutes = Math.floor(60 * this.state.mouseRotationDeg / 360);
      this.setState({
        time: {
          seconds: this.state.time.seconds,
          minutes: minutes,
          hours: this.state.time.hours,
        },
        handCode: this.state.handCode + 1,
      })
    }
    else if (this.state.handCode === 3) {
      // change to set clock
      let seconds = Math.floor(60 * this.state.mouseRotationDeg / 360);
      this.setState({
        time: {
          seconds: seconds,
          minutes: this.state.time.minutes,
          hours: this.state.time.hours,
        },
        handCode: this.state.handCode + 1,
      });
      this.setState({
        type: [this.state.time.hours, this.state.time.minutes, seconds],
        transition: 'none',
      });
      this.props.sendChanges(this.state.time);
      setInterval(this.updateTime, 1000);
      setTimeout(() => {
        this.setState({
          transition: 'smooth',
        });
      }, 1000);
    }
    else {
      this.setState({
        time: {
          seconds: this.state.time.seconds + 60,
          minutes: this.state.time.minutes + 60,
          hours: this.state.time.hours + 11,
        },
      });
    }
  }
  renderMenu() {
    //feed each hand a decimal from 0 to 1
    return (
      <div itemID="tempclock"
        className={"clock plus"}
        onMouseMove={(event) => {
          //the width of the bubble is 150px
          let x = event.nativeEvent.layerX - 75;
          let y = 75 - event.nativeEvent.layerY;
          let theta = x < 0 ? 180 + Math.atan(y / x) * 180 / Math.PI : Math.atan(y / x) * 180 / Math.PI;
          this.setState({ mouseRotationDeg: 90 - theta, })
        }}
        onClick={() => { this.handleClick() }}
        style={this.state.style}
      >
        {this.state.handCode === 0 ? '+' : <div className={'pin'}></div>}
        <Hand
          type={`hour ${this.state.handCode < 1 ? 'hidden' : 'visible'}`}
          amount={this.state.handCode === 1 ? this.state.mouseRotationDeg / 360 : this.state.time.hours / 12}
        />
        <Hand
          type={`minute ${this.state.handCode < 2 ? 'hidden' : 'visible'}`}
          amount={this.state.handCode === 2 ? this.state.mouseRotationDeg / 360 : this.state.time.minutes / 60}
        />
        <Hand
          type={`second ${this.state.handCode < 3 ? 'hidden' : 'visible'}`}
          amount={this.state.handCode === 3 ? this.state.mouseRotationDeg / 360 : this.state.time.seconds / 60}
        />
      </div>
      )
  }
  render() {
    return (this.state.type === '+') ? this.renderMenu() : this.renderClock();
  }
}

class WorldClocks extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      clocks: [[date.getHours() % 12, date.getMinutes(), date.getSeconds()],],
    }
    this.renderContainer = this.renderContainer.bind(this);
    this.addNewClock = this.addNewClock.bind(this);
  }
  addNewClock(type) {
    let newclocks = this.state.clocks;
    newclocks.push(type);
    this.setState({
      clocks: newclocks,
    })
  }
  renderContainer() {
    var clocks = [];
    for (var i = 0; i < this.state.clocks.length; i++) {
      clocks.push(
        <Clock type={this.state.clocks[i]} key={i} />
      );
    }
    //and now we push the '+' clock, which has weird behavior
    clocks.push(
      <Clock type={'+'} key={i} sendChanges={(type) => { this.addNewClock(type) }} />
    )
    return (
      <div className={'worldclock worldclock-container'}>
        {clocks}
      </div>
    )
  }
  render() {
    return this.renderContainer()
  }
}

export default WorldClocks