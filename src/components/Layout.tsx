import React, { FunctionComponent } from 'react';
import NavBar from './NavBar';
import styled, { ThemeProvider } from 'styled-components';

import bannerImage from '../assets/images/Banner1.jpg';
import footerImage from '../assets/images/Banner2.jpg';

import { colors } from '../assets/other/colors';

const Banner = styled.div`
  background-image: url(${bannerImage});
  background-size: cover;
  color: ${(props) => props.theme.lightOne};
  font-family: Snell Roundhand, cursive;
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
  background: ${(props) => props.theme.backgroundColorOne};
  box-shadow: 0 0 10px;
`;

const Wrapper = styled.div`
  color: ${(props) => props.theme.primary};
`;

const theme: ITheme = {
  primary: colors.takeOne.primary,
  secondary: colors.takeOne.secondary,
  lightOne: colors.takeOne.lightBackground,
  lightTwo: colors.green.two
};

interface ITheme {
  primary: string;
  secondary: string;
  lightOne: string;
  lightTwo: string;
}

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Banner>PhotoBrowser</Banner>
        <Container>{children}</Container>
        <Footer />
      </ThemeProvider>
    </Wrapper>
  );
};

export default Layout;
