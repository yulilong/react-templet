import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import demoRedux from '@model/demo';
import './home.less';

class Home extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(demoRedux.setUserName('jack'));
    dispatch(demoRedux.getAsyncName(true));
  }

  render() {
    const { userName, asyncName } = this.props;
    console.log('userName: ', userName);
    console.log('asyncName: ', asyncName);
    
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
    );
  }
}
export default connect(({ demo }) => ({ ...demo }))(Home);
