// 设置
function setLocal (key, value) {
  // 转字符串
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 获取
function getLocal (key) {
  // 转对象
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除
function removeLocal (key) {
  window.localStorage.removeItem(key)
}

export {
  setLocal,
  getLocal,
  removeLocal
}
