import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import PostListing from '../components/Posts/PostListing'

const TitleWrapper = styled.div`
  overflow: hidden;
  position: relative;
  color: white;
  margin-top: 50px;
  margin-left: 100px;
`

const IndexPage = ({data}) => (
  <div>
    <Img 
      style={{
        position: 'absolute',
        top: 100,
        left: 0,
        width: '100%',
        height: '240px',
      }}
      sizes={data.jumbotron.sizes} />
      <TitleWrapper>
        <h1>{data.site.siteMetadata.title}</h1>
        <p>{data.site.siteMetadata.desc}</p>
      </TitleWrapper> 
      <div
        style={{
          marginTop: '100px',
        }}>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <PostListing key={node.id} post={node} />
          ))}
      </div>
  </div>
)

export default IndexPage

export const query = graphql`
  query siteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    jumbotron: imageSharp(id: {regex: "/open-door-bg.png/"}) {
      sizes(
        maxWidth: 1240, 
        ) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD YYYY")
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
    }
  }
`