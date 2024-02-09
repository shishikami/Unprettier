
  // traverse.default(res ,{
  //   enter(path) {
  //     if (t.isIdentifier(path.node)) {
  //       // 函数参数
  //       if(path.parentPath.type === 'FunctionExpression' ||
  //       // 箭头函数参数
  //       path.parentPath.type === 'ArrowFunctionExpression' ||
  //       // 各种变量声明
  //       isIdentifierOfVariables(path)
  //       // TODO class内部函数的调用
  //       // path.parentPath.type === 'ClassMethod'
  //       ){
  //         // 声明变量
  //         let modifiedIdentifier;
  //         // 作用域重新声明同名变量
  //         if((modifiedIdentifier = Dict.get(path.node.name)) !== undefined){
  //           path.node.name = modifiedIdentifier;
  //         }else{
  //           modifiedIdentifier = Dict.set(path.node.name, path.node.name);
  //           path.node.name = modifiedIdentifier;
  //         }
  //       }
  //       // 使用变量
  //       else if(
  //         // 过程调用
  //         path.parentPath.type === 'CallExpression' ||
  //         // 赋值
  //         path.parentPath.type === 'AssignmentExpression' ||
  //         // 自增自减的操作
  //         path.parentPath.type === 'UpdateExpression' ||
  //         // 逻辑表达式
  //         isIdentifierInConditionStatement(path)){
          
  //         let modifiedIdentifier;
  //         if((modifiedIdentifier = Dict.get(path.node.name)) !== undefined){
  //           path.node.name = modifiedIdentifier;
  //         }else{
  //           // TODO
  //           console.warn("Encountered an unmodified Token", path.node.name);
  //         }
  //       } else{
  //         console.warn("Unmodified Identifier", path.node.name);
  //       }
  //     }
  //     console.log(path);
  //   }
  // })