import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import './style.styl'
import './index'
import 'antd/dist/antd.min.css'

// 测试异步模块打包
document.body.addEventListener('click', () => {
  import(
    /* webpackChunkName: "test" */
    './a'
  ).then(({ name }) => {
    console.log('测试信息：', name)
  })
})

ReactDom.render(<App />, document.getElementById('app'))
