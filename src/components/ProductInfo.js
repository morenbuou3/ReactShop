import React, { Component } from 'react';
import { ListGroupItem, Image } from 'react-bootstrap';

class ProductInfo extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <ListGroupItem>
                    <Image className="img" src={"../img/"+this.props.item.img} />
                </ListGroupItem>
                <ListGroupItem>
                    商品名称：<b>{this.props.item.name}</b>
                </ListGroupItem>
                <ListGroupItem>
                    价格/单位：{this.props.item.price} 元 / {this.props.item.unit}
                </ListGroupItem>
                <ListGroupItem>
                    优惠：{this.props.item.discount === "BUY_TWO_GET_ONE_FREE" ?
                    <span style={{color: "red"}}><b>买二送一</b></span> : "无"}
                </ListGroupItem>
            </div>
        );
    }
}

export default ProductInfo;