import { fileReader } from "../fileProcessor.js"
import { randomRange } from "./randomIndent.js";
import errorThrower from "../errorThrower.js";
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url));


const commentsArrayGenerator = (path) =>{
  return fileReader(path)
  .replace(/[\n\r]+/g,'\n')
  .split('\n')
  .map((e)=>{
    return ' ' + e;
  });
}

const commentsConfigGenerator = (path, factor = 0.2) =>{
  let arr = commentsArrayGenerator(path);
  let lowerBound = 0;
  let upperBound = Math.ceil(arr.length/factor) - 1;
  let lastIndex = arr.length - 1;
  return {
    arr,
    lowerBound,
    upperBound,
    lastIndex,
  }
}

/**
 * 
 * @param {CommentsConfig} param0 
 * @returns string | undefined
 */
const commentsGenerator = ({arr, lowerBound, upperBound, lastIndex}) =>{
  let index = randomRange(lowerBound, upperBound);
  if(index > lastIndex){
    return undefined;
  }else{
    return arr[index];
  }
}


const variableDeclarationComments = commentsConfigGenerator(__dirname + '/../source/variableDeclarationComments.txt');
const functionDeclarationComments = commentsConfigGenerator(__dirname + '/../source/functionDeclarationComments.txt');
const loopComments = commentsConfigGenerator(__dirname + '/../source/loopComments.txt');
const expressionStatementComments = commentsConfigGenerator(__dirname + '/../source/expressionStatementComments.txt');
const choiceComments = commentsConfigGenerator(__dirname + '/../source/choiceComments.txt');

/**
 * generate a random comment for provided node type
 * @param {string} type 
 * @returns string | undefined
 */
export default function generateCommentsRandomly(type){
  switch(type){
    case 'VariableDeclaration':
      return commentsGenerator(variableDeclarationComments);
    case 'FunctionDeclaration':
      return commentsGenerator(functionDeclarationComments);
    case 'Loop':
      return commentsGenerator(loopComments);
    case 'ExpressionStatement':
      return commentsGenerator(expressionStatementComments);
    case 'Choice':
      return commentsGenerator(choiceComments);
    default:
      errorThrower.internalError('Unsupported node type in randomComment.js');
  }
  return undefined;
}