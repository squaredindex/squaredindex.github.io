import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Link from 'gatsby-link'
import styled, { injectGlobal } from 'styled-components'
import Img from 'gatsby-image'

import logo from '../../images/logo.svg'

injectGlobal`
  ::selection {
    background: #68b869;
    color: #fff;
  }
  a {
    color: #68b869;
  }
`

const HeaderWrapper = styled.div`
  border-top: 8px solid #68b869;
  background: #68b869;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: ${({ isHome }) => (isHome ? '70vh' : '20vh')};
  h1 {
    img {
      height: 100px;
    }
  }
`

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`

const MainNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    li {
      margin-left: 1.2rem;
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      a {
        text-decoration: none;
        color: #fff;
        &:hover {
          border-bottom: 3px solid #68b869;
        }
      }
    }
  }
`

export default class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props
    if (location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === '/') {
        this.wrapper.animate([{ height: '30vh' }, { height: '70vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        })
      } else {
        this.wrapper.animate([{ height: '70vh' }, { height: '30vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        })
      }
    }
  }

  render() {
    const { data, location } = this.props
    return (
      <div>
        <HeaderWrapper
          isHome={location.pathname === '/'}
          ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
        >
          <HeaderContainer>
            <h1 style={{ margin: 0 }}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <img src={logo} alt="Level Up Logo" />
              </Link>
            </h1>
            <MainNav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </MainNav>
          </HeaderContainer>
          <Img
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0.9,
            }}
            sizes={data.background.sizes}
          />
        </HeaderWrapper>
      </div>
    )
  }
}
