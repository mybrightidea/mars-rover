(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jRover.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    module.exports = global.document
      ? factory(global, true)
      : function(w) {
          if (!w.document) {
            throw new Error("jRover requires a window with a document");
          }
          return factory(w);
        };
  } else {
    // factory(window, noGlobal = undefined)
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var jRover = function(selector, context) {
    // The jRover object is actually just the init constructor 'enhanced'
    // Need init if jRover is called (just allow error to be thrown if not included)
    return new jRover.fn.init(selector, context);
  };

  jRover.fn = {
    constructor: jRover,
    // The default length of a jRover object is 0
    length: 0,
    version: function() {
      return 1.1;
    }
  };
  jRover.fn.init = function(selector, context, root) {
    return this;
  };
  if (!noGlobal) {
    console.log("clog");
    window.jRover = jRover;
  }
  return jRover;
});
