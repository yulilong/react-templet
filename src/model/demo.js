/**
 * 功能: 一个redux文件示例
 * 作者: 
 * 日期: 
 * 这个文件会被src/store.js文件进行处理
 */

export default {
  state: {
    userName: '未获取',
    asyncName: '未执行',
  },

  action: {
    setUserName(params) { return params; },
    getAsyncName(params) {
      return new Promise((resolve, reject) => {
        if (params) {
          setTimeout(() => {
            resolve('异步获取的值');
          }, 3000);
        } else {
          setTimeout(() => {
            reject(new Error('异步获取失败'));
          }, 3000);
        }
      });
    },
  },

  reducer: {
    /**
     * 设置按钮类型
     * @param  {object} state   上面的state
     * @param  {object} action   设置的数据{type: "firstCard/setButtonType", payload: "12333333"}
     * @param  {object} error   异步请求的报错信息，同步信息此值是undefined
     */
    setUserName(state, action) {
      const data = action.payload;
      return {
        ...state,
        userName: data,
      };
    },
    // 一个异步例子
    getAsyncName(state, action, error) {
      const data = action.payload;
      if (!error) {
        return {
          ...state,
          asyncName: data,
        };
      }
      return { ...state };
    },
  },
};
