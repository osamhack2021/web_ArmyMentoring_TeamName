import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MentoringList from './MentoringList';
import MentoringIntroduction from './MentoringIntroduction';
import MentorIntroduction from './MentorIntroduction';
import MakeMentoring from './MakeMentoring';

function Mentoring({match}){
    return (
        <Switch>
            <Route exact path={`${match.url}/make`} component={MakeMentoring}></Route>
            <Route exact path={`${match.url}/mentoring/:id`} component={MentoringIntroduction}></Route>
            <Route exact path={`${match.url}/mentor/:id`} component={MentorIntroduction}></Route>
            <Route exact path={`${match.url}`} component={MentoringList}></Route>
        </Switch>
    )
}

export default Mentoring;