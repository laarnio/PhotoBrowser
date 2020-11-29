import React, { FunctionComponent } from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';

const ContentContainer = styled.div`
  padding: 32px;
  background: lightgray;
  box-shadow: 0 0 10px;
`;

const MainContainer = styled.div`
  padding: 16px;
  background: #fff;
`;

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <NavBar />
      <MainContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContainer>
    </div>
  );
};

export default Layout;
