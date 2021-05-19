import {Button, Col, Form, Input, Row} from 'antd'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {login} from '../../actions/userActions'
import FormContainer from '../../components/FormContainer/FormContainer'
import {Loader} from '../../components/UI Handler/Loader/Loader'
import {Message} from '../../components/UI Handler/Message/Message'
import {UserOutlined, LockOutlined} from '@ant-design/icons'

const LoginScreen = ({location, history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const {loading, error, userInfo} = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message message={error} type='error' />}
      {loading && <Loader />}
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
      </Form>

      <Form.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}>
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Button type='primary' htmlType='submit' onClick={submitHandler}>
        Sign In
      </Button>

      <Row>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
