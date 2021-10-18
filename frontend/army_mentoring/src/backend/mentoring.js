import axios from "axios";

const _addAssignment = async (title, content, mentoring_id, deadline) =>{
    try{
        const response = await axios({
            method : 'POST',
            url : '/assignment',
            data : {
                title : title,
                content : content,
                deadline : deadline,
                mentoring : 'https://guntor-guntee-data-server.herokuapp.com/mentoring/' + mentoring_id,
                passed_mentees : [ 'https://guntor-guntee-data-server.herokuapp.com/user/1' ]
            }
        })
        return response;
    } catch (error){
        throw error;
    }
}

const _addMultipleAssigment = async (assignmentList, mentoringUrl) => {
    try {
        const response = await axios.all(assignmentList.map((assignment)=>{
            return axios.post('assignment', {
                ...assignment, 
                'mentoring' : mentoringUrl
            })
        }))
        return response;
    } catch (error) {
        throw(error);
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

const _updateAssignment = async (title, content, mentoring_id,  deadline, assignment_id) =>{
    try{
        const response = await axios({
            method : 'PUT',
            url : '/assignment/' + assignment_id,
            data : {
                title : title,
                content : content,
                deadline : deadline,
                mentoring : 'https://guntor-guntee-data-server.herokuapp.com/mentoring/' + mentoring_id,
                passed_mentees : [ 'https://guntor-guntee-data-server.herokuapp.com/user/1' ]
            }
        })
        return response;
    } catch (error){
        throw error;
    }
}

const _loadMentoringList = async () =>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/mentoring'
        })
        return response;
    } catch (error){
        throw error;
    }
}

const _loadMentoring = async (mentoring_id) =>{
    try{
        const response = await axios({
            method : 'GET',
            url : '/mentoring/' + mentoring_id
        })
        return response;
    } catch (error){
        throw error;
    }
}


const _addMentoring = async (form) => {
    console.log(form);
    try {
        const response = await axios.post("mentoring", form)
        return response;
    } catch (error) {
        throw(error);
    }
}

const _loadMentoringReviewList = async () => {
    try {
        const response = await axios({
            method : 'GET',
            url : '/user-review'
        })
        return response;
    } catch (error) {
        throw error;
    }
}

const _updateMentoring = async (mentoring, mentoring_id) => {
    try {
        const response = await axios({
            method : 'PUT',
            url : '/mentoring/' + mentoring_id,
            data : {
                title : mentoring.title,
                memo : mentoring.memo,
                mentor : mentoring.mentor,
                mentees : mentoring.mentees,
                portfolio : mentoring.portfolio,
                start_date : mentoring.start_date,
                end_date : mentoring.end_date
            }
        })
        return response;
    } catch (error) {
        throw error;
    }
}


export { _updateMentoring, _addMentoring, _addAssignment, _loadAssignment, _addMultipleAssigment, _loadMentoringReviewList, _loadMentoring, _loadMentoringList , _deleteAssignment, _updateAssignment };
