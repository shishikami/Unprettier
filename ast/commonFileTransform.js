import distortIndentationRandomly from "../utils/ast/randomIndent.js";
import { fileWriter } from "../utils/fileProcessor.js";

export function commonFileTransform(data, {force, output}){
  let sourceLines = data.split(/\r\n/g);

  let uglifiedCode = sourceLines.map((e)=>{
    return distortIndentationRandomly(e);
  })
  uglifiedCode = uglifiedCode.join('\r\n');

  let flag = force ? 'w' : 'wx';
  fileWriter(output, uglifiedCode, flag);
}