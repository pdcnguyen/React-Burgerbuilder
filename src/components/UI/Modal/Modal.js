import React, { Component } from "react";

import classes from "./Modal.css";
import Wrap from "../../../hoc/Wrap";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate(){
    console.log("Modal Updated");
  }
  render() {
    return (
      <Wrap>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        ></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Wrap>
    );
  }
}
export default Modal;
