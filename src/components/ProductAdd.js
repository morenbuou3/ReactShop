import React, { Component } from 'react';
import { ListGroupItem, Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';
import Insure from './Insure';

class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            item: this.props.item,
            showModal: false,
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
    }
    validate(e) {
        const reg = /^[1-9]\d*$/;
        if(!reg.test(e.target.value)) {
            this.setState({value: 1});
        }
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }
    handleAdd() {
        this.props.onNumberChange(this.state.item, this.state.value);
        this.setState({showModal: true, message: '已成功加入购物车！'});
    }
    close() {
        this.setState({showModal: false});
    }
    render() {
        return(
            <ListGroupItem>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3} md={3}>
                            数量：
                        </Col>
                        <Col sm={5} md={5}>
                            <FormControl type="number" value={this.state.value} min="1"
                                         onChange={this.handleChange} onKeyUp={this.validate}>
                            </FormControl>
                        </Col>
                        <Col sm={4} md={4}>
                            <Button bsStyle="primary" onClick={this.handleAdd}>加入购物车</Button>
                        </Col>
                        <Insure message={this.state.message} showModal={this.state.showModal} close={this.close} />
                    </FormGroup>
                </Form>
            </ListGroupItem>
        );
    }
}

export default ProductAdd;