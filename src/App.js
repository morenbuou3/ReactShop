import React, { Component } from 'react';
import { Table, Modal, Badge, NavItem, Nav, Navbar, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Image, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list: [],
        cartList: [],
        cart: [],
        showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentDidMount() {
      fetch('../data/product.json')
          .then((response) => response.json())
          .then((data) => {
              this.setState({
                  list: data,
              });
          })
          .catch(e => {console.error(e)});
  }
  handleChange(cartItem, value) {
      const cartList = this.state.cartList.slice();
      const cart = this.state.cart.slice();
      if (value === 0) {
          return;
      }
      else if (value === 1) {
          cartList.push(cartItem.product_barcode);
      } else {
          cartList.push(cartItem.product_barcode + "-" + value);
      }
      cart.push({product: cartItem, number: value});
      this.setState({
          cartList: cartList,
          cart: cart,
      });
  }
  close() {
    this.setState({showModal: false});
  }
  open() {
    this.setState({showModal: true});
  }
  render() {
    return(
      <div className="App">
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
                <a href="#" className="head">
                    <img src={logo} className="App-logo" alt="logo" />
                    <span className="slogan">没钱赚商店</span>
                </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="#">
                <Button bsStyle="primary" onClick={this.open}>我的购物车<Badge>{this.state.cartList.length}</Badge></Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div id="products">
          <Grid>
            <Row className="show-grid">
              <ProductList products={this.state.list} onNumberChange={this.handleChange}/>
            </Row>
          </Grid>
        </div>
        <div>
            <Cart close={this.close} showModal={this.state.showModal}
                cart={this.state.cart} cartList={this.state.cartList}/>
        </div>
      </div>

    );
  }
}

{/*商品列表组件*/}
class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const productList = [];
            this.props.products.map((product) => {
                productList.push(<Product product={product} onNumberChange={this.props.onNumberChange}/>);
        });
        return (
            <div>
                {productList}
            </div>
        );
    }
}

{/*商品组件*/}
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

{/*商品信息组件*/}
class ProductInfo extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <ListGroupItem>
                    <Image className="img" src={"../img/"+this.props.item.product_img} responsive/>
                </ListGroupItem>
                <ListGroupItem>
                    商品名称：<b>{this.props.item.product_name}</b>
                </ListGroupItem>
                <ListGroupItem>
                    价格/单位：{this.props.item.product_price} 元 / {this.props.item.product_unit}
                </ListGroupItem>
                <ListGroupItem>
                    优惠：{this.props.item.product_discount === "BUY_TWO_GET_ONE_FREE" ?
                            <font color="red"><b>买二送一</b></font> : "无"}
                </ListGroupItem>
            </div>
        );
    }
}

{/*加入购物车组件*/}
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
        var reg = /^[1-9]\d*$/;
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
                            <FormControl type="number" value={this.state.value} min="1" onChange={this.handleChange}
                                onKeyUp={this.validate}></FormControl>
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

{/*购物车组件*/}
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
                    <Button bsStyle="primary">确定购买</Button>
                    <Button onClick={this.props.close}>关闭</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

{/*购物车商品条目组件*/}
class CartProduct extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.item.product_name}</td>
                <td>{this.props.item.product_price} / {this.props.item.product_unit}</td>
                <td>{this.props.number}</td>
                <td>{this.props.number * this.props.item.product_price}</td>
            </tr>
        );
    }
}

{/*提示窗口组件*/}
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

export default App;
