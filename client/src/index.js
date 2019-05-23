
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import TodolistProvider from './TodolistProvider'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

ReactDOM.render((
  <TodolistProvider>
    <App />
  </TodolistProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
