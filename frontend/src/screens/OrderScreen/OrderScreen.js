import { Avatar, Card, Col, Divider, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import ButtonBack from "../../components/UI Handler/ButtonHandler/ButtonBack";
import { Loader } from "../../components/UI Handler/Loader/Loader";
import { Message } from "../../components/UI Handler/Message/Message";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    // Calculate prices

    const addDecimals = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axiosClientget("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPay) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error" description={error}></Message>
  ) : (
    <>
      <ButtonBack linkTo="/payment" />

      <CheckoutSteps step3 />

      <Row>
        <Col>
          <h2 className="section-title">Shipping</h2>
          <p>
            <strong> Order: </strong> {order._id}
          </p>
          <p>
            <strong>Name: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>{" "}
            <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
          </p>
          <p>
            <strong>Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},
            <p>
              {" "}
              Postal Code: {order.shippingAddress.postalCode}, Country:{" "}
              {order.shippingAddress.country}.
            </p>
          </p>

          {order.isDelivered ? (
            <Message
              type="success"
              description={`Delivered on ${order.deliveredAt}`}
            ></Message>
          ) : (
            <Message description="Not Delivered"></Message>
          )}
        </Col>
      </Row>

      <Divider plain />

      <Row>
        <Col>
          <h2 className="section-title">Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message
              type="success"
              description={`Paid on ${order.paidAt}`}
            ></Message>
          ) : (
            <Message description="Not Paid"></Message>
          )}
        </Col>
      </Row>

      <Divider plain />

      <Row>
        <Col lg={{ span: 16 }}>
          <h2 className="section-title">Order Items</h2>
          {order.orderItems.length === 0 ? (
            <Message description="Order is empty"></Message>
          ) : (
            <>
              {order.orderItems.map((item, index) => (
                <>
                  <Row key={index}>
                    <Col
                      lg={{ span: 4, offset: 0 }}
                      md={{ span: 4, offset: 0 }}
                      xs={{ span: 8, offset: 0 }}
                    >
                      <Avatar src={item.image} shape="square" />
                    </Col>

                    <Col
                      lg={{ span: 12, offset: 0 }}
                      md={{ span: 12, offset: 0 }}
                      xs={{ span: 14, offset: 2 }}
                      className="item-name"
                    >
                      <Link to={`/product/${item.product}`}>
                        <div>{item.name}</div>
                      </Link>
                    </Col>

                    <Col
                      lg={{ span: 7, offset: 1 }}
                      md={{ span: 6, offset: 2 }}
                      xs={{ span: 12, offset: 12 }}
                    >
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>

                  <Divider />
                </>
              ))}
            </>
          )}
        </Col>

        <Col
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12, offset: 10 }}
          xs={{ span: 24, offset: 0 }}
        >
          <Card title="ORDER SUMMARY">
            <Row>
              <Col span={12}>Items</Col>
              <Col span={12}>$ {order.itemsPrice}</Col>
            </Row>

            <Row>
              <Col span={12}>Shipping</Col>
              <Col span={12}>$ {order.shippingPrice}</Col>
            </Row>

            <Row>
              <Col span={12}>Tax</Col>
              <Col span={12}>$ {order.taxPrice}</Col>
            </Row>

            <Row>
              <Col span={12}>Total</Col>
              <Col span={12}>$ {order.totalPrice}</Col>
            </Row>

            <Divider />

            {!order.isPaid && (
              <Row justify="center">
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
