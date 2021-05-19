import {
  ShoppingCartOutlined,
  SketchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {Button, Col, Drawer, Dropdown, Menu, Row} from 'antd'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, Route} from 'react-router-dom'
import {logout} from '../../actions/userActions'
import SearchBox from '../SearchBox/SearchBox'
import './HeaderPage.css'

const HeaderPage = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to='/profile'>Profile</NavLink>
      </Menu.Item>

      <Menu.Item onClick={logoutHandler}>
        <NavLink to='/'>Log out</NavLink>
      </Menu.Item>
    </Menu>
  )

  const menuAdmin = (
    <Menu>
      <Menu.Item>
        <NavLink to='/profile'>Profile</NavLink>
      </Menu.Item>

      <Menu.Item>
        <NavLink to='/admin/userlist'>Users</NavLink>
      </Menu.Item>

      <Menu.Item>
        <NavLink to='/admin/productlist'>Products</NavLink>
      </Menu.Item>

      <Menu.Item>
        <NavLink to='/admin/orderlist'>Orders</NavLink>
      </Menu.Item>

      <Menu.Item onClick={logoutHandler}>
        <NavLink to='/'>Log out</NavLink>
      </Menu.Item>
    </Menu>
  )

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Row>
        <Col
          lg={{span: 4, offset: 0}}
          md={{span: 6, offset: 0}}
          xs={{span: 0, offset: 0}}>
          <NavLink to='/'>
            <div className='logo-page'>
              <SketchOutlined style={{fontSize: '30px'}} />
              &ensp;
              <span className='brand-page hide-on-mobile'> MINTH'S SHOP</span>
            </div>
          </NavLink>
        </Col>

        <Col
          lg={{span: 8, offset: 2}}
          md={{span: 10, offset: 0}}
          xs={{span: 12, offset: 0}}>
          <Route render={({history}) => <SearchBox history={history} />} />
        </Col>

        <Col
          lg={{span: 3, offset: 5}}
          md={{span: 2, offset: 2}}
          xs={{span: 2, offset: 3}}>
          <NavLink
            to='/cart'
            activeStyle={{
              fontWeight: 'bold',
              color: 'white',
            }}>
            <div className='header-cart'>
              <ShoppingCartOutlined
                className='icon-header'
                style={{fontSize: '18px'}}
              />
              <span className='hide-on-mobile hide-on-desktop-tablet font-15'>
                &nbsp; Cart
              </span>
              <span>
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </span>
            </div>
          </NavLink>
        </Col>

        <Col
          lg={{span: 2, offset: 0}}
          md={{span: 0, offset: 0}}
          xs={{span: 0, offset: 0}}>
          {userInfo ? (
            <Dropdown
              overlay={userInfo.isAdmin ? menuAdmin : menu}
              placement='bottomLeft'
              arrow>
              <div className='header-user font-15'>{userInfo.name}</div>
            </Dropdown>
          ) : (
            <NavLink
              to='/login'
              activeStyle={{
                fontWeight: 'bold',
                color: 'white',
              }}>
              <div className='header-user'>
                <UserOutlined
                  className='icon-header font-15'
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                />
                <span>&ensp; Sign in</span>
              </div>
            </NavLink>
          )}
        </Col>

        <Col
          lg={{span: 0, offset: 0}}
          md={{span: 4, offset: 0}}
          xs={{span: 7, offset: 0}}>
          {userInfo ? (
            <>
              <Button type='text' onClick={showDrawer} style={{color: 'white'}}>
                {userInfo.name}
              </Button>
              <Drawer
                title={userInfo.name}
                placement='right'
                closable={false}
                onClose={onClose}
                visible={visible}>
                {userInfo.isAdmin ? (
                  <>
                    <p onClick={onClose}>
                      <NavLink to='/profile'>Profile</NavLink>
                    </p>

                    <p onClick={onClose}>
                      <NavLink to='/admin/userlist'>Users</NavLink>
                    </p>

                    <p onClick={onClose}>
                      <NavLink to='/admin/productlist'>Products</NavLink>
                    </p>

                    <p onClick={onClose}>
                      <NavLink to='/admin/orderlist'>Orders</NavLink>
                    </p>
                  </>
                ) : (
                  <p onClick={onClose}>
                    <NavLink to='/profile'>Profile</NavLink>
                  </p>
                )}

                <p onClick={logoutHandler}>
                  <NavLink onClick={onClose} to='/'>
                    Log out
                  </NavLink>
                </p>
              </Drawer>
            </>
          ) : (
            <NavLink
              to='/login'
              activeStyle={{
                fontWeight: 'bold',
                color: 'white',
              }}>
              <div className='header-user'>
                <UserOutlined
                  className='icon-header'
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                />
                <span>&ensp; Sign in</span>
              </div>
            </NavLink>
          )}
        </Col>
      </Row>
    </>
  )
}

export default HeaderPage
