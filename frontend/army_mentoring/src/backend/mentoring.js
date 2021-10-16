import axios from "axios";

const _addAssignment = async (title, content, mentoring_id) =>{
    try{
        const response = await axios({
            method : 'POST',
            url : '/assignment',
            data : {
                title : title,
                content : content,
                deadline : new Date(),
                mentoring : 'https://guntor-guntee-data-server.herokuapp.com/mentoring/' + mentoring_id,
                passed_mentees : [ 'https://guntor-guntee-data-server.herokuapp.com/user/1' ]
            }
        })
        return response;
    } catch (error){
        throw error;
    }
}

const _loadAssignment = async (assignment_id) =>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/assignment/' + assignment_id
        })
        return response;
    } catch (error){
        throw error;
    }
}

const _deleteAssignment = async (assignment_id) =>{
    try{
        const response = await axios({
            method : 'DELETE',
            url : '/assignment/' + assignment_id
        })
        return response;
    } catch (error){
        throw error;
    }
}


export { _addAssignment, _loadAssignment, _deleteAssignment };