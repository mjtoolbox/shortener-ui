import React from 'react';
import Configuration from '../Configuration';

export default class ViewRow extends React.Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
  }

  render() {
    const generatedUrl = this.config.REDIRECT_URL + this.props.obj.shortUrl;

    return (
      <tr>
        <td>{this.props.obj.originalUrl}</td>
        <td>
          <a href={generatedUrl} target='_blank' rel='noopener noreferrer'>
            {generatedUrl}
          </a>
        </td>
        <td>{this.props.obj.click}</td>
      </tr>
    );
  }
}
