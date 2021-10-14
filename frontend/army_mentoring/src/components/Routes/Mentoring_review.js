import React from 'react';
import {UncontrolledCarousel} from 'reactstrap';
import review4 from './img/review4.jpg';
import review3 from './img/review3.jpg';

const items=[
    {
        src: review3,
        altText: 'img1',
        caption: '현업에서 경험했던 일에 대해서 설명해 주셨고, 여러가지 질문에 대해서도 답변해 주셨습니다.회사 생활, 이직, 신입일 때 입사 경험, 주변 지인분들의 여러가지 취업 경험 등에 대해서 공유해 주셔서 취업 고민에 대해서 한층 더 알아가는 계기가 되었던 것 같습니다. 그외에도 현재 기업들이 입사할 때 어떤 역량이 필요한지 등에 관한 것도 어느정도 이야기 해주셨고, 이직 준비하면서 겪는 어려움과 무엇을 준비하시는지 등에 대해서도 언급해 주셔서 도움이 되었던 것 같습니다.',
        header: '군토/군티에서 IT관련 경력자 멘토분의 멘토링을 참여했습니다!'
    },
    {
        src: review4,
        altText: 'img2',
        caption: '너무너무 감사드립니다. 단순히 물어보는것만 대답하고 끝나는 것이 아니라, 저에 대해서도 많이 물어봐 주시고 멘토님의 경험과 생각을 제가 잘 이해할 수 있도록 세세하게 풀어서 대답해주셔서 감사합니다. 궁금한 게 많아서 한 시간을 예약 했음에도 시간이 부족한거 같아서 걱정했는데, 시간이 훨씬 지났음에도 하나라도 더 알려주실려고 하시고.. 너무 감사합니다. 다음에도 궁금한게 생긴다면 멘토 신청 또 하겠습니다!! 너무 유익했고 기대이상으로 좋았습니다. 피곤하실텐데 밤 늦게까지 상담해주셔서 감사합니다.',
        header: '군토/군티로 정말 유익한 멘토링이었습니다!'
    },
]
function review(){
   
    return(
        <UncontrolledCarousel items={items}/>
    )

}

export default review;