import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import './index.less'

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now())
    }

    logout = () => {
        Modal.confirm({
            title: '确认退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                console.log('OK')
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel')
            }
          });
    }

    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    componentDidMount () {
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
    }

    componentWillMount () {
        clearInterval(this.intervalId)
    }

    render() {

        const user = memoryUtils.user
        const { currentTime } = this.state
        const title = this.getTitle()

        return (
            <div className="header"> 
                <div className="header-top">
                    欢迎，{user.username} &nbsp;&nbsp;
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)