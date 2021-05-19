import {Alert} from 'antd'
import React from 'react'

export const Message = ({type, description, message}) => {
  return (
    <>
      <Alert message={message} description={description} type={type} showIcon />
    </>
  )
}

Message.defaultProps = {
  message: 'Informational Notes',
  type: 'info',
}
