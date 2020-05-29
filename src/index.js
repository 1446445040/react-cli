import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import 'antd/dist/antd.min.css'

ReactDom.render(
  <App />,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept(['./App.js'], () => {
    ReactDom.render(
      <App />,
      document.getElementById('app')
    )
  })
}
