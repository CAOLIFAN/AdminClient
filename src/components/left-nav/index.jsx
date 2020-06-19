import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd'
// import {
//     HomeOutlined,
//     AppstoreOutlined,
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     PieChartOutlined,
//     DesktopOutlined,
//     ContainerOutlined,
//     MailOutlined,
// } from '@ant-design/icons'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu } = Menu;
/*
左侧导航组件
*/

class LeftNav extends Component {

    getMenuNodes = (menuList) => {

        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                    )
            }
            else {

                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if (cItem) {
                    this.openKey = item.key
                }

                pre.push(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {
                        this.getMenuNodes(item.children)
                    }
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }

    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {

        let selectKey = this.props.location.pathname
        if (selectKey.indexOf('/product')===0) {
            selectKey = '/product'
        }
        
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    { this.menuNodes }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)