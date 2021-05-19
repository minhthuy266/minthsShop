import {SearchOutlined} from '@ant-design/icons'
import {Input} from 'antd'
import React, {useState} from 'react'
import './SearchBox.css'

const SearchBox = ({history}) => {
  const [keyword, setKeyword] = useState('')

  const onPressEnter = (e) => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
    setKeyword('')
  }

  return (
    <Input
      suffix={<SearchOutlined className='search-icon' />}
      placeholder='Enter your search'
      onChange={(e) => setKeyword(e.target.value)}
      onPressEnter={onPressEnter}
      allowClear
      className='search-box'
    />
  )
}

export default SearchBox
