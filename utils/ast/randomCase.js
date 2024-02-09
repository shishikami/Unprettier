/**
 * 
 * @param {string} str 
 * @returns string with random cases
 */
function changeCaseRandomly(str) {
  let modifiedArr = [];
  for (let i = 0; i < str.length; i++) {
    const randomCase = Math.random() < 0.5 ? 'toUpperCase' : 'toLowerCase';
    modifiedArr.push(str[i][randomCase]())
  }
  return modifiedArr.join('');
}

export default changeCaseRandomly;