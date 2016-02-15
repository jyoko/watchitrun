// parse esprima object for relevant functions & returns
function parseAST(ast) {
//  var ast = esprima.parse(code, {loc: true});
  var topLevel = parseEsprimaBody(ast);
  var topCalls = createCallStack(topLevel);
//  console.log(topLevel);
//  console.log(topCalls);
  return {nodes: topLevel, calls: topCalls};

  // takes parsed Esprima body and constructs array of calls in-order
  function createCallStack(topLevel) {
    var calls = [];
    for (var i=0; i<topLevel.length; i++) {
      if (topLevel[i].type==='CallExpression') {
        calls.push(topLevel[i]);
      }
    }
    return calls.length ? calls : null;
  }

  // takes a substantial (ie: script, module, function) AST object from esprima
  // and returns an array of function-related nodes
  function parseEsprimaBody(ast) {

    var body = ast.body;

    // somewhat hacky here, but at current functionality we can assume a body
    // that consists of a single BlockStatement node has the actual body we want
    if ( body.type === 'BlockStatement' ) body = body.body;

    // filter for written functions and invocations
    var relevant = body.filter(function(node) {
      if (node.type==='FunctionDeclaration') {
        return true;
      }
      if (node.type==='ExpressionStatement') {
        if (node.expression.type==='CallExpression') return true;
      }
      if (node.type==='ReturnStatement') {
        return true;
      }
      if (node.type==='VariableDeclaration') {
        var decCheck = node.declarations.filter(function(declaration) { 
          if (declaration.init && declaration.init.type==='FunctionExpression') {
            return true;
          }
        });
        return decCheck.length;
      }
       // pull expressions to top of filtered nodes
    }).map(function(node) {
      // CallExpression
      if (node.type==='ExpressionStatement') {
        return node.expression;
      }
      if (node.type==='VariableDeclaration') {
        var decCheck = node.declarations.filter(function(declaration) {
          if (declaration.init && declaration.init.type==='FunctionExpression') {
            return true;
          }
        });
        return decCheck.map(function(node) {
          // TODO: WARNING: assign _variable_ name to ID, may break named
          //                function expressions parsing, eg: recursive funcs
          node.init.id = node.id;
          return node.init;
        });
      }
      return node;
    });
    // flatten function expressions
    return relevant.reduce(function(acc,cur) {
      if (Array.isArray(cur)) {
        cur.forEach(function(node) {
          acc.push(node);
        });
      } else {
        acc.push(cur);
      }
      return acc;
    },[]);
      
  }

};

