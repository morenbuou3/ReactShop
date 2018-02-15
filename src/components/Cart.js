import React, { Component } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import CartProduct from './CartProduct';

class Cart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const productList = [];
        this.props.cart.map((item) => {
            productList.push(<CartProduct number={item.number} item={item.product} />);
        });
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>我的购物车</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive>
                        <thead>
                        <th>商品名称</th>
                        <th>商品单价</th>
                        <th>数量</th>
                        <th>合计</th>
                        </thead>
                        <tbody>
                        {productList}
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.onSubmitChange}>确定购买</Button>
                    <Button onClick={this.props.close}>关闭</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Cart;