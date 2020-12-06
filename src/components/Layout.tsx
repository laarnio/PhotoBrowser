import React, { FunctionComponent } from 'react';
import NavBar from './NavBar';
import styled, { ThemeProvider } from 'styled-components';

import heroImage from '../assets/images/Hero.jpg';
import footerImage from '../assets/images/Footer.jpg';

import { colors, IColor } from '../assets/other/colors';

const Banner = styled.div`
  background-image: url(${heroImage});
  background-size: cover;
  height: 180px;
  text-align: center;
`;

const Footer = styled.footer`
  background-image: url(${footerImage});
  background-size: cover;
  box-shadow: inset 0px 9px 13px 0px;
  height: 180px;
`;

const Container = styled.main`
  padding: 32px;
  min-height: 90vh;
  background: ${(props) => props.theme.teal.one};
  box-shadow: 0 0 10px;
  display: flex;
  flex-flow: column;
  h1, p {
    color: ${props => props.theme.teal.eight};
  }
`;

const Wrapper = styled.div`
  
`;

export const theme: ITheme = {
  primary: colors.takeOne.primary,
  secondary: colors.takeOne.secondary,
  lightOne: colors.takeOne.lightBackground,
  lightTwo: colors.green.two,
  darkOne: '#467b7c',
  teal: {...colors.teal}
};

interface ITheme {
  primary: string;
  secondary: string;
  lightOne: string;
  lightTwo: string;
  darkOne: string;
  teal: IColor;
}

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Banner></Banner>
        <Container>{children}</Container>
        <Footer />
      </ThemeProvider>
    </Wrapper>
  );
};

export default Layout;
