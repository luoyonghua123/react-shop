import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./pages/Login/login";
import Admin from "./pages/Admin/admin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;