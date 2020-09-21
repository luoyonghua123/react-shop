import React, { Component } from 'react'
import { Card, Button,Table,Modal,message } from 'antd'
import categoryApI from '../../api/category'
import UpdateForm from './update-add-form'
export default class category extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        data:[],
        showStatus:0
        
     }
   }
   
  initColumns=()=>{
    this.columns = [
    { title: '分类名称', dataIndex: 'name', key: 'name' },
   
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (categorys) => <Button type='primary' onClick={()=>{
         console.log(categorys);
        this.categorys=categorys
        this.setState({
          showStatus:2
        })
      }}>编辑</Button>,
    },
  ];
  }
  initData=async()=>{
    let res=await categoryApI.list();
    // console.log(res.data.data);
 
    
    this.setState({
      data:res.data.data
    })    
    
  }
  UNSAFE_componentWillMount (){
    this.initData();
    this.initColumns();
   
  }
  handleOk=async()=>{
    const values = await this.form.validateFields();
    console.log(values);
    console.log(this.state.showStatus);
    const {categoryName}=values;
    const actionText=this.state.showStatus===1?'添加':'修改'
    // 添加
    if(this.state.showStatus===1){
      const res=await categoryApI.create({name:categoryName,keyword:'test'});
      console.log(res);
      this.setState(
        { showStatus: 0 }
      )
    }else if(this.state.showStatus===2){
      const categorys = this.categorys
      // console.log(categorys._id);
      
      await categoryApI.update({ id: categorys._id, name: categoryName, keyword: 'test'})
      this.setState(
        { showStatus: 0 }
      )
      
    }
    this.initData();
    message.success(actionText+`分类成功`)
  }
  handleCancel=()=>{
    this.setState(
     { showStatus:0}
    )
    this.categorys = {}

  }
  render() {
   const categorys=this.categorys || {}
    return (
      <Card
        extra={<Button type='primary' onClick={()=>{
          this.categorys = {}

          this.setState({
            showStatus:1
          })
        }} >添加</Button>} 
      >
        <Table
        columns={this.columns}
          dataSource={this.state.data}
          rowKey='_id'
          pagination={{ defaultPageSize:2,showQuickJumper:true}}
        ></Table>
        <Modal
          destroyOnClose={true}
          title={this.state.showStatus===1?'添加分类':'修改分类'}
          visible={this.state.showStatus!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={categorys} setForm={form=>this.form=form}></UpdateForm>
        </Modal>
      </Card>
    )
  }
}
