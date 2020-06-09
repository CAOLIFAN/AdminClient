import React, { Component } from 'react'
import { Form, Icon, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './login.less'

export default class Login extends Component {

    handleSubmit = e => {
        // 阻止事件的默认行为：阻止表单的提交
        e.preventDefault()
        alert('发送登陆的ajax请求')
    }

    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登陆</h1>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        
                        <Form.Item name="username">
                        <input 
                            prefix={<UserOutlined/>}
                            placeholder="用户名"/>
                        </Form.Item>
                        
                        <Form.Item name="password">
                        <input 
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="密码"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )    
    }
}