import React from "react";
import axios from "axios";
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
} from "@material-ui/core";
import moment from "moment";
import Configuration from "../Configuration";

export default class UrlEdit extends React.Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.onChangeOriginalUrl = this.onChangeOriginalUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      urlId: "",
      originalUrl: "",
      shortUrl: "",
      click: "",
      createdBy: "",
      last_updated: ""
    };
  }

  onChangeOriginalUrl(e) {
    this.setState({
      originalUrl: e.target.value
    });
  }

  componentDidMount() {
    axios
      .get(this.config.API_BASE_URL + "/urls/" + this.props.match.params.urlId)
      .then(response => {
        this.setState({
          urlId: response.data.urlId,
          originalUrl: response.data.originalUrl,
          shortUrl: response.data.shortUrl,
          click: response.data.click,
          createdBy: response.data.createdBy,
          last_updated: response.data.last_updated
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      shortUrl: this.state.shortUrl,
      originalUrl: this.state.originalUrl,
      click: 0,
      createdBy: "Admin"
    };

    axios
      .put(this.config.API_BASE_URL + "/urls/" + this.state.urlId, obj)
      .then(response => {
        this.props.history.push("/urls");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // <th>ID</th>
  // <th>Original URL</th>
  // <th>Short URL</th>
  // <th>Clicked</th>
  // <th>Created By</th>
  // <th>Updated</th>

  render() {
    const updatedDate = moment(this.state.last_updated).format(
      "YYYY-MM-DD HH:MM"
    );
    return (
      <div>
        <Container>
          <Card>
            <form onSubmit={this.onSubmit}>
              <CardHeader
                style={{ textAlign: "center" }}
                subheader="As an admin, you can change only Long URL which will be mapped to existing short URL."
                title={
                  <Typography variant={"h4"} gutterBottom>
                    Update URL
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item md={2} xs={2}>
                    <TextField
                      fullWidth
                      label="URL ID"
                      margin="dense"
                      required
                      value={this.state.urlId}
                      variant="outlined"
                      disabled
                    />
                  </Grid>
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
                      label="CANNOT change - Short URL name"
                      margin="dense"
                      value={this.state.shortUrl}
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <TextField
                      fullWidth
                      label="Clicked"
                      margin="dense"
                      required
                      value={this.state.click}
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <TextField
                      fullWidth
                      label="Last updated"
                      margin="dense"
                      required
                      value={updatedDate}
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <TextField
                      fullWidth
                      label="Created By"
                      margin="dense"
                      required
                      value={this.state.createdBy}
                      variant="outlined"
                      disabled
                    />
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
                  value="Update URL"
                  className="btn btn-primary btn-md"
                />
                <Button
                  title="Cancel"
                  className="btn btn-primary btn-md"
                  onClick={() => this.props.history.goBack()}
                >
                  Cancel
                </Button>
              </CardActions>
            </form>
          </Card>
          <p />

          <div className="label label-default">{this.state.longUrl}</div>
        </Container>
      </div>
    );
  }
}
