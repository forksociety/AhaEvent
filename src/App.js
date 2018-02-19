import React, { Component } from 'react';
import './stylesheets/dist/style.min.css';

import { Layout } from 'antd';
const { Content } = Layout;

class App extends Component {
    render() {
        return (
                <div className="App">
                    <Layout className="uk-height-1-1">
                        <Content className="text-center">
                            <h1 className="logo">Aha! Event</h1>
                            <p>Showcasing events, one at a time</p>
                        </Content>
                    </Layout>
                </div>
                );
    }
}

export default App;
