import React, { Component } from 'react';

class CartProduct extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price} / {this.props.item.unit}</td>
                <td>{this.props.number}</td>
                <td>{this.props.number * this.props.item.price}</td>
            </tr>
        );
    }
}

export default CartProduct;