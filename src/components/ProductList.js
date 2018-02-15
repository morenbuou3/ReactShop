import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const productList = [];
        this.props.products.map((product) => {
            productList.push(<Product key={product.id} product={product} onNumberChange={this.props.onNumberChange}/>);
        });
        return (
            <div>
                {productList}
            </div>
        );
    }
}

export default ProductList;