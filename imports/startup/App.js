import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Landing, Signup, Video,Admin, Dashboard} from '/imports/pages'
import Navbar from '/imports/components/Navbar'

export default class App extends Component{

    render(){
        return(
            <div>
                <Router>
                    <div>
                       
                        <Switch>
                            <Route component={Dashboard} path="/" exact />
                            <Route component={Signup} path="/signup" />
                            <Route component={Video} path="/video/:id"/>
                            <Route component={Admin} path="/admin"/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}