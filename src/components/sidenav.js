import React from "react"
import { Link, Image } from "gatsby"

export default function Sidenav() {
	return (
		<div className="sidebar">
			<nav>
				<Element name="label-explorer" />
				<Element name="wbar" />
				<Element name="newtab" />
			</nav>
		</div>
		)
}

function Element(props) {
	var path = "/" + props.name;
	return (
		<li><Link to={path}>{props.name}</Link></li>
		)
}