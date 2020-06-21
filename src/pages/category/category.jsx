import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button/'
import AddUpdateForm from './add-update-form'

export default class Category extends Component {
  
  formRef = React.createRef()
  
  state = {
    categorys: [],
    loading: false,
    showStatus: 0
  }

  initColums = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => <LinkButton onClick={() => {
            this.category = category
            this.setState({showStatus: 2})
          }}>修改分类</LinkButton>,
      },
    ];
  }

  getCategorys = async() => {
    this.setState({ loading: true })
    const result = await reqCategorys()
    this.setState({ loading: false })
    if (result.status===0) {
      const categorys = result.data
      this.setState({
        categorys
      })
    } else {
      message.error('获取分类数据失败')
    }
  }


  handleOk = async() => {

    const categoryName = this.formRef.current.formRef.current.getFieldsValue().categoryName
    const { showStatus } = this.state
    let result
    if(showStatus===1) {
      result = await reqAddCategory(categoryName)

    } else {
      const categoryId = this.category._id
      result = await reqUpdateCategory({ categoryId, categoryName })
    }

    const action = showStatus===1 ? '添加' : '修改'

    this.setState({ showStatus: 0 })

    if (result.status===0){
        this.getCategorys()
        message.success(action + '分类成功')
     } else {
        message.error(action + '分类失败')
     } 
  }

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  componentWillMount () {
    this.initColums()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categorys, loading, showStatus } = this.state

    const category  = this.category || {}

    const extra = (
      <Button type="primary" onClick={() => {
        this.category = {}
        this.setState({showStatus: 1}) 
      }}>
        <PlusOutlined/>
        添加
      </Button>
    )

    return (
        <Card extra={extra}>
          <Table
            columns={this.columns}
            dataSource={categorys}
            bordered
            rowKey="_id"
            loading={loading}
            pagination={{ defaultPageSize: 6, showQuickJumper: true }}
          />

          <Modal
            title={showStatus === 1 ? "添加分类" : "修改分类"}
            visible={showStatus!==0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm ref={this.formRef} categoryName={category.name}/>
          </Modal>
      </Card>
    )
  }
}