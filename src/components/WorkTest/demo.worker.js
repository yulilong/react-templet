let i = 0;
function count() {
  setInterval(() => {
    i += 1;
    // eslint-disable-next-line no-console
    console.log('worker开始工作 i：', i);
    postMessage(i);
  }, 1000);
}
count();
