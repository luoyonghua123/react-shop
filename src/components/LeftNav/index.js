import React, { Component } from 'react'
import {Layout,Menu} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import menusConfig from '../../config/menuList'
import './index.less'
import {
  UserOutlined,
   DesktopOutlined
} from '@ant-design/icons';
const {Sider} = Layout
const {SubMenu}=Menu
 class LeftNav extends Component {
  getMenuList(menusConfig){
    const path=this.props.history.location.pathname
    return menusConfig.map(item=>{
      if(!item.children){
        return(
          <Menu.Item key={item.key} icon={<DesktopOutlined />}>
           <Link to={item.key}>
              <span>{item.title}</span>
           </Link>
          </Menu.Item>
        )
      }else{
        const citem = item.children.find(cItem => cItem.key===path);
        if(citem){
          this.openKey=item.key;
        }
        return(
          <SubMenu key={item.key} icon={<UserOutlined />} title={item.title}>
            {this.getMenuList(item.children)}
          </SubMenu>
        )
      }
    })
  }
   UNSAFE_componentWillMount(){
    this.menuList = this.getMenuList(menusConfig)
  }
  render() {
    // console.log(this.props);
    let defaultKey = this.props.history.location.pathname
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo">
          <Link className='left-nav-link' to='/home'>
          <img  src={Logo} alt=""/>
          <h1>我的后台</h1>
          </Link>
          <Menu theme="dark" selectedKeys={defaultKey} defaultOpenKeys={this.openKey} mode="inline">
            {this.menuList}
            {/* <Menu.Item key="1"  >
              <Link to='/home'>
                <HomeOutlined />
                首页
              </Link>
             
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} /> */}
          </Menu>
        </div>
       
      </Sider>
    )
  }
}

export default withRouter(LeftNav)
