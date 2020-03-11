import React from 'react';
import './App.css';
import Main from './Main';
import ManageList from './components/ManageList';
import ViewList from './components/ViewList';
import UrlEdit from './components/UrlEdit';
import LogList from './components/LogList';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/manage' component={ManageList} />
        <Route exact path='/urls' component={ViewList} />
        <Route exact path='/edit/:urlId' component={UrlEdit} />
        <Route exact path='/logs/:shortUrl' component={LogList} />

        {/* <Route path='/done' component={Done} />
        <Route exact path='/login' component={LoginComponent} />
        <Route exact path='/logout' component={Logout} /> */}
      </Switch>
    </Router>
  );
}

export default App;
