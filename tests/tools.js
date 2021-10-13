/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// upstream: https://github.com/facebook/yoga/blob/342aebe1d73e5770a1862b6a94c6b877c1439a9b/javascript/tests/tools.js

var target = typeof global !== 'undefined' ? global : window;

target.getMeasureCounter = function(Yoga, cb, staticWidth, staticHeight) {
  var counter = 0;

  return {
    inc: function(node, width, widthMode, height, heightMode) {
      counter += 1;

      return cb
        ? cb(width, widthMode, height, heightMode)
        : {width: staticWidth, height: staticHeight};
    },

    get: function() {
      return counter;
    },
  };
};

target.getMeasureCounterMax = function(Yoga) {
  return getMeasureCounter(Yoga, function(
    width,
    widthMode,
    height,
    heightMode,
  ) {
    var measuredWidth = widthMode === Yoga.MEASURE_MODE_UNDEFINED ? 10 : width;
    var measuredHeight =
      heightMode === Yoga.MEASURE_MODE_UNDEFINED ? 10 : height;

    return {width: measuredWidth, height: measuredHeight};
  });
};

target.getMeasureCounterMin = function(Yoga) {
  return getMeasureCounter(Yoga, function(
    width,
    widthMode,
    height,
    heightMode,
  ) {
    var measuredWidth =
      widthMode === Yoga.MEASURE_MODE_UNDEFINED ||
      (widthMode == Yoga.MEASURE_MODE_AT_MOST && width > 10)
        ? 10
        : width;
    var measuredHeight =
      heightMode === Yoga.MEASURE_MODE_UNDEFINED ||
      (heightMode == Yoga.MEASURE_MODE_AT_MOST && height > 10)
        ? 10
        : height;

    return {width: measuredWidth, height: measuredHeight};
  });
};

/**
 * deviation: Monkey-patch console.assert so execution stops and an error is thrown so
 * failed assertions in tests can be accurately reported to the runner.
 */

class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
  }
}

console.assert = function (value, message, ...optionalParams) {
  if (value) {
    return;
  }
  if (console.assert.useDebugger) {
    debugger;
  }
  const params = (optionalParams || []).join(" ");
  if (params) {
    message = (message || "") + " " + params;
  }
  throw new AssertionError(message || "");
};
