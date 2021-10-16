import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { _deletePortfolio, _loadPortfolio, _loadPortfolioItem } from "../../../../backend/profile";
import "./PortfolioDetail.scss";
import {updateUserContextBySavedToken} from "../../../../backend/auth";
import { UserContext } from "../../../../context/Context";

function PortfolioDetail({match, history}) {
  const [portfolio, setPortfolio] = useState('');
  const [items, setItems] = useState([]);
  const [u, setU] = useContext(UserContext);
  const [other, setOther] = useState({});

  const p_id = match.params.pid;

  const getId = (url)=>{
    const t = url.split('/');
    return t[4];
  }

  const getUserId = ()=>{
    if(Object.keys(u).length == 0)
        return -1;
    return getId(u.url);
  }

  let isMe = false;
  let user;

  if(p_id == getUserId())
    isMe = true;

  if(isMe)
    user = u;
  else
    user = other;    

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
    <div>
      <div className='port_title_1'>포트폴리오 상세</div>
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
        <div className='button_body'>
            <div onClick={deletePortfolio} className="button_del">삭제</div>
            <Link to={`${match.url}/edit`} className="button_confirm">수정</Link>
            <div onClick={()=>{history.goBack()}} className="button_cancel">뒤로</div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioDetail;