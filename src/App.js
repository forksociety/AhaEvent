import React, { Component } from 'react'
import ReactGA from 'react-ga'
import config from 'react-global-configuration'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Page404 from './pages/404/404'
import HomePage from './pages/Home/home'
import EventPage from './pages/Event/event'
import './stylesheets/dist/style.min.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let slugs = config.get('slugs')
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      // disable console log
      console.log = (...p) => { }
      // console.warn = (...p) => { }
      // console.error = (...p) => { }
      let gaTrackingId = config.get('gaTrackingId')

      console.log('Environment', process.env.NODE_ENV)
      ReactGA.initialize(gaTrackingId, {
        debug: true,
        gaOptions: { cookieDomain: 'auto' }
      })
    } else {
      console.log('Environment', process.env.NODE_ENV)
    }

    // generate routes for rediect urls from config
    let redirectUrlsArray = []
    let redirectUrls = config.get('redirectUrls')
    for (let k in redirectUrls) {
      redirectUrlsArray.push(
        <Route
          key={k}
          exact path={'/' + k}
          render={() => {
            window.location.assign(redirectUrls[k])
            return ''
          }}
        />
      )
    }

    return (<Router>
      <Switch>
        <Route
          exact path={slugs.frontend.home}
          render={(props) => <HomePage {...props} />}
        />
        <Redirect from={slugs.frontend.events} to={slugs.frontend.home} />}
        />
        <Route
          exact path={`${slugs.frontend.event}/:eUrl`}
          render={(props) => <EventPage {...props} />}
        />
        <Route
          exact path={slugs.frontend.notFound}
          render={(props) => <Page404 {...props} />}
        />
        {redirectUrlsArray}
        <Route component={Page404} />
      </Switch>
    </Router>)
  }
}

export default App
