import React, { useState, Fragment } from 'react'
import { Input, List, Button, Col, Row } from 'antd'

function TodoList () {
  const [text, setText] = useState('')
  const [items, setItems] = useState(['first'])

  function addItem () {
    setItems([...items, text])
    setText('')
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <Input
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={addItem}>添加</Button>
        </Col>
      </Row>
      <Row>
        <List
          bordered
          dataSource={items}
          renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
        />
      </Row>
    </Fragment>
  )
}

export default TodoList
