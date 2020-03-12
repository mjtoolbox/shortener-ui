import React from 'react';
import axios from 'axios';
import ViewLog from './ViewLog';
import { Card, CardHeader, Container } from '@material-ui/core';
import Configuration from '../Configuration';

export default class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();

    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    axios
      .get(
        this.config.API_BASE_URL + '/logs/' + this.props.match.params.shortUrl
      )
      .then(response => {
        this.setState({ logs: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.logs.map(function(object, i) {
      return <ViewLog obj={object} key={i} />;
    });
  }

  render() {
    const generatedUrl =
      this.config.REDIRECT_URL + this.props.match.params.shortUrl;
    return (
      <div>
        <Container maxWidth='lg'>
          <Card>
            <CardHeader
              style={{ textAlign: 'center' }}
              subheader={generatedUrl}
              title='View URL History'
            />
            <table className='table table-striped' style={{ marginTop: 5 }}>
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Last Accessed</th>
                </tr>
              </thead>
              <tbody>{this.tabRow()}</tbody>
            </table>
          </Card>
        </Container>
      </div>
    );
  }
}
