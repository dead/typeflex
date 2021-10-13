// upstream: https://github.com/facebook/yoga/blob/v1.19.0/javascript/sources/entry-common.js

import {
    YGAlign,
    YGDimension,
    YGDirection,
    YGDisplay,
    YGEdge,
    YGExperimentalFeature,
    YGFlexDirection,
    YGJustify,
    YGLogLevel,
    YGMeasureMode,
    YGNodeType,
    YGOverflow,
    YGPositionType,
    YGUnit,
    YGWrap,
} from './enums';

import {
    YGNodeCalculateLayout,
    YGNodeCopyStyle,
    YGNodeFree,
    YGNodeFreeRecursive,
    YGNodeStyleGetAlignContent,
    YGNodeStyleGetAlignItems,
    YGNodeStyleGetAlignSelf,
    YGNodeStyleGetAspectRatio,
    YGNodeStyleGetBorder,
    YGNodeGetChild,
    YGNodeGetChildCount,
    YGNodeLayoutGetBorder,
    YGNodeLayoutGetBottom,
    YGNodeLayoutGetHeight,
    YGNodeLayoutGetLeft,
    YGNodeLayoutGetRight,
    YGNodeLayoutGetTop,
    YGNodeLayoutGetWidth,
    YGNodeLayoutGetMargin,
    YGNodeLayoutGetPadding,
    YGNodeStyleGetDisplay,
    YGNodeStyleGetFlexBasis,
    YGNodeStyleGetFlexDirection,
    YGNodeStyleGetFlexGrow,
    YGNodeStyleGetFlexShrink,
    YGNodeStyleGetFlexWrap,
    YGNodeStyleGetHeight,
    YGNodeStyleGetJustifyContent,
    YGNodeStyleGetMargin,
    YGNodeStyleGetMaxHeight,
    YGNodeStyleGetMaxWidth,
    YGNodeStyleGetMinHeight,
    YGNodeStyleGetMinWidth,
    YGNodeStyleGetOverflow,
    YGNodeStyleGetPadding,
    YGNodeGetParent,
    YGNodeStyleGetPositionType,
    YGNodeStyleGetWidth,
    YGNodeInsertChild,
    YGNodeIsDirty,
    YGNodeMarkDirty,
    YGNodeRemoveChild,
    YGNodeReset,
    YGNodeStyleSetAlignContent,
    YGNodeStyleSetAlignItems,
    YGNodeStyleSetAlignSelf,
    YGNodeStyleSetAspectRatio,
    YGNodeStyleSetBorder,
    YGNodeStyleSetDisplay,
    YGNodeStyleSetFlex,
    YGNodeStyleSetFlexBasis,
    YGNodeStyleSetFlexBasisPercent,
    YGNodeStyleSetFlexDirection,
    YGNodeStyleSetFlexGrow,
    YGNodeStyleSetFlexShrink,
    YGNodeStyleSetFlexWrap,
    YGNodeStyleSetHeight,
    YGNodeStyleSetHeightAuto,
    YGNodeStyleSetHeightPercent,
    YGNodeStyleSetJustifyContent,
    YGNodeStyleSetMargin,
    YGNodeStyleSetMarginAuto,
    YGNodeStyleSetMarginPercent,
    YGNodeStyleSetMaxHeight,
    YGNodeStyleSetMaxHeightPercent,
    YGNodeStyleSetMaxWidth,
    YGNodeStyleSetMaxWidthPercent,
    YGNodeSetMeasureFunc,
    YGNodeStyleSetMinHeight,
    YGNodeStyleSetMinHeightPercent,
    YGNodeStyleSetMinWidth,
    YGNodeStyleSetMinWidthPercent,
    YGNodeStyleSetOverflow,
    YGNodeStyleSetPadding,
    YGNodeStyleSetPaddingPercent,
    YGNodeStyleSetPositionType,
    YGNodeStyleSetPositionPercent,
    YGNodeStyleSetWidth,
    YGNodeStyleSetWidthAuto,
    YGNodeStyleSetWidthPercent,
    YGNodeGetContext,
    YGNodeSetContext,
    YGConfigFree,
    YGConfigSetExperimentalFeatureEnabled,
    YGConfigSetPointScaleFactor,
    YGConfigIsExperimentalFeatureEnabled,
    YGNodeStyleGetPosition,
    YGConfigNew,
    YGNodeNewWithConfig,
    YGNodeNew,
    YGNodeStyleSetPosition,
    YGNodeSetIsReferenceBaseline,
    YGNodeIsReferenceBaseline,
    YGDirtiedFunc,
    YGNodeSetDirtiedFunc,
    YGNodeGetDirtiedFunc,
    YGMeasureFunc,
} from './yoga';

import { YGNode } from './ygnode';
import { YGValue } from './ygvalue';
import { YGConfig } from './ygconfig';
import { YGFloatSanitize } from './utils';

export const ALIGN_AUTO = YGAlign.Auto;
export const ALIGN_FLEX_START = YGAlign.FlexStart;
export const ALIGN_CENTER = YGAlign.Center;
export const ALIGN_FLEX_END = YGAlign.FlexEnd;
export const ALIGN_STRETCH = YGAlign.Stretch;
export const ALIGN_BASELINE = YGAlign.Baseline;
export const ALIGN_SPACE_BETWEEN = YGAlign.SpaceBetween;
export const ALIGN_SPACE_AROUND = YGAlign.SpaceAround;
export const DIMENSION_WIDTH = YGDimension.Width;
export const DIMENSION_HEIGHT = YGDimension.Height;
export const DIRECTION_INHERIT = YGDirection.Inherit;
export const DIRECTION_LTR = YGDirection.LTR;
export const DIRECTION_RTL = YGDirection.RTL;
export const DISPLAY_FLEX = YGDisplay.Flex;
export const DISPLAY_NONE = YGDisplay.None;
export const EDGE_LEFT = YGEdge.Left;
export const EDGE_TOP = YGEdge.Top;
export const EDGE_RIGHT = YGEdge.Right;
export const EDGE_BOTTOM = YGEdge.Bottom;
export const EDGE_START = YGEdge.Start;
export const EDGE_END = YGEdge.End;
export const EDGE_HORIZONTAL = YGEdge.Horizontal;
export const EDGE_VERTICAL = YGEdge.Vertical;
export const EDGE_ALL = YGEdge.All;
export const EXPERIMENTALFEATURE_WEBFLEXBASIS = YGExperimentalFeature.WebFlexBasis;
export const FLEX_DIRECTION_COLUMN = YGFlexDirection.Column;
export const FLEX_DIRECTION_COLUMN_REVERSE = YGFlexDirection.ColumnReverse;
export const FLEX_DIRECTION_ROW = YGFlexDirection.Row;
export const FLEX_DIRECTION_ROW_REVERSE = YGFlexDirection.RowReverse;
export const JUSTIFY_FLEX_START = YGJustify.FlexStart;
export const JUSTIFY_CENTER = YGJustify.Center;
export const JUSTIFY_FLEX_END = YGJustify.FlexEnd;
export const JUSTIFY_SPACE_BETWEEN = YGJustify.SpaceBetween;
export const JUSTIFY_SPACE_AROUND = YGJustify.SpaceAround;
export const JUSTIFY_SPACE_EVENLY = YGJustify.SpaceEvenly;
export const LOGLEVEL_ERROR = YGLogLevel.Error;
export const LOGLEVEL_WARN = YGLogLevel.Warn;
export const LOGLEVEL_INFO = YGLogLevel.Info;
export const LOGLEVEL_DEBUG = YGLogLevel.Debug;
export const LOGLEVEL_VERBOSE = YGLogLevel.Verbose;
export const LOGLEVEL_FATAL = YGLogLevel.Fatal;
export const MEASURE_MODE_UNDEFINED = YGMeasureMode.Undefined;
export const MEASURE_MODE_EXACTLY = YGMeasureMode.Exactly;
export const MEASURE_MODE_AT_MOST = YGMeasureMode.AtMost;
export const NODE_TYPE_DEFAULT = YGNodeType.Default;
export const NODE_TYPE_TEXT = YGNodeType.Text;
export const OVERFLOW_VISIBLE = YGOverflow.Visible;
export const OVERFLOW_HIDDEN = YGOverflow.Hidden;
export const OVERFLOW_SCROLL = YGOverflow.Scroll;
export const POSITION_TYPE_RELATIVE = YGPositionType.Relative;
export const POSITION_TYPE_ABSOLUTE = YGPositionType.Absolute;
export const UNIT_UNDEFINED = YGUnit.Undefined;
export const UNIT_POINT = YGUnit.Point;
export const UNIT_PERCENT = YGUnit.Percent;
export const UNIT_AUTO = YGUnit.Auto;
export const WRAP_NO_WRAP = YGWrap.NoWrap;
export const WRAP_WRAP = YGWrap.Wrap;
export const WRAP_WRAP_REVERSE = YGWrap.WrapReverse;
export const UNDEFINED: number = undefined;

export class Layout {
    public left: number;
    public right: number;
    public bottom: number;
    public top: number;
    public width: number;
    public height: number;
}

export class Size {
    public width: number;
    public height: number;

    constructor(width?: number, height?: number) {
        if (width) {
            this.width = width;
            this.height = height;
        } else {
            this.width = 0;
            this.height = 0;
        }
    }

    static fromJS(obj: { width: number; height: number }): Size {
        return new Size(obj.width, obj.height);
    }
}

export class Value {
    public unit: number;
    public value: number;

    constructor(unit?: number, value?: number) {
        if (unit) {
            this.unit = unit;
            this.value = value;
        } else {
            this.unit = YGUnit.Undefined;
            this.value = 0;
        }
    }
}

export class Config {
    public config: YGConfig;

    static create(): Config {
        return new Config();
    }

    constructor() {
        this.config = YGConfigNew();
    }

    free(): void {
        YGConfigFree(this.config);
    }

    setExperimentalFeatureEnabled(feature: number, enabled: boolean): void {
        YGConfigSetExperimentalFeatureEnabled(this.config, feature, enabled);
    }

    setPointScaleFactor(pixelsInPoint: number): void {
        YGConfigSetPointScaleFactor(this.config, pixelsInPoint);
    }

    isExperimentalFeatureEnabled(feature: number): boolean {
        return YGConfigIsExperimentalFeatureEnabled(this.config, feature);
    }
}

function fromYGNode(node: YGNode): Node {
    return YGNodeGetContext(node) as Node;
}

function fromYGValue(val: YGValue): Value {
    return new Value(val.unit, val.value);
}

export class Node {
    public node: YGNode;

    static create(config?: Config): Node {
        if (config) {
            return new Node(config);
        } else {
            return new Node();
        }
    }

    static createDefault(): Node {
        return new Node(undefined);
    }

    static createWithConfig(config: Config): Node {
        return new Node(config);
    }

    constructor(config?: Config) {
        if (!config) {
            this.node = YGNodeNew();
        } else {
            this.node = YGNodeNewWithConfig(config.config);
        }

        YGNodeSetContext(this.node, this);
    }

    calculateLayout(width?: number, height?: number, direction?: YGDirection): void {
        YGNodeCalculateLayout(this.node, width, height, direction);
    }

    copyStyle(node: YGNode): void {
        YGNodeCopyStyle(this.node, node);
    }

    free(): void {
        YGNodeFree(this.node);
    }

    freeRecursive(): void {
        YGNodeFreeRecursive(this.node);
    }

    getAlignContent(): YGAlign {
        return YGNodeStyleGetAlignContent(this.node);
    }

    getAlignItems(): YGAlign {
        return YGNodeStyleGetAlignItems(this.node);
    }

    getAlignSelf(): YGAlign {
        return YGNodeStyleGetAlignSelf(this.node);
    }

    getAspectRatio(): number {
        return YGNodeStyleGetAspectRatio(this.node);
    }

    getBorder(edge: YGEdge): number {
        return YGNodeStyleGetBorder(this.node, edge);
    }

    getChild(index: number): Node {
        return fromYGNode(YGNodeGetChild(this.node, index));
    }

    getChildCount(): number {
        return YGNodeGetChildCount(this.node);
    }

    getComputedBorder(edge: YGEdge): number {
        return YGNodeLayoutGetBorder(this.node, edge);
    }

    getComputedBottom(): number {
        return YGNodeLayoutGetBottom(this.node);
    }

    getComputedHeight(): number {
        return YGFloatSanitize(YGNodeLayoutGetHeight(this.node));
    }

    getComputedLayout(): Layout {
        const layout: Layout = new Layout();
        layout.left = YGNodeLayoutGetLeft(this.node);
        layout.right = YGNodeLayoutGetRight(this.node);
        layout.top = YGNodeLayoutGetTop(this.node);
        layout.bottom = YGNodeLayoutGetBottom(this.node);
        layout.width = YGNodeLayoutGetWidth(this.node);
        layout.height = YGNodeLayoutGetHeight(this.node);
        return layout;
    }

    getComputedLeft(): number {
        return YGFloatSanitize(YGNodeLayoutGetLeft(this.node));
    }

    getComputedMargin(edge: YGEdge): number {
        return YGFloatSanitize(YGNodeLayoutGetMargin(this.node, edge));
    }

    getComputedPadding(edge: YGEdge): number {
        return YGFloatSanitize(YGNodeLayoutGetPadding(this.node, edge));
    }

    getComputedRight(): number {
        return YGFloatSanitize(YGNodeLayoutGetRight(this.node));
    }

    getComputedTop(): number {
        return YGFloatSanitize(YGNodeLayoutGetTop(this.node));
    }

    getComputedWidth(): number {
        return YGFloatSanitize(YGNodeLayoutGetWidth(this.node));
    }

    getDisplay(): YGDisplay {
        return YGNodeStyleGetDisplay(this.node);
    }

    getFlexBasis(): Value {
        return fromYGValue(YGNodeStyleGetFlexBasis(this.node));
    }

    getFlexDirection(): YGFlexDirection {
        return YGNodeStyleGetFlexDirection(this.node);
    }

    getFlexGrow(): number {
        return YGNodeStyleGetFlexGrow(this.node);
    }

    getFlexShrink(): number {
        return YGNodeStyleGetFlexShrink(this.node);
    }

    getFlexWrap(): YGWrap {
        return YGNodeStyleGetFlexWrap(this.node);
    }

    getHeight(): Value {
        return fromYGValue(YGNodeStyleGetHeight(this.node));
    }

    getJustifyContent(): YGJustify {
        return YGNodeStyleGetJustifyContent(this.node);
    }

    getMargin(edge: YGEdge): Value {
        return fromYGValue(YGNodeStyleGetMargin(this.node, edge));
    }

    getMaxHeight(): Value {
        return fromYGValue(YGNodeStyleGetMaxHeight(this.node));
    }

    getMaxWidth(): Value {
        return fromYGValue(YGNodeStyleGetMaxWidth(this.node));
    }

    getMinHeight(): Value {
        return fromYGValue(YGNodeStyleGetMinHeight(this.node));
    }

    getMinWidth(): Value {
        return fromYGValue(YGNodeStyleGetMinWidth(this.node));
    }

    getOverflow(): YGOverflow {
        return YGNodeStyleGetOverflow(this.node);
    }

    getPadding(edge: YGEdge): Value {
        return fromYGValue(YGNodeStyleGetPadding(this.node, edge));
    }

    getParent(): Node {
        const parent: YGNode = YGNodeGetParent(this.node);
        if (!parent) {
            return undefined;
        }

        return fromYGNode(parent);
    }

    getPosition(edge: YGEdge): Value {
        return fromYGValue(YGNodeStyleGetPosition(this.node, edge));
    }

    getPositionType(): YGPositionType {
        return YGNodeStyleGetPositionType(this.node);
    }

    getWidth(): Value {
        return fromYGValue(YGNodeStyleGetWidth(this.node));
    }

    getDirtied(): YGDirtiedFunc {
        return YGNodeGetDirtiedFunc(this.node);
    }

    insertChild(child: Node, index: number): void {
        YGNodeInsertChild(this.node, child.node, index);
    }

    isDirty(): boolean {
        return YGNodeIsDirty(this.node);
    }

    markDirty(): void {
        YGNodeMarkDirty(this.node);
    }

    removeChild(child: Node): void {
        YGNodeRemoveChild(this.node, child.node);
    }

    reset(): void {
        // m_measureFunc.reset(nullptr);
        YGNodeReset(this.node);
    }

    setAlignContent(alignContent: YGAlign): void {
        YGNodeStyleSetAlignContent(this.node, alignContent);
    }

    setAlignItems(alignItems: YGAlign): void {
        YGNodeStyleSetAlignItems(this.node, alignItems);
    }

    setAlignSelf(alignSelf: YGAlign): void {
        YGNodeStyleSetAlignSelf(this.node, alignSelf);
    }

    setAspectRatio(aspectRatio: number): void {
        YGNodeStyleSetAspectRatio(this.node, aspectRatio);
    }

    setBorder(edge: YGEdge, borderWidth: number): void {
        YGNodeStyleSetBorder(this.node, edge, borderWidth);
    }

    setDisplay(display: YGDisplay): void {
        YGNodeStyleSetDisplay(this.node, display);
    }

    setFlex(flex: number): void {
        YGNodeStyleSetFlex(this.node, flex);
    }

    setFlexBasis(flexBasis: number | string): void {
        if (typeof flexBasis === 'string') {
            if (flexBasis[flexBasis.length - 1] === '%') {
                this.setFlexBasisPercent(parseFloat(flexBasis));
            } else {
                throw new Error('Invalid input type');
            }
        } else {
            YGNodeStyleSetFlexBasis(this.node, flexBasis as number);
        }
    }

    setFlexBasisPercent(flexBasis: number): void {
        YGNodeStyleSetFlexBasisPercent(this.node, flexBasis);
    }

    setFlexDirection(flexDirection: YGFlexDirection): void {
        YGNodeStyleSetFlexDirection(this.node, flexDirection);
    }

    setFlexGrow(flexGrow: number): void {
        YGNodeStyleSetFlexGrow(this.node, flexGrow);
    }

    setFlexShrink(flexShrink: number): void {
        YGNodeStyleSetFlexShrink(this.node, flexShrink);
    }

    setFlexWrap(flexWrap: YGWrap): void {
        YGNodeStyleSetFlexWrap(this.node, flexWrap);
    }

    setHeight(height: number | string): void {
        if (typeof height === 'string') {
            if (height === 'auto') {
                this.setHeightAuto();
            } else if (height[height.length - 1] === '%') {
                this.setHeightPercent(parseFloat(height));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetHeight(this.node, height as number);
        }
    }

    setHeightAuto(): void {
        YGNodeStyleSetHeightAuto(this.node);
    }

    setHeightPercent(height: number): void {
        YGNodeStyleSetHeightPercent(this.node, height);
    }

    setJustifyContent(justifyContent: YGJustify): void {
        YGNodeStyleSetJustifyContent(this.node, justifyContent);
    }

    setMargin(edge: YGEdge, margin: number | string): void {
        if (typeof margin === 'string') {
            if (margin === 'auto') {
                this.setMarginAuto(edge);
            } else if (margin[margin.length - 1] === '%') {
                this.setMarginPercent(edge, parseFloat(margin));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetMargin(this.node, edge, margin);
        }
    }

    setMarginAuto(edge: YGEdge): void {
        YGNodeStyleSetMarginAuto(this.node, edge);
    }

    setMarginPercent(edge: YGEdge, margin: number): void {
        YGNodeStyleSetMarginPercent(this.node, edge, margin);
    }

    setMaxHeight(maxHeight: number | string): void {
        if (typeof maxHeight === 'string') {
            if (maxHeight[maxHeight.length - 1] === '%') {
                this.setMaxHeightPercent(parseFloat(maxHeight));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetMaxHeight(this.node, maxHeight as number);
        }
    }

    setMaxHeightPercent(maxHeight: number): void {
        YGNodeStyleSetMaxHeightPercent(this.node, maxHeight);
    }

    setMaxWidth(maxWidth: number | string): void {
        if (typeof maxWidth === 'string') {
            if (maxWidth[maxWidth.length - 1] === '%') {
                this.setMaxWidthPercent(parseFloat(maxWidth));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetMaxWidth(this.node, maxWidth as number);
        }
    }

    setMaxWidthPercent(maxWidth: number): void {
        YGNodeStyleSetMaxWidthPercent(this.node, maxWidth);
    }

    setMeasureFunc(measureFunc: YGMeasureFunc): void {
        if (measureFunc == null) {
            this.unsetMeasureFunc();
        } else {
            YGNodeSetMeasureFunc(this.node, measureFunc);
        }
    }

    unsetMeasureFunc(): void {
        YGNodeSetMeasureFunc(this.node, null);
    }

    setMinHeight(minHeight: number | string): void {
        if (typeof minHeight === 'string') {
            if (minHeight[minHeight.length - 1] === '%') {
                this.setMinHeightPercent(parseFloat(minHeight));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetMinHeight(this.node, minHeight as number);
        }
    }

    setMinHeightPercent(minHeight: number): void {
        YGNodeStyleSetMinHeightPercent(this.node, minHeight);
    }

    setMinWidth(minWidth: number | string): void {
        if (typeof minWidth === 'string') {
            if (minWidth[minWidth.length - 1] === '%') {
                this.setMinWidthPercent(parseFloat(minWidth));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetMinWidth(this.node, minWidth as number);
        }
    }

    setMinWidthPercent(minWidth: number): void {
        YGNodeStyleSetMinWidthPercent(this.node, minWidth);
    }

    setOverflow(overflow: YGOverflow): void {
        YGNodeStyleSetOverflow(this.node, overflow);
    }

    setPadding(edge: YGEdge, padding: number | string): void {
        if (typeof padding === 'string') {
            if (padding[padding.length - 1] === '%') {
                this.setPaddingPercent(edge, parseFloat(padding));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetPadding(this.node, edge, padding as number);
        }
    }

    setPaddingPercent(edge: YGEdge, padding: number): void {
        YGNodeStyleSetPaddingPercent(this.node, edge, padding);
    }

    setPosition(edge: YGEdge, position: number | string): void {
        if (typeof position === 'string') {
            if (position[position.length - 1] === '%') {
                this.setPositionPercent(edge, parseFloat(position));
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetPosition(this.node, edge, position as number);
        }
    }

    setPositionPercent(edge: YGEdge, position: number): void {
        YGNodeStyleSetPositionPercent(this.node, edge, position);
    }

    setPositionType(positionType: YGPositionType): void {
        YGNodeStyleSetPositionType(this.node, positionType);
    }

    setWidth(width: number | string): void {
        if (typeof width === 'string') {
            if (width[width.length - 1] === '%') {
                this.setWidthPercent(parseFloat(width));
            } else if (width === 'auto') {
                this.setWidthAuto();
            } else {
                throw new Error('Invalid input type.');
            }
        } else {
            YGNodeStyleSetWidth(this.node, width as number);
        }
    }

    setWidthAuto(): void {
        YGNodeStyleSetWidthAuto(this.node);
    }

    setWidthPercent(width: number): void {
        YGNodeStyleSetWidthPercent(this.node, width);
    }

    setDirtiedFunc(dirtiedFunc: YGDirtiedFunc): void {
        return YGNodeSetDirtiedFunc(this.node, dirtiedFunc);
    }

    unsetMeasureFun(): void {
        YGNodeSetMeasureFunc(this.node, undefined);
    }

    isReferenceBaseline(): boolean {
        return YGNodeIsReferenceBaseline(this.node);
    }

    setIsReferenceBaseline(isReferenceBaseline: boolean): void {
        YGNodeSetIsReferenceBaseline(this.node, isReferenceBaseline);
    }
}
