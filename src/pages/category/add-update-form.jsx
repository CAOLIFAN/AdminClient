import React, { Component } from 'react'
import { Form, Input } from 'antd'
import propTypes from 'prop-types'

export default class AddUpdateForm extends Component {

    static propTypes = {
        setForm: propTypes.func.isRequired,
        categoryName: propTypes.string
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }

    render() {
        const { categoryName } = this.props
        return (
            <Form>
                <Form.Item
                    name="username"
                    initialValues={ categoryName || '' }
                    rules={[{ required: true, message: '分类名称必须输入' }]}>
                    <Input type="text" placeholder="请输入分类名称"></Input>
                </Form.Item>
            </Form>
        )
    }
}
