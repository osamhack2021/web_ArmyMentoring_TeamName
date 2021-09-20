import React,{useState} from "react";
import './Home.scss';



function Home(){

    const [qna , setQna] =useState('A');
    const toggling=(e)=>{
    const clicked= e.target.parentElement;
    const toggled= clicked.nextSibling;
    if(toggled.classList.contains("hide")){
        toggled.classList.remove("hide");
    } else {
        toggled.classList.add("hide");
      }
    }
        return(
            <div>
                <h2>This is Home</h2>
                <div className='service'>
                    <h2>군대에서의 멘토링 서비스</h2>
                </div>
                <div>
                    <h2>멘토링 가능한 목록들</h2>
                </div>  
                <div> 
                    <h2>진행과정</h2>
                </div> 
                <div> 
                    <h2>멘토링 후기</h2>
                </div> 
                <div> 
                    <h2>FAQs</h2>
                    <div className='QnA'>
                        
                        <div className='Q'>
                            <p>질문</p>
                            <button onClick={toggling}/>
                        </div>

                        <div className='A'>
                            <p>
                                    대답
                            </p>
                        </div>
                        

                    </div>

                    <div className='QnA'>
                        
                        <div className='Q'>
                            <p>질문2</p>
                            <button onClick={toggling}/>
                        </div>

                        <div className='A'>
                            <p>
                                    대답2
                            </p>
                        </div>
                        

                    </div>
                </div> 
            </div>
        )
    
}

export default Home;