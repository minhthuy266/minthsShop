import { Button, Col, Empty, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer/FormContainer";
import { Loader } from "../../components/UI Handler/Loader/Loader";
import { Message } from "../../components/UI Handler/Message/Message";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        {message && <Message message={message} type="error" />}
        {error && <Message message={error} type="error" />}
        {success && (
          <Message
            message={success}
            type="success"
            description="Profile Updated"
          />
        )}
        {loading && <Loader />}
        <FormContainer>
          <h1>User Profile</h1>
          <Form.Item label="Name" name="name" initialValue={userInfo?.name}>
            <Input
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Email" name="email" initialValue={userInfo?.email}>
            <Input
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="confirm" label="Confirm Password">
            <Input.Password
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Update
            </Button>
          </Form.Item>
        </FormContainer>
      </Col>

      <Col
        lg={{ span: 12, offset: 0 }}
        md={{ span: 21, offset: 2 }}
        xs={{ span: 23, offset: 1 }}
      >
        <h2>My Order (Unavailable Function)</h2>
        <Empty style={{ marginTop: "6rem" }} />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
