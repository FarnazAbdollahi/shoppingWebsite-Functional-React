import React from 'react';
import './App.css';
import Shopping from './container/Shopping/Shopping';
import SigninPage from './container/SigninPage/SigninPage';
import SignupPage from './container/SignupPage/SignupPage';
import Checkout from './container/Checkout/Checkout';
import CartBox from './components/cart/CartBox'
import Navbar from './components/Navigation/Navbar'
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";


const App = (props) => {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/sign-in" exact component={SigninPage} />
          <Route path="/sign-up" exact component={SignupPage} />

          <Route path="/checkout-order" exact render={() =>
            <Checkout
              changeCount={props.changeCountHandler}
              addProduct={props.addProductToCard}
              deleteProduct={props.deleteProductFromCart}
              purchaseHandler={props.purchasedProductsHandler}
            >
            </Checkout>} />
          <Route path="/" component={Shopping} />
        </Switch>
      </Router>
    </div>
  )
}


export default App;
