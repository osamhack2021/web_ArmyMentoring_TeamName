import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { _deletePortfolio, _loadPortfolio, _loadPortfolioItem } from "../../../../backend/profile";
import "./PortfolioDetail.scss";
import {updateUserContextBySavedToken} from "../../../../backend/auth";
import { UserContext } from "../../../../context/Context";

function PortfolioDetail({match, history}) {
  console.log(match.url);
  const p_id = match.params.pid;
  const [portfolio, setPortfolio] = useState('');
  const [items, setItems] = useState([]);
  const [u, setU] = useContext(UserContext);
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
  if(p_id == getUserId())
    isMe = true;
  if(isMe)
    user = u;
  else
    user = other;
  console.log(isMe);
    

  const load = ()=>{
    _loadPortfolio(p_id)
    .then(res=>{
      setPortfolio(res.data);
      Promise.all(
        res.data.portfolio_items.map((item)=>{
          let t = item.url.split('/');
          let pi_id = t[4];
          return _loadPortfolioItem(pi_id)
                  .then(res=>{return res.data})
        })
      )
      .then(res=>{
        setItems(res);
      })
      .catch(err=>{
        console.log(err.response);
      })
    })
    .catch(err=>{
      console.log(err.response);
    })
  }

  useEffect(()=>{
    load();
  }, []);

  const deletePortfolio = ()=>{
    _deletePortfolio(p_id)
    .then(res=>{
      updateUserContextBySavedToken(setU);
      history.goBack();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="portfolio-specific-body">
      <div className="main-section">
        <div className="title">{portfolio.title}</div>
      </div>
      {
        items.map((i)=>{
          return(
            <div className="sectiont">
              <div className="title">{i.title}</div>
              <div className="description">{i.content}</div>
            </div>
          )
        })
      }
      <div className="buttons">
        <div onClick={()=>{history.goBack()}} className="cancel button">뒤로</div>
        <Link to={`${match.url}/edit`} className="confirm button">수정</Link>
        <div onClick={deletePortfolio} className="cancel button">삭제</div>
      </div>
    </div>
  );
}

export default PortfolioDetail;