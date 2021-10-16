import React, { useEffect, useState, useContext } from "react";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import "./EditPortfolio.scss";
import { _addPortfolio, _addPortfolioItem, _loadPortfolio, _loadPortfolioItem } from "../../../../backend/profile";
import { UserContext } from "../../../../context/Context";
import { updateUserContextBySavedToken } from "../../../../backend/auth";

function EditPortfolio({match, history}) {

  //editPortfolio를 위해
  const p_id = match.params.pid;
  const [portfolio, setPortfolio] = useState('');
  const [items, setItems] = useState([]);

  //addPortfolio를 위해
  const [user, setUser] = useContext(UserContext);
  const [title, setTitle] = useState('');
  let [forms, setForms] = useState([]);
  let [ordering, setOrdering] = useState(0);

  let isAddPage = false;
  if(match.params.pid == undefined)
    isAddPage = true;

  const load = ()=>{
    _loadPortfolio(p_id)
    .then(res=>{
      const mt = document.getElementById('main-title');
      mt.value = res.data.title;
      setTitle(res.data.title);

      const f = res.data.portfolio_items;
      Promise.all(
        f.map((i)=>{
          let t = i.url.split('/');
          let piid = t[4];
          return _loadPortfolioItem(piid)
                .then(res=>{
                  let fo = {
                    title : res.data.title,
                    content : res.data.content,
                    order : res.data.order
                  }
                  return fo;
                })
                .catch(err=>{
                  console.log('item load err');
                  console.log(err.response);
                })
          })
      )
      .then(res=>{
        setForms(res);
        res.map((f)=>{
          const t = document.getElementById('title'+f.order);
          const d = document.getElementById('content'+f.order);
          t.value = f.title;
          d.value = f.content;
        })
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
    if(isAddPage==false)
      load();
  }, [isAddPage])


  const add = ()=>{
    const f = {
      order : ordering,
      title : "",
      content : ""
    }
    let form = forms.slice();
    form.push(f);
    setForms(form);
    let o = ordering+1;
    setOrdering(o);
  }

  const remove = (order)=>{
    let form = forms.slice();
    form.splice(order, 1);
    setForms(form);
  }

  const getUserId = ()=>{
    if(Object.keys(user).length == 0)
        return -1;
    const url = user.url;
    const t = url.split('/');
    return t[4];
}
  const addOrEditPortfolio = ()=>{
    if(isAddPage == true){
      let user_id = getUserId();
      _addPortfolio(user_id, title)
      .then(res=>{
        let url = res.data.url;
        let t = url.split('/');
        let pid = t[4]; 
        forms.map((f)=>{
          _addPortfolioItem(f.title, f.content, pid, f.order)
          .then(res=>{
            console.log(res)
          })
          .catch(err=>{
            console.log(err.response);
          });
        })
        updateUserContextBySavedToken(setUser);
        console.log(res);
        history.goBack();
      }).catch(err=>{
        console.log(err.response);
      })
    }
    else{
      
    }
  }

  const setItemTitle = (e, order)=>{
    const v = e.target.value;
    const f = forms.slice();
    const i = forms.findIndex((element, index, array)=>{
      return element.order == order;
    })
    f[i].title = v;
  }
  const setItemContent = (e, order)=>{
    const v = e.target.value;
    const f = forms.slice();
    const i = forms.findIndex((element, index, array)=>{
      return element.order == order;
    })
    f[i].content = v;
  }
  
  return (
    <div className="edit-portfolio-body">
      <Form>
        <FormGroup className="main-section">
          <Input type="text" id="main-title" className="main title" placeholder="메인 제목입력..." onChange={(e)=>setTitle(e.target.value)}></Input>
        </FormGroup>
        {forms.map((f)=>{
          return(
            <FormGroup className="sectiont">
              {/* {"id : " + f.order} */}
              <Input type="text" id={"title"+f.order} onChange={(e)=>{setItemTitle(e, f.order)}} className="title" placeholder="제목입력..."></Input>
              <Input type="textarea" id={'content'+f.order} onChange={(e)=>{setItemContent(e, f.order)}} className="content" placeholder="내용입력..."></Input>
              <div className="button_del" onClick={()=>{remove(f.order)}}>삭제</div>
            </FormGroup>
          )
        })}
        <div className='button_add' onClick={add}>+ Item 추가</div>
        <FormGroup>
        <div className='button_body'>
          <div className="button_cancel" onClick={()=>{history.goBack()}}>취소</div>   
          <div className="button_confirm" onClick={()=>{addOrEditPortfolio()}}>{ isAddPage ? '추가' : '수정'}</div>
        </div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default EditPortfolio;