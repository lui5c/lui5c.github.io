import React, { Component } from "react"
import { Link } from "gatsby"
import profpic from "../../static/profile.jpg"
import github_svg from "../../static/github.svg"
import gmail_svg from "../../static/gmail.svg"

class Sidenav extends Component {
	constructor(props){
		super(props);
		this.state = {
			expanded: false,
		}
		this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
	}
	toggleMobileMenu() {
		this.setState({ expanded: !this.state.expanded, });
	}
	render() {
		return (
			<div className={`${this.state.expanded ? 'expanded-sidebar' : 'sidebar' }`}>
				{/* profile picture */}
				<Link to="/">
					<img
						className="profpic"
						src={profpic}
						alt="me smiling, link to landing page"
					/>
				</Link>
				{/* socials */}
				<div className="sidebar-socials">
					<a href="https://github.com/lui5c">
						<img src={github_svg} alt="github logo" />
					</a>
					<a href="mailto:luiscollado26@gmail.com">
						<img src={gmail_svg} alt="gmail logo" />
					</a>
					<div className="shortBio">
						Luis Collado
				</div>
					<hr />
				</div>
				{/* navbar */}
				<nav>
					<Navlink name="home" path="/" />
					<Navlink name="label-explorer" />
					<Navlink name="wbar" />
					<Navlink name="newtab" />
					{/* <Navlink name="experiments" /> */}
					<li className="mobile-expand" role="none" onClick={this.toggleMobileMenu}>
						+
					</li>
				</nav>
			</div>
		)
	}
}

function Navlink(props) {
	let path;
	if (props.path) { path = props.path; }
	else { path = "/" + props.name + "/"; }
	return (
		<li	role="none" class="nav-link"><Link to={path}>{props.name}</Link></li>
		)
}

export default Sidenav