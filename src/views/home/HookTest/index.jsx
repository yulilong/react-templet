/**
 * 功能: hooks 测试
 * 作者: 
 * 日期: 
 */
import React from 'react';
import './index.less';

// 测试数据
const tab = { tab1: ['1', '2', '3'], tab2: ['4', '5', '6'], tab3: ['7', '8', '9'] };

function Index() {
  const [active, setActive] = React.useState('tab1'); // 需要立即响应的任务，立即更新任务
  const deferActive = React.useDeferredValue(active); // 把状态延时更新，类似于过渡任务
  const handleChangeTab = (activeItem) => {
    setActive(activeItem); // 立即更新
  };
  const renderData = tab[deferActive]; // 使用滞后状态
  return (
    <div className="hook-test">
      <div>hooks 内容测试</div>
      <div className="tab" >
        {
          Object.keys(tab).map(item => (
            <span
              key={item}
              className={active === item && 'active'}
              onClick={() => handleChangeTab(item)} 
            >
              { item }
            </span>
          ))
        }
      </div>
      <ul className="hook-test-content" >
        { renderData.map(item => <li key={item} >{item}</li>) }
      </ul>
    </div>);
}

export default Index;

