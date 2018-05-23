import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import config from 'react-global-configuration'

// TODO: move this to a separate module
const validProp = prop => {
  return typeof prop !== 'undefined' && prop.trim() !== ''
}

class DocumentMeta extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let title =
      (validProp(this.props.title) ? this.props.title.trim() + ' | ' : '') +
      config.get('appName')
    let description = validProp(this.props.description)
      ? this.props.description.trim()
      : config.get('appDescription')
    let keywords = validProp(this.props.keywords)
      ? this.props.keywords.trim() + ', aha event, FLOSS conference'
      : config.get('appKeywords')

    let ogTitle = title
    let ogDescription = description
    let ogUrl = validProp(this.props.ogUrl)
      ? this.props.ogUrl.trim()
      : config.get('appUrl')
    // TODO: import images dynamically
    // let ogImage = (validProp(this.props.ogImage) ? this.props.ogImage : config.get("defaultOgImage"));

    return (
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={config.get('appAuthor')} />
        <meta property='og:title' content={ogTitle} />
        <meta property='og:description' content={ogDescription} />
        <meta property='og:url' content={ogUrl} />
        <meta
          property='og:image'
          content={require('./../../img/defaultOgImage.png')}
        />
      </Helmet>
    )
  }
}

export default DocumentMeta
