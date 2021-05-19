import {Button, Form, Input} from 'antd'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import FormContainer from '../../components/FormContainer/FormContainer'
import ButtonBack from '../../components/UI Handler/ButtonHandler/ButtonBack'
import './ShippingScreen.css'

const ShippingScreen = ({history}) => {
  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history.push('/payment')
  }

  return (
    <>
      <ButtonBack linkTo='/cart' />

      <CheckoutSteps step1 />

      <FormContainer>
        <h1 className='section-title'>Shipping</h1>
        <Form.Item
          label='Address'
          name='address'
          initialValue={shippingAddress.address}>
          <Input
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>

        <Form.Item label='City' name='city' initialValue={shippingAddress.city}>
          <Input
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label='Postal Code'
          name='postalCode'
          initialValue={shippingAddress.postalCode}>
          <Input
            placeholder='Enter Postal Code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label='Country'
          name='country'
          initialValue={shippingAddress.country}>
          <Input
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' onClick={submitHandler}>
            Continue
          </Button>
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
