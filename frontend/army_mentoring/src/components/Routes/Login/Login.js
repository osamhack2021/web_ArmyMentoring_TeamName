import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginDetail from './LoginDetail';
import Signup from './Signup';

function Login({match}) {
  return(
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={LoginDetail}></Route>
        <Route exact path={`${match.path}/signup`} component={Signup}></Route>
      </Switch>
    </>
  )
}

export default Login;
