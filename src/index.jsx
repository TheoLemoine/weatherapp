import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTint, faThermometerEmpty, faThermometerFull, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faTint, faThermometerEmpty, faThermometerFull, faTachometerAlt)
ReactDOM.render(<App />, document.getElementById('root'))
