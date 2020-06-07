import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './images/logo.png'
import './login.less'
import { IconMap } from 'antd/lib/result';

const Item = Form.Item

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
                        <Item>
                            <input 
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Item>
                        <Item>
                            <input 
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )    
    }
}
