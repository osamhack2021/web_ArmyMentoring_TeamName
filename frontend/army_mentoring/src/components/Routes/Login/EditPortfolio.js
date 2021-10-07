import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import "./EditPortfolio.scss";
import axios from 'axios';

function AddPortfolio() {

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

  //임시
  const createPortfolio = ()=>{
    console.log("create portfolio!");
  }
  
  return (
    <div className="edit-portfolio-body">
      <Form>
        <FormGroup className="main-section">
          <Input type="text" className="title" placeholder="메인 제목입력..."></Input>
          <Input type="text" className="desc" placeholder="메인 내용입력..."></Input>
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
        <div onClick={add}>+</div>
        <FormGroup className='buttons'>
          <Link className='cancel button' to='/portfoliospecific'>취소</Link>   
          <Link className='confirm button' to='/portfoliospecific' onClick={createPortfolio}>완료</Link>
        </FormGroup>
      </Form>
    </div>
  );
}

export default AddPortfolio;

/*
const createPortfolio = ()=>{
  const token = sessionStorage.getItem('token');
  
  axios({
    method: 'POST',
    url : 'https://???/portfolio-item',
    headers : { 'Authorization' : token },
    data : {
      title : getElementById로 title 정보,
      portfolio_items : 마찬가지로 가져옴,
      specification_cards : 암튼 가져옴,
      user : user id 알아와서 가져옴
    }
  }).then((res)=>{
  })
}
*/