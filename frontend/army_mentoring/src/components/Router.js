import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Routes/Home";
import Mentoring from "./Routes/Mentoring";
import Mymentoringlist from "./Routes/Mymentoringlist";
import Mentoringintroduction from "./Routes/Mentoring/Mentoringintroduction";
import Makementoring from "./Routes/Mentoring/Makementoring";
import Mentoringspecificmento from "./Routes/Mentoring/Mentoringspecificmento";
import Mentoringspecificmentee from "./Routes/Mentoring/Mentoringspecificmentee";
import { BrowserRouter, Route, Switch } from "react-router-dom";


export default () => (
  
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/mentoring" component={Mentoring}></Route>
      <Route path="/mymentoringlist" component={Mymentoringlist}></Route>
      <Route path="/community" component={community}></Route>
      <Route path="/qna" component={qna}></Route>
      <Route path="/mypage" component={mypage}></Route>
      <Route path="/mentoringintro" component={Mentoringintroduction}></Route>
      <Route path="/makementoring"tor component={Makementoring}></Route>
      <Route path="/mentoringspecificmento"tor component={Mentoringspecificmento}></Route>
      <Route path="/mentoringspecificmentee"tor component={Mentoringspecificmentee}></Route>
    </Switch>
    <Footer />
  </BrowserRouter> 

);


function community() {
  return <div>community</div>;
}
function qna() {
  return <div>qna</div>;
}
function mypage() {
  return <div>mypage</div>;
}