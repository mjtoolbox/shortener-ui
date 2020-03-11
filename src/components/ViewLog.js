import React from 'react';
import moment from 'moment';

export default class ViewLog extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const accessDate = moment(this.props.obj.lastAccessed).format(
      'YYYY-MM-DD HH:MM'
    );

    return (
      <tr>
        <td>{this.props.obj.url_log_id}</td>
        <td>{accessDate}</td>
      </tr>
    );
  }
}
