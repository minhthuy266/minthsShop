import React from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './PaginationComponent.css'

const PaginationComponent = ({pages, page, isAdmin = false, keyword = ''}) => {
  let active = page
  let items = []
  for (let number = 1; number <= pages; number++) {
    items.push(
      <LinkContainer
        key={number}
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${number}`
              : `/page/${number}`
            : `/admin/productlist/${number}`
        }>
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      </LinkContainer>
    )
  }

  return <Pagination size='lg'>{items}</Pagination>
}

export default PaginationComponent
