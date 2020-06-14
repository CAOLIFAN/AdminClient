import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button'

export default class ProductDetail extends Component {
    render() {

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title}>
                <List>
                    <span>商品名称：</span>
                    <span>aaaa</span>
                </List>
            </Card>
        )
    }
}
