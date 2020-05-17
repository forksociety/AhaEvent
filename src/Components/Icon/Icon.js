import React, { PureComponent } from 'react';
import { HomeOutlined, GithubOutlined, SlackOutlined, CopyrightCircleOutlined} from '@ant-design/icons';

import css from './Icon.module.css';

class Icon extends PureComponent {
  applyProps(Component) {
    return (
      <Component className={css.icon} />
    )
  }

  render() {
    const { type } = this.props;
    switch(type) {
      case 'home':
        return this.applyProps(HomeOutlined);
      case 'github':
        return this.applyProps(GithubOutlined);
      case 'slack':
        return this.applyProps(SlackOutlined);
      case 'copyright':
        return this.applyProps(CopyrightCircleOutlined);
      default:
        return null;
    }
  }
}

export default Icon;
