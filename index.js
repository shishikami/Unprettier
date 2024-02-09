import { showCommands } from "./utils/commands.js";
import { processInputData } from "./utils/fileProcessor.js";
import { transform } from "./ast/js/parser.js";

let argv;
try{
  // 控制台指令
  argv = showCommands();
  // 输入源码
  const input = processInputData(argv);
  transform(input, argv);
}catch(e){
  if(e instanceof Error){
    if (e.message.includes('EEXIST')) {
      console.log(`❌ ERROR: ${argv.output} already exists. Use --force to override`);
    } else if (e.message.includes('ENOENT')) {
      console.error('❌ ERROR: Invalid input file path!');
    } else if (e.name === 'SyntaxError') {
      console.log(`❌ ERROR: Can't parse input file. It seems like ${argv.input} has syntax errors!`);
    }else{
      console.log(`❌ ERROR: ${e.message}`);
    }
  }
}