import { useEffect, useState } from "react";

import "./MakeMentoringAssignment.scss";

function MakeMentoringAssignment({index, onChange }){
    const today=new Date();
    const dateTimeNow=today.toISOString().substring(0, 16);

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [deadline, setDeadline] = useState();

    useEffect(()=>{
        onChange({title, content, deadline}, index);
    }, [title, content, deadline, onChange]);

    return (
        <div className="MakeMentoringAssignment" key={index}>
            <div className="title_container">
                <div className="assignment_title">제목</div>
                <input
                type="text"
                className="title"
                onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="content_container">
                <div className="content_title">내용</div>
                <textarea
                className="content"
                onChange={e=>setContent(e.target.value)}
                >
                </textarea>
            </div>
            <div className="deadline_container">
                <div className="deadline_title">마감 기한</div>
                <input 
                    type="datetime-local"
                    min={dateTimeNow}
                    onChange={(e)=>setDeadline(e.target.value)}
                    />
            </div>
        </div>
    )    
}

export default MakeMentoringAssignment;