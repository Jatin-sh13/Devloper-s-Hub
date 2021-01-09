import React, { useEffect } from 'react'
import Navbar from '../src/Component/Navbar'
import Landing from '../src/Component/Landing'
import Register from '../src/Component/Register'
import LogIn from '../src/Component/Login'
import About from '../src/Component/About'
import Alert from '../src/Component/Alert'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";
import { Provider } from 'react-redux'
import store from '../src/Store'
import setToken from './setGlobalAuth'
import { loaduser } from './Actions/Auth'
import Loading from './Component/Loading'
import Dashboard from './Component/Dashboard'
import Private from './PrivateRoute/Private'
import CreateProfile from './Component/CreateProfile'
import EditProfile from './Component/EditProfile'
import AddExp from './Component/AddExp'
import AddEdu from './Component/AddEdu'
import Tati from './Component/Tati'
import Developers from './Component/Developers'
import MainProfile from './Component/MainProfile'

const App = () => {
  if (localStorage.token) {
    setToken(localStorage.token)
  }
  useEffect(() => {
    store.dispatch(loaduser())
  }, [])
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/developers" component={Developers} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/LogIn" component={LogIn} />
            <Route exact path="/About" component={About} />
            <Private exact path="/createprofile" component={CreateProfile} />
            <Private exact path="/editprofile" component={EditProfile} />
            <Private exact path="/dashboard" component={Dashboard} />
            <Private exact path="/AddExp" component={AddExp} />
            <Private exact path="/AddEdu" component={AddEdu} />
            <Private exact path="/MainProfile" component={MainProfile} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}
export default App
