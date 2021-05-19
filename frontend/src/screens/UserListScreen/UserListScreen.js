import {Button, Col, Divider, Row} from 'antd'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser, listUsers} from '../../actions/userActions'
import {Loader} from '../../components/UI Handler/Loader/Loader'
import './UserListScreen.css'

const UserListScreen = ({history}) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const {loading, error, users} = userList

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const {success: successDelete} = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader type='error' description={error} />
      ) : (
        <>
          <Row>
            <Col lg={{span: 6}} md={{span: 7}} xs={{span: 0}}>
              ID
            </Col>
            <Col lg={{span: 4}} md={{span: 3}} xs={{span: 0}}>
              NAME
            </Col>
            <Col lg={{span: 4}} md={{span: 5}} xs={{span: 0}}>
              EMAIL
            </Col>
            <Col lg={{span: 4}} md={{span: 4}} xs={{span: 0}}>
              ADMIN
            </Col>
            <Col lg={{span: 6}} xs={{span: 0}}></Col>
          </Row>

          <Divider />

          {users.map((user) => (
            <>
              <Row key={user._id}>
                <Col lg={{span: 6}} md={{span: 7}} xs={{span: 24}}>
                  <span className='hide-on-desktop-tablet'>ID: </span>
                  {user._id}
                </Col>
                <Col lg={{span: 4}} md={{span: 3}} xs={{span: 24}}>
                  <span className='hide-on-desktop-tablet'>NAME: </span>
                  {user.name}
                </Col>
                <Col lg={{span: 4}} md={{span: 5}} xs={{span: 24}}>
                  <span className='hide-on-desktop-tablet'>EMAIL: </span>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </Col>
                <Col
                  lg={{span: 4, offset: 0}}
                  md={{span: 3, offset: 1}}
                  xs={{span: 24}}>
                  <span className='hide-on-desktop-tablet'>IS ADMIN: </span>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{color: 'green'}}></i>
                  ) : (
                    <i className='fas fa-times' style={{color: 'red'}}></i>
                  )}
                </Col>
                <Col
                  lg={{span: 6, offset: 0}}
                  md={{span: 4, offset: 0}}
                  xs={{span: 12, offset: 12}}>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button>
                      {' '}
                      <i className='fas fa-edit'></i>{' '}
                    </Button>
                  </Link>

                  <Button onClick={() => deleteHandler(user._id)}>
                    {' '}
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>

              <Divider />
            </>
          ))}
        </>
      )}
    </>
  )
}

export default UserListScreen
