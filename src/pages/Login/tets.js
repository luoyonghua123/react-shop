import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { withRouter } from "react-router-dom";
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

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  onFinish = async values => {

    let res = await admin.login({ nickname: 'qwe123', password: 'qwe123' })
    console.log(res);
    console.log(values);

    let user = res.data.data
    storageUtil.saveUser(user)
    this.props.history.replace('/admin')
    message.success('登录成功')
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {

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
            initialValues={{
              remember: true,
            }}
            onSubmitCapture={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              initialValue='qwe123'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true
                },
                {
                  min: 4,
                  message: '用户名不能少于4位'
                },
                {
                  max: 12,
                  message: '用户名不能大于12位'
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              initialValue='qwe123'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                  whitespace: true
                },
                {

                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
        </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);








export default class addUpdate extends Component {
  componentWillMount() {
    this.isUpdate = false

  }
  render() {
    const title = (
      <span>
        <Button type='link' onClick={() => {
          this.props.history.goBack()
        }}>
          <LeftOutlined />
        </Button>
        <span>{this.isUpdate ? '修改商品' : '添加商品'}</span>
      </span>


    )
    return (
      <Card
        title={title}>

      </Card>
    )
  }
}
