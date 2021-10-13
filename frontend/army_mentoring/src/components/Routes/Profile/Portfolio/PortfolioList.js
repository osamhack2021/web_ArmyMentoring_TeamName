import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./PortfolioList.scss";
import { UserContext } from '../../../../context/Context';
import { _loadPortfolio } from '../../../../backend/profile';

function PortfolioList({match, history}) {
  
  const [user, setUser] = useContext(UserContext);
  const [portfolios, setPortfolios] = useState([]);
  
  const getPortfolioID= (url) =>{
    const t = url.split('/');
    return t[4];
  }
  const load = ()=>{
    const c = user.portfolio;
    Promise.all(
      c.map((url)=>{
        const p_id = getPortfolioID(url);
        return _loadPortfolio(p_id)
                .then(res=>{
                  return { portfolio : res.data, pid : p_id }
                })
      })
    )
    .then(res=>{
      setPortfolios(res);
    })
    .catch(err=>{
      console.log(err.response);
    })
  }
  useEffect(()=>{
    load();
  }, [user]);

  return (
    <div className="portfolio-body">
      {
        portfolios.map((p)=>{
          return (
          <div className="portfolio">
            <img className="thumbnail" alt="abcd" src=""></img>
            <div className="text-column">
              <div className="title">{p.portfolio.title}</div>
              <Link to={`${match.url}/${p.pid}`} className="link">자세히 보기</Link>
            </div> 
          </div>
          ) 
        })
      }
      <div className="buttons">
        <div onClick={()=>{history.goBack()}} className="cancel button">뒤로</div>
        <Link to={`${match.url}/add`} className="confirm button">추가</Link>
      </div>
    </div>
  );
}

export default PortfolioList;