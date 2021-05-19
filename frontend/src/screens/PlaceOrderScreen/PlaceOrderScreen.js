import {Avatar, Button, Card, Col, Divider, Row} from 'antd'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {createOrder} from '../../actions/orderActions'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import {Message} from '../../components/UI Handler/Message/Message'
import ButtonBack from '../../components/UI Handler/ButtonHandler/ButtonBack'
import './PlaceOrderScreen.css'

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  // Calculate prices

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const {order, success, error} = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <ButtonBack linkTo='/payment' />

      <CheckoutSteps step3 />
      <Row>
        <Col>
          <h2 className='section-sub'>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},
            <p>
              {' '}
              Postal Code: {cart.shippingAddress.postalCode}, Country:{' '}
              {cart.shippingAddress.country}.
            </p>
          </p>
        </Col>
      </Row>

      <Divider plain />

      <Row>
        <Col>
          <h2 className='section-sub'>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </p>
        </Col>
      </Row>

      <Divider plain />

      <Row>
        <Col lg={{span: 17}}>
          <h2 className='section-sub'>Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <Message description='Your cart is empty'></Message>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div key={index}>
                  <Row>
                    <Col
                      lg={{span: 4, offset: 0}}
                      md={{span: 4, offset: 0}}
                      xs={{span: 8, offset: 0}}>
                      <Avatar src={item.image} shape='square' />
                    </Col>

                    <Col
                      lg={{span: 11, offset: 0}}
                      md={{span: 12, offset: 0}}
                      xs={{span: 14, offset: 2}}
                      className='item-name'>
                      <Link to={`/product/${item.product}`}>
                        <div className='item-name'>{item.name}</div>
                      </Link>
                    </Col>

                    <Col
                      lg={{span: 8, offset: 1}}
                      md={{span: 6, offset: 2}}
                      xs={{span: 12, offset: 12}}>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              ))}
            </>
          )}
        </Col>

        <Col
          lg={{span: 6, offset: 1}}
          md={{span: 12, offset: 10}}
          xs={{span: 24, offset: 0}}>
          <Card sub='ORDER SUMMARY'>
            <Row>
              <Col span={12}>Items</Col>
              <Col span={12}>$ {cart.itemsPrice}</Col>
            </Row>

            <Row>
              <Col span={12}>Shipping</Col>
              <Col span={12}>$ {cart.shippingPrice}</Col>
            </Row>

            <Row>
              <Col span={12}>Tax</Col>
              <Col span={12}>$ {cart.taxPrice}</Col>
            </Row>

            <Row>
              <Col span={12}>Total</Col>
              <Col span={12}>$ {cart.totalPrice}</Col>
            </Row>

            <Row>
              {error && <Message type='error' description={error}></Message>}
            </Row>

            <Divider plain />

            <Row>
              <Button
                type='primary'
                block
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}>
                Place Order
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
