import React, {useState, useEffect } from 'react';
import './Article.scss';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { addComment, loadArticle, loadComments, deleteArticle } from '../../../backend/community';
import { UserContext }  from '../../../context/Context';

function Article({match, history}) {

    const article_id = match.params.id;
    sessionStorage.setItem('Token', 'Token 905e125ab3ee40e3a74f6915c9dd3f540b987dc6');
    const token = sessionStorage.getItem('Token');
    const user_id = 2;

    const [user, setUser] = useState(UserContext);
    const [content,setContent] = useState({
        title : '',
        content : '',
        liked_user : '',
        question_comments : [],
        url : ''
    }); 
    const [comments, setComments] = useState([]);

    const load = ()=>{
        loadArticle(token, article_id)
        .then(res=>{
            setContent(res.data);
            const result = Promise.all( //map함수로 모든 비동기요청을 처리한 뒤 promise 배열을 새로만든다.
                res.data.question_comments.map(url=>{
                    const u = url.split('/');
                    const comment_id = u[4];
                    return loadComments(token, article_id, comment_id)
                            .then(res=>{return res.data})
                })
            )
            .then(res=>{
                setComments(res);
            })
            .catch(err=>{
                console.log(err.response);
            })
        })
        .catch(err=>{
            console.log(err.response);
        })
    }
    useEffect(()=>{load();}, []);

    const remove = ()=>{
        deleteArticle(token, article_id)
        .then((res)=>{
          history.goBack();
      }).catch((err)=>{
          console.log(err.response);
      });
    }

    const clickLikes = ()=>{
        /*user가 이미 좋아요를 눌렀는가?
        const users = content.liked_user;
        users.map((user_url)=>{
            const u = user_url.split('/');
            const uid = u[4];
            return uid;
        })
        const isUserLiked = users.find(user_id);
        if(isUserLiked){

        }else{

        }
        */
        let c = Object.assign({}, content);
        c.likes++;
        setContent(c);
        //서버에 데이터 업데이트
    }

    const addCom=()=>{
        addComment(token, article_id, 2)
        .then(res=>{
            load();
        }).catch(err=>{
            console.log(err.response);
        })
    }

    return (
        <div key={article_id} className='community_post'>
            <div>{"id : " + article_id}</div>
            <div className='community_title'>{content.title}</div>
            <div className='community_contents'>{content.content}</div>
            <div className='community_statistics'>
                <div className='community_comments'>댓글 {content.question_comments.length}</div>
                <div className='community_likes' onClick={clickLikes}>좋아요 {content.liked_user.length}</div>
            </div>
            <div className='comments'>
                {comments.map((comment)=>{
                    return (
                        <div className='comment'>
                            <div className='head'>
                                <div className='writer'>작성자 : {comment.user}</div>
                            </div>
                            <div className='description'>{comment.url}</div>
                            <div className='tail'>
                                <div className='date'>{comment.created_at}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Form className="input-comment">
                <Input className='description' id='description' type="text"></Input>
                <Button className='button' onClick={addCom}>댓글 입력</Button>
            </Form>
            <div className='buttons'>
                <div className='remove button' onClick={remove}>삭제</div>
                <div className='back button' onClick={()=>{history.goBack()}}>뒤로</div>
            </div>
        </div>
    );
  }

  export default Article;