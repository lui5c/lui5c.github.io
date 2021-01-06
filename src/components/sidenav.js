import React from "react"
import { Link } from "gatsby"
import profpic from "../../static/profile.jpg"
import github_svg from "../../static/github.svg"
import gmail_svg from "../../static/gmail.svg"

export default function Sidenav() {
	return (
		<div className="sidebar">
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
					<img src={gmail_svg} alt="gmail logo"/>
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
				<Navlink name="experiments" />
			</nav>
		</div>
		)
}

function Navlink(props) {
	let path;
	if (props.path) { path = props.path; }
	else { path = "/" + props.name + "/"; }
	return (
		<li><Link to={path}>{props.name}</Link></li>
		)
}