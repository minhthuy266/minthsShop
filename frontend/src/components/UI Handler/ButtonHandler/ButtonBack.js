import {Button} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './ButtonBack.css'

function ButtonBack({linkTo}) {
  return (
    <div className='button-back'>
      <Link to={linkTo}>
        <Button type='primary'>
          <ArrowLeftOutlined className='arrow-icon' />
          Go Back
        </Button>
      </Link>
    </div>
  )
}

export default ButtonBack
