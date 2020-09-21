import React from 'react';
import logo from '../../assets/images/logo.svg'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useHistory, withRouter } from "react-router-dom";
// import {withRouter } from "react-router-dom";
import admin from '../../api/admin'
import storageUtil from "../../util/storageUtil";
import './login.less'
// import { render } from 'less';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const Login = () => {
  let history = useHistory();
  const onFinish =async values => {
    let res = await admin.login({ nickname: values.username, password: values.password })
    console.log(res);
    console.log(values);

    let user = res.data.data
    storageUtil.saveUser(user)
   
    history.push("/admin");
    // console.log(this.props);
    
    message.success('登录成功')
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login'>
      <div className="login-header">
        <img src={logo} alt="" />
        <h1>React后台管理系统</h1>
      </div>
      <div className="login-content">
        <p>欢迎登录</p>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        initialValue='qwe123'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        initialValue='qwe123'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
  </div>
  );
};

export default withRouter(Login);