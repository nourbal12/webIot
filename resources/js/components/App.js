import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import IndexModule from './module/Index';
import ValueIndex from './modelisation/Index'
require('../bootstrap');
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
    
    render() {
        return ( 
                  <><Router>
                <Switch>

                    <Route path='/values' component={ValueIndex} exact />
                    <Route path='/' component={IndexModule} exact />
                </Switch>


            </Router></>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));