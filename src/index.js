import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Scoreboard from './scoreboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/scoreboard" component={Scoreboard} />
        </Switch>
    </ BrowserRouter>,
    document.getElementById('root'));
