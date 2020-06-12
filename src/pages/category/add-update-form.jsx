import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class AddUpdateForm extends Component {
    render() {
        return (
            <Form>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '分类名称必须输入' }]}>
                    <Input type="text" placeholder="请输入分类名称"></Input>
                </Form.Item>
            </Form>
        )
    }
}
