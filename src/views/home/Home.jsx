import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import demoRedux from '@model/demo';
import Worker from './demo.worker.js';
import './home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.worker = null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(demoRedux.setUserName('jack'));
    dispatch(demoRedux.getAsyncName(true));
  }

  work = (type) => {
    if (typeof (Worker) !== 'undefined') {
      if (type === 0) {
        // this.worker = new Worker('demo.js');
        // this.worker = new Worker(require.resolve('./demo'));
        this.worker = new Worker();
        console.log(this.worker);
        this.worker.onmessage = function (event) {
          document.getElementById('result').innerHTML = event.data;
        };
      } else {
        this.worker.terminate();
        this.worker = null;
      }
    } else {
      alert('抱歉! Web Worker 不支持');
    }
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
        <div>
          <span>计数</span>
          <span id="result" />
        </div>
        {/* <button onClick="work(0)">开始工作</button> */}
        <button onClick={() => this.work(0)}>开始工作</button>
        {/* <button onClick="work(1)">停止工作</button> */}
        <button onClick={() => this.work(1)}>停止工作</button>
      </div>
    );
  }
}
export default connect(({ demo }) => ({ ...demo }))(Home);
