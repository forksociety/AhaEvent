import React, { Component } from 'react';
import './stylesheets/dist/style.min.css';

import { Layout } from 'antd';
const { Content } = Layout;

class App extends Component {
    render() {
        return (
                <Layout>
                    <span className="logo">Aha! Event</span>
                    <p className="tagline">Showcasing events, one at a time</p>
                </Layout>
               );
    }
}

export default App;
