import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {Button, Drawer, Dropdown} from 'antd'
import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'

const MenuDrawerMobile = ({menu, menuAdmin, userInfo}) => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <MenuOutlined
        className='flex-right'
        onClick={showDrawer}
        style={{fontSize: '32px', color: 'white'}}
      />

      <Drawer
        title='Basic Drawer'
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}>
        <NavLink
          to='/cart'
          activeStyle={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          <div className='header-cart' style={{color: 'black'}}>
            <ShoppingCartOutlined />
            &ensp; Cart
          </div>
        </NavLink>

        {userInfo ? (
          <Dropdown
            overlay={userInfo.isAdmin ? menuAdmin : menu}
            placement='bottomLeft'
            arrow
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: ' none',
            }}>
            <Button>{userInfo.name}</Button>
          </Dropdown>
        ) : (
          <NavLink
            to='/login'
            activeStyle={{
              fontWeight: 'bold',
              color: 'white',
            }}>
            <div className='header-user'>
              <UserOutlined />
              &ensp; Sign in
            </div>
          </NavLink>
        )}
      </Drawer>
    </>
  )
}

export default MenuDrawerMobile
