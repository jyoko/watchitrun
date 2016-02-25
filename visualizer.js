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

  runner = WatchItRun(toRun);
  console.log(runner);

};
updateCode();

var runCode = function() {

};

var insertFrame = function(txt) {
  var $frame = $('<div class="frame">'+txt+'</div>');
  $('#stack').append($frame.hide());
  $frame.show('slide', {direction:'down'})
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

// TODO: fix this
var flag = false;
$('#remove').click(function() {
  highlightLine();
  highlightLine(3);
  /*
  flag? removeFrames():addFrames();
  flag=!flag;
  */
});

$('#update').click(function() {
  $('#add').off('click');
  updateCode();
  $('#add').click(stepForward());
});
