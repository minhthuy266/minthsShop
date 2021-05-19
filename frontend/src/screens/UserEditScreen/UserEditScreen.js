import {Button, Checkbox, Form, Input} from 'antd'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUserDetails, updateUser} from '../../actions/userActions'
import FormContainer from '../../components/FormContainer/FormContainer'
import {Loader} from '../../components/UI Handler/Loader/Loader'
import {Message} from '../../components/UI Handler/Message/Message'
import {USER_UPDATE_RESET} from '../../constants/userConstants'

const UserEditScreen = ({match, history}) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const {loading, error, user} = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: USER_UPDATE_RESET})
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id: userId, name, email, isAdmin}))
  }

  return (
    <>
      <Link to='/admin/userlist'>
        <Button>Go Back</Button>
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message type='error' description={errorUpdate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type='error' description={error} />
        ) : (
          <>
            <Form>
              <Form.Item label='Name' name='name' initialValue={user.name}>
                <Input
                  placeholder='Enter name'
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item label='Email' name='email' initialValue={user.email}>
                <Input
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Checkbox
                onChange={(e) => setIsAdmin(e.target.checked)}
                checked={isAdmin}>
                Is Admin
              </Checkbox>
            </Form>

            <Button type='primary' htmlType='submit' onClick={submitHandler}>
              Update
            </Button>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
