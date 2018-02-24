import React, { Component } from 'react';
import config from 'react-global-configuration';
import ReactGA from 'react-ga';

import DocumentMeta from './components/document-meta';

import './stylesheets/dist/style.min.css';
import { Layout } from 'antd';

class App extends Component {
    render() {
        console.log('environment', process.env);
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
            console.log('prod environment', process.env);
            ReactGA.initialize(config.get('gaTrackingId'), {"debug":true,"gaOptions":{"cookieDomain":"none"}});
        } else {
            console.log('dev environment', process.env);
        }
        let metaData = {}
        return (
                <Layout>
                    <DocumentMeta {...metaData} />
                    <p className="text-center">
                        <img className="logo-img" src={ require('./img/logo.png') } alt="Aha! Event Logo" />
                    </p>
                    <span className="logo">{config.get('siteName')}</span>
                    <p className="tagline">{config.get('siteTagline')}</p>
                </Layout>
               );
    }
}

export default App;
