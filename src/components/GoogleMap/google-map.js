import React, { Component } from 'react'
import config from 'react-global-configuration'

class GoogleMap extends Component {
  constructor (props) {
    super(props)
    let secretKeys = config.get('secretKeys')
    this.state = {
      googleMapsKey: secretKeys.googleMapsKey
    }
  }
  render () {
    let googleMapsUrl = 'https://www.google.com/maps/embed/v1/place?language=en&key='
      + this.state.googleMapsKey + '&q=' + this.props.location.replace(' ', '+');

    return (
      <iframe
        title="Location"
        style={{ width: '100%', height: '300px', border:'0' }}
        src={googleMapsUrl} allowFullScreen>
      </iframe>
    )
  }
}

export default GoogleMap
