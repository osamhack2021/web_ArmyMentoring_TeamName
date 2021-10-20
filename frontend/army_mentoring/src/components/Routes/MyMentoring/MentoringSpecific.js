import React, { useContext, useEffect, useState } from 'react';
import { _loadMentoring, _loadUser } from '../../../backend/profile';
import { UserContext } from '../../../context/Context';
import './MentoringSpecific.scss';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import { _addAssignment, _deleteAssignment, _loadAssignment, _updateAssignment, _updateMentoring } from '../../../backend/mentoring';
import DatePicker from "react-datepicker";
import note from '../img/note.png';

function MentoringSpecificMento({match, history}){
    const mentoring_id = match.params.id;
    const [user, setUser] = useContext(UserContext);
    const [mentoring, setMentoring] = useState({
        title : '',
        tags : [],
        assignments : [],
        start_date : '',
        end_date : ''
    });
    const [mentor, setMentor] = useState({});
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentContent, setAssignmentContent] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [endDate, setEndDate] = useState(new Date());
    const [editEndDate, setEditEndDate] = useState(new Date());
    const [memoText, setMemoText] = useState('');
    const [mentees, setMentees] = useState([]);
    const [passedList, setPassedList] = useState([]);

    const getId = (url)=>{
        if(url == undefined)
            return -1;
        const t = url.split('/');
        return t[4];
    }

    const getMentorId = ()=>{
        if(Object.keys(mentor).length == 0)
            return -1;
        return getId(mentor.url);
    }
    
    const getPortfolioId = ()=>{
        let url = mentoring.portfolio;
        if(url == undefined)
            return -1;
        return getId(url);
    }

    const [isMe, setIsMe] = useState(false);

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    useEffect(()=>{
        load();
    }, []);

    const load = ()=>{
        _loadMentoring(mentoring_id)
        .then(res=>{
            setMentoring(res.data);
            Promise.all(
                res.data.mentees.map((m)=>{
                    let mid = getId(m);
                    return _loadUser(mid)
                            .then(res=>{
                                return res.data;
                            })
                })
            ).then(res=>{
                setMentees(res);
            })
            .catch(err=>{console.log(err)})
            setMentees(res.data.mentees);
            let mentor_id = getId(res.data.mentor);
            let isme = (mentor_id == getId(user.url)) ? true : false;
            setIsMe(isme);
            const c = document.getElementById('add-button');
            c.className = isme ? 'add-button' : 'add-button h';
            _loadUser(mentor_id)
            .then(res=>{
                setMentor(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })

            Promise.all(
                res.data.assignments.map((a)=>{
                    let aid = getId(a);
                    return _loadAssignment(aid)
                            .then(res=>{
                                return res.data
                            })
                            .catch(err=>{
                                console.log(err.response);
                            })
                })
            )
            .then(res=>{
                setAssignments(res);
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const showAddAssignment = ()=>{
        const a = document.getElementById('add-assignment');
        a.className = 'add-assignment';
    }

    const hideAddAssignment = ()=>{
        const a = document.getElementById('add-assignment');
        a.className = 'add-assignment h';
        const t = document.getElementById('assignment-title');
        const c = document.getElementById('assignment-content');
        t.value = '';
        c.value = '';
        setAssignmentTitle('');
        setAssignmentContent('');
    }

    const addAssignment = ()=>{
        _addAssignment(assignmentTitle, assignmentContent, mentoring_id, endDate)
        .then(res=>{
            load();
            hideAddAssignment();
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const deleteAssignment = (assignment_id)=>{
        console.log(assignment_id);
        _deleteAssignment(assignment_id)
        .then(res=>{
            load();
            hideAddAssignment();
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const findIndexOfAssignment = (assignment_id) =>{
        for(var i=0;i<assignments.length;i++){
            if (getId(assignments[i].url) == assignment_id){
                return i;
            }
        }
        return -1;
    }
    const showEditAssignment = (assignment_id)=>{
        const i = findIndexOfAssignment(assignment_id);
        const a = document.getElementById('edit-assignment'+assignment_id);
        a.className = 'assignment-container';
        const b = document.getElementById('assignment'+assignment_id);
        b.className = 'assignment-container h';
        
        const t = document.getElementById('edit-assignment-title'+assignment_id);
        t.value = assignments[i].title;
        const c = document.getElementById('edit-assignment-content'+assignment_id);
        c.value = assignments[i].content;
        const d = document.getElementById('edit-assignment-deadline'+assignment_id);
        d.value = assignments[i].deadline.substring(0,10).split('-').reverse().join('/');
        setPassedList(assignments[i].passed_mentees);
    }

    const hideEditAssignment = (assignment_id)=>{
        const i = findIndexOfAssignment(assignment_id);
        const a = document.getElementById('edit-assignment'+assignment_id);
        a.className = 'assignment-container h';
        const b = document.getElementById('assignment'+assignment_id);
        b.className = 'assignment-container';

        const t = document.getElementById('edit-assignment-title'+assignment_id);
        t.value = '';
        const c = document.getElementById('edit-assignment-content'+assignment_id);
        c.value = '';
    }

    const editAssignment = (assignment_id)=>{
        const t = document.getElementById('edit-assignment-title'+assignment_id);
        const c = document.getElementById('edit-assignment-content'+assignment_id);
        _updateAssignment(t.value, c.value, mentoring_id, editEndDate, assignment_id, passedList)
        .then(res=>{
            load();
            hideEditAssignment(assignment_id);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }


    const goEditMemo = ()=>{
        const e = document.getElementById('memo-box-edit');
        const b = document.getElementById('memo-box');
        e.className='memo-box';
        b.className='memo-box h';

        const i = document.getElementById('memo-edit');
        i.value = mentoring.memo;
    }
    const exitEditMemo = ()=>{
        const e = document.getElementById('memo-box-edit');
        const b = document.getElementById('memo-box');
        e.className='memo-box h';
        b.className='memo-box';

        const i = document.getElementById('memo-edit');
        i.value = ''
    }

    const editMemo = ()=>{
        const m = Object.assign({}, mentoring);
        m.memo = memoText;
        _updateMentoring(m, mentoring_id)
        .then(res=>{
            load();
            exitEditMemo();
        })
        .catch(err=>{console.log(err.response)})
    }

    const addPassedList = (e, mentee_url)=>{
        const l = passedList.slice();
        let i = l.findIndex(url=>{return url == mentee_url});
        if(i==-1){
            l.push(mentee_url);
            setPassedList(l);
        }
        console.log(l);
        const el = e.target;
        el.className = 'passbutton passed';
        el.nextSibling.className='passbutton';

    }

    const removePassedList = (e, mentee_url)=>{
        const l = passedList.slice();
        let i = l.findIndex(url=>{return url == mentee_url});
        if(i!=-1){
            l.splice(i,1);
            setPassedList(l);
        }
        console.log(l);
        const el = e.target;
        el.className = 'passbutton unpassed';
        el.previousSibling.className='passbutton';
    }

    return (
        <div className='specific-mentor-body'>
            <div className="title-container" id="">
                <div className='mentor-content'>
                    <img alt="mentor profile" src={mentoring.thumbnail}></img>
                    <Link className='mentor-name' to={`/profile/${getMentorId()}`}>멘토 : {mentor.username}</Link><br />
                    <Link classname='mentor-portfolio' to={`/profile/${getMentorId()}/portfolio/${getPortfolioId()}`}>포트폴리오 보러 가기</Link>
                </div>
                <div className='other-content'>
                    <div className='title-content'>
                        <h2>{mentoring.title}</h2>
                        <div className="during">기간 : {mentoring.start_date.substring(0,10)} ~ {mentoring.end_date.substring(0,10)}</div>
                    </div>
                    <div className='tags'>
                        {
                            mentoring.tags.map((t)=>{
                                return (<div className='tag'>{'#'+t.name}</div>)
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <div className='button-border'>
                    <Link to={`${match.url}/chat`} className='chat-button'>채팅방으로 이동</Link>
                </div>
            </div>
            <div className='content-container'>

                <div className="assignments">
                    <div className='assignment-title'>과제 목록</div>
                    <div className='assignments-box'>
                        {
                            assignments.map((a)=>{
                                let aid = getId(a.url);
                                return (
                                <div className='assignment'>
                                    <div id={'assignment'+aid} className='assignment-container'>
                                        <div className='main-col'>
                                            <div>제목 : {a.title}</div>
                                            <div>내용 : {a.content}</div>
                                            <div className='passed-list-title'>멘티별 과제 통과 여부</div>
                                            <div className='passed-list-box'>
                                            {
                                                mentees.map((mentee)=>{
                                                    let mentee_id = getId(mentee.url);
                                                    let isPassed = false;
                                                    a.passed_mentees.forEach((li)=>{
                                                        if(getId(li) == mentee_id){
                                                            isPassed=true;
                                                            return false;
                                                        }
                                                    })
                                                    return isPassed ? 
                                                    (<div className='passed-mentee-list'>
                                                        <div className='mentee-name passed-mentee'>멘티 : {mentee.username}</div>
                                                    </div>) 
                                                    :
                                                    (<div className='passed-mentee-list'>
                                                        <div className='mentee-name unpassed-mentee'>멘티 : {mentee.username}</div>
                                                    </div>) 
                                                })
                                            }
                                            </div>
                                        </div>
                                        <div className='sub-col'>
                                            기한 : {a.deadline.substring(0,10)}
                                            {
                                                isMe ?
                                                (<div className='setting-buttons'>
                                                    <div className='button' onClick={()=>{showEditAssignment(aid)}}>
                                                        관리
                                                    </div>
                                                    <div className='button' onClick={()=>{deleteAssignment(aid)}}>
                                                        삭제
                                                    </div>
                                                </div>)
                                                :
                                                (<div></div>)
                                            }
                                        </div>
                                    </div>
                                    <div id={'edit-assignment'+aid} className='assignment-container h'>
                                        <div className='main-col'>
                                            제목 : <Input id={'edit-assignment-title'+aid}></Input>
                                            내용 : <Input id={'edit-assignment-content'+aid}></Input>
                                            <div className='passed-list-title'>과제 통과 멘티 관리</div>
                                            <div className='passed-list-box'>
                                            {
                                                mentees.map((mentee)=>{
                                                    let mentee_id = getId(mentee.url);
                                                    let isPassed = false;
                                                    a.passed_mentees.forEach((li)=>{
                                                        if(getId(li) == mentee_id)
                                                            isPassed=true;
                                                            return false;
                                                    })
                                                    return isPassed ? 
                                                    (<div className='passed-list'>
                                                        <div className='mentee-name'>멘티 : {mentee.username}</div>
                                                        <div className='passbuttons'>
                                                            <div onClick={(e)=>addPassedList(e, mentee.url)} className='passbutton passed'>통과</div>
                                                            <div className='passbutton' onClick={(e)=>removePassedList(e, mentee.url)}>미통과</div>
                                                        </div>
                                                    </div>) 
                                                    :
                                                    (<div className='passed-list'>
                                                        <div className='mentee-name'>멘티 : {mentee.username}</div>
                                                        <div className='passbuttons'>
                                                            <div onClick={(e)=>addPassedList(e, mentee.url)} className='passbutton'>통과</div>
                                                            <div className='passbutton unpassed' onClick={(e)=>removePassedList(e, mentee.url)}>미통과</div>
                                                        </div>
                                                    </div>) 
                                                })
                                            }
                                            </div>
                                        </div>
                                        <div className='sub-col'>
                                            기한 : <DatePicker id={'edit-assignment-deadline'+aid} selected={editEndDate} onChange={(date)=>{setEditEndDate(date)}}/>
                                            <div className='buttons'>
                                                <div className='button' onClick={()=>{editAssignment(aid)}}>
                                                    수정
                                                </div>
                                                <div className='button' onClick={()=>{hideEditAssignment(aid)}}>
                                                    취소
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                        <div className='add-button-container'>
                            <div id='add-button' className='add-button' onClick={showAddAssignment}>과제 추가</div>
                        </div>
                        <div id='add-assignment' className='add-assignment h'>
                                제목 : <Input id='assignment-title' onChange={(e)=>{setAssignmentTitle(e.target.value)}}></Input>
                                내용 : <Input id='assignment-content' onChange={(e)=>{setAssignmentContent(e.target.value)}}></Input>
                                기한 : <DatePicker id='assignment-deadline' selected={endDate} onChange={(date)=>{setEndDate(date)}} />
                                <div className='buttons'>
                                    <div className='button' onClick={addAssignment}>추가</div>
                                    <div className='button' onClick={hideAddAssignment}>취소</div>
                                </div>
                        </div>
                    </div>
                </div>

                <div className="memo">
                    <div className='memo-title'>메모
                    <img src={note}/></div>
                    <div id='memo-box' className='memo-box'>
                        <div className='button-container'>
                            <div className='edit-content-button' onClick={goEditMemo}>메모수정</div>              
                        </div>
                        <div className='memo-content'>{mentoring.memo}</div>
                    </div>
                    <div id='memo-box-edit' className='memo-box h'>
                        <div className='edit-content'>
                            <div className='confirm' onClick={editMemo}>수정</div>
                            <div className='cancel' onClick={exitEditMemo}>취소</div>
                        </div>
                        <Input type='textarea' id='memo-edit' className='memo-edit' onChange={(e)=>{setMemoText(e.target.value)}}></Input>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MentoringSpecificMento;