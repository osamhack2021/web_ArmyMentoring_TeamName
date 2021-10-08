import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ArticleList from './ArticleList';
import Article from './Article';

function Community({match}) {
  return(
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={ArticleList}></Route>
        <Route exact path={`${match.path}/:id`} component={Article}></Route>
      </Switch>
    </>
  )
}

export default Community;
