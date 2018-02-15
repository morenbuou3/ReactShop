import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Receipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: this.props.location.state,
        };
    }

    render() {
        const title = '***<没钱赚商店>收据***';
        const end = '************************************************';
        const productList = [];
        this.state.result.products.map((item) => {
            if (item.weigh == 0) {
                productList.push(<p>名称：{item.name}, 数量：{item.number}, 单价：{item.price}, 小计：{item.subTotal}</p>);
            } else {
                productList.push(<p style={{color: "red",}}>名称：{item.name}, 数量：{item.number}, 单价：{item.price},
                    小计：{item.subTotal}</p>);
            }
        });
        return (
            <Jumbotron>
                <h1 style={{textAlign: "center",}}>{title}</h1>
                <div style={{textAlign: "center",}}>
                    {productList}
                    <p style={{color: "red",}}>-------------------------------------------------------</p>
                    <p>总计：{this.state.result.total}（元）</p>
                    <p>节省：{this.state.result.dec}（元）</p>
                    <p>{end}</p>
                    <Link to="/">返回主页</Link>
                </div>
            </Jumbotron>
        );
    }
}

export default Receipt;