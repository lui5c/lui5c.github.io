import React from "react"
import Sidenav from "../components/sidenav"
//import Timex from "../components/experiments/timex"
import NmCalc from "../components/experiments/nmcalc"
import WorldClocks from "../components/experiments/worldclocks"


export default function Home() {
	return (
		<div className="overall-container">
			<Sidenav />
			<div className="writeup">
				<h1>experiments</h1>
				<p> This is where I try to replicate cool and cute things I've seen elsewhere on the internet in React. </p>
				{/**<Timex /> **/}
				<div>
					<h3>Cute, Click-to-Configure Clocks:</h3>
					<WorldClocks />
				</div>
				<div>
				<h3>Neumorphic Calculator</h3>
				<NmCalc />
				<p> I read about this way of styling UIs <a href="https://uxdesign.cc/neumorphism-in-user-interfaces-b47cef3bf3a6">here</a> and wanted to have a go. They're not super high contrast, and I'm still deciding on what sort of marker would be best for a neumorphic button. The style may well be better suited for cards and other non-interactive information. </p>
				<p>This was more of a CSS and React experiment, not a calculator experiment. Any expression that JavaScript's <code>eval()</code> can't deal with will return an error. </p>
				</div>
			</div>
		</div>
	)
}
