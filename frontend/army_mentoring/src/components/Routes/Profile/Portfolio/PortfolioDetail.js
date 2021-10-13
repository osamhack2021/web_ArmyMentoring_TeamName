import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { _deletePortfolio, _loadPortfolio, _loadPortfolioItem } from "../../../../backend/profile";
import "./PortfolioDetail.scss";
import {updateUserContextBySavedToken} from "../../../../backend/auth";
import { UserContext } from "../../../../context/Context";
function Portfolio({match, history}) {

  const p_id = match.params.pid;
  const [portfolio, setPortfolio] = useState('');
  const [items, setItems] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const load = ()=>{
    _loadPortfolio(p_id)
    .then(res=>{
      setPortfolio(res.data);
      Promise.all(
        res.data.portfolio_items.map((url)=>{
          return _loadPortfolioItem(p_id)
                  .then(res=>{return res.data})
        })
      )
      .then(res=>{
        setItems(res);
      })
      .catch(err=>{
        console.log(err);
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
      updateUserContextBySavedToken(setUser);
      console.log(res);
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

export default Portfolio;