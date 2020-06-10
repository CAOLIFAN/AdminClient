import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Button, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
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
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
          });
    }

    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key===path)
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

        const { currentTime } = this.state
        const title = this.getTitle()

        return (
            <div className="header"> 
                <div className="header-top">
                    欢迎，admin &nbsp;
                    <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)