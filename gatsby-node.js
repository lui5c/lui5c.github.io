//this is necessary to create a page for each markdown file

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const writeUpTemplate = require.resolve(`./src/templates/writeup.js`)
    return graphql(`
{
  allMarkdownRemark(filter: {frontmatter: {layout: {eq: "post"}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
}
`).then(result => {
    if (result.errors) { return Promise.reject(result.errors) }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: writeUpTemplate,
            context: {
                slug: node.frontmatter.slug,
            },
        })
    })
})
}