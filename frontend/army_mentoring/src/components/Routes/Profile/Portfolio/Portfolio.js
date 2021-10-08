import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import PortfolioList from "./PortfolioList";
import PortfolioDetail from './PortfolioDetail';
import EditPortfolio from "./EditPortfolio";

function Portfolio({match}) {
  return(
    <>
      <Route exact path={match.path} component={PortfolioList}></Route>
      <Switch>
        <Route exact path={`${match.path}/add`} component={EditPortfolio}></Route>
        <Route exact path={`${match.path}/:id`} component={PortfolioDetail}></Route>
        <Route exact path={`${match.path}/:id/edit`} component={EditPortfolio}></Route>
      </Switch>
    </>
  )
}

export default Portfolio;
