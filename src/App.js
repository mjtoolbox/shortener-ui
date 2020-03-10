import React from 'react';
import './App.css';
import Main from './Main';
import UrlList from './components/UrlList';
import UrlEdit from './components/UrlEdit';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/urls' component={UrlList} />
        <Route exact path='/edit/:urlId' component={UrlEdit} />

        {/* <Route path='/done' component={Done} />
        <Route exact path='/login' component={LoginComponent} />
        <Route exact path='/logout' component={Logout} /> */}
      </Switch>
    </Router>
  );
}

export default App;
