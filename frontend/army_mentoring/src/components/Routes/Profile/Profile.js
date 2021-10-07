import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import EditProfile from './EditProfile';
import ProfileDetail from './ProfileDetail';
import Portfolio from "./Portfolio/Portfolio";

function Profile({match}) {
  return(
    <>
      <Switch>
        <Route path={`${match.path}/portfolio`} component={Portfolio}></Route>
        <Route exact path={`${match.path}`} component={ProfileDetail}></Route>
        <Route exact path={`${match.path}/edit`} component={EditProfile}></Route>
      </Switch>
    </>
  )
}

export default Profile;
