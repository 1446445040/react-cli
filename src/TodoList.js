import React, { useState, Fragment } from 'react'
import { Input, List, Button } from 'antd'

function TodoList () {
  const [text, setText] = useState('')
  const [items, setItems] = useState(['first'])

  function addItem () {
    setItems([...items, text])
    setText('')

    // 异步模块测试
    import(
      /* webpackChunkName: "test" */
      './printLog'
    ).then(({ default: print }) => {
      print('测试信息：' + text)
    })
  }

  return (
    <Fragment>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={addItem}>添加</Button>
      <List
        bordered
        dataSource={items}
        renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
      />
    </Fragment>
  )
}

export default TodoList
