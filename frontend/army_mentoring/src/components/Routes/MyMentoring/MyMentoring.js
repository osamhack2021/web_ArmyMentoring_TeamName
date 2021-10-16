import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MentoringSpecificMento from './MentoringSpecificMento';
import MentoringSpecificMentee from './MentoringSpecificMentee';
import MymentoringList from './MymentoringList';
import Chat from '../Chat/Chat';

function MyMentoring({match}){
    return(
        <Switch>
            <Route path={`${match.url}/mentor/:id/chat`} component={Chat}></Route>
            <Route path={`${match.url}/mentee/:id/chat`} component={Chat}></Route>
            <Route path={`${match.url}/mentor/:id`} component={MentoringSpecificMento}></Route>
            <Route path={`${match.url}/mentee/:id`} component={MentoringSpecificMentee}></Route>
            <Route path={`${match.url}`} component={MymentoringList}></Route>
        </Switch>
    )
}

export default MyMentoring;