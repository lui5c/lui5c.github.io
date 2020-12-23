import React from "react"
import { Link } from "gatsby"

export default function Sidenav() {
	return (
		<nav>
			<Element name="label-explorer" />
			<Element name="wbar" />
			<Element name="newtab" />
		</nav>
		)
}

function Element(props) {
	var path = "/" + props.name;
	return (
		<li><Link to={path}>{props.name}</Link></li>
		)
}