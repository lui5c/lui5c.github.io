import React from "react"
import { graphql } from "gatsby"
import Sidenav from "../components/sidenav"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Template({ data }) {
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
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`