import React from "react";
import classes from "./BuildControls.css";
import Control from "./Control/Control";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>{props.price.toFixed(2)}</p>
    {controls.map((ctrl) => (
      <Control
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.checkedout}
    >
      ORDER NOW!
    </button>
  </div>
);

export default buildControls;
