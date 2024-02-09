import * as parser from '@babel/parser';
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import generate from "@babel/generator";
import { fileWriter } from '../../utils/fileProcessor.js';
import Collection from '../../utils/collection.js';
import error from '../../utils/errorThrower.js'
import distortIndentationRandomly from '../../utils/ast/randomIndent.js';
import useNumberSysRandomly from '../../utils/ast/randomNumberSys.js';
import generateCommentsRandomly from '../../utils/ast/randomComments.js';
import { useRandomBoolean } from '../../utils/ast/randomBoolean.js';

/**
 * transform js code to ast
 * @param {string} code 
 * @returns abstruct syntax tree
 */
function parse(code){
  const ast = parser.parse(code,{
    sourceType: "unambiguous",
    allowImportExportEverywhere: true,
    tokens:true,
    plugins:[
      "typescript",
      "throwExpressions"
    ]
  })
  return ast;
}

/**
 * js code parsing and transformation
 * @param {string} input 
 * @param {Object} argv 
 * @param {boolean} argv.force 
 * @param {string} argv.output 
 */
export function transform(input, {force, output}){
  const res = parse(input);
  const collection = new Collection();

  traverse.default(res ,{
    enter(path){
      // 函数声明和变量声明
      if(t.isDeclaration(path)){
        if(t.isFunctionDeclaration(path) && t.isIdentifier(path.node.id)){
          let v = path.node.id.name;
          let currentScopeUid = path.scope.uid;
          let {scope: {uid: targetUid}} = path.findParent((path)=>{
            return path.scope.uid !== currentScopeUid;
          })
          if(collection.get(targetUid, v) === undefined){
            collection.set(targetUid, v);
          }else{
            error.syntaxTransformationError(`around function ${path.node.id.name}'s declaration`);
          }
        }else if(t.isVariableDeclaration(path)){
          let node = path.node;
          let layer = path.scope.uid;
          for(let elem of node.declarations){
            // 声明的变量本身
            if(t.isIdentifier(elem.id)){
              if(collection.get(layer, elem.id.name) === undefined){
                collection.set(layer, elem.id.name);
              }else{
                error.syntaxTransformationError(`around identifier ${elem.id.name}'s declaration`);
              }
            }
          }
        }
      }else if(t.isExpression(path)){
        // 声明变量的初始化节点
        if(t.isArrowFunctionExpression(path) || t.isFunctionExpression(path)){
          let params = path.node.params;
          for(let elem of params){
            let layer = path.scope.uid;
            if(t.isIdentifier(elem)){
              if(collection.get(layer, elem.name) === undefined){
                collection.set(layer, elem.name);
              }else{
                error.syntaxTransformationError(`around parameter ${elem.name}'s declaration`);
              }
            }
          }
        }
      }
    },
    exit(path){
      if(t.isIdentifier(path)){
        let layer = path.scope.uid;
        let v = collection.get(layer, path.node.name);
        // 当前作用域不存在
        // The identifier was not declared in current scope
        if(v === undefined){
          try{
            let {scope: {uid: targetLayer}} = path.findParent((parentPath)=>{
              return collection.get(parentPath.scope.uid, path.node.name) !== undefined;
            })
            v = collection.get(targetLayer, path.node.name);
          }catch(e){
            // 未找到Identifier对应的Scope
            // No scope containing corresponding identifier
          }
        }
        if(v !== undefined){
          path.node.name = v;
        }
      }
      // TODO add comments for different type of statement / declaration
      else if(t.isDeclaration(path)){
        if(!('leadingComments' in path.node) && !('trailingComments' in path.node)){
          let comment;
          if(t.isVariableDeclaration(path)){
            comment = generateCommentsRandomly('VariableDeclaration');
          }else if(t.isFunctionDeclaration){
            comment = generateCommentsRandomly('FunctionDeclaration');
          }
          if(comment !== undefined){
            t.addComment(path.node, 'leading', comment, useRandomBoolean());
          }
        }
      }else if(t.isLoop(path) || t.isExpressionStatement(path) || t.isIfStatement(path) || t.isSwitchStatement(path)){
        if(!('leadingComments' in path.node) && !('trailingComments' in path.node)){
          let comment;
          if(t.isLoop(path)){
            comment = generateCommentsRandomly('Loop');
          }else if(t.isExpressionStatement){
            comment = generateCommentsRandomly('ExpressionStatement');
          }else if(t.isIfStatement(path) || t.isSwitchStatement(path)){
            comment = generateCommentsRandomly('Choice');
          }
          if(comment !== undefined){
            t.addComment(path.node, 'leading', comment, useRandomBoolean());
          }
        }
      }else if(t.isNumericLiteral(path)){
        if(Number.isInteger(path.node.value)){
          path.node.value = useNumberSysRandomly(path.node.value);
        }
      }
    }
  })

  const modifiedCode = generate.default(res,{
    // TODO may need an alternate
    // retainLines:true,
  });
  let uglifiedCode = modifiedCode.code.split('\n');

  // Test if there exist SheBang
  if(uglifiedCode.length > 0){
    const regExp = /^\s*#!/;
    let firstLine = uglifiedCode[0];
    let rest = uglifiedCode.slice(1, uglifiedCode.length);
    if(!regExp.test(firstLine)){
      firstLine = distortIndentationRandomly(firstLine);
    }
    uglifiedCode = [firstLine, ...rest].map((e)=>{
      let v = distortIndentationRandomly(e);
      return v;
    }).filter((e)=>{
      return e !== undefined;
    })
  }

  uglifiedCode = uglifiedCode.join('\n');

  let flag = force ? 'w' : 'wx';
  fileWriter(output, uglifiedCode, flag);
}