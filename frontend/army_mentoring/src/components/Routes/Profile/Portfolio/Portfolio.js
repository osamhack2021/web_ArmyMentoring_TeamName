import React from "react";
import { Route, Switch } from "react-router-dom";
import PortfolioList from "./PortfolioList";
import PortfolioDetail from './PortfolioDetail';
import EditPortfolio from "./EditPortfolio";

function Portfolio({match}) {
  return(
    <>
      <Switch>
        <Route exact path={`${match.path}/add`} component={EditPortfolio}></Route>
        <Route exact path={`${match.path}/:pid/edit`} component={EditPortfolio}></Route>
        <Route exact path={`${match.path}/:pid`} component={PortfolioDetail}></Route>
        <Route exact path={match.path} component={PortfolioList}></Route>
      </Switch>
    </>
  )
}

export default Portfolio;
