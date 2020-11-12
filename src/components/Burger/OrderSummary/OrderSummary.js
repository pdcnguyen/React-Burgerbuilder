import React, { Component } from "react";
import Wrap from "../../../hoc/Wrap";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate(){
    console.log("Ordersummary Updated");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            {igKey}: {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Wrap>
        <h3>Your Order</h3>
        <p> Ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>{this.props.price}$</p>
        <Button btnType="Danger" clicked={this.props.checkOutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.checkOutConfirmed}>
          CONTINUE
        </Button>
      </Wrap>
    );
  }
}

export default OrderSummary;
