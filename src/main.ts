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
    YGNodeStyleSetFlexBasis
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

// flex_basis_flex_grow_column
const config = YGConfigNew();

const root = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root, 100);
YGNodeStyleSetHeight(root, 100);

const root_child0 = YGNodeNewWithConfig(config);
YGNodeStyleSetFlexGrow(root_child0, 1);
YGNodeStyleSetFlexBasis(root_child0, 50);
YGNodeInsertChild(root, root_child0, 0);

const root_child1 = YGNodeNewWithConfig(config);
YGNodeStyleSetFlexGrow(root_child1, 1);
YGNodeInsertChild(root, root_child1, 1);
YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child0));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child0));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root_child0));
ASSERT_FLOAT_EQ(75, YGNodeLayoutGetHeight(root_child0));

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child1));
ASSERT_FLOAT_EQ(75, YGNodeLayoutGetTop(root_child1));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root_child1));
ASSERT_FLOAT_EQ(25, YGNodeLayoutGetHeight(root_child1));