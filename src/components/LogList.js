import React from 'react';
import axios from 'axios';
import ViewLog from './ViewLog';
import Navbar from './Navbar';

import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '@material-ui/core';

const baseUrl = 'http://localhost:8080';
const redirectUrl = 'http://localhost:8080/redirect/';

export default class LogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    axios
      .get(baseUrl + '/logs/' + this.props.match.params.shortUrl)
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
    const generatedUrl = redirectUrl + this.props.match.params.shortUrl;
    return (
      <div>
        <Navbar></Navbar>
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
      </div>
    );
  }
}
