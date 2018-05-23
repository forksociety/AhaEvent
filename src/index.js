import React from 'react'
import ReactDOM from 'react-dom'
import globalConfig from 'react-global-configuration'

import config from './config/config'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

globalConfig.set(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
