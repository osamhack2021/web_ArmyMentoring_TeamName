import React from 'react';
import {UncontrolledCarousel} from 'reactstrap';
import review1 from './review1.jpg';
import review2 from './review2.jpg';

const items=[
    {
        src: review1,
        altText: 'img1',
        caption: '설명',
        header: '제목'
    },
    {
        src: review2,
        altText: 'img2',
        caption: '설명',
        header: '제목'
    },
]
function review(){
   
    return(
        <UncontrolledCarousel items={items}/>
    )

}

export default review;