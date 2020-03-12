import React from 'react';
import { userActions } from './actions';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

class Logout extends React.Component {
  logout = () => {
    sessionStorage.clear('userInfo');
    sessionStorage.clear('isLogged');
    this.props.cleanStore();
  };

  render() {
    // return <Button onClick={this.logout}>Log out</Button>;
    return (
      <Tooltip title='Please log out'>
        <Link className='nav-link' onClick={this.logout} to='/'>
          Logout
        </Link>
      </Tooltip>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cleanStore: () => dispatch(userActions.logOut())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
