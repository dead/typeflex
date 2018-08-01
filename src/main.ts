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
    YGNodeStyleSetMaxWidth,
    YGNodeStyleSetFlexBasis,
    YGNodeStyleSetMinHeight,
    YGNodeStyleSetFlexWrap,
    YGNodeSetContext
} from "./yoga"

import {
    YGPositionType,
    YGEdge,
    YGDirection,
    YGAlign,
    YGJustify,
    YGWrap
} from "./enums"


function ASSERT_FLOAT_EQ(x: number, y: number) {
    console.log(x, y)
    console.assert(x === y)
}

// min_height
// const config = YGConfigNew();

// const root = YGNodeNewWithConfig(config);
// YGNodeStyleSetWidth(root, 100);
// YGNodeStyleSetHeight(root, 100);

// const root_child0 = YGNodeNewWithConfig(config);
// YGNodeStyleSetFlexGrow(root_child0, 1);
// YGNodeStyleSetMinHeight(root_child0, 60);
// YGNodeInsertChild(root, root_child0, 0);

// const root_child1 = YGNodeNewWithConfig(config);
// YGNodeStyleSetFlexGrow(root_child1, 1);
// YGNodeInsertChild(root, root_child1, 1);
// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child0));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child0));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root_child0));
// ASSERT_FLOAT_EQ(80, YGNodeLayoutGetHeight(root_child0));

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child1));
// ASSERT_FLOAT_EQ(80, YGNodeLayoutGetTop(root_child1));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root_child1));
// ASSERT_FLOAT_EQ(20, YGNodeLayoutGetHeight(root_child1));

// align_content_flex_start_without_height_on_children
const config = YGConfigNew();

const root = YGNodeNewWithConfig(config);
YGNodeStyleSetFlexWrap(root, YGWrap.Wrap);
YGNodeStyleSetWidth(root, 100);
YGNodeStyleSetHeight(root, 100);

const root_child0 = YGNodeNewWithConfig(config);
YGNodeSetContext(root_child0, 'esse');
YGNodeStyleSetWidth(root_child0, 50);
YGNodeInsertChild(root, root_child0, 0);

const root_child1 = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root_child1, 50);
YGNodeStyleSetHeight(root_child1, 10);
YGNodeInsertChild(root, root_child1, 1);

const root_child2 = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root_child2, 50);
YGNodeInsertChild(root, root_child2, 2);

const root_child3 = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root_child3, 50);
YGNodeStyleSetHeight(root_child3, 10);
YGNodeInsertChild(root, root_child3, 3);

const  root_child4 = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root_child4, 50);
YGNodeInsertChild(root, root_child4, 4);
YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child0));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child0));
ASSERT_FLOAT_EQ(50, YGNodeLayoutGetWidth(root_child0));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root_child0));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child1));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child1));
ASSERT_FLOAT_EQ(50, YGNodeLayoutGetWidth(root_child1));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child1));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child2));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child2));
ASSERT_FLOAT_EQ(50, YGNodeLayoutGetWidth(root_child2));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root_child2));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child3));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child3));
ASSERT_FLOAT_EQ(50, YGNodeLayoutGetWidth(root_child3));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child3));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child4));
ASSERT_FLOAT_EQ(20, YGNodeLayoutGetTop(root_child4));
ASSERT_FLOAT_EQ(50, YGNodeLayoutGetWidth(root_child4));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetHeight(root_child4));