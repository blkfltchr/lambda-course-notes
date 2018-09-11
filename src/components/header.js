import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import logo from '../images/Lambda-course-notes-logo.png'

const HeaderWrapper = styled.div`
  background: white;
  display: flex;
  justify-content: space-around;
  border-bottom: 3px solid #760404;
  margin-top: 20px
  img {
    height: 50px
  }
`

const LogoWrapper = styled.div`
  background: white;
  display: flex;
  alignItems: center;
`

const NavWrapper = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1rem;
`

const Header = () => (
  <HeaderWrapper>
    <LogoWrapper>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <img src={logo} alt="Lambda course notes logo" />
        </Link>
    </LogoWrapper>
    <NavWrapper>
          <Link
            to="/"
            style={{
              color: 'black',
              textDecoration: 'none',
              margin: '10px', 
            }}>User Interface</Link>
          <Link 
            to="/"
            style={{
              color: 'black',
              textDecoration: 'none',
              margin: '10px',
            }}>Front end</Link>
          <Link 
            to="/"
            style={{
              color: 'black',
              textDecoration: 'none',
              margin: '10px',
            }}>Back end</Link>
          <Link 
            to="/"
            style={{
              color: 'black',
              textDecoration: 'none',
              margin: '10px',
            }}>Computer science</Link>
        </NavWrapper>
  </HeaderWrapper>
)

export default Header

