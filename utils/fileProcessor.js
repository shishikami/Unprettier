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
const fetchSourceCode = path =>{
  const extname = getExtname(path);
  if(acceptSuffix.includes(extname)){
    const data = fileReader(path);
    return {
      data,
      suffix: extname
    }
  }else{
    throw new Error('Unsupported File Type');
  }
}

const processInputData = argv =>{
  // INFO Not exactly what I expected
  // if(argv.command !== 'uglier'){
  //   throw new Error('Wrong command');
  // }
  return fetchSourceCode(argv.input);
}

export {
  processInputData,
  fileWriter,
  fileReader,
}