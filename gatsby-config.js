module.exports = {
  siteMetadata: {
    title: 'Lambda Course Notes',
    desc: 'Notes on User Interface, Front end, Back end, and Computer Science'
  },
  pathPrefix: "/gatsby",
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components', 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`
      }
    },
    'gatsby-transformer-sharp', 
    'gatsby-plugin-sharp'
  ],
}
