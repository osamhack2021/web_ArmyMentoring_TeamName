import React, {useState, useEffect, useContext } from 'react';
import './Article.scss';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { _addComment, _loadArticle, _loadComment, _deleteArticle, _updateArticle, _updateComment, _deleteComment} from '../../../backend/community';
import { UserContext }  from '../../../context/Context';
import heartImg from '../img/heart.png'; 
import dialogImg from '../img/dialog.png';
import { _loadUser } from '../../../backend/profile';

function Article({match, history}) {

    const article_id = match.params.id;
    const [user, setUser] = useContext(UserContext);
    let Me = user;
    const [content,setContent] = useState({
        title : '',
        content : '',
        liked_user : [],
        question_comments : [],
        url : ''
    }); 
    const [comments, setComments] = useState([]);
    const [commentDescription, setCommentDescription] = useState('');
    const [editCommentDescription, setEditCommentDescription] = useState('');

    const getId = (url)=>{
        if(url == undefined)
            return -1;
        const t = url.split('/');
        return t[4];
    }

    const load = ()=>{
        _loadArticle(article_id)
        .then(res=>{
            res.data.question_comments.sort((a,b)=>{
                if(a < b)
                    return -1;
                else if(a == b)
                    return 0;
                else if(a > b)
                    return 1;
            })
            setContent(()=>res.data);
            const result = Promise.all( //map함수로 모든 비동기요청을 처리한 뒤 promise 배열을 새로만든다.
                res.data.question_comments.map(url=>{
                    const u = url.split('/');
                    const comment_id = u[4];
                    let comment1;
                    return _loadComment(article_id, comment_id)
                            .then(res=>{
                                comment1 = res.data;
                                console.log(comment1);
                                return _loadUser(getId(res.data.user))
                                        .then(res=>{
                                            console.log(res);
                                            return {comment : comment1, id:comment_id, user: res.data}
                                        })
                            })
                })
            )
            .then(res=>{
                console.log(res);
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
    useEffect(()=>{setArticleLikedStyle();}, [content]);
    useEffect(()=>{setCommentsLikedStyle();}, [comments]);


    const setArticleLikedStyle = ()=>{
        let a = document.getElementById('article-like');
        if(isUserLiked(content) != -1)
            a.className = "community_likes pushed";
        else
            a.className = "community_likes";
    }

    const setCommentsLikedStyle = ()=>{
        let a = document.getElementsByClassName('like');
        
        for(var i=0;i<a.length;i++){
            if(isUserLiked(comments[i].comment) != -1)
                a[i].className = 'like pushed';
            else
                a[i].className = 'like';
        }
    }

    const deleteArticle = ()=>{
        _deleteArticle(article_id)
        .then((res)=>{
          history.goBack();
      }).catch((err)=>{
          console.log(err.response);
      });
    }

    const getUserId = ()=>{
        if(Object.keys(user).length == 0)
            return -1;
        const url = user.url;
        const t = url.split('/');
        return t[4];
    }

    const isUserLiked = (co)=>{
        let result = -1;
        co.liked_user.forEach((user, index)=>{
            const t = user.split('/');
            const id = t[4];
            const user_id = getUserId();
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
        const user_id = getUserId();
        if(i == -1){
            t_content.liked_user.push('https://guntor-guntee-data-server.herokuapp.com/user/' + user_id);
        }else{
            t_content.liked_user.splice(i,1);
        }

        _updateArticle(t_content, article_id)
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
        const user_id = getUserId();
        if(result == -1){
            t_comment.liked_user.push('https://guntor-guntee-data-server.herokuapp.com/user/' + user_id);
        }else{
            t_comment.liked_user.splice(result, 1);
        }

        _updateComment(content, t_comments[index].comment, id)
        .then(res=>{
            load();
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const addComment=(e)=>{
        if(commentDescription == ''){
            alert('댓글 내용을 입력해 주세요');
            return;
        }
        if(Object.keys(user).length == 0){
            alert('로그인 후 이용해 주세요!');
            return;
        }
        const user_id = getUserId();
        _addComment(article_id, user_id, commentDescription)
        .then(res=>{
            e.target.previousSibling.value = '';
            load();
        }).catch(err=>{
            console.log(err.response);
        })
    }

    const deleteComment = (id) =>{
        const i = findIndexOfComment(id);
        console.log(comments[i]);
        if(getId(comments[i].user.url) != getId(user.url)){
            alert('본인의 댓글만 삭제가능합니다!');
            return;
        }
        _deleteComment(id)
        .then(res=>{
            load();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const goEditComment = (id)=>{
        const i = findIndexOfComment(id);
        console.log(comments[i]);
        if(getId(comments[i].user.url) != getId(user.url)){
            alert('본인의 댓글만 수정가능합니다!');
            return;
        }
        const t = document.getElementById('edit-description'+id);
        t.value = comments[i].comment.content;

        const c = document.getElementById('comment'+id);
        const e = document.getElementById('edit-comment'+id);
        c.className="comment h";
        e.className="editcomment s";
    }

    const backEditComment = (id)=>{
        const c = document.getElementById('comment'+id);
        const e = document.getElementById('edit-comment'+id);
        c.className="comment s";
        e.className="editcomment h";
    }

    const updateComment = (id)=>{
        const i = findIndexOfComment(id);
        const c = comments.slice();
        c[i].comment.content = editCommentDescription;
        backEditComment(id);
        
        _updateComment(content, c[i].comment, id)
        .then(res=>{
            load();
        })
        .catch(err=>{
            console.log(err.response);
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
                {comments.map(({comment, id, user})=>{
                    console.log(comment);
                    const t = comment.user.split('/');
                    const uid = t[4];
                    console.log('uid : ' + uid);
                    console.log(user.url);
                    return (
                        <>

                        <div className='comment s' id={'comment'+id}>
                            <div className='head'>
                                <img className="profile-image" alt="profile"></img>
                            </div>
                            <div className='content'>
                                <div className='writer'>작성자 : {user.username}</div>
                                <div className='description'>{comment.content}</div>
                            </div>
                            <div className='tail'>
                                {(uid == getId(Me.url)) ?                                
                                (<div className="update">
                                    <div className="delete" onClick={()=>{deleteComment(id)}}>삭제</div>
                                    <div className="edit" onClick={()=>{goEditComment(id)}}>수정</div>
                                </div>)
                                :
                                (<div></div>)
                                }

                                <div className='like'><img src={heartImg} alt="heart" onClick={(e)=>{clickCommentLikes(e, id)}}></img>{comment.liked_user.length}</div>
                                <div className='date'>{comment.updated_at}</div> {/*추후에 created_at으로 수정*/}
                            </div>
                        </div>

                        <div className='editcomment h' id={'edit-comment'+id}>
                            <div className='head'>
                                <img className="profile-image" alt="profile"></img>
                            </div>
                            <div className='content'>
                                <div className='writer'>작성자 : {user.username}</div>
                                <Input type="text" className='edit-description' id={'edit-description'+id} onChange={(e)=>{setEditCommentDescription(e.target.value)}}></Input>
                            </div>
                            <div className='tail'>
                                <div className="update">
                                    <div className="delete" onClick={()=>{updateComment(id)}}>수정</div>
                                    <div className="edit" onClick={()=>{backEditComment(id)}}>취소</div>
                                </div>
                                    <div className='date'>{comment.updated_at}</div> {/*추후에 created_at으로 수정*/}
                            </div>
                        </div>

                        </>
                            
                    )
                })}
            </div>
            <div className='buttons'>
                <div className='remove button' onClick={deleteArticle}>삭제</div>
                <Link className='edit button' to={`${match.url}/edit`}>수정</Link>
                <div className='back button' onClick={()=>{history.goBack()}}>뒤로</div>
            </div>
        </div>
    );
  }

  export default Article;