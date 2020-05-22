import React, {
  Component,
} from 'react';

import config from 'Config';

import styles from './GoogleMap.module.scss';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: '150px',
      googleMapsUrl: null,
    };
  }

  componentDidMount() {
    const { width, height } = this.state;
    const { location, width: newWidth, height: newHeight } = this.props;
    const secretKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const api = config.get('api');
    const query = location.split(' ').join('+');
    const googleMapsUrl = `${api.googleMapsEmbedUrl}&key=${secretKey}&q=${query}`;

    this.setState({
      width: newWidth || width,
      height: newHeight || height,
      googleMapsUrl,
    });
  }

  render() {
    const { width, height, googleMapsUrl } = this.state;
    if (googleMapsUrl) {
      return (
        <div
          className={styles.map}
          style={{
            width,
            height,
          }}
        >
          <iframe
            title="Location"
            style={{
              width,
              height,
            }}
            src={googleMapsUrl}
            allowFullScreen
          />
        </div>
      );
    }
    return null;
  }
}

export default GoogleMap;
