import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, useLocation,
} from 'react-router-dom';
import loadConfig from 'react-global-configuration';
import 'antd/dist/antd.less';

import Config from 'Config';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Home from 'Pages/Home/Home';
import { showBanner, getRedirectUrls } from 'Utils';

import './App.scss';
import './App.module.scss';

loadConfig.set(Config);

const Routes = () => (
  <>
    <Header showBanner={showBanner(useLocation())} />
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} />}
      />
      {getRedirectUrls()}
    </Switch>
    <Footer />
  </>
);

const App = () => (<Router><Routes /></Router>);

export default App;
