import React, { Component } from 'react'
import { Form, Input } from 'antd'
import propTypes from 'prop-types'

const Item = Form.Item

export default class AddUpdateForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        setForm: propTypes.func.isRequired,
        categoryName: propTypes.string
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName
        })
    }

    render() {

        const { categoryName } = this.props

        return (
            <Form ref={this.formRef}>
                <Item
                    name="categoryName"
                    initialValue={categoryName}
                    rules={[{ required: true, message: '分类名称必须输入' }]}>
                    <Input type="text" placeholder="请输入分类名称"></Input>
                </Item>
            </Form>
        )
    }
}
