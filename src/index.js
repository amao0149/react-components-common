import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import CateTree from 'CateTree'
import Exp from 'Exp'

function App() {
	return (
		<div className="app">
			{/*<CateTree />*/}
			<Exp />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();
