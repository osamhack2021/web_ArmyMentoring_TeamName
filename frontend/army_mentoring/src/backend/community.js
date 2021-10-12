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

const _loadArticle = async (article_id)=>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/question/' + article_id
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _loadComment = async (article_id, question_id)=>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/question-comment/' + question_id
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _addComment = async (article_id, user_id, content)=>{
    try{
        const response = await axios({
            method : 'POST',
            url : '/question-comment',
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

const _deleteArticle = async (article_id)=>{
    try{
        const response = await axios({
            method : 'DELETE',
            url : '/question/' + article_id
        })
        return response;
    }catch(error){
        throw error;
    }
}

const _addArticle = async (title, content, user_id)=>{
    try{
        const response = await axios({
            method : 'POST',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question',
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


const _updateArticle = async (content, article_id)=>{
    try{
        const response = await axios({
            method : 'PUT',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question/' + article_id,
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

const _updateComment = async (content, comment, comment_id)=>{
    try{
        const response = await axios({
            method : 'PUT',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question-comment/' + comment_id,
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

const _deleteComment = async (comment_id)=>{
    try{
        const response = await axios({
            method : 'DELETE',
            url : 'https://guntor-guntee-data-server.herokuapp.com/question-comment/' + comment_id
        })
        return response;
    }catch(error){
        throw error;
    }
}




export { _loadArticleList, _deleteArticle, _loadArticle, _loadComment, _addComment, _addArticle, _updateArticle, _updateComment, _deleteComment};