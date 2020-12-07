import React, { Component } from "react";
import { connect } from "react-redux";
import Wrap from "../../hoc/Wrap";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    checkedout: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //this.setState({ purchaseable: sum > 0 });

    return sum > 0;
  };

  checkOutHandler = () => {
    this.setState({
      checkedout: true,
      totalPrice: Math.round(this.props.price * 100) / 100,
    });
  };

  checkOutCancelledHandler = () => {
    this.setState({ checkedout: false });
  };
  checkOutConfirmedHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = null;

    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Wrap>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            checkedout={this.checkOutHandler}
          />
        </Wrap>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          checkOutCancelled={this.checkOutCancelledHandler}
          checkOutConfirmed={this.checkOutConfirmedHandler}
          price={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
