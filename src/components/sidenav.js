import React from "react"
import { Link } from "gatsby"
import profpic from "../../static/profile.jpg"

export default function Sidenav() {
	return (
		<div className="sidebar">
			<Link to="/">
				<img
					className="profpic"
					src={profpic}
					alt="me smiling, link to landing page"
				/>
			</Link>
			<nav>
				<Element name="home" path="/" />
				<Element name="label-explorer" />
				<Element name="wbar" />
				<Element name="newtab" />
				<Element name="experiments" />
			</nav>
		</div>
		)
}

function Element(props) {
	let path;
	if (props.path) { path = props.path; }
	else { path = "/" + props.name}
	return (
		<li><Link to={path}>{props.name}</Link></li>
		)
}