import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  letter-spacing: 6px;
  font-family: Fjalla one;
  font-weight: 900;

  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  text-align: center;

  ul {
    margin: 0;
    background-color: ${(props) => props.theme.teal.five};
  }

  li {
    display: inline-block;
  }
  p {
    margin: 0;
  }

  li a,
  li p {
    display: block;
    color: ${(props) => props.theme.teal.one};
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    text-decoration: none;
  }
  a::after,
  p::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${(props) => props.theme.teal.three};
    transition: width 0.3s;
  }
  a:hover::after {
    width: 100%;
  }
  p::after {
    width: 100%;
  }
`;

const NavBar = () => {
  const location = useLocation();

  return (
    <Nav>
      <ul>
        <li>
          {location.pathname === '/' ? <p>HOME</p> : <Link to="/">HOME</Link>}
        </li>
        <li>
          {location.pathname === '/about' ? (
            <p>ABOUT</p>
          ) : (
            <Link to="/about">ABOUT</Link>
          )}
        </li>
        <li>
          {location.pathname === '/photos' ? (
            <p>PHOTOS</p>
          ) : (
            <Link to="/photos">PHOTOS</Link>
          )}
        </li>
      </ul>
    </Nav>
  );
};
export default NavBar;
