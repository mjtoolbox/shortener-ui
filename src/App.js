import React from "react";
import "./App.css";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        {/* <Route path='/done' component={Done} />
        <Route exact path='/login' component={LoginComponent} />
        <Route exact path='/logout' component={Logout} /> */}
      </Switch>
    </Router>
  );
}

export default App;
