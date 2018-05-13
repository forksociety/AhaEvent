import React, { Component } from 'react'
import ReactGA from 'react-ga'
import config from 'react-global-configuration'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './pages/Home/home'
import EventPage from './pages/Event/event'
import './stylesheets/dist/style.min.css'

class App extends Component {
  render () {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      console.log = (...p) => { }
      console.warn = (...p) => { }
      // console.error = (...p) => { }
      console.log('Environment', process.env.NODE_ENV)

      ReactGA.initialize(config.get('gaTrackingId'), {
        debug: true,
        gaOptions: { cookieDomain: 'none' }
      })
    } else {
      console.log('Environment', process.env.NODE_ENV)
    }

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
      <div>
        <Route
          exact path='/'
          render={(props) => <HomePage {...props} />}
        />
        <Route
          exact path='/events'
          render={(props) => <HomePage {...props} />}
        />
        <Route
          exact path='/event/:eUrl'
          render={(props) => <EventPage {...props} />}
        />
        {redirectUrlsArray}
      </div>
    </Router>)
  }
}

export default App
