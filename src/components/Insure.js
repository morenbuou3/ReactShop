import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Insure extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.close} bsSize="small">
                    <Modal.Header>
                        <Modal.Title>提示</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.close}>确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Insure;