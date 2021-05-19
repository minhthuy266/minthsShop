import {Card, Col, Space, Tag} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import Rating from '../Rating/Rating'

const ProductList = ({product}) => {
  const {Meta} = Card
  return (
    <Space key={product._id} size={[8, 16]} wrap>
      <Col span={{xs: 24, sm: 24, md: 12, lg: 6}}>
        <Link to={`/product/${product._id}`}>
          <Card
            className='image-card'
            hoverable
            style={{width: 270}}
            cover={<img alt={product.name} src={product.image} />}>
            <Meta
              title={product.name}
              description={
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              }
            />

            <Tag color='magenta' className='tag-price'>
              $ {product.price}
            </Tag>
          </Card>
        </Link>
      </Col>
    </Space>
  )
}

export default ProductList
