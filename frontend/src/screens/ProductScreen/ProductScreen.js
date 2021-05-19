import {ArrowLeftOutlined} from '@ant-design/icons'
import {Button, Card, Col, Divider, Form, Input, List, Row, Select} from 'antd'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  createProductReview,
  listProductDetails,
} from '../../actions/productActions'
import Rating from '../../components/Rating/Rating'
import ButtonBack from '../../components/UI Handler/ButtonHandler/ButtonBack'
import {Loader} from '../../components/UI Handler/Loader/Loader'
import {Message} from '../../components/UI Handler/Message/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from '../../constants/productConstants'
import './ProductScreen.css'

const {Option} = Select

const ProductScreen = ({history, match}) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const {loading, error, product} = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      alert('Review Submitted')
      // setRating(0)
      // setComment('')
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
    setComment('')
    setRating(0)
  }

  return (
    <>
      <ButtonBack linkTo='/' />

      <div className='center'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type='error' message='Error' description={error} />
        ) : (
          <Row gutter={[12, 12]}>
            <Col
              lg={{span: 8}}
              md={{span: 12}}
              xs={{span: 24}}
              className='image-product'>
              <Card
                className='image-card'
                bordered
                cover={<img alt={product.name} src={product.image} />}
              />
            </Col>
            <Col
              lg={{span: 12}}
              md={{span: 12}}
              xs={{span: 24}}
              className='info-product'>
              <List itemLayout='horizontal' size='large' bordered>
                <List.Item>
                  <h3>{product.name}</h3>
                </List.Item>

                <List.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </List.Item>
                <List.Item>
                  <strong>Price:</strong> ${product.price}
                </List.Item>
                <List.Item>
                  <strong>Description:</strong> {product.description}
                </List.Item>
              </List>
            </Col>

            <Col lg={{span: 4}} md={{span: 12}} xs={{span: 24}}>
              <List bordered>
                <List.Item>
                  <strong>Status: </strong>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </List.Item>

                <List.Item>
                  <strong>Brand: </strong>
                  {product.brand}
                </List.Item>
              </List>

              {product.countInStock > 0 && (
                <Button
                  type='primary'
                  size='large'
                  block
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}>
                  Add To Cart
                </Button>
              )}
            </Col>
          </Row>
        )}

        <Divider />

        <Row gutter={[24, 36]}>
          <Col lg={{span: 12}} md={{span: 12}} xs={{span: 24}}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && (
              <Message description='No Reviews' />
            )}

            {product.reviews.map((review) => (
              <div key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </Col>

          <Col lg={{span: 12}} md={{span: 12}} xs={{span: 24}}>
            <h2>Write a Customer Review</h2>
            {successProductReview && (
              <Message
                type='success'
                description='Review submitted successfully'
              />
            )}
            {loadingProductReview && <Loader />}
            {errorProductReview && (
              <Message type='danger' description={errorProductReview} />
            )}
            {userInfo ? (
              <Form layout='vertical'>
                <Form.Item>
                  <Select
                    defaultValue=''
                    style={{width: 120}}
                    onChange={(value) => setRating(value)}>
                    <Option value=''>Select...</Option>
                    <Option value='5'>5 - Excellent</Option>
                    <Option value='4'>4 - Very Good</Option>
                    <Option value='3'>3 - Good</Option>
                    <Option value='2'>2 - Fair</Option>
                    <Option value='1'>1 - Poor</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name={['user', 'comment']}
                  onChange={(e) => setComment(e.target.value)}
                  label='Comment'>
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={submitHandler}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <>
                <Message description='Please Sign in to write a review' />
                <Button>
                  <Link to='/login'>Sign in</Link>
                </Button>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProductScreen
