/**
 * 功能: worker 测试
 * 作者: 
 * 日期: 
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import Worker from './demo.worker.js';
// import './index.less';

const WorkTest = function () {
  const [workId, setWorkId] = useState(null);
  const setWork = (type) => {
    if (typeof (Worker) !== 'undefined') {
      if (type === 0) {
        setWorkId(new Worker());
        // eslint-disable-next-line no-console
        console.log(this.worker);
        this.worker.onmessage = function (event) {
          document.getElementById('result').innerHTML = event.data;
        };
      } else {
        workId.terminate();
        setWorkId(null);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('抱歉! Web Worker 不支持');
    }
  };

  return (
    <div className="">
      <div>
        <span>worker异步执行计数:</span>
        <span id="result" />
      </div>
      <Button onClick={() => setWork(0)}>开始工作</Button>
      <Button onClick={() => setWork(1)}>停止工作</Button>
    </div>
  );
};


export default WorkTest;
