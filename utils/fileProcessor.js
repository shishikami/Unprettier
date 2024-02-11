import * as fs from 'fs';
import { extname } from 'path';
import { acceptSuffix } from './enum.js';

const fileReader = (path) =>{
  return fs.readFileSync(path,'utf-8');
}

const fileWriter = (path, content, flag) =>{
  fs.writeFileSync(path, content, {
    encoding: 'utf-8',
    flag: flag
  });
}

const getExtname = (path) =>{
  return extname(path.toString()).toLowerCase();
}

// Get source code
const processInputData = ({input: path}) =>{
  const extname = getExtname(path);
  const data = fileReader(path);
  let suffix = undefined;
  if(acceptSuffix.includes(extname)){
    suffix = extname;
  }
  return {
    data,
    suffix
  }
}

export {
  processInputData,
  fileWriter,
  fileReader,
}