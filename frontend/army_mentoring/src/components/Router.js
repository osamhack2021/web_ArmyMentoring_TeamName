import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Routes/Home";
import Mentoring from "./Routes/Mentoring/Mentoring";
import MyMentoring from "./Routes/MyMentoring/MyMentoring";
import Community from "./Routes/Community/Community";
import Login from './Routes/Login/Login';
import Signup from './Routes/Login/Signup';
import Profile from './Routes/Profile/Profile';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./Routes/Chat/Chat";

export default () => (
  
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/mentoring" component={Mentoring}></Route>
      <Route path="/mymentoring" component={MyMentoring}></Route>
      <Route path="/Community" component={Community}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/chat" component={Chat}></Route>
      
    </Switch>
    <Footer />
  </BrowserRouter> 

);


