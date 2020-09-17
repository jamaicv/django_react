import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Cookie from "js-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Login from "./Login";
import UserProfile from "./UserProfile";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      logged_in: false,
      user: {}
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleLogin(event, username, password) {
    event.preventDefault();
    return axios.post('/login/', {username: username, password: password}, {headers: {'X-CSRFTOKEN': Cookie.get('csrftoken')}}).then((response) => {
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);

        this.setState(state => ({
          logged_in: true,
          user: user
        }));
        history.push("/profile");
    }).catch(error => {
        console.log(error)
    });
  }

  handleLogout(event) {
    event.preventDefault();

    return axios.get('/logout/', this.state, {headers: {'X-CSRFTOKEN': Cookie.get('csrftoken')}}).then((response) => {
      this.setState(state => ({
        logged_in: false,
        user: {}
      }));
    }).catch(error => {
      console.log(error)
    });
  }
  
  handleEdit(event, data) {
    event.preventDefault();
    return axios.post('/edit-user/', {email: data.email}, {headers: {'X-CSRFTOKEN': Cookie.get('csrftoken')}}).then((response) => {
      console.log(response);
    }).catch(error => {
        console.log(error)
    });
  }

  checkLogin() {
    return axios.get('/check-login/', this.state, {headers: {'X-CSRFTOKEN': Cookie.get('csrftoken')}}).then((response) => {
      if (response.data.user.username.trim() != '') {
        return {logged_in: true, user: response.data.user}
      }
      return {logged_in: false, user: {}}
      // redirect to the route '/'
      //history.push("/");
    }).catch(error => {
      console.log(error)
      return {logged_in: false, user: {}}
    });
  }

  componentDidMount() {
    this.checkLogin().then((response) => {
      this.setState(state => ({
        logged_in: response.logged_in,
        user: response.user
      }));
    });
  }

  render() {
    const loggedIn = this.state.logged_in;
    let logout;
    let login;
    if (loggedIn) {
      logout = <li className="logout"><a href='/logout' onClick={this.handleLogout}>Déconnexion</a></li>
    } else {
      login = <li className="login"><Link to='/login'>Login</Link></li>
    }
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/profile'>Profil</Link>
              </li>
              {login}
              {logout}
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact render={(props) => <Login {...props} handleLogin={this.handleLogin} logged_in={this.state.logged_in} />} />
            <Route path="/profile" exact render={(props) => <UserProfile {...props} handleEdit={this.handleEdit} logged_in={this.state.logged_in} user={this.state.user} />} />
            <Route path="/login" exact render={(props) => <Login {...props} handleLogin={this.handleLogin} logged_in={this.state.logged_in}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
