/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
	plugins: [
		`gatsby-plugin-sass`,
		{
			//plugin for parsing markdown files
			//gatsbyjs.com/plugins/gatsby-transformer-remark
			resolve: `gatsby-transformer-remark`,
			options: {
				commonmark: true,
				footnotes: true,
				pedantic: true,
				gfm: true,
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 800,
						},
					},
					{
						resolve: `gatsby-remark-highlight-code`,
						options: {
							terminal: "none",
							theme: "One-light",
						},
					},
				],
			},
		},
		{
			//plugin for reading in files
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `writeups`,
				path: `${__dirname}/writeups/`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `static`,
				path: `${__dirname}/static/`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		//`gatsby-plugin-mdx`,
		`gatsby-image`,
		`gatsby-remark-images`,
		`gatsby-plugin-catch-links`,
	],
}
