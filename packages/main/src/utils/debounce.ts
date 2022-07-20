function debounce(fn, delay = 500) {
  let timer: null | number = null;
  return function (this: unknown, ...args) {
    clearTimeout(timer!);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
export default debounce
