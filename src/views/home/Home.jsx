import React from 'react';
import { Button } from 'antd';
import './home.less';

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button type="link">Link</Button>
        </div>
      </div>
    )
  }
}
