import React, { useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import qs from 'qs'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  
} from 'antd';
import { LeftOutlined  } from '@ant-design/icons';
import category from '../../api/category'
import PictureWall from './pictureWall'
import articleApi from '../../api/article'
import saveProduct from '../../config/saveProduct'
const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const RegistrationForm = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  
  const [isUpdate, setisUpdate] = useState(true);
  const [initDetail, setinitDetail] = useState({});
  
 
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log(history.location);
    const query=qs.parse(history.location.search,{
      ignoreQueryPrefix:true,//去掉问号
    })
   
    
    categoryList()
  }, []);
  useEffect(() => {
    if(initDetail){
      // console.log(initDetail.category_id);
      const proData=JSON.parse(localStorage.getItem('productDetail'))|| ''
      console.log(proData.cover);
      
      localStorage.setItem('imgUrl', proData.cover)
       const proCategoryid=proData.category_id|| ''
      form.setFieldsValue({
        title: initDetail.title,
        author: initDetail.author,
        category_id: proCategoryid._id || '',
        keyword: initDetail.keyword,
        description: initDetail.description,
        content: initDetail.content
      })
      console.log('数据存在');
      
      setisUpdate(true)
    }else{
      setisUpdate(false)
      console.log('数据不存在');

    }
   
  })
  useEffect(() => {
    
    initForm()
  }, []);
  
  const categoryList = async () => {
    const res = await category.list()
    setData(res.data.data);
  }
  const initForm=async () =>{
   await setinitDetail(JSON.parse(localStorage.getItem('productDetail')))
  }
  const onFinish =async values => {
    const url=localStorage.getItem('imageUrl')
    values.cover=url
    console.log('Received values of form: ', values);
    if (!initDetail){
      //添加
      const res=await articleApi.create(values)
      console.log(res);
      history.push("/product");
    }else{
      const id=JSON.parse(localStorage.getItem('productDetail'))._id
      console.log(id);
      values.id=id
      const res = await articleApi.update(values)
      console.log(res);
      history.push("/product");
    }
    
    // console.log(isUpdate);
    // setisUpdate(true);
    // console.log(isUpdate);

   
    

  };

  const title = (
    <span>
      <Button type='link' onClick={() => {
        history.goBack()
      }}>
        <LeftOutlined />
      </Button>
      <span>{isUpdate ? '修改商品' : '添加商品'}</span>
    </span>


  )

  

  

  

  return (

   <Card title={title}>
    
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="标题"
         
          rules={[
            {
              required: true,
              message: '文章标题不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>

          <Form.Item
          name="author"
          label="作者"
          rules={[
            {
              required: true,
              message: '作者名称不为空',
            },
          ]}

        >
          <Input />
        </Form.Item> 
        <Form.Item
          name="category_id"
          label="商品分类:"
          rules={[
            {
              required: true,
              message: '分类名称不为空',
            },
          ]}

        >
         <Select>
          <Option value=''>未选择</Option>
          {  
            data.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
          }
         </Select>
        </Form.Item>
        <Form.Item
         name='rcover'
          label="上传图片"
          

        >
          <PictureWall ></PictureWall>

        </Form.Item> 
        <Form.Item
          name="cover"
          label="原封面"
          // rules={[
          //   {
          //     required: true,
          //     message: '文章标题不能为空',
          //   },
          // ]}
        >
         
          <img style={{width:'100px',height:'100px'}} src={localStorage.getItem('imageUrl')}alt=""/>
           
         
       
        </Form.Item>
       
        <Form.Item
          name="keyword"
          label="关键字"
          rules={[
            {
              required: true,
              message: '文章标题不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
          rules={[
            {
              required: true,
              message: '文章标题不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="内容"
          rules={[
            {
              required: true,
              message: '文章标题不能为空',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            
            Register
        </Button>
        </Form.Item>




      </Form>
   </Card>
  );
};


export default RegistrationForm