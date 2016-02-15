/*
 * Function that manages variables & controls execution for the given code
 *
 */

var WatchItRun = function(ast) {

  // Only care about the body
  this.body = ast.body;

  // TODO: hoisting
  // this.hoisted = [];
  this.highlight = [];

  // object for variable tracking
  this.scope = {global:{}};

  this.parseFunction(this.scope.global);

};

WatchItRun.prototype.parseFunction = function(scope) {
  var self = this;
  this.body.forEach(function(node) {
    switch(node.type) {
      case 'FunctionDeclaration':
        self.highlight.push([node.loc.start.line-1,node.loc.end.line-1]);
        scope[node.id.name] = new WatchItRun(node.body);
      break;
      case 'VariableDeclaration':
        self.highlight.push([node.loc.start.line-1,node.loc.end.line-1]);
        self.parseDeclaration(node.declarations,scope);
      break;
      case 'ExpressionStatement':
        self.highlight.push([node.loc.start.line-1]);
        self.parseExpression(node.expression,scope);
      break;
    }
  });
};

WatchItRun.prototype.parseDeclaration = function(declarations,scope) {

  declarations.forEach(function(node) {
    switch(node.init.type) {
      case 'FunctionExpression':
        scope[node.id.name] = new WatchItRun(node.init.body);
      break;
      case 'Literal':
        scope[node.id.name] = node.init.value;
      break;
      case 'ObjectExpression':
        scope[node.id.name] = 'object';
      break;
      case 'ArrayExpression':
        scope[node.id.name] = 'array';
      break;
    }
  });

};

WatchItRun.prototype.parseExpression = function(expression,scope) {

  if (expression.callee === 'CallExpression') {
    // scope.callee replacement
    //
  }

  if (expression.callee === 'MemberExpression') {
    var actual = expression.callee.object.name + '.' + expression.callee.property.name;
    // make replacement
  }

};

