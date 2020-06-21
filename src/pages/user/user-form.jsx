import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class UserForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {

    const {roles, user} = this.props    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    }

    return (
      <Form {...formItemLayout}>
        <Item 
          label='用户名'
          name='username'
          initialValue={user.username}
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder='请输入用户名'/>
        </Item>
  
        {
          user._id ? null : (
            <Item 
              label='密码'
              name='password'
              initialValue={user.password}
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input type='password' placeholder='请输入密码' /> 
            </Item>
          )
        }

        <Item 
          label='手机号'
          name='phone'
          initialValue={user.phone}
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input placeholder='请输入手机号'/>
        </Item>
        <Item 
          label='邮箱'
          name='email'
          initialValue={user.email}
        >
          <Input placeholder='请输入邮箱'/>
        </Item>
        <Item 
          label='角色'
          name='role_id'
          initialValue={user.role_id}
          rules={[{ required: true, message: '请指定角色' }]}
        >
          <Select>
            {
              roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
            }
          </Select>
        </Item>
      </Form>
    )
  }
}

export default UserForm