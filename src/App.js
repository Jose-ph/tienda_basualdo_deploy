import React from "react";
import Navbar from "./components/Navbar/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ItemListContainer from "./containers/ItemListContainer/ItemListContainer";

import ItemDetailContainer from "./containers/ItemDetailContainer/ItemDetailContainer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CartContextProvider from "./Context/CartContext";

import CartView from "./components/CartView/CartView";
import CheckOut from "./components/Checkout/CheckOut";

import { UserContextProvider } from "./Context/UserContext";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRouted";

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Router>
          <div className="App">
            <header className="App-header">
              <Navbar />
            </header>

            <Switch>
              <Route exact path="/">
                <ItemListContainer greeting="Home ----->" />
              </Route>

              <Route exact path="/category/:categoryId">
                <ItemListContainer greeting="Categorías ------>" />
              </Route>

              <Route exact path="/item/:id">
                <ItemDetailContainer />
              </Route>

              <Route exact path="/cart">
                <CartView />
              </Route>

              <Route exact path="/cart">
                <RestrictedRoute>
                  <CartView />
                </RestrictedRoute>
              </Route>

              <Route exact path="/checkout">
                <CheckOut />
              </Route>

              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
