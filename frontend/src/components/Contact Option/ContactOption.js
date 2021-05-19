import {Col, Row} from 'antd'
import React from 'react'
import './ContactOption.css'

function ContactOption() {
  return (
    <div>
      <Row className='section-title'>Contactless shopping options</Row>

      <Row>
        <Col
          className='contactless-option'
          lg={{span: 11, offset: 0}}
          md={{span: 11, offset: 0}}
          xs={{span: 24, offset: 0}}>
          <div>
            <img
              src='https://target.scene7.com/is/image/Target/Delivery_SB_1200x300-201030-1604068255716?wid=1110&qlt=80&fmt=webp'
              alt=''
            />
          </div>

          <div className='contactless-option__description'>
            Your Shipt shopper will leave your order right at your doorstep.
            Begin your <span className='emphasize-text'>free 4-week</span> trial
            or pay $9.99 per delivery.
          </div>
        </Col>

        <Col
          className='contactless-option'
          lg={{span: 11, offset: 2}}
          md={{span: 11, offset: 2}}
          xs={{span: 24, offset: 0}}>
          <div>
            <img
              src='https://target.scene7.com/is/image/Target/DU_300223316-200402_1585835841851?wid=1110&qlt=60&fmt=webp'
              alt=''
            />
          </div>

          <div className='contactless-option__description'>
            <span className='emphasize-text'>Always free. </span> Choose Order
            Pickup for your items. Then, when your order is ready, switch to
            curbside Drive Up in the Target app.
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ContactOption
