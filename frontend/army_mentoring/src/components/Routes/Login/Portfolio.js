import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.scss";
import axios from 'axios';

function Portfolio() {

  let [portfolios, setPortfolios] = useState([
                                              {
                                                id:1,
                                                title:'react 프로젝트',
                                                description:'저는 react를 이용해서 웹페이지를 만들어봤습니다'
                                              },
                                              {
                                                id:2,
                                                title:'tomact 프로젝트',
                                                description:'저는 tomact을 이용해서 서버를 만들어봤습니다'
                                              },
                                              {
                                                id:3,
                                                title:'vue 프로젝트',
                                                description:'저는 vue를 이용해서 웹페이지를 만들어봤습니다'
                                              },
                                            ]);
  

  return (
    <div className="portfolio-body">
      {
        portfolios.map((p)=>{
          return (
          <div className="portfolio">
            <img className="thumbnail" alt="abcd" src=""></img>
            <div className="text-column">
              <div className="title">{p.title}</div>
              <div className="description">{p.description}</div>
              <Link to='/portfoliospecific' className="link">자세히 보기</Link>
            </div> 
          </div>
          ) 
        })
      }
      <Link to='/editportfolio' className="button">추가</Link>
    </div>
  );
}

export default Portfolio;

/*

const load = ()=>{
  const token = sessionStorage.getItem('token');
  axios({
    method:'GET',
    url:'https://???/portfolio',
    headers : {
      Authorization : token
    }
  }).then((res)=>{
    const response = res.data;
    setPortfolios(response.portfolio_items);
  })
}
useEffect(()=>{
  load()
}, []);
*/
