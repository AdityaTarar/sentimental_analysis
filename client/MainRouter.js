import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import AdminLogin from './auth/AdminLogin'
import Analysis from './core/Analysis'
import ProfileData from './user/ProfileData'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/analysis" component={Analysis}/>
        <Route path="/adminlogin" component={AdminLogin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/userdata/:userId" component={ProfileData}/>
      </Switch>
    </div>)
}

export default MainRouter
