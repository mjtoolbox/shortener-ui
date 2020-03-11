import React from 'react';
import { Link } from 'react-router-dom';


const redirectUrl = 'http://localhost:8080/redirect/';

export default class ViewRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // <th>Original URL</th>
    // <th>Short URL</th>
    // <th>Clicked</th>
    const generatedUrl = redirectUrl + this.props.obj.shortUrl;

    return (
      <tr>
        <td>{this.props.obj.originalUrl}</td>
        <td>
          <a href={generatedUrl} target='_blank'>
            {generatedUrl}
          </a>
        </td>
        <td>{this.props.obj.click}</td>
      </tr>
    );
  }
}
