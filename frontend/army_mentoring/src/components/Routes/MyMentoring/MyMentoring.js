import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MentoringSpecific from './MentoringSpecific';
import MymentoringList from './MymentoringList';
import Chat from '../Chat/Chat';

function MyMentoring({match}){
    return(
        <Switch>
            <Route path={`${match.url}/:id/chat`} component={Chat}></Route>
            <Route path={`${match.url}/:id`} component={MentoringSpecific}></Route>
            <Route path={`${match.url}`} component={MymentoringList}></Route>
        </Switch>
    )
}

export default MyMentoring;