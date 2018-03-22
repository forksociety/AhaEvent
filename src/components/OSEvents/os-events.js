import React, { Component } from 'react'
import config from 'react-global-configuration'
import CustomGrid from '../CustomGrid/custom-grid'

class OSEvents extends Component {
  constructor (prop) {
    super(prop)
    this.state = {
      events: [],
      url: config.get('api')
    }
  }

  componentDidMount () {
    fetch(this.state.url.eventsUrl)
      .then(results => {
        return results.json()
      }).then(data => {
        let e = data.extras.events.map((i) => i)
        this.setState({events: e})
      })
  }

  render () {
    return (
      <CustomGrid {...{ items: this.state.events }} />
    )
  }
}
export default OSEvents
