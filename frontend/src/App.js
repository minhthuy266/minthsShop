import {Col, Layout, Row, Space} from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import FooterPage from './components/FooterPage/FooterPage'
import HeaderPage from './components/HeaderPage/HeaderPage'
import CartScreen from './screens/CartScreen/CartScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import OrderListScreen from './screens/OrderListScreen/OrderListScreen'
import OrderScreen from './screens/OrderScreen/OrderScreen'
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'
import PlaceOrder from './screens/PlaceOrderScreen/PlaceOrderScreen'
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen'
import ProductListScreen from './screens/ProductListScreen/ProductListScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen/ShippingScreen'
import UserEditScreen from './screens/UserEditScreen/UserEditScreen'
import UserListScreen from './screens/UserListScreen/UserListScreen'

const {Header, Footer} = Layout
const App = () => {
  return (
    <Router>
      <Layout>
        <Space direction='vertical' size='large'>
          <Header className='header-page'>
            <HeaderPage />
          </Header>

          <Row className='main-content'>
            <Col span={24}>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/page/:pageNumber' component={HomeScreen} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
              />
              <Route path='/search/:keyword' component={HomeScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrder} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/productlist' component={ProductListScreen} />
              <Route path='/admin/orderlist' component={OrderListScreen} />

              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
              />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            </Col>
          </Row>

          <Footer>
            <FooterPage />
          </Footer>
        </Space>
      </Layout>
    </Router>
  )
}

export default App
