import React, {useState, useEffect } from 'react';
import './Article.scss';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { _addComment, _loadArticle, _loadComments, _deleteArticle, _updateArticle, _updateComment, _deleteComment} from '../../../backend/community';
import { UserContext }  from '../../../context/Context';
import heartImg from '../img/heart.png'; 
import dialogImg from '../img/dialog.png';

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
    const [commentDescription, setCommentDescription] = useState('');

    const load = ()=>{
        _loadArticle(token, article_id)
        .then(res=>{
            setContent(()=>res.data);
            const result = Promise.all( //map함수로 모든 비동기요청을 처리한 뒤 promise 배열을 새로만든다.
                res.data.question_comments.map(url=>{
                    const u = url.split('/');
                    const comment_id = u[4];
                    return _loadComments(token, article_id, comment_id)
                            .then(res=>{return {comment : res.data, id:comment_id}})
                })
            )
            .then(res=>{
                setComments(()=>res);
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

    /*
    const isLikedStyle = ()=>{
        let a = document.getElementById('article-like');
        if(isUserLiked(content) != -1)
            a.className = "community_likes pushed";
        else
            a.className = "community_likes";
    }
    */

    const deleteArticle = ()=>{
        _deleteArticle(token, article_id)
        .then((res)=>{
          history.goBack();
      }).catch((err)=>{
          console.log(err.response);
      });
    }

    const isUserLiked = (co)=>{
        let result = -1;
        co.liked_user.forEach((user, index)=>{
            const t = user.split('/');
            const id = t[4];
            if(id == user_id){
                result = index;
                return false;
            }
        })
        return result;
    }

    const clickArticleLikes = (e)=>{
        const t_content = Object.assign({}, content);
        const i = isUserLiked(t_content);
        if(i == -1){
            t_content.liked_user.push('https://guntor-guntee-data-server.herokuapp.com/user/' + user_id);
        }else{
            t_content.liked_user.splice(i,1);
        }

        _updateArticle(t_content, token, article_id)
        .then(res=>{
            load();
        }).catch(err=>{
            console.log(err.response.data);
        })
    }

    const findIndexOfComment = (id)=>{
        for(var i=0;i<comments.length;i++){
            if (comments[i].id == id){
                return i;
            }
        }
        return -1;
    }

    const clickCommentLikes = (e, id)=>{
        let index = findIndexOfComment(id);
        let t_comments = comments.slice();
        let t_comment = t_comments[index].comment;
        let result = isUserLiked(t_comment);
        if(result == -1){
            t_comment.liked_user.push('https://guntor-guntee-data-server.herokuapp.com/user/' + user_id);
        }else{
            t_comment.liked_user.splice(result, 1);
        }

        _updateComment(content, t_comments[index].comment, id, token)
        .then(res=>{
            load();
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const addComment=()=>{
        if(commentDescription == ''){
            alert('댓글 내용을 입력해 주세요');
            return;
        }
        _addComment(token, article_id, 2, commentDescription)
        .then(res=>{
            load();
        }).catch(err=>{
            console.log(err.response);
        })
    }

    const deleteComment = (id) =>{
        _deleteComment(id, token)
        .then(res=>{
            load();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div key={article_id} className='community_post'>
            <div className='community_title'>{content.title}</div>
            <div className='community_contents'>{content.content}</div>
            <div className='community_statistics'>
                <div className='community_comments'><img src={dialogImg} alt="dialog"></img>{content.question_comments.length}</div>
                <div className='community_likes' id="article-like"><img src={heartImg} alt="heart" onClick={clickArticleLikes}></img>{content.liked_user.length}</div>
            </div>
            <Form className="input-comment">
                <Input className='description' onChange={(e)=>{setCommentDescription(e.target.value)}} type="text"></Input>
                <Button className='button' onClick={addComment}>댓글 입력</Button>
            </Form>
            <div className='comments'>
                {comments.map(({comment, id})=>{
                    const t = comment.user.split('/');
                    const uid = t[4];
                    return (
                        <div className='comment'>
                            <div className='head'>
                                <img className="profile-image" alt="profile"></img>
                            </div>
                            <div className='content'>
                                <div className='writer'>작성자 : {uid}</div>
                                <div className='description'>{comment.content}</div>
                                </div>
                            <div className='tail'>
                                <div className="update">
                                    <div className="delete" onClick={()=>{deleteComment(id)}}>삭제</div>
                                </div>
                                <div className='like'><img src={heartImg} alt="heart" onClick={(e)=>{clickCommentLikes(e, id)}}></img>{comment.liked_user.length}</div>
                                <div className='date'>{comment.created_at}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='buttons'>
                <div className='remove button' onClick={deleteArticle}>삭제</div>
                <div className='back button' onClick={()=>{history.goBack()}}>뒤로</div>
            </div>
        </div>
    );
  }

  export default Article;