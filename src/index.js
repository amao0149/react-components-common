import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import CateTree from 'CateTree'

function App() {
	return (
		<div className="app">
			<CateTree />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();
