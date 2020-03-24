import React from 'react';
import axios from 'axios';
import Configuration from '../Configuration';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.state = {
      originalUrl: '',
      shortUrl: '',
      msgColor: 'primary',
      message: '',
      generatedUrl: '',
      btnDisabled: true
    };

    this.onChangeOriginalUrl = this.onChangeOriginalUrl.bind(this);
    this.onChangeShortUrl = this.onChangeShortUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeOriginalUrl(e) {
    this.setState({
      originalUrl: e.target.value
    });
  }

  onChangeShortUrl(e) {
    this.setState({
      shortUrl: e.target.value
    });
  }

  clear = () => {
    this.setState({
      urlId: '',
      originalUrl: '',
      shortUrl: '',
      msgColor: 'primary',
      message: '',
      generatedUrl: '',
      btnDisabled: true
    });
  };

  // bind this class method
  checkDuplicate = () => {
    if (this.state.shortUrl === '') {
      this.setState({
        msgColor: 'secondary',
        message: 'The short url cannot be empty',
        btnDisabled: false
      });
    } else {
      axios
        .get(
          this.config.API_BASE_URL + '/checkDuplicate/' + this.state.shortUrl
        )
        .then(response => {
          if (response.data.duplicate) {
            this.setState({
              shortUrl: response.data.shortUrl,
              originalUrl: response.data.originalUrl,
              msgColor: 'secondary',
              message: 'The short url already exists with above long url!',
              generatedUrl: this.config.REDIRECT_URL + response.data.shortUrl,
              btnDisabled: false
            });
          } else {
            this.setState({
              message:
                "The short url '" + this.state.shortUrl + "' is available.",
              shortUrl: this.state.shortUrl,
              msgColor: 'primary',
              btnDisabled: false
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      shortUrl: this.state.shortUrl,
      originalUrl: this.state.originalUrl,
      click: 0,
      last_updated: new Date(),
      createdBy: 'Admin'
    };

    axios
      .post(this.config.API_BASE_URL + '/shorten', obj)
      .then(response => {
        this.setState({
          shortUrl: '',
          originalUrl: '',
          message: 'A short url created successfully!',
          msgColor: 'primary',
          generatedUrl: this.config.REDIRECT_URL + response.data.shortUrl,
          btnDisabled: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const btnDisabled = this.state.btnDisabled;
    return (
      <Container>
        <Card>
          <form onSubmit={this.onSubmit}>
            <CardHeader
              style={{ textAlign: 'center' }}
              subheader='Keep it simple and short'
              title={
                <Typography weight={'bold'} variant={'h4'} gutterBottom>
                  Shorten your URL
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3} alignItems='center'>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Long URL'
                    margin='dense'
                    required
                    value={this.state.originalUrl}
                    onChange={this.onChangeOriginalUrl}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    label='Custom Short URL name, cannot start with special character'
                    margin='dense'
                    value={this.state.shortUrl}
                    onChange={this.onChangeShortUrl}
                    variant='outlined'
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item md={4} xs={4}>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={this.checkDuplicate}
                      >
                        Check Availability
                      </Button>
                    </Grid>
                    <Grid item md={3} xs={3}>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={this.clear}
                      >
                        Clear All
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button
                    color={this.state.msgColor}
                    size='medium'
                    disabled={btnDisabled}
                  >
                    {this.state.message}
                  </Button>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button
                    color={this.state.msgColor}
                    size='medium'
                    disabled={btnDisabled}
                  >
                    <a
                      href={this.state.generatedUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {this.state.generatedUrl}
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <input
                type='submit'
                value='Create a short URL'
                className='btn btn-primary btn-md'
              />
            </CardActions>
          </form>
        </Card>
      </Container>
    );
  }
}

export default Content;
