import React, { Component } from 'react';
import config from 'react-global-configuration';
import ReactGA from 'react-ga';

import DocumentMeta from './components/document-meta';
import CustomGrid from './components/custom-grid';

import './stylesheets/dist/style.min.css';
import { Layout, Menu, Icon } from 'antd';

import eventsData from './dummy-events.json';

class App extends Component {
    render() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
            console.log('prod environment', process.env);
            ReactGA.initialize(config.get('gaTrackingId'), {"debug":true,"gaOptions":{"cookieDomain":"none"}});
        } else {
            console.log('dev environment', process.env);
        }
        let metaData = {}

        let menuItems = [];
        let menuData = config.get('menu');
        menuData.forEach(function(e) {
            let menuItemLink = <a href={ e.link }><Icon type={ e.icon } /></a>;
            if (typeof e.newTab !== 'undefined' && e.newTab) {
                menuItemLink = <a href={ e.link } target="_blank"><Icon type={ e.icon } /></a>;
            }
            menuItems.push(
                    <Menu.Item
                        key={ e.key }
                        style={{ float: 'right', color: '#fff', fontSize: '150%', borderBottom: '0px', padding: '0 10px 0px 0px' }}
                    >
                    { menuItemLink }
                    </Menu.Item>
                    );
        });

        return (
                <Layout style={{ background: "#f0f2f5" }}>
                    <Layout className="awesome-bg">
                        <DocumentMeta {...metaData} />
                        <Menu
                            selectedKeys={[ 'home' ]}
                            mode="horizontal"
                            style={{ borderBottom: '0px', background: 'rgba(255, 255, 255, 0)' }}
                        >
                            { menuItems }
                        </Menu>
                        <span className="logo">{ config.get('siteName') }</span>
                    </Layout>

                    <CustomGrid {...eventsData } />
                </Layout>
               );
    }
}

export default App;
