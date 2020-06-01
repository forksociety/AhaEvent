import React, {
  Component,
} from 'react';

import DocumentMeta from 'Components/DocumentMeta';
import Grid from 'Components/Grid';
import Card from 'Components/Card';
import Loader from 'Components/Loader';
import Icon from 'Components/Icon';
import {
  getOrderedEventsList,
} from 'Services/Firestore';
import Utils, {
  generateCardData,
} from 'Utils';

import styles from './Home.module.scss';

const { getSearchParams } = Utils;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {
        title: 'Home',
      },
      events: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const searchParams = getSearchParams(search);
    const self = this;
    getOrderedEventsList(searchParams)
      .then((eventList) => {
        self.setState({
          events: eventList,
          isLoading: false,
        });
      });
  }

  handleCardClick(e, url) {
    e.preventDefault();
    const { history } = this.props;
    history.push(url);
  }

  getPageContent() {
    const { events } = this.state;
    if (events.length > 0) {
      const eventsData = events.map((event) => {
        const eData = generateCardData(event);
        const {url} = eData;
        return ({
          ...eData,
          onClick: (e) => this.handleCardClick(e, url),
        });
      });
      return (
        <Grid
          items={eventsData.map((event) => (<Card {...event} />))}
        />
      );
    }
    return (
      <span className={styles.fallback}>No Event Found</span>
    );
  }

  render() {
    const { isLoading, meta } = this.state;
    return (
      <main>
        <DocumentMeta {...meta} />
        {isLoading && <Loader />}
        {!isLoading && (this.getPageContent())}
      </main>
    );
  }
}

export default Home;
