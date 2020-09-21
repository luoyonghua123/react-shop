import React, { Component } from 'react';
import { Card, Button, Select, Input, Table } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import articleApI from '../../api/article'

import saveProduct from '../../config/saveProduct'
const Option = Select.Option
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchType: 'productName',

      inputValue: '',
      productList: [],
      data: [],
      productState: true,
      total: 0
    }
  }
  initColumns = () => {
    this.columns = [
      {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        render: (record) =>
          //   console.log("record的内容",record)
          <img src={record} width="100px" alt="" />
      },
      {
        title: '名称',
        dataIndex: 'title'
      },
      {
        title: '内容',
        dataIndex: 'content'
      },
      {
        title: '状态',
        render: () => {
          return (
            <span>
              <span>已下架</span>
              <Button>上架</Button>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: (value) => {
         
          
          return (
            <span>
              <Button onClick={()=>{
                this.props.history.push('/product/detail/'+value._id)
              }} type='link' style={{ marginRight: '5px' }}>详情</Button>
              <Button type='link' onClick={()=>{
                saveProduct.product=value

                console.log(saveProduct.product);
                localStorage.setItem('productDetail', JSON.stringify(value))
                this.props.history.push({
                  pathname:'/product/addUpdate',
                  search:'?productId='+value._id
                })
              }}>修改</Button>
            </span>


          )
        }
      }
    ]

  }
  initData = async () => {
    const res = await articleApI.list();
    // console.log(res);
    

    this.setState({
      productList: res.data.data.articleList,
      total: res.data.data.articleList.length
    })

  }
  UNSAFE_componentWillMount() {
    this.initColumns();
    this.initData();
  }
  render() {
    const { searchType } = this.state
    const title = (
      <span>
        <Select value={searchType} onChange={(value) => { this.setState({ searchType: value }) }}>
          <Option value='productName'>按关键词搜索</Option>
          <Option value='productContent'>按内容搜索</Option>
        </Select>
        <Input placeholder='输入关键字'
          style={{ width: '200px', marginLeft: '10px' }}
          value={this.state.searchName}
          onChange={(e) => { this.setState({ searchName: e.target.value }) }}
        />
        <Button type='primary' onClick={async () => {
          if (this.state.searchType === 'productName') {
            // console.log('按关键词搜索'+this.state.searchName);
            const res = await articleApI.list({ keyword: this.state.searchName });
            this.setState({
              productList: res.data.data.articleList,
              total: res.data.data.articleList.length
            })
            console.log(res);
          } else if (this.state.searchType === 'productContent') {
            const res = await articleApI.list({ content: this.state.searchName });
            this.setState({
              productList: res.data.data.articleList,
              total: res.data.data.articleList.length
            })
            console.log(res);
          }
        }}>
          搜索
        </Button>
      </span>

    )

    return (
      <Card
        title={title}
        extra={<Button onClick={()=>{
          localStorage.removeItem('productDetail');
          this.props.history.push('/product/addUpdate')
        }}><PlusCircleTwoTone />添加商品</Button>}
      >
        <Table
          dataSource={this.state.productList}
          columns={this.columns}
          rowKey='_id'
          bordered
          pagination={{
            total: this.state.total,
            defaultPageSize: 2,
            showQuickJumper: true
          }}
        >

        </Table>
      </Card>

    );
  }
}

export default Home;