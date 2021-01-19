import React, { Component } from "react";

const hr_width = 96;
const blue = '#053682'; 
const screen = '#829389';
const black = '#17191a';
const screenface = '#0d1114';
const screengold = '#b0a064';
const screenred = '#972219';
const whiteface = '#aab3bc';


const style_outer = {
	fontFamily: 'Arial',
	transition: 'all 1s',
	position: 'relative',
	backgroundColor: black,
	color: whiteface,
	boxShadow: `inset 0px 0px 0px 3px #303030, 
							inset 0px 0px 0px 5px ${blue}, 
							inset 0px 0px 0px 6px #303030,
							inset 0px 0px 0px 7px lightgray`,
	width: '550px',
	height: '400px',
	borderRadius: '40px',
	fontSize: '110px',
}

const hr_gen = {
	margin: '0px',
	width: `${hr_width}%`,
	left: `calc(50% - ${hr_width / 2}%)`,
	boxShadow: 'none',
	border: 'none',
	backgroundColor: `${blue}`,
	zIndex: '0',
	height: '5px',
}

const hr_top = {
	top: '12%',
	position: 'absolute',
}

const hr_low = {
	bottom: '10%',
	position: 'absolute',
}

var screen_width = 80;

const screen_style = {
	fontFamily: "Digital-7 Mono",
	backgroundColor: screen,
	color: screenface,
	width: `${screen_width}%`,
	height: '58%',
	marginLeft: 'auto',
	marginRight: 'auto',
	borderRadius: '15px',
	top: '23%',
	left: `calc(50% - ${screen_width/2}%)`,
	boxShadow: '0px 0px 0px 4px black, 0px 0px 0px 5px lightgray',
	position: 'absolute',
}

const top = {}

const casio = {
	color: whiteface,
	position: 'absolute',
	left: '18%',
	top: '2.5%',
	fontSize: '28%',
	transform: 'scale(2, 1)',
	letterSpacing: '-1px',
	fontWeight: 'bold',
}

const time_container = {
	display: 'flex',
	width: '100%',
	gravity: 'bottom',
	justifyContent: 'space-evenly',
	position: 'absolute',
	bottom: '5%',
	margin: '0px',
	padding: '0px',
	lineHeight: '100%',
	fontSize: '120%',
	transform: 'scale( 1, 1.5)',
}

const style_semicolon = {
	marginLeft: '-3%',
}

const style_hours = {
	textAlign: 'right',
	flex: '1 0 30%',
}

const style_minutes = {
	...style_hours
}

const style_seconds = {
	textAlign: 'right',
	flex: '1 0 25%',
	fontSize: '70%',
	paddingRight: '2%',
	paddingTop: '11%',
	lineHeight: '70%',
}

const style_ampm = {
	fontFamily: "Arial",
	fontSize: '30%',
	position: 'absolute',
	left: '1%',
	top: '20%',
	fontWeight: 'bold',
}

const style_wkday = {
	fontSize: '80%',
	position: 'absolute',
	left: '30%',
	top: '0px',
	lineHeight: '100%',
}

const style_date = {
	fontSize: '80%',
	position: 'absolute',
	right: '2.5%',
	top: '0px',
	lineHeight: '100%',
}

const weekdays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

const style_model = {
	position: 'absolute',
	color: screengold,
	fontSize: '20%',
	top: '4%',
	right: '19%',
	letterSpacing: '1px',
	fontWeight: 'bold',
	fontStyle: 'italic',
	transform: 'scale(2, 1)',
}

const style_features = {
	position: 'absolute',
	color: screengold,
	fontSize: '19%',
	top: '15%',
	right: '10%',
	letterSpacing: '1px',
	fontWeight: 'bold',
}

const style_tl = {
	position: 'absolute',
	color: whiteface,
	fontSize: '15%',
	top: '16%',
	left: '15%',
	fontWeight: '100',
	transform: 'scale(2, 1)',
}

class Timex extends Component {
	//keep time
	constructor(props) {
		super(props);
		this.state = {
			hours: -1,
			minutes: -1,
			seconds: -1,
			weekday: "",
			date: -1,
		}
		this.updateTime = this.updateTime.bind(this);
		this.updateTime();
		setInterval(this.updateTime, 1000);
	}
	updateTime() {
		var index = new Date().getDay();
		this.setState({
			weekday: weekdays[index],
			date: new Date().getDate(),
			hours: new Date().getHours(),
			minutes: new Date().getMinutes(),
			seconds: new Date().getSeconds(),
		});
	}
	render() {
		return (
			<div
				style={style_outer}
				role="none">
				<div style={top}>
					<span style={casio}>CASIO</span>
					<div style={style_model}>F-91W</div>
					<hr style={{
						...hr_gen,
						...hr_top,
					}} />
					<div style={style_tl}>LIGHT</div>
					<div style={style_features}>ALARM CHRONOGRAPH</div>
				</div>
				<div style={screen_style}>
					<div style={style_ampm}>{
						this.state.hours < 12 ? 'AM' : 'PM'
					}
					</div>
					<div style={style_wkday}>
						{ this.state.weekday }
					</div>
					<div style={style_date}>
						{ this.state.date }
					</div>
					<div style={time_container}>
						<div style={style_hours}>{
							this.state.hours < 12 ? `${this.state.hours}` : `${this.state.hours - 12}`
						}
						</div>
						<div style={style_semicolon}>:</div>
						<div style={style_minutes}>{
							this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes}</div>
						<div style={style_seconds}>{
							this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</div>
					</div>
				</div>
				<hr style={{
					...hr_gen, ...hr_low, }} />
			</div>
		)
	}
}

export default Timex