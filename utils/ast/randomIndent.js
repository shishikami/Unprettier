const whiteSpace = /^\s+/;
const randomIndentationMin = 0;
const randomIndentationMax = 4;

/**
 * 
 * @param {Number} min lower bound(included)
 * @param {Number} max upper bound(included)
 * @returns random integer between [min, max]
 */
export function randomRange(min = randomIndentationMin, max = randomIndentationMax){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function distortIndentationRandomly(str){
  let match = str.match(whiteSpace);
  // 扣除一部分空格
  if(match !== null){
    let spaceNumber = match[0].length;
    let deductedSpace = randomRange(0, spaceNumber);
    if(deductedSpace !== 0){
      let regExp = new RegExp(`^\\s{${deductedSpace}}`);
      str = str.replace(regExp,'');
    }
  }
  let spaceNumber = randomRange();
  let space = new Array(spaceNumber).fill(' ').join('');
  return space + str;
}