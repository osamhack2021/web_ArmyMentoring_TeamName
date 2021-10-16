import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./PortfolioList.scss";
import { UserContext } from '../../../../context/Context';
import { _loadPortfolio } from '../../../../backend/profile';

function PortfolioList({match, history}) {
  
  const [u, setU] = useContext(UserContext);
  const [portfolios, setPortfolios] = useState([]);
  const [other, setOther] = useState({});
  const getUserId = ()=>{
    if(Object.keys(u).length == 0)
        return -1;
    const url = u.url;
    const t = url.split('/');
    return t[4];
  }
  let isMe = false;
  let user;
  if(match.params.id == getUserId())
    isMe = true;
  if(isMe)
    user = u;
  else
    user = other;

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
    <div>
      <div className='port_title_2'>내 포트폴리오</div>
      <div className="portfolio-body">
        {
          portfolios.map((p)=>{
            return (
            <div className="portfolio">
              <div className="text-column">
                <div className="title">{p.portfolio.title}</div>
                <div className="title">{p.portfolio.de}</div>
                <Link to={`${match.url}/${p.pid}`} className="link">자세히 보기</Link>
              </div> 
            </div>
            ) 
          })
        }
        <div className='button_body'>
            <div onClick={()=>{history.goBack()}} className="button_cancel">뒤로</div>
            <Link to={`${match.url}/add`} className="button_confirm">추가</Link>
        </div>
      </div>
    </div>
  );
}

export default PortfolioList;