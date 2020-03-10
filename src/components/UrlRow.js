import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const baseUrl = 'http://localhost:8080';

export default class UrlRow extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios
      .delete(baseUrl + '/urls/' + this.props.obj.urlId)
      .then(res => console.log('deleted'))
      .catch(err => console.log(err));
  }

  render() {
    const updatedDate = moment(this.props.obj.last_updated).format(
      'YYYY-MM-DD HH:MM'
    );

    // <th>ID</th>
    // <th>Original URL</th>
    // <th>Short URL</th>
    // <th>Clicked</th>
    // <th>Created By</th>
    // <th>Updated</th>

    return (
      <tr>
        <td>{this.props.obj.urlId}</td>
        <td>{this.props.obj.originalUrl}</td>
        <td>{this.props.obj.shortUrl}</td>
        <td>{this.props.obj.click}</td>
        <td>{this.props.obj.createdBy}</td>
        <td>{updatedDate}</td>
        <td>
          <Link
            to={'/edit/' + this.props.obj.urlId}
            className='btn btn-primary btn-sm'
          >
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className='btn btn-danger btn-sm'>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
