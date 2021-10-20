import React, { useState, useEffect, useContext, useRef } from 'react';

import axios from 'axios';

import { UserContext } from "../../../context/Context";
import MakeMentoringAssignment from './MakeMentoringAssignment';

import './MakeMentoring.scss';
import { updateUserContextBySavedToken } from '../../../backend/auth';
import { getFromUrl } from '../../../backend/common';
import { _addMentoring, _addMultipleAssigment } from '../../../backend/mentoring';

function MakeMentoring({history}){
    const today=new Date();
    const dateTimeNow=today.toISOString().substring(0, 16);

    const [user, setUser] = useContext(UserContext); 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [startDate, setStartDate] = useState(dateTimeNow);
    const [endDate, setEndDate] = useState(dateTimeNow);
    const [assignments, setAssignments] = useState([]);
    const [tags, setTags] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    
    const [portfolios, setPortfolios] = useState([]);

    const endDateRef = useRef();
    const startDateRef = useRef();
    const thumbnailPreviewRef = useRef();

    
    useEffect(()=>{
        (async ()=>{
            const updatedUser = await updateUserContextBySavedToken(setUser);
            const updatedUserPortfolio = updatedUser.portfolio || [];
            const initialPortfolio = updatedUserPortfolio[0] || ""; 
            
            updatedUserPortfolio.forEach(async (element)=>{
                const portfolioData = (await getFromUrl(element)).data;
                setPortfolios((prevState)=>[...prevState, portfolioData]);
            });
            
            setPortfolio(initialPortfolio);
        })();

        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        });

        [endDateRef, startDateRef].forEach((ref)=>{
            ref.current.min=dateTimeNow;
        })
    }, []);

    const onAddAssignment=()=>{
        setAssignments((prevState)=>[...prevState, {
            "title": "",
            "content": "",
            "deadline": "",
        }])
    };

    const onAssignmentChange=(value, index)=>{
        setAssignments(prevState=>{
            let newState=prevState
            newState[index] = value
            return newState;
        })
    }

    const addTag = (value) => {
        setTags([...tags, {"name" : value}]);
    }

    const handleEnterPress = (e)=> {
        const target = e.target;
        const value = target.value;
        if (e.key === "Enter" && value !== "") {
            target.value="";
            addTag(value);
        }
    }

    const handleUploadImage=(e)=>{
        const image = e.target.files[0];
        setThumbnail(image);
        const reader = new FileReader();
        reader.onloadend = (e) => {
            const result = e.target.result;
            if (result) {
                thumbnailPreviewRef.current.src=result;
            }
          };
          reader.readAsDataURL(image);
    }

    const submitMentoring = async () => {
        try {
            const form = new FormData();
            form.append('title', title);
            form.append('description', description);
            form.append('portfolio', portfolio);
            form.append('start_date', startDate);
            form.append('end_date', endDate);
            form.append('thumbnail', thumbnail);
            form.append('mentor', user.url);
            console.log(form);
            const mentoringData = await (await _addMentoring(form)).data;
            console.log(mentoringData);
            const mentoringUrl = mentoringData.url;
            await axios.patch(mentoringUrl, {tags});
            await _addMultipleAssigment(assignments, mentoringUrl);

            history.push('/mymentoring#asMentor');
        }catch (error){
            console.error(error.response.data);
        }
    }

    return (
        <div className="MakeMentoring">
            <div className="make_mentoring_container">
                <div className="head_title"> 멘토링 제작 페이지 </div>
                <div className="make_mentoring_header">
                    <div className='user_profile'>
                        <img src={user.profile_image} alt="user_profile" />
                    </div>
                    
                    <div className='edit_block'>
                        <div className="thumbnail">
                            <img className="preview" alt='thumnail preview' ref={thumbnailPreviewRef} />
                            <input type="file" className='thumbnail_input' accept="image/*" 
                            onChange={handleUploadImage}/>
                        </div>

                        <div className="title">
                            {/* <h2>제목</h2> */}
                            <input 
                            type="text" className='title_input' placeholder="제목 입력..." spellcheck="false"
                            onChange={(e)=>setTitle(e.target.value)} 
                            />
                        </div>

                        <div className="tags">
                            {/* <h2>태그</h2> */}
                            <input 
                            type="text" className="tag_input" placeholder="태그 입력 후 엔터를 누르세요..." spellcheck="false"
                            onKeyPress={handleEnterPress}
                            />
                            <div className="tags_container">
                                {
                                    tags.map((tag, index)=>{
                                        return <span className="tag" key={index}>
                                            #{tag.name}
                                            </span>
                                    })
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div className="make_mentoring_body">
                    <section className="input_description">
                        <div className="sub_title">멘토링 소개 작성</div>
                        <textarea
                            className="t_box"
                            onChange={(e)=>{setDescription(e.target.value)}}
                        >
                        </textarea>
                    </section>
                    
                    <section className="input_assignments">
                    <div className="sub_title">과제</div>
                        <div className="make_mentoring_assignments_container">
                            {
                                assignments.map((assignment, index)=>{
                                    return <MakeMentoringAssignment 
                                    index={index}
                                    onChange={onAssignmentChange}
                                    />
                                })
                            }
                        <div className="button_set">
                            <button onClick={onAddAssignment}>&nbsp;+&nbsp;</button>
                        </div>
                        </div>
                        
                    </section>
                    
                    
                    <section className="input_date">
                    <div className="sub_title">날짜 설정</div>
                        <div className="start_date_container">
                            <label for="start_date">시작일자:</label> 
                            <input 
                                className="date_input"
                                type="datetime-local" id="start_date"
                                name="start_date"
                                ref={startDateRef}
                                defaultValue={dateTimeNow}
                                onChange={(e)=>{
                                    const value = e.target.value;
                                    setStartDate(value);
                                    endDateRef.current.min=value;
                                }}
                                />
                        </div>
                        <div className="end_date_container">
                            <label for="end_date">마감일자:</label> 
                            <input 
                                className="date_input"
                                type="datetime-local" id="end_date"
                                name="end_date"
                                ref={endDateRef}
                                onChange={(e)=>{
                                    const value = e.target.value;
                                    setEndDate(value);
                                    startDateRef.current.max=value;
                                }}
                            />
                        </div>
                    </section>
                    
                    <section className="input_portfolio">
                        <div className="sub_title">포트폴리오 선택</div>
                        <select 
                            className="selecter"
                            name="portfolio" 
                            id="portfolio"
                            defaultValue={portfolio}
                            onChange={(e)=>{setPortfolio(e.target.value)}}
                        >
                            {portfolios.map((element, index)=>{
                                return <option key={index} value={element.url}>{element.title}</option>
                            })}
                        </select>
                    </section>

                    
                    <div className="button_container">
                        <div className="button_set">
                            <button onClick={submitMentoring}>멘토링 등록</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default MakeMentoring;