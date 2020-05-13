!(function(win, doc) {
  const 
    s = document.getElementById("static-js"),
    l = document.getElementById("execute"), 
    d = document.querySelector("#console code"), 
    u = document.getElementById("reset")

  let e;

  function execute_js() {
    let
      buffer = '',
      arrow = '=> '
			_log = function (s) {
				console.log(s);
				buffer = buffer + arrow + s + '\n';
			},
			_warn = function (s) {
				console.warn(s);
				buffer = buffer + arrow + s + '\n';
			},
			_error = function (s) {
				console.error(s);
				buffer = buffer + arrow + s + '\n';
			},
			_console = {
				trace: _log,
				debug: _log,
				log: _log,
				info: _log,
				warn: _warn,
				error: _error
      };
      
    !function(t) {
        d.classList.add("fade-in");
        try {
          // 可以使用 eval() 达到同样的效果但是没有使用它.
          const executeCode = '(function() {\n var console = _console; \n' + t + '\n})();'
          // @tips: methods1 
          // new Function(t)()
          eval(executeCode)
          d.textContent = buffer
        } catch (t) {
          d.textContent = "Error: " + t.message
        }
    }(e.getDoc().getValue())
  }

  const editor = {
    init() {
      this.initElement()
    },

    initElement() {
      const oEditor = document.getElementById("editor")
      s.dataset.height && document.getElementById("editor").classList.add(s.dataset.height);
      document.getElementById("static").classList.add("hidden");
      document.getElementById("live").classList.remove("hidden");

      this.initCodeMirror(oEditor, s.textContent)
      this.initEvent()
    },

    initCodeMirror(editorEl, codeStr) {
      e = CodeMirror(editorEl, {
        autofocus: !0,
        inputStyle: "contenteditable",
        lineNumbers: !0,
        mode: "javascript",
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        undoDepth: 5,
        indentWithTabs: true,
        tabSize: 2,
        tabindex: 0,
        value: codeStr,
        autoRefresh: !0
      })
    },

    initEvent() {
      l.addEventListener("click", function() {
        d.textContent = "",
        execute_js()
      });

      u.addEventListener("click", function() {
        window.location.reload()
      });

      d.addEventListener("animationend", function() {
        d.classList.remove("fade-in")
      })
    }
  }

  editor.init()
})(window, document);