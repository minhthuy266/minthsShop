import {ArrowRightOutlined, DeleteOutlined} from '@ant-design/icons'
import {Avatar, Button, Card, Col, Divider, Row, Select} from 'antd'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import * as types from '../../actions/cartActions'
import ButtonBack from '../../components/UI Handler/ButtonHandler/ButtonBack'
import {Message} from '../../components/UI Handler/Message/Message'
import './CartScreen.css'

const {Option} = Select

const CartScreen = ({match, history, location}) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if (productId) {
      dispatch(types.addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(types.removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div>
      <ButtonBack linkTo='/' />
      <h1 className='section-title'>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <>
          <Message description='Your cart is empty! '> </Message>
          <Link to='/'>Go Back</Link>
        </>
      ) : (
        <Row>
          <Col lg={{span: 14}} md={{span: 24}} xs={{span: 24}}>
            {cartItems.map((item, index) => (
              <div key={index}>
                <Row>
                  <Col lg={{span: 4}} md={{span: 4}} xs={{span: 10}}>
                    <Avatar src={item.image} shape='square' />
                  </Col>

                  <Col
                    lg={{span: 11}}
                    md={{span: 11}}
                    xs={{span: 14}}
                    className='item-name'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col
                    lg={{span: 2, offset: 1}}
                    md={{span: 2, offset: 1}}
                    xs={{span: 4, offset: 10}}>
                    <div>${item.price}</div>
                  </Col>

                  <Col
                    lg={{span: 2, offset: 1}}
                    md={{span: 2, offset: 1}}
                    xs={{span: 3, offset: 1}}>
                    <Select
                      defaultValue={item.qty}
                      style={{width: 50}}
                      onChange={(value) =>
                        dispatch(types.addToCart(item.product, Number(value)))
                      }>
                      <Option value='1'>1</Option>
                      <Option value='2'>2</Option>
                      <Option value='3'>3</Option>
                      <Option value='4'>4</Option>
                      <Option value='5'>5</Option>
                    </Select>
                  </Col>

                  <Col
                    lg={{span: 2, offset: 1}}
                    md={{span: 2, offset: 1}}
                    xs={{span: 3, offset: 2}}>
                    <Button
                      onClick={() => removeFromCartHandler(item.product)}
                      className='btn-delete'>
                      <DeleteOutlined />
                    </Button>
                  </Col>
                </Row>

                <Divider />
              </div>
            ))}
          </Col>

          <Col
            lg={{span: 8, offset: 2}}
            md={{span: 12, offset: 12}}
            xs={{span: 24}}>
            <Card>
              <h2>
                SUBTOTAL: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                ITEMS{' '}
              </h2>
              <h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h2>
            </Card>

            <Button
              block
              type='primary'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}>
              Check out <ArrowRightOutlined className='arrow-icon' />
            </Button>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default CartScreen
