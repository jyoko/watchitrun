/*
 * WatchItRun.js
 *
 * Takes source code as a string. 
 *
 * Requires Esprima.
 *
 */

var WatchItRun = function(source,params) {

  // hacking because I like having named objects
  // new.target would be good option for ES6
  if (!(this instanceof WatchItRun)) return new WatchItRun(source,params);

  // Keep original source as string, but typically pulling from lines
  // only applicable to top-level
  var _ast;
  if (typeof source === 'string') {
    var _source = source.split('\n');
    _ast = esprima.parse(source, {loc: true});
  } else {
    _ast = source;
  }
  // Parse passed-through params for recursive calls
  if (params) {
    this.params = params.map(function(param) {
      return param.name;
    });
  }
  var _body = _ast.body;
  var _hoisted = [];
  var _highlight = [];
  var _scope = {};
  var _stack = [];
  var _active = null;

  var CONVERT_EXPRESSION = {
    FunctionExpression: function(expression) {
      return WatchItRun(expression.body,expression.params);
    },
    Literal: function(expression) {
      return expression.value;
    },
    ObjectExpression: function(expression) {
      return parseObject(expression);
    },
    ArrayExpression: function(expression) {
      return parseArgs(expression.elements);
    },
    CallExpression: function(expression) {
      return parseCallExpression(expression);
    },
    BinaryExpression: function(expression) {
      return expression; // TODO
    },
    Identifier: function(expression) {
      return expression; // TODO : from scope
    },
  };
  var convertExpression = function(node) {
    return CONVERT_EXPRESSION[node.type](node);
  };

  var parseFunction = function(body,scope) {
    body.forEach(function(node) {
      switch(node.type) {
        case 'FunctionDeclaration':
          toHighlight(node.loc);
          scope[node.id.name] = WatchItRun(node.body,node.params);
          break;
        case 'VariableDeclaration':
          toHighlight(node.loc);
          parseDeclaration(node.declarations,scope);
          break;
        case 'ExpressionStatement':
          toHighlight(node.loc);
          parseExpression(node.expression,scope);
          break;

        case 'ForStatement':
          toHighlight(node.loc);
          //TODO
          break;
        case 'WhileStatement':
          toHighlight(node.loc);
          //TODO
          break;

        case 'ReturnStatement':
          toHighlight(node.loc);


          break;
      }
    });
  };

  var parseDeclaration = function(declarations, scope) {
    declarations.forEach(function(node) {
      scope[node.id.name] = convertExpression(node.init);
      /*
      //scope[node.id.name] = CONVERT_EXPRESSION[node.init.type](node.init);
      switch(node.init.type) {
        case 'FunctionExpression':
          scope[node.id.name] = WatchItRun(node.init.body);
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
      */
    });
  };

  // parseArgs works to convert array_node -> [array_vals]
  var parseArgs = function(args) {
    return args.map(function(arg) {
      return convertExpression(arg);
    });
  };

  var parseExpression = function(expression, scope) {
    if (expression.type === 'CallExpression') {
      var parsed = parseCallExpression(expression);
      parsed.node = expression;
      _stack.unshift(parsed);
    }
  };

  var parseCallExpression = function(expression) {
    var full, args, callee = expression.callee;
    if (callee.type === 'MemberExpression') {
      full = callee.object.name + '.' + callee.property.name;
    } else if (callee.type === 'Identifier') {
      full = callee.name;
    }
    args = parseArgs(expression.arguments);
    return {name:full,arguments:args};
  };

  var parseObject = function(objectNode) {
    return objectNode.properties.reduce(function(retObj, prop) {
      retObj[prop.key.name] = CONVERT_EXPRESSION[prop.value.type](prop.value);
      return retObj;
    },{});
  };

  /*
   * Convenience functions
   *
   */

  var toHighlight = function(location) {
    _highlight.push([location.start.line-1,location.end.line-1]);
  };

  var execute = function(func, scope) {
    var name = func.name;
    var global = false;
    if (!scope.hasOwnProperty(func.name)) {
      // TODO: bubble appropriately
      if (!eval('window.'+name)) throw new Error('Function '+func.name+' not found');
      name = 'window.'+name;
      global = true;
    }

    // TODO: remove this
    console.log(name);

    this.active = scope[name];
    var begin = scope[name].body[0].loc.start.line-1;
    var end = scope[name].body[0].loc.end.line;
    var toRun = _source.slice(begin,end).join('\n');

    // setup function scope
    var funcScope = {};
    for (var k in scope) {
      //TODO: intercept other functions
      if (!(scope[k] instanceof WatchItRun)) {
        funcScope[k] = scope[k];
      }
    }
    if (!global) {
      for (k in scope[name].scope) {
        //TODO: intercept other functions
        if (!(scope[k] instanceof WatchItRun)) {
          funcScope[k] = scope[name].scope[k];
        }
      }
    }
    funcScope.arguments = [];
    func.arguments.forEach(function(v,i) {
      funcScope.arguments.push(v);
      if (!global) {
        if (scope[name].params[i]) {
          funcScope[scope[name].params[i]] = v;
        }
      }
    });

    console.log(withVarEval(toRun,funcScope));
  };

  var contextEval = function(code, context) {
    return (function() { return eval(code); }).call(context);
  };
  var withVarEval = function(code, varObj) {
    return eval('with ('+JSON.stringify(varObj)+') {'+code+'}');
  };

  parseFunction(_body,_scope);

  this.body       = _body;
  this.highlight  = _highlight;
  this.scope      = _scope;
  this.active     = this;
  this.stack      = _stack;
  this.next       = function() {
    if (_stack.length) execute(_stack.pop(),_scope);
  };

};

