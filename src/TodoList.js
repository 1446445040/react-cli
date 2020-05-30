import React, { useState, Fragment } from 'react'
import { Input, List, Button, Col, Row } from 'antd'

function TodoList () {
  const [text, setText] = useState('')
  const [items, setItems] = useState(['first'])

  function addItem () {
    setItems([...items, text])
    setText('')
  }

  function deleteItem (index) {
    setItems(
      items.filter((item, idx) => {
        return index !== idx
      })
    )
    // 测试异步模块打包
    import(
      /* webpackChunkName: "test" */
      './log'
    ).then(({ default: print }) => {
      print(`第 ${index} 项被删除！`)
    })
  }

  return (
    <Fragment>
      <Row>
        <Col span={12}>
          <Input
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Button
            block
            type={'primary'}
            onClick={addItem}
          >
            添加
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <List
            bordered
            dataSource={items}
            renderItem={(item, index) => {
              return (
                <List.Item
                  key={index}
                  onClick={() => deleteItem(index)}
                >
                  {item}
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default TodoList
