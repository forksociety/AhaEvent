import React, { Component } from 'react';

import Grid from 'Components/Grid';
import Card from 'Components/Card';
import Loader from 'Components/Loader';
import styles from './Home.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    // ToDo: remove testing data
    const self = this;
    setTimeout(() => {
      self.setState({
        isLoading: false,
      });
    }, 1000);

    const obj = {
      title: 'Event Name',
      subTitle: 'Time',
      description: 'Lorem ipsum dgd fdh sd sdgfd sd sdghyfjuy jyujn ntyt ngh',
      link: 'https://events.linuxfoundation.org/wp-content/uploads/37879144301_f970c87da2_o.jpg',
      logo: 'https://events.linuxfoundation.org/wp-content/uploads/LF-Event-Logo-_OSS-NA-V-White-01.svg',
      cover: {
        image: 'https://events.linuxfoundation.org/wp-content/uploads/37879144301_f970c87da2_o.jpg',
        bgColor: '#000',
      },
    };

    const events = [obj, obj, obj, obj, obj, obj, obj, obj, obj, obj];

    this.setState({
      events,
    });
  }

  getPageContent() {
    const { events } = this.state;
    if (events.length > 0) {
      return (
        <Grid
          items={events.map((event) => <Card {...event} />)}
        />
      );
    }
    return (
      <span>No Event Found</span>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <main>
        {isLoading && <Loader />}
        {!isLoading && (this.getPageContent())}
      </main>
    );
  }
}

export default Home;
