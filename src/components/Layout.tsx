import React, { FunctionComponent } from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';

import bannerImage from '../assets/images/Banner1.jpg';
import footerImage from '../assets/images/Banner2.jpg';

import { colors } from './common/colors';

const Banner = styled.div`
  background-image: url(${bannerImage});
  background-size: cover;
  font-family: Snell Roundhand, cursive;
  color: ${colors.brown.lightOne};
  font-weight: 700;
  font-size: 100px;
  height: 180px;
  text-align: center;
`;

const Footer = styled.footer`
  background-image: url(${footerImage});
  background-size: cover;

  height: 180px;
`;

const Container = styled.main`
  padding: 32px;
  min-height: 90vh;
  background: ${colors.brown.secondaryTwo};
  box-shadow: 0 0 10px;
`;

const Wrapper = styled.div`
  color: ${colors.brown.primary};
`;

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Wrapper>
      <NavBar />
      <Banner>PhotoBrowser</Banner>
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
