import {Col, Form, Row} from 'antd'
import React from 'react'

const FormContainer = ({children}) => {
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  }

  return (
    <Row>
      <Col
        style={{margin: 'auto'}}
        lg={{span: 12}}
        md={{span: 18}}
        xs={{span: 24}}>
        <Form {...layout} layout='vertical'>
          {children}
        </Form>
      </Col>
    </Row>
  )
}

export default FormContainer
