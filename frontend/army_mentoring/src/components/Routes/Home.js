import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import './Home.scss';
import MentoringReview from './MentoringReview';
import 'bootstrap/dist/css/bootstrap.css'
import soldier2 from './img/soldier2.png';
import join from './img/join.png';
import loupe from './img/loupe.png';
import support from './img/support.png';
import resume from './img/resume.png';


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
                <div className='service home_section'>
                    <div className='section_service'>
                        <section className='service_text'>
                            <h2 className="section_title">군대에서의 멘토링 서비스</h2>
                            <h3>누구에게나 의미있고 값진 군생활이 될 수 있도록</h3>
                            <br/>
                            <div  className='button_set'>
                            <Link to="/login/signup"><button>지금 바로 시작하세요</button></Link>
                            </div>
                        </section>
                        <img src={soldier2} alt='soldier2' />
                    </div>

                    
                </div>

                <div className='mentoring home_section'>
                    <h2 className="section_title">추천 멘토링 분야</h2>
                    <div className='section_mentoring'>
                        <div className='mentoring_box1 mentoring_img1'>
                            <div className='text_light'>코딩</div>
                        </div>
                        <div className='mentoring_box1 mentoring_img2'>
                            <div className='text_light'>운동</div>
                        </div>
                    </div>
                    <div className='section_mentoring'>
                        <div className='mentoring_box1 mentoring_img3'>
                            <div className='text_light'>외국어</div>
                        </div>
                        <div className='mentoring_box1 mentoring_img4'>
                            <div className='text_light'>군 생활</div>
                        </div>
                    </div>
                    <Link to="/mentoring#srchmentoring">
                        <div className="button_set">
                            <button className="more">모집중인 멘토링 보기</button>
                        </div>
                       </Link>
                 
                </div>

                <div className='howtodo home_section'> 
                    <h2 className="section_title">진행과정</h2>
                    <div className='section_howtodo'>
                        <div className='howtodo_box1'>
                          <h3>1. 회원가입</h3>
                          <div>군토&군티 회원가입으로<br/>서비스를 시작하세요!</div>
                          <img src={join} alt='join' />
                        </div>
                    <div className='howtodo_box1'>
                          <h3>2. 멘토링 검색</h3>
                          <div>원하는 분야의 <br/>멘토링을 검색하세요!</div>
                          <img src={loupe} alt='loupe' />
                    </div>
                    <div className='howtodo_box1'>
                          <h3>3. 멘토링 신청</h3>
                          <div>마음에 드는 멘토링 소개를<br/>읽어보고 신청하세요!</div>
                          <img src={resume} alt='resume' />
                    </div>
                    <div className='howtodo_box1'>
                          <h3>4. 멘토링 참여</h3>
                          <div>신청 수락을 받은 후<br/>곧바로 시작하세요!</div>
                          <img src={support} alt='support' />
                    </div>
                    </div>
                </div> 
                
                <div className='review home_section'> 
                    <h2 className="section_title">멘토링 후기</h2>
                    <MentoringReview/>
                </div> 

                <div className='faqs home_section'> 
                    <h2 className="section_title">FAQs</h2>
                    <div className='QnA'>
                        <div className='Q'>
                            <p>멘토/멘티 두가지 활동을 동시에 진행가능한가요?</p>
                            <button onClick={toggling}>Answer!</button>
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
                            <button onClick={toggling}>Answer!</button>
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
                            <button onClick={toggling}>Answer!</button>
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
                            <button onClick={toggling}>Answer!</button>
                        </div>
                        <div className='A'>
                            
                            <p>
                            진행중인 멘토/멘티와의 협의를 통하여 조정하시면 됩니다! 군토군티의 모든 멘토/멘티들은 모두 국군장병님들이니 부담갖지 않으시고 협의하시면 됩니다
                            </p>
                        </div>
                    </div>
 

                </div> 
            </div>
        )
    
}

export default Home;