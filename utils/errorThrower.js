function internalError(msg){
  throw new Error(`Internal Error: ${msg}`);
}

function syntaxTransformationError(msg){
  throw new Error(`There might be some flaws in your source file's syntax ${msg};`)
}

export default {
  internalError,
  syntaxTransformationError,
}