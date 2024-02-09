const conditionStatment = ["IfStatement","WhileStatement","DoWhileStatement"];

function isIdentifierInRightOrLeftExpression(path, name){
  return path.left.name === name || path.right.name === name;
}

function isIdentifierInConditionStatement(path){
  switch(path.parentPath.type){
    case 'IfStatement':
    case 'WhileStatement':
    case 'DoWhileStatement':
      if(path.container.test.name === path.node.name){
        return true;
      }else{
        return false;
      }

    case 'LogicalExpression':
      let ptr = path;
      while(ptr.parentPath.type === 'LogicalExpression'){
        ptr = ptr.parentPath;
      }
      if(conditionStatment.includes(ptr.parentPath.type)){
        return true
      }else{
        return false;
      }

    default:
      return false;
  }
}

function isIdentifierOfVariables(path){
  return path.parentPath.parentPath.type === 'VariableDeclaration' ||
    path.parentPath.type === 'FunctionDeclaration' ||
    path.parentPath.type === 'ClassDeclaration';
}

export {
  isIdentifierInConditionStatement,
  isIdentifierOfVariables,
  isIdentifierInRightOrLeftExpression,
}