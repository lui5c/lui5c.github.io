import React from "react"
import Sidenav from "../components/sidenav"
import { graphql } from "gatsby"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Home({ data }) {
	const { markdownRemark } = data //our post data
	const { frontmatter, html } = markdownRemark
	return (
		<div className="overall-container">
			<Sidenav />
			<div className="writeup">
				<h1>{frontmatter.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</div>
	)
}

export const pageQuery = graphql`
query {
  markdownRemark(frontmatter: {layout: {eq: "landing"}}) {
    html
    frontmatter {
      title
    }
  }
}

`