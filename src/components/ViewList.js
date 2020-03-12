import React from 'react';
import axios from 'axios';
import ViewRow from './ViewRow';
import { Card, CardHeader, Container } from '@material-ui/core';
import Configuration from '../Configuration';

export default class ViewList extends React.Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.state = {
      urls: []
    };
  }

  componentDidMount() {
    axios
      .get(this.config.API_BASE_URL + '/urls', {})
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
        <Container maxWidth="xl">
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
        </Container>
      </div>
    );
  }
}
