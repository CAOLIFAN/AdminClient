import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button'
import PicturesWall from './picture-wall'
import { reqCategorys } from '../../api'
import memoryUtils from '../../utils/memoryUtils';

const Item = Form.Item
const Option = Select.Option

class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  constructor(props) {
    super(props)
    this.pwRef = React.createRef()
  }

  getCategorys = async() => {
    const result = await reqCategorys()
    if (result.status === 0) {
      const categorys = result.data
      this.setState({ categorys })
    }
  }

  validatePrice = (rule, value, callback) => {
    if(value==='') {
        callback()
    }
    if(value<=0) {
        callback('价格必须大于0')
    } else {
        callback()
    }
  }

  componentWillMount () {
    this.product = memoryUtils.product
    this.isUpdate = !!this.product._id
  }

  componentDidMount () {
    this.getCategorys()
  }

  render() {

    const onFinish = async(values) => {
      const name = values.name
      const desc = values.desc
      const price = values.price
      const categoryId = values.categoryId
      console.log('发送请求', name, desc, price, categoryId)
      const imgs = this.pwRef.current.getImgs()
      console.log('imgs', imgs)
    }

    const { categorys } = this.state
    const { isUpdate, product } = this

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
            <ArrowLeftOutlined/>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    const formLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 }
    }

    return (
        <Card title={title}>
            <Form {...formLayout} onFinish={onFinish}>
                <Item 
                    label="商品名称"
                    name={'name'}
                    initialValue={product.name}
                    rules={[{ required: true, message: '请输入商品名称'}]}
                >
                    <Input placeholder="商品名称"/>
                </Item>
                <Item 
                    label="商品描述"
                    name={'desc'} 
                    initialValue={product.desc}
                    rules={[{ required: true, message: '请输入商品描述'}]}
                >
                    <Input placeholder="商品描述"/>
                </Item>
                <Item 
                    label="商品价格"
                    name={'price'}
                    initialValue={product.price}
                    rules={[
                        { required: true, message: '请输入商品价格'},
                        { validator: this.validatePrice }
                    ]}
                >
                    <Input type="number" placeholder="商品价格" addonAfter="元"/>
                </Item>
                <Item 
                    label="商品分类"
                    name={'categoryId'}
                    initialValue={product.categoryId || ''}
                    rules={[{ required: true, message: '请输入商品分类'}]}
                >
                <Select>
                    <Option value=''>未选择</Option>
                    {
                        categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                    }
                </Select>
                </Item>
                <Item label="商品图片">
                <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
                </Item>
                <Item label="商品详情">
                    <div>商品详情组件</div>
                </Item>
                <Item>
                    <Button type='primary' htmlType="submit">提交</Button>
                </Item>
            </Form>
        </Card>
    )
  }
}

export default ProductAddUpdate