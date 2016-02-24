/*
 * WatchItRun.js
 *
 * Takes source code as a string. 
 *
 * Requires Esprima.
 *
 */

var WatchItRun = function(source) {

  // Keep original source as string, but typically pulling from lines
  // only applicable to top-level
  var _ast;
  if (typeof source === 'string') {
    var _source = source.split('\n');
    _ast = esprima.parse(source, {loc: true});
  } else {
    _ast = source;
  }
  var _body = _ast.body;
  var _hoisted = [];
  var _highlight = [];
  var _scope = {};
  var _stack = [];

  var _parseFunction = function(body,scope) {
    body.forEach(function(node) {
      switch(node.type) {

        case 'FunctionDeclaration':
          _toHighlight(node.loc);
          scope[node.id.name] = WatchItRun(node.body);
          break;
        case 'VariableDeclaration':
          _toHighlight(node.loc);
          _parseDeclaration(node.declarations,scope);
          break;
        case 'ExpressionStatement':
          _toHighlight(node.loc);
          _parseExpression(node.expression,scope);
          break;

        case 'ForStatement':
          _toHighlight(node.loc);
          //TODO
          break;
        case 'WhileStatement':
          _toHighlight(node.loc);
          //TODO
          break;

        case 'ReturnStatement':
          _toHighlight(node.loc);

          break;
      }
    });
  };

  var _parseDeclaration = function(declarations, scope) {
    declarations.forEach(function(node) {
      switch(node.init.type) {
        case 'FunctionExpression':
          scope[node.id.name] = WatchItRun(node.init.body);
          break;
        case 'Literal':
          scope[node.id.name] = node.init.value;
          break;
        case 'ObjectExpression':
          //TODO
          scope[node.id.name] = 'object';
          break;
        case 'ArrayExpression':
          //TODO
          scope[node.id.name] = 'array';
          break;
      }
    });
  };

  var _parseArgs = function(args) {
    return args.map(function(arg) {
      switch(arg.type) {
        case 'FunctionExpression':
          return WatchItRun(arg.body);
          break;
        case 'Literal':
          return arg.value;
          break;
        case 'ObjectExpression':
          //TODO
          return 'object';
          break;
        case 'ArrayExpression':
          //TODO
          return 'array';
          break;
        case 'CallExpression':
          return arg;
          break;
      }
    });
  };

  var _parseExpression = function(expression, scope) {
    if (expression.type === 'CallExpression') {
      var full, callee = expression.callee;
      if (callee.type === 'MemberExpression') {
        full = callee.object.name + '.' + callee.property.name;
      } else if (callee.type === 'Identifier') {
        full = callee.name;
      }
      var args = _parseArgs(expression.arguments);
      console.log(full);
      console.log(args);
    }
  };

  var _parseCallExpression = function(expression) {

  };

  /*
   * Convenience functions
   *
   */

  var _toHighlight = function(location) {
    _highlight.push([location.start.line-1,location.end.line-1]);
  };

  _parseFunction(_body,_scope);

  var WIR = {
    body: _body,
    highlight: _highlight,
    scope: _scope
  };

  return WIR;
};

