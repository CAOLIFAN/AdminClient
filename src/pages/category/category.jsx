import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';

import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button/'
import AddUpdateForm from './add-update-form'

export default class Category extends Component {
  
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

  componentWillMount () {
    this.initColums()
  }

  componentDidMount() {
    this.getCategorys()
  }

  handleOk = () => {

    this.form.validateFields(async(err, values) => {
      if(!err) {
        const { categoryName } = values
        const result = await reqAddCategory(categoryName)
        this.setState({ showStatus: 0 })
      
        if (result.status===0){
          this.getCategorys()
          message.success('添加分类成功')
        } else {
          message.error('添加分类失败')
        }
      }  
    })
  }

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  render() {

    const { categorys, loading, showStatus } = this.state

    const category = this.category || {}

    const extra = (
      <Button type="primary" onClick={() => { this.setState({showStatus: 1}) }}>
        <PlusOutlined />
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
            <AddUpdateForm setForm={form => this.form = form} categoryName={category.name}/>
          </Modal>
      </Card>
    )
  }
}