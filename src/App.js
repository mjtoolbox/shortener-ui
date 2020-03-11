import React from 'react';
import './App.css';
import logo from './wsbc.jpg';
import Main from './Main';
import ManageList from './components/ManageList';
import ViewList from './components/ViewList';
import UrlEdit from './components/UrlEdit';
import LogList from './components/LogList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav class='navbar navbar-expand-lg navbar-light bg-light static-top'>
        <div class='container'>
          <a class='navbar-brand' href='/'>
            <img src={logo} alt='' width='140' />
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarResponsive'
            aria-controls='navbarResponsive'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='navbarResponsive'>
            <ul class='navbar-nav ml-auto'>
              <li class='nav-item active'>
                <Link to={'/'} className='nav-link'>
                  Home
                </Link>
              </li>
              <li class='nav-item'>
                <Link to={'/urls'} className='nav-link'>
                  URLs
                </Link>
              </li>
              <li class='nav-item'>
                <Link to={'/manage'} className='nav-link'>
                  Manage
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/manage' component={ManageList} />
        <Route exact path='/urls' component={ViewList} />
        <Route exact path='/edit/:urlId' component={UrlEdit} />
        <Route exact path='/manage/logs/:shortUrl' component={LogList} />
        {/* <Route exact path='/login' component={LoginComponent} />
        <Route exact path='/logout' component={Logout} />  */}
      </Switch>
    </Router>
  );
}

export default App;
