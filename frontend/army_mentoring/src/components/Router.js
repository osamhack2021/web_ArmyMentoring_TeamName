import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Routes/Home";
import Community from "./Routes/Community";
import Mentoring from "./Routes/Mentoring/Mentoring";
import MyMentoring from "./Routes/MyMentoring/MyMentoring";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './Routes/Login';
import Profile from './Routes/Profile';

export default () => (
  
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/mentoring" component={Mentoring}></Route>
      <Route path="/mymentoring" component={MyMentoring}></Route>
      <Route path="/Community" component={Community}></Route>
      <Route path="/Mypage" component={Profile}></Route>
    </Switch>
    <Footer />
  </BrowserRouter> 

);


