import React from "react";
import { Route, Switch } from "react-router-dom";
import EditProfile from './EditProfile';
import ProfileDetail from './ProfileDetail';
import Chat from "../Chat/Chat";
import Portfolio from './Portfolio/Portfolio';

function Profile({match}) {
  return(
    <>
      <Switch>
        <Route path={`${match.path}/:id/portfolio`} component={Portfolio}></Route>
        <Route path={`${match.path}/:id/edit`} component={EditProfile}></Route>
        <Route path={`${match.path}/:id/chat`} component={Chat}></Route>
        <Route path={`${match.path}/:id`} component={ProfileDetail}></Route>
      </Switch>
    </>
  )
}

export default Profile;
