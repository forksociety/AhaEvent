import React, {Component} from 'react';

import Icon from 'Components/Icon';
import Tag from 'Components/Tag';
import Loader from 'Components/Loader';
import Content from 'Components/Content';
import { getSampleEvents } from 'Services/firebase';
import {
  getCoverStyle,
  getOverlay,
  convertDateRangeToReadable,
  isOnlineEvent,
  getTwitterLink
} from 'Utils';

import styles from './Event.module.scss';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: null,
      event: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { match: {params: { id }}} = this.props;
    const eventId = id.split('-').pop();

    // ToDo: remove testing data
    const self = this;
    setTimeout(() => {
      self.setState({
        isLoading: false,
      });
    }, 1000);

    const events = getSampleEvents();

    this.setState({
      eventId,
      event: events[0],
    });
  }

  handleButtonClick(url, newTab = '_blank') {
    window.open(url, newTab)
  }

  getPageContent() {
    const { history } = this.props;
    const { eventId, event } = this.state;
    if(eventId) {
      const {
        name,
        description,
        organization,
        cover,
        coverBgColor,
        logo,
        link,
        startDate,
        endDate,
        location,
        keywords: allKeywords,
        twitterHandle,
        streamLink,
        cfpStartDate,
        cfpEndDate,
      } = event;
      const keywords = allKeywords.slice(0, 3)

      return (
        <Content className={styles.event}>
          <span
            style={getCoverStyle(cover, coverBgColor)}
            className={styles.cover}
          >
            {getOverlay(cover)}
            <span className={styles.tags}>
              {keywords.map((keyword) => (<Tag text={keyword} />))}
            </span>
            <img alt={` logo`} src={logo} />
          </span>
          <span className={styles.details}>
            <span>
              <h2 className='tac'>{name}</h2>
              <h4 className='tac'>
                {convertDateRangeToReadable(startDate, endDate)}
                {isOnlineEvent(location) ? <sup className={styles.online}>Online</sup> : null}
              </h4>
              <h4 className='tac'>{organization}</h4>
            </span>
            <div className='tac'>{description}</div>
            <div className='tac'>
              {`Call for Proposals: ${cfpStartDate && cfpEndDate
                  ? convertDateRangeToReadable(cfpStartDate, cfpEndDate)
                  : 'Not Available'
              }`}
            </div>
            <span className={styles.actions}>
              {link && <Icon
                type="internet"
                title={'Website'}
                className={styles.icons}
                onClick={() => this.handleButtonClick(link)}
              />}
              {streamLink && <Icon
                title={'Watch Online'}
                type="video"
                className={styles.icons}
                onClick={() => this.handleButtonClick(streamLink)}
              />}
              {twitterHandle && <Icon
                title={'Twitter'}
                type="twitter"
                className={styles.icons}
                onClick={() => this.handleButtonClick(getTwitterLink(twitterHandle))}
              />}
            </span>
          </span>
        </Content>
      )
    }

    history.push('/')
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
