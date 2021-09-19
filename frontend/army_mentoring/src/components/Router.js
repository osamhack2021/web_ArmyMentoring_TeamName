import React from "react";
import { HashRouter} from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";


export default () => (
    
    <HashRouter>
        <Header />
        <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/link1">link1</Link>
          </li>
          <li>
            <Link to="/link2">link2</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/link1" component={link1}></Route>
          <Route path="/link2" component={link2}></Route>
        </Switch>
      </BrowserRouter>
        <Footer />
    </HashRouter> 

  );

  function Home() {
    return <div>Home component</div>;
  }
  
  function link1() {
    return <div>1 component</div>;
  }
  
  function link2() {
    return <div>2 component</div>;
  }