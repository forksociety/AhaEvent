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
      console.log = (...para) => { }
      console.warn = (...para) => { }
      console.error = (...para) => { }
      console.log('prod environment')

      ReactGA.initialize(config.get('gaTrackingId'), {
        debug: true,
        gaOptions: { cookieDomain: 'none' }
      })
    } else {
      console.log('dev environment')
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
      </div>
    </Router>)
  }
}

export default App
