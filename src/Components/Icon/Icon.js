import React, { PureComponent } from 'react';
import {
  HomeOutlined, GithubOutlined, SlackOutlined, CopyrightCircleOutlined, LoadingOutlined, LinkOutlined, DownOutlined, SortAscendingOutlined, SortDescendingOutlined,
} from '@ant-design/icons';
import cx from 'classnames';

import css from './Icon.module.css';

class Icon extends PureComponent {
  applyProps(Component) {
    const { className } = this.props;
    return (
      <Component className={cx(className, css.icon)} />
    );
  }

  render() {
    const { type } = this.props;
    switch (type) {
      case 'home':
        return this.applyProps(HomeOutlined);
      case 'github':
        return this.applyProps(GithubOutlined);
      case 'slack':
        return this.applyProps(SlackOutlined);
      case 'copyright':
        return this.applyProps(CopyrightCircleOutlined);
      case 'loader':
        return this.applyProps(LoadingOutlined);
      case 'link':
        return this.applyProps(LinkOutlined);
      case 'down-arrow':
        return this.applyProps(DownOutlined);
      case 'sort-asc':
        return this.applyProps(SortAscendingOutlined);
      case 'sort-desc':
        return this.applyProps(SortDescendingOutlined);
      default:
        return null;
    }
  }
}

export default Icon;
