import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import AboutPage from './components/AboutPage';
import PhotoPage from './components/PhotoPage';
import PhotosPage from './components/PhotosPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" component={AboutPage} />
          <Route exact path="/photos" component={PhotosPage} />
          <Route path="/photos/:id" component={PhotoPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
