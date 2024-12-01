/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import demoRedux from '@model/demo';
import WorkTest from '@components/WorkTest'; // worker 测试组件
import HookTest from './HookTest';
import './home.less';

class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

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
          <div>antd UI 组件测试</div>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button type="link">Link</Button>
        </div>

        <br />
        {/* worker单独线程测试 */}
        <WorkTest />
        <br />

        {/* hooks 测试 */}
        <HookTest />
      </div>
    );
  }
}
export default connect(({ demo }) => ({ ...demo }))(Home);
