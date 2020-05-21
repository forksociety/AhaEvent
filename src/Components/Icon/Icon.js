import React, {
  PureComponent,
} from 'react';
import {
  HomeOutlined,
  GithubOutlined,
  SlackOutlined,
  CopyrightCircleOutlined,
  LoadingOutlined,
  LinkOutlined,
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SendOutlined,
  CompassOutlined,
  CaretUpOutlined,
  IeOutlined,
  YoutubeOutlined,
  YoutubeFilled,
  VideoCameraOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import cx from 'classnames';

import styles from './Icon.module.css';

class Icon extends PureComponent {
  applyProps(Component) {
    const { className, type, ...rest } = this.props;
    return (
      <Component className={cx(className, styles.icon, styles[type])} {...rest} />
    );
  }

  getIconComponent(key) {
    const mapping = {
      home: HomeOutlined,
      github: GithubOutlined,
      slack: SlackOutlined,
      copyright: CopyrightCircleOutlined,
      loader: LoadingOutlined,
      link: LinkOutlined,
      'down-arrow': DownOutlined,
      'up-caret': CaretUpOutlined,
      'sort-asc': SortAscendingOutlined,
      'sort-desc': SortDescendingOutlined,
      send: SendOutlined,
      location: CompassOutlined,
      internet: IeOutlined,
      youtube: YoutubeOutlined,
      youtube_filled: YoutubeFilled,
      video: VideoCameraOutlined,
      twitter: TwitterOutlined,
    };
    if (key in mapping) {
      return this.applyProps(mapping[key]);
    }
    return null;
  }

  render() {
    const { type, filled } = this.props;
    const key = filled ? `${type}_filled` : type;
    return this.getIconComponent(key);
  }
}

export default Icon;
