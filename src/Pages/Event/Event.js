import React, {
  Component,
} from 'react';

import Icon from 'Components/Icon';
import Tag from 'Components/Tag';
import Loader from 'Components/Loader';
import Content from 'Components/Content';
import GoogleMap from 'Components/GoogleMap';
import {
  getEvent,
} from 'Services/Firestore';
import {
  getCoverStyle,
  getOverlay,
  convertDateRangeToReadable,
  isOnlineEvent,
  getTwitterLink,
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
    const { match: { params: { id } } } = this.props;
    const eventId = id.split('-').pop();
    getEvent(eventId)
      .then((event) => {
        if (event && event.id) {
          this.setState({
            eventId: event.id,
            event,
            isLoading: false,
          });
        } else {
          this.redirectToHome();
        }
      });
  }

  redirectToHome() {
    const { history } = this.props;
    history.push('/');
  }

  handleButtonClick(url, newTab = '_blank') {
    window.open(url, newTab);
  }

  getKeywords(keywords) {
    const keywordCount = 3;
    let keywordArr = keywords;
    if (typeof keywords === 'string') {
      keywordArr = keywords.split(',');
    }
    return keywordArr.slice(0, keywordCount);
  }

  getPageContent() {
    const { eventId, event } = this.state;

    if (eventId && event) {
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
      const keywords = this.getKeywords(allKeywords);

      return (
        <Content className={styles.event}>
          <span
            style={getCoverStyle(cover, coverBgColor)}
            className={styles.cover}
          >
            {getOverlay(cover)}
            <span className={styles.tags}>
              {keywords.map((keyword, i) => (<Tag key={`${keyword}-${i}`} text={keyword} />))}
            </span>
            <img className={styles.logo} alt={`${name} logo`} src={logo} />
          </span>
          <span className={styles.details}>
            <span className={styles.content}>
              <span>
                <h2 className="tac">{name}</h2>
                <h4 className="tac">
                  {convertDateRangeToReadable(startDate, endDate)}
                  {isOnlineEvent(location) ? <sup className={styles.online}>Online</sup> : null}
                </h4>
                <h4 className="tac">{organization}</h4>
              </span>
              <div className="tac">{description}</div>
              <div className="tac">
                {`Call for Proposals: ${cfpStartDate && cfpEndDate
                  ? convertDateRangeToReadable(cfpStartDate, cfpEndDate)
                  : 'Not Available'
                }`}
              </div>
              <span className={styles.actions}>
                {link && (
                <Icon
                  type="internet"
                  title="Website"
                  className={styles.icons}
                  onClick={() => this.handleButtonClick(link)}
                />
                )}
                {streamLink && (
                <Icon
                  title="Watch Online"
                  type="video"
                  className={styles.icons}
                  onClick={() => this.handleButtonClick(streamLink)}
                />
                )}
                {twitterHandle && (
                <Icon
                  title="Twitter"
                  type="twitter"
                  className={styles.icons}
                  onClick={() => this.handleButtonClick(getTwitterLink(twitterHandle))}
                />
                )}
              </span>
            </span>
            {!isOnlineEvent(location) && <GoogleMap location={location} height="200px" />}
          </span>
        </Content>
      );
    }
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

export default Event;
