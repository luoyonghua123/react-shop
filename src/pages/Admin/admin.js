import React, { Component } from 'react'
import storageUtil from "../../util/storageUtil";
import LeftNav from '../../components/LeftNav/index'
import {Route,Switch,Redirect} from 'react-router-dom'
import './admin.css'
import { Layout } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
 
// } from '@ant-design/icons';

import Home from '../Home/home'
import Products from '../Products/products'
import Role from '../Role/role'
import User from '../User/user'
import Category from '../Category/category'
import MHeader from '../../components/MHeader/index'


const { Header, Content,Footer } = Layout;
export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };  
  render() {
    const user = storageUtil.getUser();
    if(!user.nickname){
      return <Redirect to="/login"/>
    }
    return (
      <Layout style={{height:'100%'}}>
        <LeftNav collapsed={this.state.collapsed}>
          
        </LeftNav>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <MHeader></MHeader>
           
            
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Products}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/user' component={User}></Route>
              <Redirect to='/home'></Redirect>

            </Switch>
         
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
