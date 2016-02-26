var str = `var first = function(arr) {
  return second(arr, function(num) {
    return num*2;
  });
};

function second(arr, cb) {
  arr = arr.slice();
  for (var i=0; i<arr.length; i++) {
    arr[i] = cb(arr[i]);
  }
  return arr;
}

first([1,2,3,4,5]);
`;

$('#codeSource').val(str);
var code = CodeMirror.fromTextArea($('#codeSource')[0], {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'solarized',
  tabSize: 2,
  keyMap: 'vim',
  matchBrackets: true,
});

var runner
var updateCode = function(func) {
  $('#code').html('');
  var toRun = $('#codeSource').val();
  var $func = $('<pre></pre>')
  var $el;
  toRun.split('\n').forEach(function(line) {
    if (!line.match(/^\s*$/)) {
      $el = $('<span class="line"></span>').text(line+'\n');
      $func.append($el);
    } else {
      $el = $('<span class="line"></span>').text('\n');
      $func.append($el);
    }
  });
  $('#code').append($func);

  runner = `{"body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":2}},"type":"VariableDeclaration","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":5,"column":1}},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9}},"type":"Identifier","name":"first"},"init":{"loc":{"start":{"line":1,"column":12},"end":{"line":5,"column":1}},"type":"FunctionExpression","id":null,"params":[{"loc":{"start":{"line":1,"column":21},"end":{"line":1,"column":24}},"type":"Identifier","name":"arr"}],"defaults":[],"body":{"loc":{"start":{"line":1,"column":26},"end":{"line":5,"column":1}},"type":"BlockStatement","body":[{"loc":{"start":{"line":2,"column":2},"end":{"line":4,"column":5}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":2,"column":9},"end":{"line":4,"column":4}},"type":"CallExpression","callee":{"loc":{"start":{"line":2,"column":9},"end":{"line":2,"column":15}},"type":"Identifier","name":"second"},"arguments":[{"loc":{"start":{"line":2,"column":16},"end":{"line":2,"column":19}},"type":"Identifier","name":"arr"},{"loc":{"start":{"line":2,"column":21},"end":{"line":4,"column":3}},"type":"FunctionExpression","id":null,"params":[{"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":33}},"type":"Identifier","name":"num"}],"defaults":[],"body":{"loc":{"start":{"line":2,"column":35},"end":{"line":4,"column":3}},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":17}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":16}},"type":"BinaryExpression","operator":"*","left":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":14}},"type":"Identifier","name":"num"},"right":{"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":16}},"type":"Literal","value":2,"raw":"2"}}}]},"generator":false,"expression":false}]}}]},"generator":false,"expression":false}}],"kind":"var"},{"loc":{"start":{"line":7,"column":0},"end":{"line":13,"column":1}},"type":"FunctionDeclaration","id":{"loc":{"start":{"line":7,"column":9},"end":{"line":7,"column":15}},"type":"Identifier","name":"second"},"params":[{"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":19}},"type":"Identifier","name":"arr"},{"loc":{"start":{"line":7,"column":21},"end":{"line":7,"column":23}},"type":"Identifier","name":"cb"}],"defaults":[],"body":{"loc":{"start":{"line":7,"column":25},"end":{"line":13,"column":1}},"type":"BlockStatement","body":[{"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":20}},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":19}},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":5}},"type":"Identifier","name":"arr"},"right":{"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":19}},"type":"CallExpression","callee":{"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":17}},"type":"MemberExpression","computed":false,"object":{"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":11}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":17}},"type":"Identifier","name":"slice"}},"arguments":[]}}},{"loc":{"start":{"line":9,"column":2},"end":{"line":11,"column":3}},"type":"ForStatement","init":{"loc":{"start":{"line":9,"column":7},"end":{"line":9,"column":14}},"type":"VariableDeclaration","declarations":[{"loc":{"start":{"line":9,"column":11},"end":{"line":9,"column":14}},"type":"VariableDeclarator","id":{"loc":{"start":{"line":9,"column":11},"end":{"line":9,"column":12}},"type":"Identifier","name":"i"},"init":{"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":14}},"type":"Literal","value":0,"raw":"0"}}],"kind":"var"},"test":{"loc":{"start":{"line":9,"column":16},"end":{"line":9,"column":28}},"type":"BinaryExpression","operator":"<","left":{"loc":{"start":{"line":9,"column":16},"end":{"line":9,"column":17}},"type":"Identifier","name":"i"},"right":{"loc":{"start":{"line":9,"column":18},"end":{"line":9,"column":28}},"type":"MemberExpression","computed":false,"object":{"loc":{"start":{"line":9,"column":18},"end":{"line":9,"column":21}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":9,"column":22},"end":{"line":9,"column":28}},"type":"Identifier","name":"length"}}},"update":{"loc":{"start":{"line":9,"column":30},"end":{"line":9,"column":33}},"type":"UpdateExpression","operator":"++","argument":{"loc":{"start":{"line":9,"column":30},"end":{"line":9,"column":31}},"type":"Identifier","name":"i"},"prefix":false},"body":{"loc":{"start":{"line":9,"column":35},"end":{"line":11,"column":3}},"type":"BlockStatement","body":[{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":24}},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":23}},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":10}},"type":"MemberExpression","computed":true,"object":{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":7}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":10,"column":8},"end":{"line":10,"column":9}},"type":"Identifier","name":"i"}},"right":{"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":23}},"type":"CallExpression","callee":{"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":15}},"type":"Identifier","name":"cb"},"arguments":[{"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":22}},"type":"MemberExpression","computed":true,"object":{"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":19}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":10,"column":20},"end":{"line":10,"column":21}},"type":"Identifier","name":"i"}}]}}}]}},{"loc":{"start":{"line":12,"column":2},"end":{"line":12,"column":13}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":12,"column":9},"end":{"line":12,"column":12}},"type":"Identifier","name":"arr"}}]},"generator":false,"expression":false},{"loc":{"start":{"line":15,"column":0},"end":{"line":15,"column":19}},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":15,"column":0},"end":{"line":15,"column":18}},"type":"CallExpression","callee":{"loc":{"start":{"line":15,"column":0},"end":{"line":15,"column":5}},"type":"Identifier","name":"first"},"arguments":[{"loc":{"start":{"line":15,"column":6},"end":{"line":15,"column":17}},"type":"ArrayExpression","elements":[{"loc":{"start":{"line":15,"column":7},"end":{"line":15,"column":8}},"type":"Literal","value":1,"raw":"1"},{"loc":{"start":{"line":15,"column":9},"end":{"line":15,"column":10}},"type":"Literal","value":2,"raw":"2"},{"loc":{"start":{"line":15,"column":11},"end":{"line":15,"column":12}},"type":"Literal","value":3,"raw":"3"},{"loc":{"start":{"line":15,"column":13},"end":{"line":15,"column":14}},"type":"Literal","value":4,"raw":"4"},{"loc":{"start":{"line":15,"column":15},"end":{"line":15,"column":16}},"type":"Literal","value":5,"raw":"5"}]}]}}],"highlight":[[0,4],[6,12],[14,14]],"scope":{"first":{"params":["arr"],"body":[{"loc":{"start":{"line":2,"column":2},"end":{"line":4,"column":5}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":2,"column":9},"end":{"line":4,"column":4}},"type":"CallExpression","callee":{"loc":{"start":{"line":2,"column":9},"end":{"line":2,"column":15}},"type":"Identifier","name":"second"},"arguments":[{"loc":{"start":{"line":2,"column":16},"end":{"line":2,"column":19}},"type":"Identifier","name":"arr"},{"loc":{"start":{"line":2,"column":21},"end":{"line":4,"column":3}},"type":"FunctionExpression","id":null,"params":[{"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":33}},"type":"Identifier","name":"num"}],"defaults":[],"body":{"loc":{"start":{"line":2,"column":35},"end":{"line":4,"column":3}},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":17}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":16}},"type":"BinaryExpression","operator":"*","left":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":14}},"type":"Identifier","name":"num"},"right":{"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":16}},"type":"Literal","value":2,"raw":"2"}}}]},"generator":false,"expression":false}]}}],"highlight":[[1,3]],"scope":{},"stack":[{"value":{"name":"second","arguments":[{"loc":{"start":{"line":2,"column":16},"end":{"line":2,"column":19}},"type":"Identifier","name":"arr"},{"params":["num"],"body":[{"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":17}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":16}},"type":"BinaryExpression","operator":"*","left":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":14}},"type":"Identifier","name":"num"},"right":{"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":16}},"type":"Literal","value":2,"raw":"2"}}}],"highlight":[[2,2]],"scope":{},"stack":[{"value":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":16}},"type":"BinaryExpression","operator":"*","left":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":14}},"type":"Identifier","name":"num"},"right":{"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":16}},"type":"Literal","value":2,"raw":"2"}},"node":{"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":17}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":16}},"type":"BinaryExpression","operator":"*","left":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":14}},"type":"Identifier","name":"num"},"right":{"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":16}},"type":"Literal","value":2,"raw":"2"}}}}]}]},"node":{"loc":{"start":{"line":2,"column":2},"end":{"line":4,"column":5}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":2,"column":9},"end":{"line":4,"column":4}},"type":"CallExpression","callee":{"loc":{"start":{"line":2,"column":9},"end":{"line":2,"column":15}},"type":"Identifier","name":"second"},"arguments":[{"loc":{"start":{"line":2,"column":16},"end":{"line":2,"column":19}},"type":"Identifier","name":"arr"},{"loc":{"start":{"line":2,"column":21},"end":{"line":4,"column":3}},"type":"FunctionExpression","id":null,"params":[{"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":33}},"type":"Identifier","name":"num"}],"defaults":[],"body":{"loc":{"start":{"line":2,"column":35},"end":{"line":4,"column":3}},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":17}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":16}},"type":"BinaryExpression","operator":"*","left":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":14}},"type":"Identifier","name":"num"},"right":{"loc":{"start":{"line":3,"column":15},"end":{"line":3,"column":16}},"type":"Literal","value":2,"raw":"2"}}}]},"generator":false,"expression":false}]}}}]},"second":{"params":["arr","cb"],"body":[{"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":20}},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":19}},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":8,"column":2},"end":{"line":8,"column":5}},"type":"Identifier","name":"arr"},"right":{"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":19}},"type":"CallExpression","callee":{"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":17}},"type":"MemberExpression","computed":false,"object":{"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":11}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":17}},"type":"Identifier","name":"slice"}},"arguments":[]}}},{"loc":{"start":{"line":9,"column":2},"end":{"line":11,"column":3}},"type":"ForStatement","init":{"loc":{"start":{"line":9,"column":7},"end":{"line":9,"column":14}},"type":"VariableDeclaration","declarations":[{"loc":{"start":{"line":9,"column":11},"end":{"line":9,"column":14}},"type":"VariableDeclarator","id":{"loc":{"start":{"line":9,"column":11},"end":{"line":9,"column":12}},"type":"Identifier","name":"i"},"init":{"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":14}},"type":"Literal","value":0,"raw":"0"}}],"kind":"var"},"test":{"loc":{"start":{"line":9,"column":16},"end":{"line":9,"column":28}},"type":"BinaryExpression","operator":"<","left":{"loc":{"start":{"line":9,"column":16},"end":{"line":9,"column":17}},"type":"Identifier","name":"i"},"right":{"loc":{"start":{"line":9,"column":18},"end":{"line":9,"column":28}},"type":"MemberExpression","computed":false,"object":{"loc":{"start":{"line":9,"column":18},"end":{"line":9,"column":21}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":9,"column":22},"end":{"line":9,"column":28}},"type":"Identifier","name":"length"}}},"update":{"loc":{"start":{"line":9,"column":30},"end":{"line":9,"column":33}},"type":"UpdateExpression","operator":"++","argument":{"loc":{"start":{"line":9,"column":30},"end":{"line":9,"column":31}},"type":"Identifier","name":"i"},"prefix":false},"body":{"loc":{"start":{"line":9,"column":35},"end":{"line":11,"column":3}},"type":"BlockStatement","body":[{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":24}},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":23}},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":10}},"type":"MemberExpression","computed":true,"object":{"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":7}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":10,"column":8},"end":{"line":10,"column":9}},"type":"Identifier","name":"i"}},"right":{"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":23}},"type":"CallExpression","callee":{"loc":{"start":{"line":10,"column":13},"end":{"line":10,"column":15}},"type":"Identifier","name":"cb"},"arguments":[{"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":22}},"type":"MemberExpression","computed":true,"object":{"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":19}},"type":"Identifier","name":"arr"},"property":{"loc":{"start":{"line":10,"column":20},"end":{"line":10,"column":21}},"type":"Identifier","name":"i"}}]}}}]}},{"loc":{"start":{"line":12,"column":2},"end":{"line":12,"column":13}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":12,"column":9},"end":{"line":12,"column":12}},"type":"Identifier","name":"arr"}}],"highlight":[[7,7],[8,10],[11,11]],"scope":{},"stack":[{"value":{"loc":{"start":{"line":12,"column":9},"end":{"line":12,"column":12}},"type":"Identifier","name":"arr"},"node":{"loc":{"start":{"line":12,"column":2},"end":{"line":12,"column":13}},"type":"ReturnStatement","argument":{"loc":{"start":{"line":12,"column":9},"end":{"line":12,"column":12}},"type":"Identifier","name":"arr"}}}]}},"stack":[{"name":"first","arguments":[[1,2,3,4,5]],"node":{"loc":{"start":{"line":15,"column":0},"end":{"line":15,"column":18}},"type":"CallExpression","callee":{"loc":{"start":{"line":15,"column":0},"end":{"line":15,"column":5}},"type":"Identifier","name":"first"},"arguments":[{"loc":{"start":{"line":15,"column":6},"end":{"line":15,"column":17}},"type":"ArrayExpression","elements":[{"loc":{"start":{"line":15,"column":7},"end":{"line":15,"column":8}},"type":"Literal","value":1,"raw":"1"},{"loc":{"start":{"line":15,"column":9},"end":{"line":15,"column":10}},"type":"Literal","value":2,"raw":"2"},{"loc":{"start":{"line":15,"column":11},"end":{"line":15,"column":12}},"type":"Literal","value":3,"raw":"3"},{"loc":{"start":{"line":15,"column":13},"end":{"line":15,"column":14}},"type":"Literal","value":4,"raw":"4"},{"loc":{"start":{"line":15,"column":15},"end":{"line":15,"column":16}},"type":"Literal","value":5,"raw":"5"}]}]}}]}`;
  runner = JSON.parse(runner);
  runner.active = runner;
  console.log(runner);

};
updateCode();

var runCode = function() {

};

var insertFrame = function(txt) {
  var $frame = $('<div class="frame">'+txt+'</div>');
  $('#stack').append($frame.hide());
  $frame.show('slide', {direction:'down'})
  return $frame;
};

var removeFrame = function() {
  $('.frame:last-of-type').hide('slide',{direction:'down'},function() {
    $(this).remove();
  });
};

var highlightLine = function(line,end) {
  var $lines = $('.line');
  $lines.removeClass('active-line')
  if (line === void 0) return;
  if (end === void 0) {
    $($lines[line]).addClass('active-line');
  } else {
    while (line<end+1) {
      $($lines[line]).addClass('active-line');
      line++;
    }
  }
}

var stepForward = function() {
  var cur = -1;
  var exec = runner.active.highlight;
  return function() {
    if (cur>-1) highlightLine.apply(null,exec[cur]);
    if (cur+1===exec.length) cur = -1;
    if (cur+1<exec.length) highlightLine.apply(null,exec[++cur]);
  };
};

var removeFrames = function() {
  setTimeout(function self(n) {
    if (n!==undefined) {
      return function() {
        removeFrame();
        if (n<3) {
          setTimeout(self(n+1),1000);
        }
      };
    } else {
      removeFrame();
      setTimeout(self(1),1000);
    }
  },1000);
};

var addFrames = function() {
  setTimeout(function self(n) {
    if (n!==undefined) {
      return function() {
        insertFrame('New frame '+n);
        if (n<3) {
          setTimeout(self(n+1),1000);
        }
      };
    } else  {
      insertFrame('New Frame');
      setTimeout(self(1),1000);
    }
  },200);
};

$('#add').click(stepForward());

var flag = false;
$('#remove').click(function() {
  highlightLine();
  var test = $('.line')[14];
  var pos  = getPosition(test);
  var npos = getPosition($('.frame:last-of-type'));
  insertFrame($(test).text());
  npos.top -= (npos.height+10);
  $(test).clone().appendTo('pre').css({
    'position':'absolute',
    'top':pos.top,
    'left':pos.left,
    'color':'#0f0',
    'width':'2px',
    'background':'#ccc',
    'text-align':'center',
    'background':'#173',
  }).animate({
    'top':npos.top,
    'left':npos.left,
    width:npos.width,
    height:npos.height,
  },{complete:function(){this.remove();}});
});

// https://stackoverflow.com/questions/3930391/getting-absolute-position-of-an-element-relative-to-browser
function getPosition(el) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  } else {
    el = $(el)[0];
  }
  var left = 0;
  var top = 0;
  var findPos = function(el) {
    left += el.offsetLeft;
    top += el.offsetTop;
    if (el.offsetParent) {
      findPos(el.offsetParent);
    }
  }
  findPos(el);
  return {top:top,left:left,width:el.offsetWidth,height:el.offsetHeight};
}

$('#update').click(function() {
  $('#add').off('click');
  updateCode();
  $('#add').click(stepForward());
});
