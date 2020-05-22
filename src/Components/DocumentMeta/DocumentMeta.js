import React, {
  PureComponent,
} from 'react';
import {
  Helmet,
} from 'react-helmet';
import config from 'Config';

class DocumentMeta extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title, description, keywords, url, ogImage } = this.props;
    const allKeywords = `${config.get('appKeywords')},${keywords ? keywords.join() : ''}`;
    const completeTitle = `${title} | ${config.get('appName')}`;

    return (
      <Helmet>
        <title>{completeTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={allKeywords} />
        <meta name="author" content={config.get('appAuthor')} />
        <meta property="og:title" content={completeTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Helmet>
    );
  }
}

DocumentMeta.defaultProps = {
  title: config.get('appName'),
  description: config.get('appDescription'),
  keywords: [],
  url: window ? window.location.href : null,
};

export default DocumentMeta;
