/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// upstream: https://github.com/facebook/yoga/blob/342aebe1d73e5770a1862b6a94c6b877c1439a9b/javascript/tests/Facebook.Yoga/YGMeasureCacheTest.js

var Yoga = Yoga || require("../../dist/Yoga.js");

it("measure_once_single_flexible_child", function () {
  var root = Yoga.Node.create();
  root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
  root.setAlignItems(Yoga.ALIGN_FLEX_START);
  root.setWidth(100);
  root.setHeight(100);

  var measureCounter = getMeasureCounterMax(Yoga);

  var root_child0 = Yoga.Node.create();
  root_child0.setMeasureFunc(measureCounter.inc);
  root_child0.setFlexGrow(1);
  root.insertChild(root_child0, 0);

  root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

  console.assert(1 === measureCounter.get(), "1 === measureCounter.get()");

  if (typeof root !== "undefined")
    root.freeRecursive();

  (typeof gc !== "undefined") && gc();
  // TODO Add event support in js and check instace allocation and de allocation using that
});
