import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  //   loginClicked = () => {
  //     this.props.history.push('/login');
  //   };

  render() {
    return (
      <Tooltip title='Login'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </Tooltip>
    );
  }
}

export default Login;
