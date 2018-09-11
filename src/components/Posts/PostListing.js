import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: black;
    }
`;

const StyledReadLink = styled(Link)`
    &:focus, &:hover, &:visited, &:link, &:active {
        color: blue;
    }
`;

const PostListing = ({post}) => <article><StyledLink to={post.fields.slug}>
        <h2>{post.frontmatter.title}</h2>
        <h4>{post.frontmatter.date}</h4>
        <p>{post.excerpt}</p>
        <p><StyledReadLink to={post.fields.slug}>Read more...</StyledReadLink></p>
        </StyledLink></article>;

export default PostListing