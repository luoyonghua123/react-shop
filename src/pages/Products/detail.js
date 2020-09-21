import React, { Component } from 'react'
// import { Card } from 'antd'
import articleApI from '../../api/article'
import categoryApI from '../../api/category'
import { Card, Button,List } from 'antd'
import { LeftOutlined } from '@ant-design/icons';
export default class Detail extends Component {
  UNSAFE_componentWillMount (){
   this.initDetail()
  }
  initDetail=async()=>{
    let res = await articleApI.detail({ id: this.props.match.params.id })
    // console.log(res);
    const {category_id} = res.data.data.articleDetail
    if(category_id){
      const result=await categoryApI.detail({ id: category_id})
      // console.log(result);
      this.setState({
        categoryName: result.data.data.name
      })
    }
    
    this.setState({
      productDetail: res.data.data.articleDetail,
    
    })
    // console.log(res.data.data.articleDetail);
    
  }
  constructor(props) {
    super(props)

    this.state = {
      productDetail:[],
      categoryName: ''
    }
  }
  render() {
   
    const title=(
      <span>
        
        <Button type='link' onClick={()=>{
          this.props.history.goBack()
        }}>
          <LeftOutlined  />
        </Button>
        <span>商品详情</span>
      </span>
    )
    return (
     <Card title={title}
     >
       <List>
         <List.Item>
            <img alt="封面" src={this.state.productDetail.cover} style={{ width: '80px', height: '80px' }} />
         </List.Item>
          <List.Item>
            <div>{this.state.categoryName}</div>

          </List.Item>
       </List>
       
     </Card>
     
    )
  }
}
