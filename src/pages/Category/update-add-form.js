import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
function FormInput(props) {
  const [form] = Form.useForm();
  const { name } = props.categoryName;
  const categoryName = name ? name : '';
  useEffect(() => {
    props.setForm(form);
  })
  return (
    <Form  form={form}>
      <Form.Item
        name='categoryName'
        initialValue={categoryName}
        rules={[{
          required: true,
          message: '分类名称必须输入'
        }]
        }
      >
        <Input type='text' placeholder='请输入分类名称' />
      </Form.Item>
    </Form>
  )
}
export default FormInput