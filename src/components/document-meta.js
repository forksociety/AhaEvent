import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import config from 'react-global-configuration';

// TODO: move this to a separate module
const validProp = prop => {
  return typeof prop !== 'undefined' && prop.trim() !== '';
};

class DocumentMeta extends Component {
  render() {
    let title =
      (validProp(this.props.title) ? this.props.title.trim() + ' | ' : '') +
      config.get('siteName');
    let description = validProp(this.props.description)
      ? this.props.description.trim()
      : config.get('siteDescription');
    let keywords = validProp(this.props.keywords)
      ? this.props.keywords.trim()
      : config.get('siteKeywords');

    let ogTitle = title;
    let ogDescription = description;
    let ogUrl = validProp(this.props.ogUrl)
      ? this.props.ogUrl.trim()
      : config.get('siteUrl');
    // TODO: import images dynamically
    //let ogImage = (validProp(this.props.ogImage) ? this.props.ogImage : config.get("defaultOgImage"));

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={config.get('siteAuthor')} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta
          property="og:image"
          content={require('./../img/defaultOgImage.png')}
        />
      </Helmet>
    );
  }
}

export default DocumentMeta;
