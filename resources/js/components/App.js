import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Index from './user/Index'
import IndexModule from './module/Index'
import ValueIndex from './modelisation/Index'
export default class App extends Component {
    render() {
        return (
            <Router>
                
               

                    <Switch>
                    <Route path='/values' component={ValueIndex} exact/>
                    <Route path='/users' component={Index} exact/>
                        <Route path='/' component={IndexModule} exact/>
                    </Switch>
                
                
            </Router>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));