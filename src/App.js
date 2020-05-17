import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import GlobalConfig from 'react-global-configuration';

import 'antd/dist/antd.less';
import './App.scss';
import './App.module.scss';

import Config from 'Config';
import Header from 'Components/Header';
import Home from 'Pages/Home/Home';

GlobalConfig.set(Config);

const getRedirectUrls = () => {
  const redirectUrls = GlobalConfig.get('redirectUrls');

  const redirectUrlsArray = [];
  for (const k in redirectUrls) {
    redirectUrlsArray.push(
      <Route
        key={k}
        exact
        path={`/${k}`}
        render={() => {
          window.location.assign(redirectUrls[k]);
        }}
      />,
    );
  }
  return redirectUrlsArray;
};

const App = () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} />}
        />
        {getRedirectUrls()}
      </Switch>
    </>
  </Router>
);

export default App;
