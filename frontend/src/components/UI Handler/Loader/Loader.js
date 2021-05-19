import {Spin} from 'antd'
import React from 'react'

export const Loader = () => {
  return (
    <Spin
      className='ui-loader'
      size='large'
      style={{
        width: '400px',
        height: '400px',
        margin: '0 auto',
        display: 'block',
        lineHeight: '400px',
      }}
    />
  )
}
