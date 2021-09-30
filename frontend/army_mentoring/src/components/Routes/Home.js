import React, {useEffect} from "react";
import './Home.scss';
import Mentoring_review from './Mentoring_review';
import 'bootstrap/dist/css/bootstrap.css'
import soldier from './soldier.png';
function Home(){


    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );
    
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
                <div className='service home'>
                    <div className='section_service'>
                    <section className='service_text'>
                        <h2>군대에서의 멘토링 서비스</h2>
                        <h3>누구에게나 의미있고 값진 군생활이 될 수 있도록</h3>
                    </section>
                    <img src={soldier}/>
                    </div>

                    <button>더 알아보기</button>
                </div>

                <div className='mentoring home'>
                    <h2>멘토링 가능한 목록들</h2>
                    <div className='section_mentoring'>
                        <div>1</div>
                        <div>2</div>
                    </div>
                    <div className='section_mentoring'>
                        <div>3</div>
                        <div>4</div>
                    </div>
                    <button>더 알아보기</button>
                 
                </div>

                <div className='howtodo home'> 
                    <h2>진행과정</h2>
                    <div className='section_howtodo'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    </div>
                </div> 
                
                <div className='review home'> 
                <h2>멘토링 후기</h2>
                    <Mentoring_review/>
                </div> 

                <div className='faqs home'> 
                    <h2>FAQs</h2>
                    <div className='QnA'>
                        <div className='Q'>
                            <p>멘토/멘티 두가지 활동을 동시에 진행가능한가요?</p>
                            <button onClick={toggling}/>
                        </div>
                        <div className='A'>
                            <p>
                            군토&군티는 사람마다의 재능의 다양성을 믿으며 멘토/ 멘티 활동에 제한을 두지 않습니다. 배우고, 가르치며 성장해 나가세요!
                            </p>
                        </div>
                    </div>
                    <div className='QnA'>
                        <div className='Q'>
                            <p>여러가지 포트폴리오를 올리기가 가능한가요?</p>
                            <button onClick={toggling}/>
                        </div>
                        <div className='A'>
                            <p>
                            자신있는 분야마다 포트폴리오를 여러가지 생성하여 등록이 가능합니다!
                            </p>
                        </div>
                    </div>
                    <div className='QnA'>
                        <div className='Q'>
                            <p>멘토링을 도중에 중단하기 가능한가요?</p>
                            <button onClick={toggling}/>
                        </div>
                        <div className='A'>
                            <p>
                            멘토링을 진행중인 멘토/멘티와의 협의 후에 중단해주시면 됩니다!
                            </p>
                        </div>
                    </div>
                    <div className='QnA'>
                        <div className='Q'>
                            <p>훈련/ 일과 때문에 힘들것같은데 멘토링 시간 조정이 가능한가요?</p>
                            <button onClick={toggling}/>
                        </div>
                        <div className='A'>
                            <p>
                            진행중인 멘토/멘티와의 협의를 통하여 조정하시면 됩니다! 군토군티의 모든 멘토/멘티들은 모두 국군장병님들이니 부담갖지 않으시고 협의하시면 됩니다
                            </p>
                        </div>
                    </div>
                    <div className='QnA'>
                        <div className='Q'>
                            <p>질문5</p>
                            <button onClick={toggling}/>
                        </div>
                        <div className='A'>
                            <p>
                                    대답5
                            </p>
                        </div>
                    </div>

                </div> 
            </div>
        )
    
}

export default Home;