let i = 0;
function count() {
  setInterval(() => {
    i += 1;
    postMessage(i);
  }, 1000);
}
count();
