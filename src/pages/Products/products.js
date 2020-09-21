import React, { Component } from 'react'
import { Switch,Route } from "react-router-dom";
import Home from './home'
import AddUpdate from './addUpdate'
import Detail from './detail'

export default class products extends Component {
  render() {
    return (
    <Switch>
      <Route path='/product' exact component={Home}></Route>
      <Route path='/product/addupdate' component={AddUpdate}></Route>
      <Route path='/product/detail/:id' component={Detail}></Route>


    </Switch>
    )
  }
}
