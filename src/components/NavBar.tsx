import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #728da5;
    text-align: center;
  }

  li {
    display: inline-block;
  }

  li:last-child {
    border-right: none;
  }

  li a {
    display: block;
    color: #133453;
    text-align: center;
    padding: 14px 16px;
    font-weight: 500;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #4a6b8a;
    text-decoration: none;
    border-radius: 5px;
  }
`;

const NavBar = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/photos">Photos</Link>
        </li>
      </ul>
    </Nav>
  );
};
export default NavBar;
