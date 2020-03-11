import React from 'react';
import logo from '../wsbc.jpg';

class Navbar extends React.Component {
  render() {
    return (
      <nav class='navbar navbar-expand-lg navbar-light bg-light static-top'>
        <div class='container'>
          <a class='navbar-brand' href='#'>
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
                <a class='nav-link' href='/'>
                  Home
                  <span class='sr-only'>(current)</span>
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='urls'>
                  URLs
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='manage'>
                  Manage
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
