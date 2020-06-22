import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import {
  Form,
  Input,
} from 'antd'

const Item = Form.Item

export default class AddForm extends PureComponent {

  addRef = React.createRef()

  static propTypes = {
    setForm: propTypes.func.isRequired,
    roleName: propTypes.string
  }

  componentDidUpdate() {
    this.addRef.current.setFieldsValue({
      roleName: this.props.roleName
    })
}

  render() {

    const { roleName } = this.props
    
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form ref={this.addRef}>
        <Item
          {...formItemLayout}
          label="角色名称" 
          name='roleName'
          initialValue={roleName}
          rules={[{ required: true, message: '必须输入角色名称' }]}
        >
          <Input type="text" placeholder="请输入角色名称"/>
        </Item>
      </Form>
    )
  }
}