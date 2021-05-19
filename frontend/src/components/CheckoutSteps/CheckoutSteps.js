import {
  CreditCardOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {Steps} from 'antd'
import React from 'react'
import './CheckoutSteps.css'

const {Step} = Steps

const CheckoutSteps = ({step1, step2, step3}) => {
  return (
    <div className='check-out'>
      {step1 ? (
        <Steps>
          <Step status='finish' title='Login' icon={<UserOutlined />} />
          <Step status='process' title='Shipping' icon={<LoadingOutlined />} />
          <Step status='wait' title='Payment' icon={<CreditCardOutlined />} />
          <Step status='wait' title='Done' icon={<SmileOutlined />} />
        </Steps>
      ) : null}

      {step2 ? (
        <Steps>
          <Step status='finish' title='Login' icon={<UserOutlined />} />
          <Step status='finish' title='Shipping' icon={<SolutionOutlined />} />
          <Step status='process' title='Payment' icon={<LoadingOutlined />} />
          <Step status='wait' title='Done' icon={<SmileOutlined />} />
        </Steps>
      ) : null}

      {step3 ? (
        <Steps>
          <Step status='finish' title='Login' icon={<UserOutlined />} />
          <Step status='finish' title='Shipping' icon={<SolutionOutlined />} />
          <Step status='finish' title='Payment' icon={<CreditCardOutlined />} />
          <Step status='wait' title='Done' icon={<SmileOutlined />} />
        </Steps>
      ) : null}
    </div>
  )
}

export default CheckoutSteps
