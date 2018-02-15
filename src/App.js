import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Grid, Row, Badge } from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import ProductList from './components/ProductList';
import Cart from './components/Cart';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentDidMount() {
      fetch('/products')
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
          cartList.push(cartItem.barcode);
      } else {
          cartList.push(cartItem.barcode + "-" + value);
      }
      cart.push({product: cartItem, number: value});
      this.setState({
          cartList: cartList,
          cart: cart,
      });
  }
  handleSubmit() {
      fetch('/receipts', {
          method : 'POST',
          body: JSON.stringify(this.state.cartList),
          headers: {'Content-Type': 'application/json'},
      })
          .then((response) => response.json())
          .then((data) => {
              this.props.history.push({pathname: '/receipt', state: data});
          })
          .catch(e => {console.error(e)});
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
            <Cart close={this.close} showModal={this.state.showModal} cart={this.state.cart}
                  cartList={this.state.cartList} onSubmitChange={this.handleSubmit} />
        </div>
      </div>

    );
  }
}

export default withRouter(App);
