import React, { Component } from 'react'
import { Card, Button, Table, Modal } from 'antd';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button/'
import AddUpdateForm from './add-update-form'


const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
    
  },
  {
    title: '操作',
    width: 300,
    render: () => <LinkButton>修改分类</LinkButton>,
  },
];

const data = [
  {
    "_id": '1',
    "name": "a",
  },
  {
    "_id": '2',
    "name": "b",
  },
  {
    "_id": '3',
    "name": "c",
  },
];

export default class Category extends Component {
  
  state = {
    showStatus: 0,
  }

  handleOk = () => {

  }

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  render() {

    const { showStatus } = this.state

    const extra = (
      <Button type="primary" onClick={() => { this.setState({showStatus: 1}) }}>
        <PlusOutlined />
        添加
      </Button>
    )

    return (
        <Card extra={extra}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            rowKey="_id"
            pagination={{defaultPageSize: 6, showQuickJumper: true}}
          />

          <Modal
            title={showStatus === 1 ? "添加分类" : "修改分类"}
            visible={showStatus!==0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm/>
          </Modal>
      </Card>
    )
  }
}
