/**
 *  jQuery Html to JSON Plugin
 *  http://github.com/wzshiming/jquery.html2json.js/
 *
 *  (c) http://github.com/wzshiming/
 *  MIT licensed
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof module.exports === 'object') {
    // CommonJS
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  "use strict";

  function toArray(h) {
    if (!h) {
      return null;
    }
    var r = [];
    for (var i = 0; i != h.length; i++) {
      var v = h[i];
      if (v) {
        r.push(v);
      }
    }
    return r.length ? r : null;
  }


  function html2json(h) {
    if (!h) {
      return null;
    }
    if (h.length) {
      var r = [];
      for (var i = 0; i != h.length; i++) {
        var v = h[i];
        var d = html2json(v);
        if (d) {
          r.push(d);
        }
      }
      return r.length ? r : null;
    }
    var o = {};
    if (h.src) {
      o.src = h.src;
    }
    if (h.innerHTML == h.textContent && h.textContent) {
      o.textContent = h.textContent;
    }
    var n = html2json(h.childNodes);
    if (n) {
      o.childNodes = n;
    }
    var l = toArray(h.classList);
    if (l) {
      o.classList = toArray(h.classList);
    }
    if (h.localName) {
      o.localName = h.localName;
    }

    return o.textContent || o.childNodes || o.src ? o : null;
  }

  $.extend({
    html2json: function(html) {
      return html2json($(html));
    }
  });

  $.fn.html2json = function() {
    return html2json(this);
  };
}));