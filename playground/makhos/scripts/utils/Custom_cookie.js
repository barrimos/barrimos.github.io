/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @param {number} duration milliseconds units
 */
const Custom_cookie = (key, value, duration) => {
  document.cookie = `${key} = ${value}; expires = ${new Date(Date.now() + duration)}; path=/`;
}

export default Custom_cookie;