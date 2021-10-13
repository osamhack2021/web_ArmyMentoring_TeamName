import React, { useEffect, useState, useContext } from "react";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import "./EditPortfolio.scss";
import { _addPortfolio } from "../../../../backend/profile";
import { UserContext } from "../../../../context/Context";
import { updateUserContextBySavedToken } from "../../../../backend/auth";

function EditPortfolio({match, history}) {
  const [user, setUser] = useContext(UserContext);
  const [title, setTitle] = useState('');
  let isAddPage = false;
  if(match.params.pid == undefined)
    isAddPage = true;


  let [forms, setForms] = useState([]);
  let [order, setOrder] = useState(0);

  const add = ()=>{
    console.log("add");
    const f = {
      id : order,
      title : "",
      description : ""
    }
    let form = forms.slice();
    form.push(f);
    setForms(form);
    let o = order+1;
    setOrder(o);
  }

  const remove = (el, id)=>{
    console.log("remove");
    let form = forms.slice();
    form.splice(id, 1);
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
  
  return (
    <div className="edit-portfolio-body">
      {
         isAddPage && 'this is add page'
      }
      <Form>
        <FormGroup className="main-section">
          <Input type="text" className="main-title" placeholder="메인 제목입력..." onChange={(e)=>setTitle(e.target.value)}></Input>
        </FormGroup>
        {forms.map((f)=>{
          return(
            <FormGroup className="sectiont">
              {"id : " + f.id}
              <Input type="text" className="title" placeholder="제목입력..."></Input>
              <Input type="textarea" className="desc" placeholder="내용입력..."></Input>
              <Button className="c" onClick={()=>{remove(f.id)}}>-</Button>
            </FormGroup>
          )
        })}
        <div className='button' onClick={add}>+</div>
        <FormGroup className='buttons'>
          <div className='cancel button' onClick={()=>{history.goBack()}}>취소</div>   
          <div className='confirm button' onClick={()=>{addOrEditPortfolio()}}>{ isAddPage ? '추가' : '수정'}</div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default EditPortfolio;