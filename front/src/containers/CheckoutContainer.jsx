import React from "react";
import Checkout from "../components/Checkout";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";


const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    // eliminar: newCart => dispatch(removeProduct(newCart))
  };
};

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        order: {}
    }
    this.handleClick=this.handleClick.bind(this)
  }
  componentDidMount() {

    Axios.get(`/order/ultimaorden`) 
      .then(algo => algo.data)
      .then(algo => {
        this.setState({ order: algo });
      });
  }

  handleClick(e) {
   Axios.post("/order/pay",{e})
   this.props.history.push("/profile")
  }

  render() {
    return <Checkout handleClick={this.handleClick} user={this.props.state.userLogin.loginUser} order={this.state.order}/>;
  }
}

export default  withRouter( connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer));
