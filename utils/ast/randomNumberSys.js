import { randomRange } from "./randomIndent.js";

const numberSys = ['Hex','Bin','Oct'];
const min = 0;
const max = 2;
/**
 * 
 * @param {Number} val 
 * @returns same value of val in random number system
 */
export default function useNumberSysRandomly(val){
  let sys = numberSys[randomRange(min, max)];
  let v = undefined;
  switch(sys){
    case 'Hex':
      v = '0x' + val.toString(16);
      break;
    case 'Bin':
      v = '0b' + val.toString(2);
      break;
    case 'Oct':
      v = '0o' + val.toString(8);
      break;
  }
  return v;
}