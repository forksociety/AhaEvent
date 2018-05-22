import React, { Component } from 'react'
import config from 'react-global-configuration'

class GoogleMap extends Component {
  constructor (props) {
    super(props)
    let secretKeys = config.get('secretKeys')
    let api = config.get('api')
    this.state = {
      width: (this.props.width) ? this.props.width : '100%',
      height: (this.props.height) ? this.props.height : '150px',
      googleMapsUrl: api.googleMapsBaseUrl +
        '&key=' + secretKeys.googleMapsKey +
        '&q=' + this.props.location.replace(' ', '+')
    }
  }
  render () {
    return (
      <div style={{
        background: '#cccccc',
        width: this.state.width,
        height: this.state.height
      }}>
        <iframe
          title='Location'
          style={{
            border: '0',
            width: this.state.width,
            height: this.state.height
          }}
          src={this.state.googleMapsUrl} allowFullScreen />
      </div>
    )
  }
}

export default GoogleMap
