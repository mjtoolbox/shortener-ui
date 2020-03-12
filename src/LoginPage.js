import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { userActions } from './actions';
import { connect } from 'react-redux';
import AuthService from './AuthService';

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  notification: {
    display: 'flex',
    justifyContent: 'center',
    color: '#dc3545'
  },
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
    color: 'white'
  }
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      username: '',
      password: '',
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  loginClicked = e => {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    // To use Redux with further detail state, user action
    this.Auth.login(credentials)
      .then(response => {
        this.props.login(response.data);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          message: 'Authentication failed. Please check your password.',
          username: this.state.username
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position='static' style={{ backgroundColor: '#607d8b' }}>
          <Toolbar>
            <Typography variant='h6' style={styles.header}>
              Admin, please login
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth='sm'>
          <br />
          <Typography variant='h4' style={styles.center}>
            Login
          </Typography>
          <form onSubmit={this.loginClicked}>
            <Typography variant='h6' style={styles.notification}>
              {this.state.message}
            </Typography>
            <TextField
              type='text'
              label='USERNAME'
              fullWidth
              margin='normal'
              name='username'
              value={this.state.username}
              onChange={this.onChange}
              onClick={this.onClick}
            />

            <TextField
              type='password'
              label='PASSWORD'
              fullWidth
              margin='normal'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
              onClick={this.onClick}
            />

            <Button
              variant='contained'
              color='secondary'
              onClick={this.loginClicked}
              type='submit'
            >
              Login
            </Button>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: userProfile => dispatch(userActions.loginSuccess(userProfile))
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
