import React, { Component } from "react";
import Wrap from "../../hoc/Wrap";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    checkedout: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-a67a8.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  checkOutHandler = () => {
    this.setState({
      checkedout: true,
      totalPrice: Math.round(this.state.totalPrice * 100) / 100,
    });
  };

  checkOutCancelledHandler = () => {
    this.setState({ checkedout: false });
  };
  checkOutConfirmedHandler = () => {
    //alert("Okay gurllll!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Meow",
        address: "kay",
      },
      deliveryMEthod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, checkedout: false });
      })
      .catch((error) => console.log(error));
  };

  render() {
    let orderSummary = null;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Wrap>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchaseable={this.state.purchaseable}
            checkedout={this.checkOutHandler}
          />
        </Wrap>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          checkOutCancelled={this.checkOutCancelledHandler}
          checkOutConfirmed={this.checkOutConfirmedHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Wrap>
        <Modal
          show={this.state.checkedout}
          modalClosed={this.checkOutCancelledHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Wrap>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
