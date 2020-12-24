import React from "react"
import Sidenav from "../components/sidenav"

export default function Home() {
	return (
		<div className="overall-container">
			<Sidenav />
			<div className="writeup">
				<h1>experiments</h1>
				<p> This is where I try to replicate cool and cute things I've seen elsewhere on the internet in React. </p>
			</div>
		</div>
	)
}
