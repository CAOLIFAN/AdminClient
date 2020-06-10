import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './login.less'

const NormalLoginForm = () => {

    const onFinish = values => {
      console.log('Received values of form: ', values);
    };
    
    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish} initialValues={{remember: true,}}>
            <Form.Item 
                name="username"
                rules={[
                    { required: true, whitespace: true, message: '请输入用户名' },
                    { min: 4, message: '用户名不能小于4位'},
                    { max: 12, message: '用户名不能大于12位'}, 
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由英文、数字或下划线组成'}
                    ]}>
                <Input 
                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0, 0, 0, .25)'}} />} 
                    placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, whitespace: true, message: '请输入密码' },
                    { min: 4, message: '密码不能小于4位'},
                    { max: 12, message: '密码不能大于12位'}, 
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须由英文、数字或下划线组成'}
                    ]}>
                <Input 
                    prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0, 0, 0, .25)'}}/>}
                    type="password"
                    placeholder="密码"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
            </Form.Item>
        </Form>
    )
}

export default class Login extends Component {

    render() {

        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登陆</h1>
                    <NormalLoginForm />
                </div>
            </div>
        )
    }
}



