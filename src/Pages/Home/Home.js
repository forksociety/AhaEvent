import React, { Component } from 'react';

import Content from 'Components/Content';
import Grid from 'Components/Grid';
import Row from 'Components/Row';
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

  render() {
    const { isLoading, events } = this.state;
    console.log(this.state);
    return (
      <main>
        {isLoading && <Loader />}
        {!isLoading
        && (
          <>
            <Content>
              <Row className={styles['filter-sort']}>
                row
              </Row>
            </Content>
            <Grid
              items={events.map((event) => <Card {...event} />)}
            />
          </>
        )}
      </main>
    );
  }
}

export default Home;
