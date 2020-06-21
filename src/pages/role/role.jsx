import React, { PureComponent } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from "../../utils/Constants"
import AddForm from './add-form'
import AuthForm from './auth-form'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqAddRole, reqUpdateRole, reqRoles } from '../../api'

export default class Role extends PureComponent {

  formRef = React.createRef()

  state = {
    roles: [],
    isShowAdd: false,
    isShowAuth: false,
  }

  constructor (props) {
    super(props)
    this.authRef = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton> 
      },
    ]
  }

  showAuth = (role) => {
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  addRole = async() => {
    
    this.setState({
      isShowAdd: false
    })

    const roleName = this.formRef.current.formRef.current.getFieldsValue().roleName
    const result = await reqAddRole(roleName)
    if (result.status===0) {
      message.success('添加角色成功') 
      this.getRoles()
      } else {
        message.error(result.msg)
    }
  }

  updateRole = async () => {
    this.setState({
      isShowAuth: false
    })

    const {role} = this
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      message.success('角色授权成功')
      this.getRoles()
    } else {
      message.error(result.msg)
    }
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    console.log('role render()')
    const { roles, isShowAdd, isShowAuth } = this.state
    const role = this.role || {}

    const title = (
      <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>
        创建角色
      </Button>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            // this.form.resetFields()
          }}
        >
          <AddForm ref={this.formRef}/>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    )
  }
}
