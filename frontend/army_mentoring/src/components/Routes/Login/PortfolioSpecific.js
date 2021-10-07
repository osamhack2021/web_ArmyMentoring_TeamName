import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PortfolioSpecific.scss";

function Portfolio() {

  let [portfolio, setPortfolio] = useState({
                                              id:1,
                                              title:'react 프로젝트',
                                              description:`저는 react를 이용해서 웹페이지를 만들어봤습니다. 그리고
                                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                              It has survived not only five centuries, but also the leap into electronic typesetting, 
                                              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
                                          });

 

  return (
    <div className="portfolio-specific-body">
      <div className="main-section">
        <div className="title">{"react project"}</div>
        <div className="description">{"저는 react를 이용해서 웹페이지를 만들어봤습니다."}</div>
      </div>
      <div className="sectiont">
        <div className="title">{portfolio.title}</div>
        <div className="description">{portfolio.description}</div>
      </div>
      <div className="sectiont">
        <div className="title">{"내용"}</div>
        <div className="description">{portfolio.description}</div>
      </div>
      <div className="sectiont">
        <div className="title">{"결과"}</div>
        <div className="description">{portfolio.description}</div>
      </div>
      <div className="buttons">
        <Link to='/editportfolio' className="button">수정</Link>
      </div>
    </div>
  );
}

export default Portfolio;

/*
const load = ()=>{
  const token = sessionStorage.getItem('token');
  const id;
  axios({
    method:'GET',
    url:'https://???/portfolio' + id,
    headers : {
      Authorization : token
    }
  }).then((res)=>{
    const response = res.data;
    setPortfolio(response.portfolio);
  })
}
useEffect(()=>{
  load()
}, []);
*/