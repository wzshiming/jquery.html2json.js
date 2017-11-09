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
  } else if (typeof exports === 'object') {
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


  function html2json(h, opt) {
    opt = opt || {
      reduce: true,
      classList: false,
      localName: false,
      mergeText: true
    };
    if (!h) {
      return null;
    }
    if (h.length) {
      var r = [];
      for (var i = 0; i != h.length; i++) {
        var v = h[i];
        var d = html2json(v, opt);
        if (!d) {
          continue;
        }
        if (opt.reduce && h.length == 1 && d.childNodes instanceof Array) {
          d = d.childNodes;
          for (var i0 = 0; i0 != d.length; i0++) {
            var v0 = d[i0];
            r.push(v0);
          }
        } else {
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
    var n = html2json(h.childNodes, opt);
    if (n) {
      o.childNodes = n;
    }
    if (opt.classList) {
      var l = toArray(h.classList);
      if (l) {
        o.classList = toArray(h.classList);
      }
    }
    if (opt.localName && h.localName) {
      o.localName = h.localName;
    }

    if (opt.mergeText && o.textContent) {
      return o.textContent;
    }

    return o.textContent || o.childNodes || o.src ? o : null;
  }


  $.extend({
    html2json: function(html, opt) {
      return html2json($(html), opt);
    }
  });

  $.fn.html2json = function(opt) {
    return html2json(this, opt);
  };
}));