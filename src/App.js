import React from "react";
import "./App.css";
import logo from "./wsbc.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Main from "./Main";
import ManageList from "./components/ManageList";
import ViewList from "./components/ViewList";
import UrlEdit from "./components/UrlEdit";
import LogList from "./components/LogList";
import LoginPage from "./LoginPage";
import Login from "./Login";
import Logout from "./Logout";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component,  ...rest }) {

  return (
    <Route
      {...rest}
      render={props =>sessionStorage.getItem('isLogged')
         ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function App() {
  const isLoggedConst = useSelector(state => state.isLogged);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" width="140" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/urls"} className="nav-link">
                  URLs
                </Link>
              </li>
              {isLoggedConst && (
                <li className="nav-item">
                  <Link to={"/manage"} className="nav-link">
                    Manage
                  </Link>
                </li>
              )}
              {!isLoggedConst && <Login />}
              {isLoggedConst && <Logout />}
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" component={Main} />
        <PrivateRoute exact path="/manage" component={ManageList} />
        <Route exact path="/urls" component={ViewList} />
        <Route exact path="/edit/:urlId" component={UrlEdit} />
        <PrivateRoute exact path="/manage/logs/:shortUrl" component={LogList} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}
export default App;
