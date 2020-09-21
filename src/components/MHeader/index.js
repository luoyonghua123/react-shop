import React, { Component } from 'react'
import {Layout,Button,Modal, message} from 'antd'
import { withRouter } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
// import axios from 'axios'
import menuList from '../../config/menuList'
import storageUtil from '../../util/storageUtil'
const { confirm } = Modal;

const {Header} = Layout

 class index extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        currentTime:new Date().toLocaleString()
     }
   }
   UNSAFE_componentWillMount(){
    //  console.log(JSON.parse(localStorage.getItem('user_key')).nickname );
     
   }
   componentDidMount(){
     this.timer=setInterval(() => {
       this.setState({
         currentTime: new Date().toLocaleString()
       })
     }, 1000);
   }
   componentWillUnmount(){
     clearInterval(this.timer)
   }
  logout=()=>{
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk :()=> {
        storageUtil.removeUser();
       message.warning('退出成功');
       console.log('ok');
       this.props.history.replace('/login')
      },
      onCancel() {
        message.success('取消操作')
        console.log('Cancel');
      },
    });
    // alert('退出登录')
  }
 
   getTitle=()=>{
     let title='';
     let path=this.props.history.location.pathname;
    menuList.forEach(item=>{
      if(path===item.key){
        title=item.title
      }else if(item.children){
       let citem= item.children.find(citem=>path===citem.key)
        if(citem){
          title=citem.title
        }
      }
    })
     return title
   }
   getWeather=async()=>{
    
     
   }
   getName=()=>{
     const username= JSON.parse(localStorage.getItem('user_key')).nickname;
     if(!username){
       this.props.history.push('/login');
       return ''
     }else{
       return username
     }
   }
  render() {
    return (
      <Header style={{background:'#fff',padding:0}}>
        <div className="header">
          <h2 className='header-title'>{this.getTitle()}</h2>
          <div className="header-user">
            <div className="current-time">
              {this.state.currentTime}
            </div>
            <div className='weather'>
              天气晴
            </div>
            <div className="userInfo">
              <span>
                欢迎{this.getName()}登录
              </span>
              <Button onClick={this.logout}>退出</Button>
            </div>
          </div>
        </div>
      </Header>
    )
  }
}
export default withRouter(index)