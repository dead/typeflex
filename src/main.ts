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
    YGUndefined
} from "./yoga"

import {
    YGPositionType,
    YGEdge,
    YGDirection
} from "./enums"


// function ASSERT_FLOAT_EQ(x: number, y: number) {
//     console.log(x, y)
//     console.assert(x === y)
// }

// const config: YGConfig = YGConfigNew();
// const root: YGNode = YGNodeNewWithConfig(config);
// YGNodeStyleSetWidth(root, 100);
// YGNodeStyleSetHeight(root, 100);

// const root_child0: YGNode = YGNodeNewWithConfig(config);
// YGNodeStyleSetPositionType(root_child0, YGPositionType.Absolute);
// YGNodeStyleSetPosition(root_child0, YGEdge.Start, 10);
// YGNodeStyleSetPosition(root_child0, YGEdge.Top, 10);
// YGNodeStyleSetWidth(root_child0, 10);
// YGNodeStyleSetHeight(root_child0, 10);
// YGNodeInsertChild(root, root_child0, 0);
// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetLeft(root_child0));
// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child0));
// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetWidth(root_child0));
// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child0));

// YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.RTL);

// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
// ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
// ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

// ASSERT_FLOAT_EQ(80, YGNodeLayoutGetLeft(root_child0));
// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child0));
// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetWidth(root_child0));
// ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child0));

// YGNodeFreeRecursive(root);
// YGConfigFree(config);