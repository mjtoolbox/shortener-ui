import React from 'react';
import axios from 'axios';
import ViewRow from './ViewRow';
import Navbar from './Navbar';

import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '@material-ui/core';

const baseUrl = 'http://localhost:8080';

export default class ViewList extends React.Component {
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
      return <ViewRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Card>
        <CardHeader
            style={{ textAlign: 'center' }}
            subheader='Users can view existing URLs'
            title='View URLs'          
          />
          <table className='table table-striped' style={{ marginTop: 5 }}>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicked</th>              
              </tr>
            </thead>
            <tbody>{this.tabRow()}</tbody>
          </table>
        </Card>
      </div>
    );
  }
}
