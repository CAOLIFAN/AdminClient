import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import { formateDate } from "../../utils/dateUtils"
import LinkButton from "../../components/link-button/index"
import {reqDeleteUser, reqUsers, reqAddUpdateUser} from "../../api/index";
import UserForm from './user-form'


export default class User extends Component {

  state = {
    users: [],
    roles: [],
    isShow: false
  }

  constructor (props) {
    super(props)
    this.userFormRef = React.createRef()
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: role_id => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ]
  }

  showAdd = () => {
    this.user = null
    this.setState({isShow: true})
  }

  showUpdate = (user) => {
    this.user = user
    this.setState({
      isShow: true
    })
  }

  deleteUser = (user) => {
    Modal.confirm({
      title: '确认删除${user.username}吗?',
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功')
          this.getUsers()
        } else {
          message.error(result.msg)
        }
      }
    })
  }

  addUpdateUser = async() => {

    this.setState({isShow: false})

    const { user } = this
    user.username = this.userFormRef.current.userFormRef.current.getFieldsValue().username

    console.log(user.username)

    // const result = await reqAddUpdateUser(user)

    // if (result.status===0) {
    //   message.success('添加/更新用户成功')
    //   this.getUsers()
    // } else {
    //   message.error(result.msg)
    // } 
  }

  getUsers = async() => {
    const result = await reqUsers()
    if (result.status===0) {
      const {users, roles} = result.data

      this.roleNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})

      this.setState({
        users,
        roles
      })
    }
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getUsers()
  }


  render() {

    const { users, roles, isShow } = this.state

    const user = this.user || {}

    const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{defaultPageSize: 2}}
        />

        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addUpdateUser}
          onCancel={() => {
            this.setState({isShow: false})
          }}
        >
          <UserForm ref={this.userFormRef} roles={roles} user={user} />
        </Modal>
      </Card>
    )
  }
}