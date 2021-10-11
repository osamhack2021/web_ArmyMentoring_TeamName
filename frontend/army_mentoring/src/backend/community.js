import axios from 'axios';

const _loadArticleList = async ()=>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/question',
            headers : '' //왠지는 모르는데 이거 없으면 401에러 뜸
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _loadArticle = async (token, article_id)=>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/question/' + article_id,
            headers : { Authorization : token}
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _loadComment = async (token, article_id, question_id)=>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/question-comment/' + question_id,
            headers : { Authorization : token}
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _addComment = async (token, article_id, user_id, content)=>{
    try{
        const response = await axios({
            method : 'POST',
            url : '/question-comment',
            headers : { Authorization : token },
            data : {
                content : content,
                question : '/question/' + article_id,
                user : '/user/' + user_id,
                liked_user : []
            }})
        return response;
    }
    catch(error){
        throw error;
    }
}

const _deleteArticle = async (token, article_id)=>{
    try{
        const response = await axios({
            method : 'DELETE',
            url : '/question/' + article_id,
            headers : { Authorization : token}
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _addArticle = async (title, content, token, user_id)=>{
    try{
        const response = await axios({
            method : 'POST',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question',
            headers : { Authorization : token},
            data : {
                title : title,
                content : content,
                user : 'https://guntor-guntee-data-server.herokuapp.com/user/' + user_id
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}


const _updateArticle = async (content, token, article_id)=>{
    try{
        const response = await axios({
            method : 'PUT',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question/' + article_id,
            headers : { Authorization : token },
            data : {
                title : content.title,
                content : content.content,
                user : content.user,
                liked_user : content.liked_user
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _updateComment = async (content, comment, comment_id, token)=>{
    try{
        const response = await axios({
            method : 'PUT',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question-comment/' + comment_id ,
            headers : { Authorization : token },
            data : {
                question : content.url,
                content : comment.content,
                user : comment.user,
                liked_user : comment.liked_user
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _deleteComment = async (comment_id, token)=>{
    try{
        const response = await axios({
            method : 'DELETE',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question-comment/' + comment_id ,
            headers : { Authorization : token }
        })
        return response;
    }catch(error){
        throw error;
    }
}




export { _loadArticleList, _deleteArticle, _loadArticle, _loadComment, _addComment, _addArticle, _updateArticle, _updateComment, _deleteComment};