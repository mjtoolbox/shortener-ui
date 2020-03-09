import React from "react";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Box,
  Button,
  TextField,
  Typography
} from "@material-ui/core";

const baseUrl = "http://localhost:8080";
const createdUrlbase = "http://localhost:8080/redirect/";

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalUrl: "",
      shortUrl: "",
      longUrl: "",
      msgColor: "primary",
      message: ""
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
      originalUrl: "",
      shortUrl: "",
      longUrl: "",
      msgColor: "primary",
      message: ""
    });
  };

  // bind this class method
  checkDuplicate = () => {
    axios
      .get(baseUrl + "/checkDuplicate/" + this.state.shortUrl)
      .then(response => {
        if (response.data.duplicate) {
          this.setState({
            shortUrl: response.data.shortUrl,
            longUrl: "",
            msgColor: "secondary",
            message:
              "The short url '" +
              response.data.shortUrl +
              "' already exists!  " +
              response.data.originalUrl
          });
        } else {
          this.setState({
            message:
              "The short url '" + this.state.shortUrl + "' is available.",
            shortUrl: this.state.shortUrl,
            longUrl: "",
            msgColor: "primary"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      shortUrl: this.state.shortUrl,
      originalUrl: this.state.originalUrl,
      click: 0,
      last_updated: new Date(),
      createdBy: "Admin"
    };

    axios
      .post(baseUrl + "/shorten", obj)
      .then(response => {
        alert("then" + response);
        this.setState({
          longUrl:
            "A short url created successfully! " +
            createdUrlbase +
            response.data.shortUrl
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <form onSubmit={this.onSubmit}>
            <CardHeader
              style={{ textAlign: "center" }}
              subheader="shorten your URL"
              title={
                <Typography weight={"bold"} variant={"h3"} gutterBottom>
                  Enter Long URL
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Long URL"
                    margin="dense"
                    required
                    value={this.state.originalUrl}
                    onChange={this.onChangeOriginalUrl}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Custom Short URL name"
                    margin="dense"
                    value={this.state.shortUrl}
                    onChange={this.onChangeShortUrl}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item md={4} xs={4}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.checkDuplicate}
                      >
                        Check Availability
                      </Button>
                    </Grid>
                    <Grid item md={3} xs={3}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.clear}
                      >
                        Clear All
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button color={this.state.msgColor} size="medium">
                    {this.state.message}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <input
                type="submit"
                value="Create a short URL"
                className="btn btn-primary btn-md"
              />
            </CardActions>
          </form>
        </Card>
        <p />

        <div class="label label-default">{this.state.longUrl}</div>
      </Container>
    );
  }
}

export default Content;
