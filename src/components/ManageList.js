import React from 'react';
import axios from 'axios';
import UrlRow from './UrlRow';
import Navbar from './Navbar';

import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Container } from '@material-ui/core';

const baseUrl = 'http://localhost:8080';

export default class ManageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urls: []
    };
  }

  componentDidMount() {
    axios
      .get(baseUrl + '/urls', {})
      .then(response => {
        this.setState({ urls: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.urls.map(function(object, i) {
      return <UrlRow obj={object} key={i} />;
    });
  }

  render() {
    const headerText = 'Short URL is based on ' + baseUrl + '/redirect/';
    return (
      <div>
        <Container>
          <Card>
            <CardHeader
              style={{ textAlign: 'center' }}
              subheader={headerText}
              title='Manage URLs'
            />
            <table className='table table-striped' style={{ marginTop: 5 }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Original URL</th>
                  <th>Short URL</th>
                  <th>Clicked</th>
                  <th>Created By</th>
                  <th>Updated</th>
                  <th colSpan='3'>Actions</th>
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
