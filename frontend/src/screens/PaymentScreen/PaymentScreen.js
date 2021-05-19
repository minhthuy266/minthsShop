import {Button, Col, Form, Image, Radio, Row} from 'antd'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {savePaymentMethod} from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import FormContainer from '../../components/FormContainer/FormContainer'
import ButtonBack from '../../components/UI Handler/ButtonHandler/ButtonBack'
import paypal from './../../assets/image/paypal.png'
import stripe from './../../assets/image/stripe.png'
import './PaymentScreen.css'

const PaymentScreen = ({history}) => {
  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [value, setValue] = useState(1)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue({
      value: e.target.value,
    })
  }

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }
  return (
    <>
      <ButtonBack linkTo='/shipping' />

      <CheckoutSteps step2 />

      <FormContainer>
        <h1 className='section-title '>Payment</h1>

        <Row className='section-payment'>
          <Col
            lg={{span: 12, offset: 0}}
            md={{span: 12, offset: 0}}
            xs={{span: 18, offset: 6}}>
            <Image width={140} src={paypal} />
            <br />
            <br />

            <Image width={140} src={stripe} />
            <br />
            <br />
          </Col>

          <Col
            lg={{span: 8, offset: 4}}
            md={{span: 8, offset: 4}}
            xs={{span: 18, offset: 6}}>
            <Form.Item>
              <Radio.Group onChange={onChange} value={value}>
                <Radio style={radioStyle} value={1}>
                  PayPal or Credit Card
                </Radio>
                <Radio style={radioStyle} value={2}>
                  Stripe
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' onClick={submitHandler}>
                Continue
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
