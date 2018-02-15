import React, {Component} from 'react';
import {Col, ListGroup} from 'react-bootstrap';
import ProductInfo from './ProductInfo';
import ProductAdd from './ProductAdd';

class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col sm={12} md={4}>
                <ListGroup>
                    <ProductInfo item={this.props.product}/>
                    <ProductAdd item={this.props.product} onNumberChange={this.props.onNumberChange}/>
                </ListGroup>
            </Col>
        );
    }
}

export default Product;