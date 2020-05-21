import React, {Component} from 'react';

import Loader from 'Components/Loader';
import { getSampleEvents } from 'Services/firebase';

import styles from './Event.module.scss';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
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

    const events = getSampleEvents();

    this.setState({
      event: events[0],
    });
  }

  getPageContent() {
    return (
      <span>event</span>
    )
  }

  render() {
    const { isLoading } = this.state;
    return (
      <main>
        {isLoading && <Loader />}
        {!isLoading && (this.getPageContent())}
      </main>
    )
  }
}

export default Event;
