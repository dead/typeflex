import { YGConfig } from "./ygconfig";
import { YGNode } from "./ygnode";

import {
    YGNodeStyleSetPositionType,
    YGConfigNew,
    YGNodeNewWithConfig,
    YGNodeStyleSetWidth,
    YGNodeStyleSetHeight,
    YGNodeStyleSetPosition,
    YGNodeInsertChild,
    YGNodeCalculateLayout,
    YGNodeLayoutGetLeft,
    YGNodeLayoutGetTop,
    YGNodeLayoutGetWidth,
    YGNodeLayoutGetHeight,
    YGNodeFreeRecursive,
    YGConfigFree,
    YGUndefined,
    YGNodeStyleSetJustifyContent,
    YGNodeStyleSetAlignItems,
    YGNodeStyleSetFlexGrow,
    YGNodeStyleSetMinWidth,
    YGNodeStyleSetMaxWidth
} from "./yoga"

import {
    YGPositionType,
    YGEdge,
    YGDirection,
    YGAlign,
    YGJustify
} from "./enums"


function ASSERT_FLOAT_EQ(x: number, y: number) {
    console.log(x, y)
    console.assert(x === y)
}

// const config = YGConfigNew();

// const root = YGNodeNewWithConfig(config);
// YGNodeStyleSetJustifyContent(root, YGJustify.Center);
// YGNodeStyleSetAlignItems(root, YGAlign.Center);
// YGNodeStyleSetFlexGrow(root, 1);
// YGNodeStyleSetWidth(root, 110);
// YGNodeStyleSetHeight(root, 100);

// const root_child0 = YGNodeNewWithConfig(config);
// YGNodeStyleSetPositionType(root_child0, YGPositionType.Absolute);
// YGNodeStyleSetWidth(root_child0, 60);
// YGNodeStyleSetHeight(root_child0, 40);
// YGNodeInsertChild(root, root_child0, 0);
// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(110, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

// ASSERT_FLOAT_EQ(25, YGNodeLayoutGetLeft(root_child0));
// ASSERT_FLOAT_EQ(30, YGNodeLayoutGetTop(root_child0));
// ASSERT_FLOAT_EQ(60, YGNodeLayoutGetWidth(root_child0));
// ASSERT_FLOAT_EQ(40, YGNodeLayoutGetHeight(root_child0));

// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.RTL);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(110, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

// ASSERT_FLOAT_EQ(25, YGNodeLayoutGetLeft(root_child0));
// ASSERT_FLOAT_EQ(30, YGNodeLayoutGetTop(root_child0));
// ASSERT_FLOAT_EQ(60, YGNodeLayoutGetWidth(root_child0));
// ASSERT_FLOAT_EQ(40, YGNodeLayoutGetHeight(root_child0));

// YGNodeFreeRecursive(root);

// YGConfigFree(config);

// const config = YGConfigNew();

// const root = YGNodeNewWithConfig(config);
// YGNodeStyleSetWidth(root, 50);
// YGNodeStyleSetMinWidth(root, 100);
// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root));

// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.RTL);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root));

// YGNodeFreeRecursive(root);

//max_width_overrides_width
const config = YGConfigNew();

const root = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root, 200);
YGNodeStyleSetMaxWidth(root, 100);
YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root));

YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.RTL);

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root));

YGNodeFreeRecursive(root);

YGConfigFree(config);

YGConfigFree(config);