import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ArticleList from './ArticleList';
import Article from './Article';
import EditArticle from "./EditArticle";

function Community({match}) {
  return(
    <>
      <Switch>
        <Route exact path={`${match.path}/add`} component={EditArticle}></Route>
        <Route exact path={`${match.path}/:id/edit`} component={EditArticle}></Route>
        <Route exact path={`${match.path}/:id`} component={Article}></Route>
        <Route exact path={`${match.path}`} component={ArticleList}></Route>
      </Switch>
    </>
  )
}

export default Community;
