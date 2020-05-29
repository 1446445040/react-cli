import React, { useState } from 'react'
import './style.styl'

function App () {
  const [text, setText] = useState('this is my first react app')
  return (
    <div onClick={() => setText('clicked！')}>
      {text}
    </div>
  )
}

export default App
