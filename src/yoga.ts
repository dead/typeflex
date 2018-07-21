import {
    YGUnit,
    YGEdge,
    YGNodeType,
    YGFlexDirection,
    YGAlign,
    YGMeasureMode,
    YGLogLevel,
    YGDirection,
    YGJustify,
    YGPositionType,
    YGWrap,
    YGOverflow,
    YGDisplay,
    YGDimension,
    YGPrintOptions,
    YGExperimentalFeature,
    YGMeasureModeCount
} from "./enums";

import { YGNode } from "./ygnode";
import { YGConfig } from "./ygconfig";
import { YGLayout } from "./yglayout";
import { YGStyle } from "./ygstyle";
import { YGFloatOptional } from "./ygfloatoptional";

import {
    YGFloatSanitize,
    YGUnwrapFloatOptional,
    YGFlexDirectionIsColumn,
    YGResolveValue,
    YGFlexDirectionIsRow,
    YGFloatMax,
    YGResolveFlexDirection,
    YGFloatOptionalMax,
    YGFlexDirectionCross,
    YGFloatMin,
    YGCollectFlexItemsRowValues,
    YGFloatsEqual
} from "./utils";

import {
    YGValueUndefined,
    kDefaultFlexGrow,
    kWebDefaultFlexShrink,
    kDefaultFlexShrink,
    YGUndefined,
    pos,
    trailing,
    leading,
    YGCachedMeasurement,
    YG_MAX_CACHED_RESULT_COUNT
} from "./internal";

export class YGSize {
    public width: number;
    public height: number;
}

export class YGValue {
    public value: number|undefined;
    public unit: YGUnit;

    constructor(value: number|undefined, unit: YGUnit) {
        this.value = value;
        this.unit = unit;
    }
}

export interface YGPrintFunc { (node: YGNode): void };
export interface YGMeasureFunc { (node: YGNode, width: number, widthMode: YGMeasureMode, height: number, heightMode: YGMeasureMode): YGSize };
export interface YGBaselineFunc { (node: YGNode, width: number, height: number): number };
export interface YGDirtiedFunc { (node: YGNode): void };
export interface YGLogger { (config: YGConfig, node: YGNode, level: YGLogLevel, format: string, ...args: any[]): void };
export interface YGCloneNodeFunc { (oldNode: YGNode, owner: YGNode, childIndex: number): YGNode };

function YGDefaultLog(config: YGConfig, node: YGNode, level: YGLogLevel, format: string, ...args: any[]): void {
    switch (level) {
        case YGLogLevel.Error:
        case YGLogLevel.Fatal:
            return console.error(format, args);
        case YGLogLevel.Warn:
        case YGLogLevel.Info:
        case YGLogLevel.Debug:
        case YGLogLevel.Verbose:
        default:
            return console.log(format, args);
    }
}

export function YGFloatIsUndefined(value: number) {
    if (value === undefined) {
        return true;
    }

    return false;
}

export function YGComputedEdgeValue(edges: Array<YGValue>, edge: YGEdge, defaultValue: YGValue): YGValue {
    if (edges[edge].unit != YGUnit.Undefined) {
        return edges[edge];
    }

    if ((edge == YGEdge.Top || edge == YGEdge.Bottom) && edges[YGEdge.Vertical].unit != YGUnit.Undefined) {
        return edges[YGEdge.Vertical];
    }

    if ((edge == YGEdge.Left || edge == YGEdge.Right || edge == YGEdge.Start || edge == YGEdge.End) && edges[YGEdge.Horizontal].unit != YGUnit.Undefined) {
        return edges[YGEdge.Horizontal];
    }

    if (edges[YGEdge.All].unit != YGUnit.Undefined) {
        return edges[YGEdge.All];
    }

    if (edge == YGEdge.Start || edge == YGEdge.End) {
        return YGValueUndefined;
    }

    return defaultValue;
}

export function YGNodeGetContext(node: YGNode): any {
    return node.getContext();
}

export function YGNodeSetContext(node: YGNode, context: any): void {
    return node.setContext(context);
}

export function YGNodeGetMeasureFunc(node: YGNode): YGMeasureFunc {
    return node.getMeasure();
}

export function YGNodeSetMeasureFunc(node: YGNode, measureFunc: YGMeasureFunc): void {
    node.setMeasureFunc(measureFunc);
}

export function YGNodeGetBaselineFunc(node: YGNode): YGBaselineFunc {
    return node.getBaseline();
}

export function YGNodeSetBaselineFunc(node: YGNode, baselineFunc: YGBaselineFunc): void {
    node.setBaseLineFunc(baselineFunc);
}

export function YGNodeGetDirtiedFunc(node: YGNode): YGDirtiedFunc {
    return node.getDirtied();
}

export function YGNodeSetDirtiedFunc(node: YGNode, dirtiedFunc: YGDirtiedFunc) {
    node.setDirtiedFunc(dirtiedFunc);
}

export function YGNodeGetPrintFunc(node: YGNode): YGPrintFunc {
    return node.getPrintFunc();
}

export function YGNodeSetPrintFunc(node: YGNode, printFunc: YGPrintFunc): void {
    node.setPrintFunc(printFunc);
}

export function YGNodeGetHasNewLayout(node: YGNode): boolean {
    return node.getHasNewLayout();
}

export function YGNodeSetHasNewLayout(node: YGNode, hasNewLayout: boolean): void {
    node.setHasNewLayout(hasNewLayout);
}

export function YGNodeGetNodeType(node: YGNode): YGNodeType {
    return node.getNodeType();
}

export function YGNodeSetNodeType(node: YGNode, nodeType: YGNodeType): void {
    node.setNodeType(nodeType);
}

export function YGNodeIsDirty(node: YGNode): boolean {
    return node.isDirty();
}

export function YGNodeLayoutGetDidUseLegacyFlag(node: YGNode): boolean {
    return node.didUseLegacyFlag();
}

export function YGNodeMarkDirtyAndPropogateToDescendants(node: YGNode): void {
    node.markDirtyAndPropogateDownwards();
}

let gNodeInstanceCount: number = 0;
let gConfigInstanceCount: number = 0;

export function YGNodeNewWithConfig(config: YGConfig): YGNode {
    const node: YGNode = new YGNode();
    gNodeInstanceCount++;

    if (config.useWebDefaults) {
        node.setStyleFlexDirection(YGFlexDirection.Row);
        node.setStyleAlignContent(YGAlign.Stretch);
    }

    node.setConfig(config);
    return node;
}

export function YGConfigGetDefault(): YGConfig {
    return YGConfigNew();
}

export function YGNodeNew(): YGNode {
    return YGNodeNewWithConfig(YGConfigGetDefault());
}

export function YGNodeClone(oldNode: YGNode) {
    const node: YGNode = new YGNode(oldNode);
    gNodeInstanceCount++;
    node.setOwner(null);
    return node;
}

export function YGConfigClone(oldConfig: YGConfig) {
    const config: YGConfig = new YGConfig(oldConfig.logger);
    gConfigInstanceCount++;
    return config;
}

export function YGNodeDeepClone(oldNode: YGNode): YGNode {
    const node: YGNode = YGNodeClone(oldNode);
    const vec: Array<YGNode> = new Array(oldNode.getChildren().length);

    let childNode: YGNode = null;
    for (let i: number = 0; i < oldNode.getChildren().length; ++i) {
        const item: YGNode = oldNode.getChild(i);
        childNode = YGNodeDeepClone(item);
        childNode.setOwner(node);
        vec.push(childNode);
    }

    node.setChildren(vec);

    if (oldNode.getConfig() != null) {
        node.setConfig(YGConfigClone(oldNode.getConfig()));
    }

    return node;
}

export function YGNodeFree(node: YGNode): void {
    const owner: YGNode = node.getOwner();

    if (owner != null) {
        owner.removeChild(node);
        node.setOwner(null);
    }

    const childCount: number = YGNodeGetChildCount(node);
    for (let i: number = 0; i < childCount; i++) {
        const child: YGNode = YGNodeGetChild(node, i);
        child.setOwner(null);
    }

    node.clearChildren();
    gNodeInstanceCount--;
}

export function YGConfigFreeRecursive(root: YGNode): void {
    if (root.getConfig() != null) {
        gConfigInstanceCount--;
        root.setConfig(null);
    }

    for (let i: number = 0; i < root.getChildrenCount(); ++i) {
        YGConfigFreeRecursive(root.getChild(i));
    }
}

export function YGNodeFreeRecursive(root: YGNode): void {
    while (YGNodeGetChildCount(root) > 0) {
        const child: YGNode = YGNodeGetChild(root, 0);
        if (child.getOwner() != root) {
            break;
        }

        YGNodeRemoveChild(root, child);
        YGNodeFreeRecursive(child);
    }
    YGNodeFree(root);
}

export function YGNodeReset(node: YGNode): void {
    //YGAssertWithNode(node, YGNodeGetChildCount(node) == 0, "Cannot reset a node which still has children attached");
    //YGAssertWithNode(node, node->getOwner() == nullptr, "Cannot reset a node still attached to a owner");

    node.clearChildren();
    const config: YGConfig = node.getConfig();

    node.fromNode(new YGNode());

    if (config.useWebDefaults) {
        node.setStyleFlexDirection(YGFlexDirection.Row);
        node.setStyleAlignContent(YGAlign.Stretch);
    }

    node.setConfig(config);
}

export function YGNodeGetInstanceCount(): number {
    return gNodeInstanceCount;
}

export function YGConfigGetInstanceCount(): number {
    return gConfigInstanceCount;
}

export function YGConfigNew(): YGConfig {
    const config: YGConfig = new YGConfig(YGDefaultLog);
    gConfigInstanceCount++;
    return config;
}

export function YGConfigFree(config: YGConfig): void {
    gConfigInstanceCount--;
}

export function YGConfigCopy(dest: YGConfig, src: YGConfig) {
    (<any>Object).assign(dest, src);
}

export function YGNodeInsertChild(node: YGNode, child: YGNode, index: number): void {
    //YGAssertWithNode(node, child.getOwner() == null, "Child already has a owner, it must be removed first.");
    //YGAssertWithNode(node, node.getMeasure() == null, "Cannot add child: Nodes with measure functions cannot have children.");
    node.cloneChildrenIfNeeded();
    node.insertChildIndex(child, index);
    const owner: YGNode = child.getOwner() ? null : node;
    child.setOwner(owner);
    node.markDirtyAndPropogate();
}

export function YGNodeInsertSharedChild(node: YGNode, child: YGNode, index: number): void {
    //YGAssertWithNode(node, node.getMeasure() == null, "Cannot add child: Nodes with measure functions cannot have children.");
    node.insertChildIndex(child, index);
    child.setOwner(null);
    node.markDirtyAndPropogate();
}

export function YGNodeRemoveChild(owner: YGNode, excludedChild: YGNode): void {
    const childCount: number = YGNodeGetChildCount(owner);

    if (childCount == 0) {
        return;
    }

    const firstChild: YGNode = YGNodeGetChild(owner, 0);
    if (firstChild.getOwner() == owner) {
        if (owner.removeChild(excludedChild)) {
            excludedChild.setLayout((new YGNode()).getLayout());
            excludedChild.setOwner(null);
            owner.markDirtyAndPropogate();
        }
        return;
    }

    const cloneNodeCallback: YGCloneNodeFunc = owner.getConfig().cloneNodeCallback;
    let nextInsertIndex: number = 0;

    for (let i: number = 0; i < childCount; i++) {
        const oldChild: YGNode = owner.getChild(i);
        if (excludedChild == oldChild) {
            owner.markDirtyAndPropogate();
            continue;
        }

        let newChild: YGNode = null;
        if (cloneNodeCallback) {
            newChild = cloneNodeCallback(oldChild, owner, nextInsertIndex);
        }

        if (newChild == null) {
            newChild = YGNodeClone(oldChild);
        }

        owner.replaceChildIndex(newChild, nextInsertIndex);
        newChild.setOwner(owner);

        nextInsertIndex++;
    }

    while (nextInsertIndex < childCount) {
        owner.removeChildIndex(nextInsertIndex);
        nextInsertIndex++;
    }
}

export function YGNodeRemoveAllChildren(owner: YGNode): void {
    const childCount = YGNodeGetChildCount(owner);
    if (childCount == 0) {
        return;
    }

    const firstChild: YGNode = YGNodeGetChild(owner, 0);
    if (firstChild.getOwner() == owner) {
        for (let i = 0; i < childCount; i++) {
            const oldChild: YGNode = YGNodeGetChild(owner, i);
            oldChild.setLayout(new YGLayout()); // new YGNode().getLayout()
            oldChild.setOwner(null);
        }

        owner.clearChildren();
        owner.markDirtyAndPropogate();
        return;
    }

    owner.setChildren(new Array());
    owner.markDirtyAndPropogate();
}

export function YGNodeSetChildrenInternal(owner: YGNode, children: Array<YGNode>): void {
    if (!owner) {
        return;
    }

    const ownerChildren: Array<YGNode> = owner.getChildren();
    if (children.length == 0) {
        if (ownerChildren.length > 0) {
            for (let i = 0; i < ownerChildren.length; i++) {
                const child: YGNode = ownerChildren[i];
                child.setLayout(new YGLayout());
                child.setOwner(null);
            }

            owner.setChildren(new Array());
            owner.markDirtyAndPropogate();
        }
    } else {
        if (ownerChildren.length > 0) {
            for (let i = 0; i < ownerChildren.length; i++) {
                const oldChild: YGNode = ownerChildren[i];
                if (children.indexOf(oldChild) < 0) {
                    oldChild.setLayout(new YGLayout());
                    oldChild.setOwner(null);
                }
            }
        }

        owner.setChildren(children);
        for (let i = 0; i < children.length; i++) {
            children[i].setOwner(owner);
        }

        owner.markDirtyAndPropogate();
    }
}

/*function YGNodeSetChildren(owner: YGNode, c: Array<YGNode>, count: number) {
    YGVector children = { c, c + count };
    YGNodeSetChildrenInternal(owner, children);
}*/

export function YGNodeSetChildren(owner: YGNode, children: Array<YGNode>): void {
    YGNodeSetChildrenInternal(owner, children);
}


export function YGNodeGetChild(node: YGNode, index: number): YGNode {
    const children = node.getChildren();
    if (index < children.length) {
        return children[index];
    }
    return null;
}

export function YGNodeGetChildCount(node: YGNode): number {
    return node.getChildrenCount();
}

export function YGNodeGetOwner(node: YGNode): YGNode {
    return node.getOwner();
}

export function YGNodeGetParent(node: YGNode): YGNode {
    return node.getOwner();
}

export function YGNodeMarkDirty(node: YGNode): void {
    //YGAssertWithNode(node, node.getMeasure() != null, "Only leaf nodes with custom measure functions should manually mark themselves as dirty");
    node.markDirtyAndPropogate();
}

export function YGNodeCopyStyle(dstNode: YGNode, srcNode: YGNode): void {
    if (!(dstNode.getStyle().isEqual(srcNode.getStyle()))) {
        dstNode.setStyle(srcNode.getStyle());
        dstNode.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetFlexGrow(node: YGNode): number {
    return node.getStyle().flexGrow.isUndefined() ? kDefaultFlexGrow : node.getStyle().flexGrow.getValue();
}

export function YGNodeStyleGetFlexShrink(node: YGNode): number {
    return node.getStyle().flexShrink.isUndefined() ? (node.getConfig().useWebDefaults ? kWebDefaultFlexShrink : kDefaultFlexShrink) : node.getStyle().flexShrink.getValue();
}

// MACROS START

export function YGNodeStyleSetDirection(node: YGNode, direction: YGDirection): void {
    if (node.getStyle().direction != direction) {
        const style: YGStyle = node.getStyle();
        style.direction = direction;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetDirection(node: YGNode): YGDirection {
    return node.getStyle().direction;
}

export function YGNodeStyleSetFlexDirection(node: YGNode, flexDirection: YGFlexDirection): void {
    if (node.getStyle().flexDirection != flexDirection) {
        const style: YGStyle = node.getStyle();
        style.flexDirection = flexDirection;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetFlexDirection(node: YGNode): YGFlexDirection {
    return node.getStyle().flexDirection;
}

export function YGNodeStyleSetJustifyContent(node: YGNode, justifyContent: YGJustify): void {
    if (node.getStyle().justifyContent != justifyContent) {
        const style: YGStyle = node.getStyle();
        style.justifyContent = justifyContent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetJustifyContent(node: YGNode): YGJustify {
    return node.getStyle().justifyContent;
}

export function YGNodeStyleSetAlignContent(node: YGNode, alignContent: YGAlign): void {
    if (node.getStyle().alignContent != alignContent) {
        const style: YGStyle = node.getStyle();
        style.alignContent = alignContent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetAlignContent(node: YGNode): YGAlign {
    return node.getStyle().alignContent;
}

export function YGNodeStyleSetAlignItems(node: YGNode, alignItems: YGAlign): void {
    if (node.getStyle().alignItems != alignItems) {
        const style: YGStyle = node.getStyle();
        style.alignItems = alignItems;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetAlignItems(node: YGNode): YGAlign {
    return node.getStyle().alignItems;
}

export function YGNodeStyleSetAlignSelf(node: YGNode, alignSelf: YGAlign): void {
    if (node.getStyle().alignSelf != alignSelf) {
        const style: YGStyle = node.getStyle();
        style.alignSelf = alignSelf;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetAlignSelf(node: YGNode): YGAlign {
    return node.getStyle().alignSelf;
}

export function YGNodeStyleSetPositionType(node: YGNode, positionType: YGPositionType): void {
    if (node.getStyle().positionType != positionType) {
        const style: YGStyle = node.getStyle();
        style.positionType = positionType;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetPositionType(node: YGNode): YGPositionType {
    return node.getStyle().positionType;
}

export function YGNodeStyleSetFlexWrap(node: YGNode, flexWrap: YGWrap): void {
    if (node.getStyle().flexWrap != flexWrap) {
        const style: YGStyle = node.getStyle();
        style.flexWrap = flexWrap;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetFlexWrap(node: YGNode): YGWrap {
    return node.getStyle().flexWrap;
}

export function YGNodeStyleSetOverflow(node: YGNode, overflow: YGOverflow): void {
    if (node.getStyle().overflow != overflow) {
        const style: YGStyle = node.getStyle();
        style.overflow = overflow;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetOverflow(node: YGNode): YGOverflow {
    return node.getStyle().overflow;
}

export function YGNodeStyleSetDisplay(node: YGNode, display: YGDisplay): void {
    if (node.getStyle().display != display) {
        const style: YGStyle = node.getStyle();
        style.display = display;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetDisplay(node: YGNode): YGDisplay {
    return node.getStyle().display;
}

export function YGNodeStyleSetPosition(node: YGNode, edge: YGEdge, position: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(position),
        YGFloatIsUndefined(position) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().position[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().position[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.position[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}


export function YGNodeStyleSetPositionPercent(node: YGNode, edge: YGEdge, position: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(position),
        YGFloatIsUndefined(position) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().position[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().position[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.position[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetPosition(node: YGNode, edge: YGEdge): YGValue {
    const value: YGValue = node.getStyle().position[edge];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }

    return value;
}

export function YGNodeStyleSetMargin(node: YGNode, edge: YGEdge, margin: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(margin),
        YGFloatIsUndefined(margin) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().margin[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().margin[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.margin[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}


export function YGNodeStyleSetMarginPercent(node: YGNode, edge: YGEdge, margin: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(margin),
        YGFloatIsUndefined(margin) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().margin[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().margin[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.margin[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetMargin(node: YGNode, edge: YGEdge): YGValue {
    const value: YGValue = node.getStyle().margin[edge];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }

    return value;
}

export function YGNodeStyleSetPadding(node: YGNode, edge: YGEdge, padding: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(padding),
        YGFloatIsUndefined(padding) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().padding[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().padding[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.padding[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}


export function YGNodeStyleSetPaddingPercent(node: YGNode, edge: YGEdge, padding: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(padding),
        YGFloatIsUndefined(padding) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().padding[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().padding[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.padding[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetPadding(node: YGNode, edge: YGEdge): YGValue {
    const value: YGValue = node.getStyle().padding[edge];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }

    return value;
}

export function YGNodeStyleSetMarginAuto(node: YGNode, edge: YGEdge): void {
    if (node.getStyle().margin[edge].unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.margin[edge].value = 0;
        style.margin[edge].unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}
export function YGNodeStyleSetWidth(node: YGNode, width: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(width),
        YGFloatIsUndefined(width) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().dimensions[YGDimension.Width].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().dimensions[YGDimension.Width].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.dimensions[YGDimension.Width] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetWidthPercent(node: YGNode, width: number): void {
    if (node.getStyle().dimensions[YGDimension.Width].value != YGFloatSanitize(width) ||
        node.getStyle().dimensions[YGDimension.Width].unit != YGUnit.Percent) {
        const style: YGStyle = node.getStyle();
        style.dimensions[YGDimension.Width].value = YGFloatSanitize(width);
        style.dimensions[YGDimension.Width].unit = YGFloatIsUndefined(width) ? YGUnit.Auto : YGUnit.Percent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetWidthAuto(node: YGNode): void {
    if (node.getStyle().dimensions[YGDimension.Width].unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.dimensions[YGDimension.Width].value = 0;
        style.dimensions[YGDimension.Width].unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetWidth(node: YGNode): YGValue {
    const value: YGValue = node.getStyle().dimensions[YGDimension.Width];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}
export function YGNodeStyleSetHeight(node: YGNode, height: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(height),
        YGFloatIsUndefined(height) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().dimensions[YGDimension.Height].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().dimensions[YGDimension.Height].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.dimensions[YGDimension.Height] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetHeightPercent(node: YGNode, height: number): void {
    if (node.getStyle().dimensions[YGDimension.Height].value != YGFloatSanitize(height) ||
        node.getStyle().dimensions[YGDimension.Height].unit != YGUnit.Percent) {
        const style: YGStyle = node.getStyle();
        style.dimensions[YGDimension.Height].value = YGFloatSanitize(height);
        style.dimensions[YGDimension.Height].unit = YGFloatIsUndefined(height) ? YGUnit.Auto : YGUnit.Percent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetHeightAuto(node: YGNode): void {
    if (node.getStyle().dimensions[YGDimension.Height].unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.dimensions[YGDimension.Height].value = 0;
        style.dimensions[YGDimension.Height].unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetHeight(node: YGNode): YGValue {
    const value: YGValue = node.getStyle().dimensions[YGDimension.Height];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}
export function YGNodeStyleSetMinWidth(node: YGNode, minWidth: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(minWidth),
        YGFloatIsUndefined(minWidth) ? YGUnit.Undefined : YGUnit.Point
    );

    if ((node.getStyle().minDimensions[YGDimension.Width].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().minDimensions[YGDimension.Width].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.minDimensions[YGDimension.Width] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetMinWidthPercent(node: YGNode, minWidth: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(minWidth),
        YGFloatIsUndefined(minWidth) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().minDimensions[YGDimension.Width].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().minDimensions[YGDimension.Width].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.minDimensions[YGDimension.Width] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetMinWidth(node: YGNode): YGValue {
    const value: YGValue = node.getStyle().minDimensions[YGDimension.Width];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}
export function YGNodeStyleSetMinHeight(node: YGNode, minHeight: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(minHeight),
        YGFloatIsUndefined(minHeight) ? YGUnit.Undefined : YGUnit.Point
    );

    if ((node.getStyle().minDimensions[YGDimension.Height].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().minDimensions[YGDimension.Height].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.minDimensions[YGDimension.Height] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetMinHeightPercent(node: YGNode, minHeight: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(minHeight),
        YGFloatIsUndefined(minHeight) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().minDimensions[YGDimension.Height].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().minDimensions[YGDimension.Height].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.minDimensions[YGDimension.Height] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetMinHeight(node: YGNode): YGValue {
    const value: YGValue = node.getStyle().minDimensions[YGDimension.Height];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}
export function YGNodeStyleSetMaxWidth(node: YGNode, maxWidth: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(maxWidth),
        YGFloatIsUndefined(maxWidth) ? YGUnit.Undefined : YGUnit.Point
    );

    if ((node.getStyle().maxDimensions[YGDimension.Width].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().maxDimensions[YGDimension.Width].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.maxDimensions[YGDimension.Width] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetMaxWidthPercent(node: YGNode, maxWidth: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(maxWidth),
        YGFloatIsUndefined(maxWidth) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().maxDimensions[YGDimension.Width].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().maxDimensions[YGDimension.Width].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.maxDimensions[YGDimension.Width] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetMaxWidth(node: YGNode): YGValue {
    const value: YGValue = node.getStyle().maxDimensions[YGDimension.Width];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}
export function YGNodeStyleSetMaxHeight(node: YGNode, maxHeight: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(maxHeight),
        YGFloatIsUndefined(maxHeight) ? YGUnit.Undefined : YGUnit.Point
    );

    if ((node.getStyle().maxDimensions[YGDimension.Height].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().maxDimensions[YGDimension.Height].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.maxDimensions[YGDimension.Height] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetMaxHeightPercent(node: YGNode, maxHeight: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(maxHeight),
        YGFloatIsUndefined(maxHeight) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().maxDimensions[YGDimension.Height].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().maxDimensions[YGDimension.Height].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.maxDimensions[YGDimension.Height] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetMaxHeight(node: YGNode): YGValue {
    const value: YGValue = node.getStyle().maxDimensions[YGDimension.Height];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}
export function YGNodeLayoutGetLeft(node: YGNode): number {
    return node.getLayout().position[YGEdge.Left];
}
export function YGNodeLayoutGetTop(node: YGNode): number {
    return node.getLayout().position[YGEdge.Top];
}
export function YGNodeLayoutGetRight(node: YGNode): number {
    return node.getLayout().position[YGEdge.Right];
}
export function YGNodeLayoutGetBottom(node: YGNode): number {
    return node.getLayout().position[YGEdge.Bottom];
}
export function YGNodeLayoutGetWidth(node: YGNode): number {
    return node.getLayout().dimensions[YGDimension.Width];
}
export function YGNodeLayoutGetHeight(node: YGNode): number {
    return node.getLayout().dimensions[YGDimension.Height];
}
export function YGNodeLayoutGetDirection(node: YGNode): YGDirection {
    return node.getLayout().direction;
}
export function YGNodeLayoutGetHadOverflow(node: YGNode): boolean {
    return node.getLayout().hadOverflow;
}
export function YGNodeLayoutGetMargin(node: YGNode, edge: YGEdge): number {
    // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

    if (edge == YGEdge.Left) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().margin[YGEdge.End];
        } else {
            return node.getLayout().margin[YGEdge.Start];
        }
    }

    if (edge == YGEdge.Right) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().margin[YGEdge.Start];
        } else {
            return node.getLayout().margin[YGEdge.End];
        }
    }

    return node.getLayout().margin[edge];
}
export function YGNodeLayoutGetBorder(node: YGNode, edge: YGEdge): number {
    // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

    if (edge == YGEdge.Left) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().border[YGEdge.End];
        } else {
            return node.getLayout().border[YGEdge.Start];
        }
    }

    if (edge == YGEdge.Right) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().border[YGEdge.Start];
        } else {
            return node.getLayout().border[YGEdge.End];
        }
    }

    return node.getLayout().border[edge];
}
export function YGNodeLayoutGetPadding(node: YGNode, edge: YGEdge): number {
    // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

    if (edge == YGEdge.Left) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().padding[YGEdge.End];
        } else {
            return node.getLayout().padding[YGEdge.Start];
        }
    }

    if (edge == YGEdge.Right) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().padding[YGEdge.Start];
        } else {
            return node.getLayout().padding[YGEdge.End];
        }
    }

    return node.getLayout().padding[edge];
}

// MACROS END

export function YGNodeStyleSetFlex(node: YGNode, flex: number): void {
    if (node.getStyle().flex.isDiffValue(flex)) {
        const style: YGStyle = node.getStyle();
        if (YGFloatIsUndefined(flex)) {
            style.flex = new YGFloatOptional();
        } else {
            style.flex = new YGFloatOptional(flex);
        }
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetFlex(node: YGNode): number {
    return node.getStyle().flex.isUndefined() ? YGUndefined : node.getStyle().flex.getValue();
}

export function YGNodeStyleSetFlexGrow(node: YGNode, flexGrow: number): void {
    if (node.getStyle().flexGrow.isDiffValue(flexGrow)) {
        const style: YGStyle = node.getStyle();
        if (YGFloatIsUndefined(flexGrow)) {
            style.flexGrow = new YGFloatOptional();
        } else {
            style.flexGrow = new YGFloatOptional(flexGrow);
        }
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetFlexShrink(node: YGNode, flexShrink: number): void {
    if (node.getStyle().flexShrink.isDiffValue(flexShrink)) {
        const style: YGStyle = node.getStyle();
        if (YGFloatIsUndefined(flexShrink)) {
            style.flexShrink = new YGFloatOptional();
        } else {
            style.flexShrink = new YGFloatOptional(flexShrink);
        }
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetFlexBasis(node: YGNode): YGValue {
    const flexBasis: YGValue = node.getStyle().flexBasis;
    if (flexBasis.unit == YGUnit.Undefined || flexBasis.unit == YGUnit.Auto) {
        flexBasis.value = YGUndefined;
    }
    return flexBasis;
}

export function YGNodeStyleSetFlexBasis(node: YGNode, flexBasis: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(flexBasis),
        YGFloatIsUndefined(flexBasis) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().flexBasis.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().flexBasis.unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.flexBasis = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetFlexBasisPercent(node: YGNode, flexBasisPercent: number): void {
    if (node.getStyle().flexBasis.value != flexBasisPercent || node.getStyle().flexBasis.unit != YGUnit.Percent) {
        const style: YGStyle = node.getStyle();
        style.flexBasis.value = YGFloatSanitize(flexBasisPercent);
        style.flexBasis.unit = YGFloatIsUndefined(flexBasisPercent) ? YGUnit.Auto : YGUnit.Percent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetFlexBasisAuto(node: YGNode): void {
    if (node.getStyle().flexBasis.unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.flexBasis.value = 0;
        style.flexBasis.unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSetBorder(node: YGNode, edge: YGEdge, border: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(border),
        YGFloatIsUndefined(border) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().border[edge].value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().border[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.border[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGetBorder(node: YGNode, edge: YGEdge): number {
    if (node.getStyle().border[edge].unit == YGUnit.Undefined ||
        node.getStyle().border[edge].unit == YGUnit.Auto) {
        return YGUndefined;
    }

    return node.getStyle().border[edge].value;
}

export function YGNodeStyleGetAspectRatio(node: YGNode): number {
    const op: YGFloatOptional = node.getStyle().aspectRatio;
    return op.isUndefined() ? YGUndefined : op.getValue();
}

export function YGNodeStyleSetAspectRatio(node: YGNode, aspectRatio: number): void {
    if (node.getStyle().aspectRatio.isDiffValue(aspectRatio)) {
        const style: YGStyle = node.getStyle();
        style.aspectRatio = new YGFloatOptional(aspectRatio);
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeLayoutGetDidLegacyStretchFlagAffectLayout(node: YGNode): boolean {
    return node.getLayout().doesLegacyStretchFlagAffectsLayout;
}

let gCurrentGenerationCount = 0;

export function YGNodePrintInternal(node: YGNode, options: YGPrintOptions): void {
    //const str: string = YGNodeToString(str, node, options, 0);
    //YGLog(node, YGLogLevel.Debug, str);
}

export function YGNodePrint(node: YGNode, options: YGPrintOptions): void {
    YGNodePrintInternal(node, options);
}

export function YGNodePaddingAndBorderForAxis(node: YGNode, axis: YGFlexDirection, widthSize: number): number {
    return YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(axis, widthSize).add(node.getTrailingPaddingAndBorder(axis, widthSize)));
}

export function YGNodeAlignItem(node: YGNode, child: YGNode): YGAlign {
    const align: YGAlign = child.getStyle().alignSelf == YGAlign.Auto
        ? node.getStyle().alignItems
        : child.getStyle().alignSelf;
    if (align == YGAlign.Baseline && YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
        return YGAlign.FlexStart;
    }
    return align;
}

export function YGBaseline(node: YGNode): number {
    if (node.getBaseline() != null) {
        const baseline: number = node.getBaseline()(node, node.getLayout().measuredDimensions[YGDimension.Width], node.getLayout().measuredDimensions[YGDimension.Height]);
        //YGAssertWithNode(node, !YGFloatIsUndefined(baseline), "Expect custom baseline function to not return NaN");
        return baseline;
    }

    let baselineChild: YGNode = null;
    const childCount = YGNodeGetChildCount(node);
    for (let i: number = 0; i < childCount; i++) {
        const child: YGNode = YGNodeGetChild(node, i);
        if (child.getLineIndex() > 0) {
            break;
        }

        if (child.getStyle().positionType == YGPositionType.Absolute) {
            continue;
        }

        if (YGNodeAlignItem(node, child) == YGAlign.Baseline) {
            baselineChild = child;
            break;
        }

        if (baselineChild == null) {
            baselineChild = child;
        }
    }

    if (baselineChild == null) {
        return node.getLayout().measuredDimensions[YGDimension.Height];
    }

    const baseline: number = YGBaseline(baselineChild);
    return baseline + baselineChild.getLayout().position[YGEdge.Top];
}

export function YGIsBaselineLayout(node: YGNode): boolean {
    if (YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
        return false;
    }

    if (node.getStyle().alignItems == YGAlign.Baseline) {
        return true;
    }

    const childCount: number = YGNodeGetChildCount(node);
    for (let i: number = 0; i < childCount; i++) {
        const child: YGNode = YGNodeGetChild(node, i);
        if (child.getStyle().positionType == YGPositionType.Relative &&
            child.getStyle().alignSelf == YGAlign.Baseline) {
            return true;
        }
    }

    return false;
}

const dim: [YGDimension, YGDimension, YGDimension, YGDimension] = [YGDimension.Height, YGDimension.Height, YGDimension.Width, YGDimension.Width];

export function YGNodeDimWithMargin(node: YGNode, axis: YGFlexDirection, widthSize: number) {
    return node.getLayout().measuredDimensions[dim[axis]] +
        YGUnwrapFloatOptional(
            node.getLeadingMargin(axis, widthSize).add(node.getTrailingMargin(axis, widthSize))
        );
}

export function YGNodeIsStyleDimDefined(node: YGNode, axis: YGFlexDirection, ownerSize: number): boolean {
    let isUndefined: boolean = YGFloatIsUndefined(node.getResolvedDimension(dim[axis]).value);
    return !(
        node.getResolvedDimension(dim[axis]).unit == YGUnit.Auto ||
        node.getResolvedDimension(dim[axis]).unit == YGUnit.Undefined ||
        (node.getResolvedDimension(dim[axis]).unit == YGUnit.Point &&
            !isUndefined && node.getResolvedDimension(dim[axis]).value < 0.0) ||
        (node.getResolvedDimension(dim[axis]).unit == YGUnit.Percent &&
            !isUndefined &&
            (node.getResolvedDimension(dim[axis]).value < 0.0 ||
                YGFloatIsUndefined(ownerSize))));
}

export function YGNodeIsLayoutDimDefined(node: YGNode, axis: YGFlexDirection): boolean {
    const value: number = node.getLayout().measuredDimensions[dim[axis]];
    return !YGFloatIsUndefined(value) && value >= 0.0;
}


export function YGNodeBoundAxisWithinMinAndMax(node: YGNode, axis: YGFlexDirection, value: number, axisSize: number): YGFloatOptional {
    let min: YGFloatOptional;
    let max: YGFloatOptional;

    if (YGFlexDirectionIsColumn(axis)) {
        min = YGResolveValue(node.getStyle().minDimensions[YGDimension.Height], axisSize);
        max = YGResolveValue(node.getStyle().maxDimensions[YGDimension.Height], axisSize);
    } else if (YGFlexDirectionIsRow(axis)) {
        min = YGResolveValue(node.getStyle().minDimensions[YGDimension.Width], axisSize);
        max = YGResolveValue(node.getStyle().maxDimensions[YGDimension.Width], axisSize);
    }

    if (!max.isUndefined() && max.getValue() >= 0 && value > max.getValue()) {
        return max;
    }

    if (!min.isUndefined() && min.getValue() >= 0 && value < min.getValue()) {
        return min;
    }

    return new YGFloatOptional(value);
}

export function YGNodeBoundAxis(node: YGNode, axis: YGFlexDirection, value: number, axisSize: number, widthSize: number) {
    return YGFloatMax(
        YGUnwrapFloatOptional(
            YGNodeBoundAxisWithinMinAndMax(node, axis, value, axisSize)),
        YGNodePaddingAndBorderForAxis(node, axis, widthSize));
}

export function YGNodeSetChildTrailingPosition(node: YGNode, child: YGNode, axis: YGFlexDirection) {
    const size: number = child.getLayout().measuredDimensions[dim[axis]];
    child.setLayoutPosition(
        node.getLayout().measuredDimensions[dim[axis]] - size -
        child.getLayout().position[pos[axis]],
        trailing[axis]);
}


export function YGConstrainMaxSizeForMode(node: YGNode, axis: YGFlexDirection, ownerAxisSize: number, ownerWidth: number, mode: { value: YGMeasureMode }, size: { value: number }): void {
    const maxSize: YGFloatOptional = YGResolveValue(node.getStyle().maxDimensions[dim[axis]], ownerAxisSize).add(node.getMarginForAxis(axis, ownerWidth));

    switch (mode.value) {
        case YGMeasureMode.Exactly:
        case YGMeasureMode.AtMost:
            size.value = (maxSize.isUndefined() || size.value < maxSize.getValue()) ? size.value : maxSize.getValue();
            break;
        case YGMeasureMode.Undefined:
            if (!maxSize.isUndefined()) {
                mode.value = YGMeasureMode.AtMost;
                size.value = maxSize.getValue();
            }
            break;
    }
}


export function YGNodeComputeFlexBasisForChild(node: YGNode, child: YGNode, width: number, widthMode: YGMeasureMode, height: number, ownerWidth: number, ownerHeight: number, heightMode: YGMeasureMode, direction: YGDirection, config: YGConfig): void {
    const mainAxis: YGFlexDirection = YGResolveFlexDirection(node.getStyle().flexDirection, direction);
    const isMainAxisRow: boolean = YGFlexDirectionIsRow(mainAxis);
    const mainAxisSize: number = isMainAxisRow ? width : height;
    const mainAxisownerSize: number = isMainAxisRow ? ownerWidth : ownerHeight;

    let childWidth: number;
    let childHeight: number;
    let childWidthMeasureMode: YGMeasureMode;
    let childHeightMeasureMode: YGMeasureMode;

    const resolvedFlexBasis: YGFloatOptional = YGResolveValue(child.resolveFlexBasisPtr(), mainAxisownerSize);
    const isRowStyleDimDefined: boolean = YGNodeIsStyleDimDefined(child, YGFlexDirection.Row, ownerWidth);
    const isColumnStyleDimDefined: boolean = YGNodeIsStyleDimDefined(child, YGFlexDirection.Column, ownerHeight);

    if (!resolvedFlexBasis.isUndefined() && !YGFloatIsUndefined(mainAxisSize)) {
        if (child.getLayout().computedFlexBasis.isUndefined() ||
            (YGConfigIsExperimentalFeatureEnabled(child.getConfig(), YGExperimentalFeature.WebFlexBasis) &&
                child.getLayout().computedFlexBasisGeneration != gCurrentGenerationCount)) {
            const paddingAndBorder: YGFloatOptional = new YGFloatOptional(YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth));
            child.setLayoutComputedFlexBasis(YGFloatOptionalMax(resolvedFlexBasis, paddingAndBorder));
        }
    } else if (isMainAxisRow && isRowStyleDimDefined) {
        const paddingAndBorder: YGFloatOptional = new YGFloatOptional(YGNodePaddingAndBorderForAxis(child, YGFlexDirection.Row, ownerWidth));
        child.setLayoutComputedFlexBasis(YGFloatOptionalMax(YGResolveValue(child.getResolvedDimension(YGDimension.Width), ownerWidth), paddingAndBorder));
    } else if (!isMainAxisRow && isColumnStyleDimDefined) {
        const paddingAndBorder: YGFloatOptional = new YGFloatOptional(YGNodePaddingAndBorderForAxis(child, YGFlexDirection.Column, ownerWidth));
        child.setLayoutComputedFlexBasis(YGFloatOptionalMax(YGResolveValue(child.getResolvedDimension(YGDimension.Height), ownerHeight), paddingAndBorder));
    } else {
        childWidth = YGUndefined;
        childHeight = YGUndefined;
        childWidthMeasureMode = YGMeasureMode.Undefined;
        childHeightMeasureMode = YGMeasureMode.Undefined;

        const marginRow: number = YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
        const marginColumn: number = YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

        if (isRowStyleDimDefined) {
            childWidth = YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimension.Width), ownerWidth)) + marginRow;
            childWidthMeasureMode = YGMeasureMode.Exactly;
        }
        if (isColumnStyleDimDefined) {
            childHeight = YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimension.Height), ownerHeight)) + marginColumn;
            childHeightMeasureMode = YGMeasureMode.Exactly;
        } if ((!isMainAxisRow && node.getStyle().overflow == YGOverflow.Scroll) ||
            node.getStyle().overflow != YGOverflow.Scroll) {
            if (YGFloatIsUndefined(childWidth) && !YGFloatIsUndefined(width)) {
                childWidth = width;
                childWidthMeasureMode = YGMeasureMode.AtMost;
            }
        }

        if ((isMainAxisRow && node.getStyle().overflow == YGOverflow.Scroll) ||
            node.getStyle().overflow != YGOverflow.Scroll) {
            if (YGFloatIsUndefined(childHeight) && !YGFloatIsUndefined(height)) {
                childHeight = height;
                childHeightMeasureMode = YGMeasureMode.AtMost;
            }
        }

        if (!child.getStyle().aspectRatio.isUndefined()) {
            if (!isMainAxisRow && childWidthMeasureMode == YGMeasureMode.Exactly) {
                childHeight = marginColumn + (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
                childHeightMeasureMode = YGMeasureMode.Exactly;
            } else if (isMainAxisRow && childHeightMeasureMode == YGMeasureMode.Exactly) {
                childWidth = marginRow + (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
                childWidthMeasureMode = YGMeasureMode.Exactly;
            }
        }

        const hasExactWidth: boolean = !YGFloatIsUndefined(width) && widthMode == YGMeasureMode.Exactly;
        const childWidthStretch: boolean = YGNodeAlignItem(node, child) == YGAlign.Stretch
        childWidthMeasureMode != YGMeasureMode.Exactly;
        if (!isMainAxisRow && !isRowStyleDimDefined && hasExactWidth && childWidthStretch) {
            childWidth = width;
            childWidthMeasureMode = YGMeasureMode.Exactly;
            if (!child.getStyle().aspectRatio.isUndefined()) {
                childHeight =
                    (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
                childHeightMeasureMode = YGMeasureMode.Exactly;
            }
        }

        const hasExactHeight: boolean = !YGFloatIsUndefined(height) && heightMode == YGMeasureMode.Exactly;
        const childHeightStretch: boolean = YGNodeAlignItem(node, child) == YGAlign.Stretch && childHeightMeasureMode != YGMeasureMode.Exactly;

        if (isMainAxisRow && !isColumnStyleDimDefined && hasExactHeight && childHeightStretch) {
            childHeight = height;
            childHeightMeasureMode = YGMeasureMode.Exactly;

            if (!child.getStyle().aspectRatio.isUndefined()) {
                childWidth = (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
                childWidthMeasureMode = YGMeasureMode.Exactly;
            }
        }

        let childWidthMeasureModeRef = { value: childWidthMeasureMode }
        let childWidthRef = { value: childWidth }
        let childHeightMeasureModeRef = { value: childHeightMeasureMode }
        let childHeightRef = { value: childHeight }

        YGConstrainMaxSizeForMode(child, YGFlexDirection.Row, ownerWidth, ownerWidth, childWidthMeasureModeRef, childWidthRef);
        YGConstrainMaxSizeForMode(child, YGFlexDirection.Column, ownerHeight, ownerWidth, childHeightMeasureModeRef, childHeightRef);

        YGLayoutNodeInternal(child,
            childWidthRef.value,
            childHeightRef.value,
            direction,
            childWidthMeasureModeRef.value,
            childWidthMeasureModeRef.value,
            ownerWidth,
            ownerHeight,
            false,
            "measure",
            config);

        child.setLayoutComputedFlexBasis(new YGFloatOptional(YGFloatMax(
            child.getLayout().measuredDimensions[dim[mainAxis]],
            YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth))));
    }
    child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
}

export function YGNodeAbsoluteLayoutChild(node: YGNode, child: YGNode, width: number, widthMode: YGMeasureMode, height: number, direction: YGDirection, config: YGConfig): void {
    const mainAxis: YGFlexDirection = YGResolveFlexDirection(node.getStyle().flexDirection, direction);
    const crossAxis: YGFlexDirection = YGFlexDirectionCross(mainAxis, direction);
    const isMainAxisRow: boolean = YGFlexDirectionIsRow(mainAxis);

    let childWidth: number = YGUndefined;
    let childHeight: number = YGUndefined;
    let childWidthMeasureMode: YGMeasureMode = YGMeasureMode.Undefined;
    let childHeightMeasureMode: YGMeasureMode = YGMeasureMode.Undefined;

    const marginRow: number = YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Row, width));
    const marginColumn: number = YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Column, width));

    if (YGNodeIsStyleDimDefined(child, YGFlexDirection.Row, width)) {
        childWidth = YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimension.Width), width)) + marginRow;
    } else {
        if (child.isLeadingPositionDefined(YGFlexDirection.Row) && child.isTrailingPosDefined(YGFlexDirection.Row)) {
            childWidth = node.getLayout().measuredDimensions[YGDimension.Width] -
                (node.getLeadingBorder(YGFlexDirection.Row) +
                    node.getTrailingBorder(YGFlexDirection.Row)) -
                YGUnwrapFloatOptional(child.getLeadingPosition(YGFlexDirection.Row, width).add(child.getTrailingPosition(YGFlexDirection.Row, width)));
            childWidth = YGNodeBoundAxis(child, YGFlexDirection.Row, childWidth, width, width);
        }
    }

    if (YGNodeIsStyleDimDefined(child, YGFlexDirection.Column, height)) {
        childHeight =
            YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimension.Height), height)) +
            marginColumn;
    } else {
        if (child.isLeadingPositionDefined(YGFlexDirection.Column) && child.isTrailingPosDefined(YGFlexDirection.Column)) {
            childHeight =
                node.getLayout().measuredDimensions[YGDimension.Height] -
                (node.getLeadingBorder(YGFlexDirection.Column) +
                    node.getTrailingBorder(YGFlexDirection.Column)) -
                YGUnwrapFloatOptional(
                    child.getLeadingPosition(YGFlexDirection.Column, height).add(
                        child.getTrailingPosition(YGFlexDirection.Column, height)));
            childHeight = YGNodeBoundAxis(child, YGFlexDirection.Column, childHeight, height, width);
        }
    } if (YGFloatIsUndefined(childWidth) ? !YGFloatIsUndefined(childHeight) : YGFloatIsUndefined(childHeight)) { // if( foo ? !bar : bar ) { XOR ^ REMOVED
        if (!child.getStyle().aspectRatio.isUndefined()) {
            if (YGFloatIsUndefined(childWidth)) {
                childWidth = marginRow + (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
            } else if (YGFloatIsUndefined(childHeight)) {
                childHeight = marginColumn + (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
            }
        }
    } if (YGFloatIsUndefined(childWidth) || YGFloatIsUndefined(childHeight)) {
        childWidthMeasureMode = YGFloatIsUndefined(childWidth) ? YGMeasureMode.Undefined : YGMeasureMode.Exactly;
        childHeightMeasureMode = YGFloatIsUndefined(childHeight) ? YGMeasureMode.Undefined : YGMeasureMode.Exactly;

        if (!isMainAxisRow && YGFloatIsUndefined(childWidth) && widthMode != YGMeasureMode.Undefined && !YGFloatIsUndefined(width) && width > 0) {
            childWidth = width;
            childWidthMeasureMode = YGMeasureMode.AtMost;
        }

        YGLayoutNodeInternal(child,
            childWidth,
            childHeight,
            direction,
            childWidthMeasureMode,
            childHeightMeasureMode,
            childWidth,
            childHeight,
            false,
            "abs-measure",
            config);

        childWidth = child.getLayout().measuredDimensions[YGDimension.Width] +
            YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Row, width));
        childHeight = child.getLayout().measuredDimensions[YGDimension.Height] +
            YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Column, width));
    }

    YGLayoutNodeInternal(child,
        childWidth,
        childHeight,
        direction,
        YGMeasureMode.Exactly,
        YGMeasureMode.Exactly,
        childWidth,
        childHeight,
        true,
        "abs-layout",
        config);

    if (child.isTrailingPosDefined(mainAxis) && !child.isLeadingPositionDefined(mainAxis)) {
        child.setLayoutPosition(
            node.getLayout().measuredDimensions[dim[mainAxis]] -
            child.getLayout().measuredDimensions[dim[mainAxis]] -
            node.getTrailingBorder(mainAxis) -
            YGUnwrapFloatOptional(child.getTrailingMargin(mainAxis, width)) -
            YGUnwrapFloatOptional(child.getTrailingPosition(
                mainAxis, isMainAxisRow ? width : height)),
            leading[mainAxis]);
    } else if (!child.isLeadingPositionDefined(mainAxis) && node.getStyle().justifyContent == YGJustify.Center) {
        child.setLayoutPosition(
            (node.getLayout().measuredDimensions[dim[mainAxis]] -
                child.getLayout().measuredDimensions[dim[mainAxis]]) /
            2.0,
            leading[mainAxis]);
    } else if (
        !child.isLeadingPositionDefined(mainAxis) && node.getStyle().justifyContent == YGJustify.FlexEnd) {
        child.setLayoutPosition(
            (node.getLayout().measuredDimensions[dim[mainAxis]] -
                child.getLayout().measuredDimensions[dim[mainAxis]]),
            leading[mainAxis]);
    }

    if (child.isTrailingPosDefined(crossAxis) && !child.isLeadingPositionDefined(crossAxis)) {
        child.setLayoutPosition(
            node.getLayout().measuredDimensions[dim[crossAxis]] -
            child.getLayout().measuredDimensions[dim[crossAxis]] -
            node.getTrailingBorder(crossAxis) -
            YGUnwrapFloatOptional(child.getTrailingMargin(crossAxis, width)) -
            YGUnwrapFloatOptional(child.getTrailingPosition(
                crossAxis, isMainAxisRow ? height : width)),
            leading[crossAxis]);

    } else if (!child.isLeadingPositionDefined(crossAxis) && YGNodeAlignItem(node, child) == YGAlign.Center) {
        child.setLayoutPosition(
            (node.getLayout().measuredDimensions[dim[crossAxis]] -
                child.getLayout().measuredDimensions[dim[crossAxis]]) /
            2.0,
            leading[crossAxis]);
    } else if (!child.isLeadingPositionDefined(crossAxis) &&
        ((YGNodeAlignItem(node, child) == YGAlign.FlexEnd) ? !(node.getStyle().flexWrap == YGWrap.WrapReverse) : (node.getStyle().flexWrap == YGWrap.WrapReverse))) { // XOR
        child.setLayoutPosition(
            (node.getLayout().measuredDimensions[dim[crossAxis]] -
                child.getLayout().measuredDimensions[dim[crossAxis]]),
            leading[crossAxis]);
    }
}

export function YGNodeWithMeasureFuncSetMeasuredDimensions(node: YGNode, availableWidth: number, availableHeight: number, widthMeasureMode: YGMeasureMode, heightMeasureMode: YGMeasureMode, ownerWidth: number, ownerHeight: number): void {
    //YGAssertWithNode(node, node.getMeasure() != null, "Expected node to have custom measure function");

    const paddingAndBorderAxisRow: number = YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Row, availableWidth);
    const paddingAndBorderAxisColumn: number = YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Column, availableWidth);
    const marginAxisRow: number = YGUnwrapFloatOptional(node.getMarginForAxis(YGFlexDirection.Row, availableWidth));
    const marginAxisColumn: number = YGUnwrapFloatOptional(node.getMarginForAxis(YGFlexDirection.Column, availableWidth));
    const innerWidth: number = YGFloatIsUndefined(availableWidth)
        ? availableWidth
        : YGFloatMax(0, availableWidth - marginAxisRow - paddingAndBorderAxisRow);
    const innerHeight: number = YGFloatIsUndefined(availableHeight)
        ? availableHeight
        : YGFloatMax(0, availableHeight - marginAxisColumn - paddingAndBorderAxisColumn);

    if (widthMeasureMode == YGMeasureMode.Exactly && heightMeasureMode == YGMeasureMode.Exactly) {
        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                YGFlexDirection.Row,
                availableWidth - marginAxisRow,
                ownerWidth,
                ownerWidth),
            YGDimension.Width);

        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                YGFlexDirection.Column,
                availableHeight - marginAxisColumn,
                ownerHeight,
                ownerWidth),
            YGDimension.Height);
    } else {

        const measuredSize: YGSize = node.getMeasure()(node, innerWidth, widthMeasureMode, innerHeight, heightMeasureMode);

        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                YGFlexDirection.Row,
                (widthMeasureMode == YGMeasureMode.Undefined ||
                    widthMeasureMode == YGMeasureMode.AtMost)
                    ? measuredSize.width + paddingAndBorderAxisRow
                    : availableWidth - marginAxisRow,
                ownerWidth,
                ownerWidth),
            YGDimension.Width);

        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                YGFlexDirection.Column,
                (heightMeasureMode == YGMeasureMode.Undefined ||
                    heightMeasureMode == YGMeasureMode.AtMost)
                    ? measuredSize.height + paddingAndBorderAxisColumn
                    : availableHeight - marginAxisColumn,
                ownerHeight,
                ownerWidth),
            YGDimension.Height);
    }
}

export function YGNodeEmptyContainerSetMeasuredDimensions(node: YGNode, availableHeight: number, availableWidth: number, widthMeasureMode: YGMeasureMode, heightMeasureMode: YGMeasureMode, ownerWidth: number, ownerHeight: number): void {
    const paddingAndBorderAxisRow: number = YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Row, ownerWidth);
    const paddingAndBorderAxisColumn: number = YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Column, ownerWidth);
    const marginAxisRow: number = YGUnwrapFloatOptional(node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
    const marginAxisColumn: number = YGUnwrapFloatOptional(node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Row,
            (widthMeasureMode == YGMeasureMode.Undefined ||
                widthMeasureMode == YGMeasureMode.AtMost)
                ? paddingAndBorderAxisRow
                : availableWidth - marginAxisRow,
            ownerWidth,
            ownerWidth),
        YGDimension.Width);

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Column,
            (heightMeasureMode == YGMeasureMode.Undefined ||
                heightMeasureMode == YGMeasureMode.AtMost)
                ? paddingAndBorderAxisColumn
                : availableHeight - marginAxisColumn,
            ownerHeight,
            ownerWidth),
        YGDimension.Height);
}

export function YGNodeFixedSizeSetMeasuredDimensions(node: YGNode, availableWidth: number, availableHeight: number, widthMeasureMode: YGMeasureMode, heightMeasureMode: YGMeasureMode, ownerWidth: number, ownerHeight: number) {
    if ((!YGFloatIsUndefined(availableWidth) && widthMeasureMode == YGMeasureMode.AtMost && availableWidth <= 0) ||
        (!YGFloatIsUndefined(availableHeight) && heightMeasureMode == YGMeasureMode.AtMost && availableHeight <= 0) ||
        (widthMeasureMode == YGMeasureMode.Exactly && heightMeasureMode == YGMeasureMode.Exactly)) {
        const marginAxisColumn: number = YGUnwrapFloatOptional(node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));
        const marginAxisRow: number = YGUnwrapFloatOptional(node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));

        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                YGFlexDirection.Row,
                YGFloatIsUndefined(availableWidth) ||
                    (widthMeasureMode == YGMeasureMode.AtMost && availableWidth < 0)
                    ? 0
                    : availableWidth - marginAxisRow,
                ownerWidth,
                ownerWidth),
            YGDimension.Width);

        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                YGFlexDirection.Column,
                YGFloatIsUndefined(availableHeight) ||
                    (heightMeasureMode == YGMeasureMode.AtMost && availableHeight < 0)
                    ? 0
                    : availableHeight - marginAxisColumn,
                ownerHeight,
                ownerWidth),
            YGDimension.Height);
        return true;
    }

    return false;
}

export function YGZeroOutLayoutRecursivly(node: YGNode): void {
    node.getLayout().clean()
    node.setHasNewLayout(true);
    node.cloneChildrenIfNeeded();

    const childCount: number = YGNodeGetChildCount(node);
    for (let i = 0; i < childCount; i++) {
        const child: YGNode = node.getChild(i);
        YGZeroOutLayoutRecursivly(child);
    }
}

export function YGNodeCalculateAvailableInnerDim(node: YGNode, axis: YGFlexDirection, availableDim: number, ownerDim: number): number {
    const direction: YGFlexDirection = YGFlexDirectionIsRow(axis) ? YGFlexDirection.Row : YGFlexDirection.Column;
    const dimension: YGDimension = YGFlexDirectionIsRow(axis) ? YGDimension.Width : YGDimension.Height;
    const margin: number = YGUnwrapFloatOptional(node.getMarginForAxis(direction, ownerDim));
    const paddingAndBorder: number = YGNodePaddingAndBorderForAxis(node, direction, ownerDim);

    let availableInnerDim: number = availableDim - margin - paddingAndBorder;
    if (!YGFloatIsUndefined(availableInnerDim)) {
        const minDimensionOptional: YGFloatOptional = YGResolveValue(node.getStyle().minDimensions[dimension], ownerDim);
        const minInnerDim: number = minDimensionOptional.isUndefined()
            ? 0.0
            : minDimensionOptional.getValue() - paddingAndBorder;

        const maxDimensionOptional: YGFloatOptional = YGResolveValue(node.getStyle().maxDimensions[dimension], ownerDim);

        const maxInnerDim: number = maxDimensionOptional.isUndefined()
            ? Number.MAX_VALUE
            : maxDimensionOptional.getValue() - paddingAndBorder;
        availableInnerDim = YGFloatMax(YGFloatMin(availableInnerDim, maxInnerDim), minInnerDim);
    }

    return availableInnerDim;
}

export function YGNodeComputeFlexBasisForChildren(
    node: YGNode,
    availableInnerWidth: number,
    availableInnerHeight: number,
    widthMeasureMode: YGMeasureMode,
    heightMeasureMode: YGMeasureMode,
    direction: YGDirection,
    mainAxis: YGFlexDirection,
    config: YGConfig,
    performLayout: boolean,
    totalOuterFlexBasis: number) {

    let singleFlexChild: YGNode = null;
    const children: Array<YGNode> = node.getChildren();
    const measureModeMainDim: YGMeasureMode = YGFlexDirectionIsRow(mainAxis) ? widthMeasureMode : heightMeasureMode;
    if (measureModeMainDim == YGMeasureMode.Exactly) {
        for (let i = 0; i < children.length; ++i) {
            const child: YGNode = children[i];
            if (singleFlexChild != null) {
                if (child.isNodeFlexible()) {

                    singleFlexChild = null;
                    break;
                }
            } else if (child.resolveFlexGrow() > 0.0 && child.resolveFlexShrink() > 0.0) {
                singleFlexChild = child;
            }
        }
    }

    for (let i = 0; i < children.length; ++i) {
        const child: YGNode = children[i];
        child.resolveDimension();
        if (child.getStyle().display == YGDisplay.None) {
            YGZeroOutLayoutRecursivly(child);
            child.setHasNewLayout(true);
            child.setDirty(false);
            continue;
        }
        if (performLayout) {

            const childDirection: YGDirection = child.resolveDirection(direction);
            const mainDim: number = YGFlexDirectionIsRow(mainAxis)
                ? availableInnerWidth
                : availableInnerHeight;
            const crossDim: number = YGFlexDirectionIsRow(mainAxis)
                ? availableInnerHeight
                : availableInnerWidth;
            child.setPosition(childDirection, mainDim, crossDim, availableInnerWidth);
        }

        if (child.getStyle().positionType == YGPositionType.Absolute) {
            continue;
        }
        if (child == singleFlexChild) {
            child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
            child.setLayoutComputedFlexBasis(new YGFloatOptional(0));
        } else {
            YGNodeComputeFlexBasisForChild(
                node,
                child,
                availableInnerWidth,
                widthMeasureMode,
                availableInnerHeight,
                availableInnerWidth,
                availableInnerHeight,
                heightMeasureMode,
                direction,
                config);
        }

        totalOuterFlexBasis += YGUnwrapFloatOptional(
            child.getLayout().computedFlexBasis.add(
                child.getMarginForAxis(mainAxis, availableInnerWidth)));
    }
}

export function YGCalculateCollectFlexItemsRowValues(
    node: YGNode,
    ownerDirection: YGDirection,
    mainAxisownerSize: number,
    availableInnerWidth: number,
    availableInnerMainDim: number,
    startOfLineIndex: number,
    lineCount: number): YGCollectFlexItemsRowValues {
    const flexAlgoRowMeasurement: YGCollectFlexItemsRowValues = new YGCollectFlexItemsRowValues();
    flexAlgoRowMeasurement.relativeChildren = new Array(node.getChildren().length);

    let sizeConsumedOnCurrentLineIncludingMinConstraint: number = 0;
    const mainAxis: YGFlexDirection = YGResolveFlexDirection(node.getStyle().flexDirection, node.resolveDirection(ownerDirection));
    const isNodeFlexWrap: boolean = node.getStyle().flexWrap != YGWrap.NoWrap;
    let endOfLineIndex = startOfLineIndex;
    for (; endOfLineIndex < node.getChildrenCount(); endOfLineIndex++) {
        const child: YGNode = node.getChild(endOfLineIndex);
        if (child.getStyle().display == YGDisplay.None ||
            child.getStyle().positionType == YGPositionType.Absolute) {
            continue;
        }
        child.setLineIndex(lineCount);

        const childMarginMainAxis: number = YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth));

        const flexBasisWithMinAndMaxConstraints: number =
            YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
                child,
                mainAxis,
                YGUnwrapFloatOptional(child.getLayout().computedFlexBasis),
                mainAxisownerSize));

        if (sizeConsumedOnCurrentLineIncludingMinConstraint +
            flexBasisWithMinAndMaxConstraints + childMarginMainAxis >
            availableInnerMainDim && isNodeFlexWrap && flexAlgoRowMeasurement.itemsOnLine > 0) {
            break;
        }

        sizeConsumedOnCurrentLineIncludingMinConstraint += flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
        flexAlgoRowMeasurement.sizeConsumedOnCurrentLine += flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
        flexAlgoRowMeasurement.itemsOnLine++;

        if (child.isNodeFlexible()) {
            flexAlgoRowMeasurement.totalFlexGrowFactors += child.resolveFlexGrow(); flexAlgoRowMeasurement.totalFlexShrinkScaledFactors +=
                -child.resolveFlexShrink() *
                YGUnwrapFloatOptional(child.getLayout().computedFlexBasis);
        }

        flexAlgoRowMeasurement.relativeChildren.push(child);
    } if (flexAlgoRowMeasurement.totalFlexGrowFactors > 0 &&
        flexAlgoRowMeasurement.totalFlexGrowFactors < 1) {
        flexAlgoRowMeasurement.totalFlexGrowFactors = 1;
    } if (flexAlgoRowMeasurement.totalFlexShrinkScaledFactors > 0 &&
        flexAlgoRowMeasurement.totalFlexShrinkScaledFactors < 1) {
        flexAlgoRowMeasurement.totalFlexShrinkScaledFactors = 1;
    }

    flexAlgoRowMeasurement.endOfLineIndex = endOfLineIndex;
    return flexAlgoRowMeasurement;
}

export function YGDistributeFreeSpaceSecondPass(
    collectedFlexItemsValues: YGCollectFlexItemsRowValues,
    node: YGNode,
    mainAxis: YGFlexDirection,
    crossAxis: YGFlexDirection,
    mainAxisownerSize: number,
    availableInnerMainDim: number,
    availableInnerCrossDim: number,
    availableInnerWidth: number,
    availableInnerHeight: number,
    flexBasisOverflows: boolean,
    measureModeCrossDim: YGMeasureMode,
    performLayout: boolean,
    config: YGConfig): number {
    let childFlexBasis: number = 0;
    let flexShrinkScaledFactor: number = 0;
    let flexGrowFactor: number = 0;
    let deltaFreeSpace: number = 0;
    let isMainAxisRow: boolean = YGFlexDirectionIsRow(mainAxis);
    let isNodeFlexWrap: boolean = node.getStyle().flexWrap != YGWrap.NoWrap;

    for (let i: number = 0; i < collectedFlexItemsValues.relativeChildren.length; ++i) {
        const currentRelativeChild: YGNode = collectedFlexItemsValues.relativeChildren[i]
        childFlexBasis = YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
            currentRelativeChild,
            mainAxis,
            YGUnwrapFloatOptional(
                currentRelativeChild.getLayout().computedFlexBasis),
            mainAxisownerSize));
        let updatedMainSize: number = childFlexBasis;

        if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) &&
            collectedFlexItemsValues.remainingFreeSpace < 0) {
            flexShrinkScaledFactor =
                -currentRelativeChild.resolveFlexShrink() * childFlexBasis;

            if (flexShrinkScaledFactor != 0) {
                let childSize: number;

                if (!YGFloatIsUndefined(
                    collectedFlexItemsValues.totalFlexShrinkScaledFactors) &&
                    collectedFlexItemsValues.totalFlexShrinkScaledFactors == 0) {
                    childSize = childFlexBasis + flexShrinkScaledFactor;
                } else {
                    childSize = childFlexBasis +
                        (collectedFlexItemsValues.remainingFreeSpace /
                            collectedFlexItemsValues.totalFlexShrinkScaledFactors) *
                        flexShrinkScaledFactor;
                }

                updatedMainSize = YGNodeBoundAxis(
                    currentRelativeChild,
                    mainAxis,
                    childSize,
                    availableInnerMainDim,
                    availableInnerWidth);
            }
        } else if (
            !YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) &&
            collectedFlexItemsValues.remainingFreeSpace > 0) {
            flexGrowFactor = currentRelativeChild.resolveFlexGrow();
            if (!YGFloatIsUndefined(flexGrowFactor) && flexGrowFactor != 0) {
                updatedMainSize = YGNodeBoundAxis(
                    currentRelativeChild,
                    mainAxis,
                    childFlexBasis +
                    collectedFlexItemsValues.remainingFreeSpace /
                    collectedFlexItemsValues.totalFlexGrowFactors *
                    flexGrowFactor,
                    availableInnerMainDim,
                    availableInnerWidth);
            }
        }

        deltaFreeSpace += updatedMainSize - childFlexBasis;

        const marginMain: number = YGUnwrapFloatOptional(
            currentRelativeChild.getMarginForAxis(mainAxis, availableInnerWidth));
        const marginCross: number = YGUnwrapFloatOptional(
            currentRelativeChild.getMarginForAxis(crossAxis, availableInnerWidth));

        let childCrossSize: number;
        let childMainSize: number = updatedMainSize + marginMain;
        let childCrossMeasureMode: YGMeasureMode;
        let childMainMeasureMode: YGMeasureMode = YGMeasureMode.Exactly;

        if (!currentRelativeChild.getStyle().aspectRatio.isUndefined()) {
            childCrossSize = isMainAxisRow ? (childMainSize - marginMain) /
                currentRelativeChild.getStyle().aspectRatio.getValue()
                : (childMainSize - marginMain) *
                currentRelativeChild.getStyle().aspectRatio.getValue();
            childCrossMeasureMode = YGMeasureMode.Exactly;

            childCrossSize += marginCross;
        } else if (
            !YGFloatIsUndefined(availableInnerCrossDim) &&
            !YGNodeIsStyleDimDefined(
                currentRelativeChild, crossAxis, availableInnerCrossDim) &&
            measureModeCrossDim == YGMeasureMode.Exactly &&
            !(isNodeFlexWrap && flexBasisOverflows) &&
            YGNodeAlignItem(node, currentRelativeChild) == YGAlign.Stretch &&
            currentRelativeChild.marginLeadingValue(crossAxis).unit !=
            YGUnit.Auto &&
            currentRelativeChild.marginTrailingValue(crossAxis).unit !=
            YGUnit.Auto) {
            childCrossSize = availableInnerCrossDim;
            childCrossMeasureMode = YGMeasureMode.Exactly;
        } else if (!YGNodeIsStyleDimDefined(
            currentRelativeChild, crossAxis, availableInnerCrossDim)) {
            childCrossSize = availableInnerCrossDim;
            childCrossMeasureMode = YGFloatIsUndefined(childCrossSize)
                ? YGMeasureMode.Undefined
                : YGMeasureMode.AtMost;
        } else {
            childCrossSize =
                YGUnwrapFloatOptional(YGResolveValue(
                    currentRelativeChild.getResolvedDimension(dim[crossAxis]),
                    availableInnerCrossDim)) +
                marginCross;
            const isLoosePercentageMeasurement: boolean =
                currentRelativeChild.getResolvedDimension(dim[crossAxis]).unit ==
                YGUnit.Percent
            measureModeCrossDim != YGMeasureMode.Exactly;
            childCrossMeasureMode =
                YGFloatIsUndefined(childCrossSize) || isLoosePercentageMeasurement
                    ? YGMeasureMode.Undefined
                    : YGMeasureMode.Exactly;
        }

        let childMainMeasureModeRef = { value: childMainMeasureMode }
        let childMainSizeRef = { value: childMainSize }
        let childCrossMeasureModeRef = { value: childCrossMeasureMode }
        let childCrossSizeRef = { value: childCrossSize }

        YGConstrainMaxSizeForMode(
            currentRelativeChild,
            mainAxis,
            availableInnerMainDim,
            availableInnerWidth,
            childMainMeasureModeRef,
            childMainSizeRef);
        YGConstrainMaxSizeForMode(
            currentRelativeChild,
            crossAxis,
            availableInnerCrossDim,
            availableInnerWidth,
            childCrossMeasureModeRef,
            childCrossSizeRef);

        childMainMeasureMode = childMainMeasureModeRef.value
        childMainSize = childMainSizeRef.value
        childCrossMeasureMode = childCrossMeasureModeRef.value
        childCrossSize = childCrossSizeRef.value

        const requiresStretchLayout: boolean =
            !YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim) &&
            YGNodeAlignItem(node, currentRelativeChild) == YGAlign.Stretch &&
            currentRelativeChild.marginLeadingValue(crossAxis).unit != YGUnit.Auto &&
            currentRelativeChild.marginTrailingValue(crossAxis).unit != YGUnit.Auto;

        const childWidth: number = isMainAxisRow ? childMainSize : childCrossSize;
        const childHeight: number = !isMainAxisRow ? childMainSize : childCrossSize;

        const childWidthMeasureMode: YGMeasureMode =
            isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
        const childHeightMeasureMode: YGMeasureMode =
            !isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;

        YGLayoutNodeInternal(
            currentRelativeChild,
            childWidth,
            childHeight,
            node.getLayout().direction,
            childWidthMeasureMode,
            childHeightMeasureMode,
            availableInnerWidth,
            availableInnerHeight,
            performLayout && !requiresStretchLayout,
            "flex",
            config);

        node.setLayoutHadOverflow(
            node.getLayout().hadOverflow ||
            currentRelativeChild.getLayout().hadOverflow);
    }

    return deltaFreeSpace;
}


export function YGDistributeFreeSpaceFirstPass(
    collectedFlexItemsValues: YGCollectFlexItemsRowValues,
    mainAxis: YGFlexDirection,
    mainAxisownerSize: number,
    availableInnerMainDim: number,
    availableInnerWidth: number): void {
    let flexShrinkScaledFactor: number = 0;
    let flexGrowFactor: number = 0;
    let baseMainSize: number = 0;
    let boundMainSize: number = 0;
    let deltaFreeSpace: number = 0;

    for (let i: number = 0; i < collectedFlexItemsValues.relativeChildren.length; ++i) {
        const currentRelativeChild: YGNode = collectedFlexItemsValues.relativeChildren[i]
        const childFlexBasis: number = YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
            currentRelativeChild,
            mainAxis,
            YGUnwrapFloatOptional(currentRelativeChild.getLayout().computedFlexBasis),
            mainAxisownerSize));

        if (collectedFlexItemsValues.remainingFreeSpace < 0) {
            flexShrinkScaledFactor =
                -currentRelativeChild.resolveFlexShrink() * childFlexBasis;
            if (!YGFloatIsUndefined(flexShrinkScaledFactor) &&
                flexShrinkScaledFactor != 0) {
                baseMainSize = childFlexBasis +
                    collectedFlexItemsValues.remainingFreeSpace /
                    collectedFlexItemsValues.totalFlexShrinkScaledFactors *
                    flexShrinkScaledFactor;
                boundMainSize = YGNodeBoundAxis(
                    currentRelativeChild,
                    mainAxis,
                    baseMainSize,
                    availableInnerMainDim,
                    availableInnerWidth);
                if (!YGFloatIsUndefined(baseMainSize) &&
                    !YGFloatIsUndefined(boundMainSize) &&
                    baseMainSize != boundMainSize) {
                    deltaFreeSpace += boundMainSize - childFlexBasis;
                    collectedFlexItemsValues.totalFlexShrinkScaledFactors -=
                        flexShrinkScaledFactor;
                }
            }
        } else if (
            !YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) &&
            collectedFlexItemsValues.remainingFreeSpace > 0) {
            flexGrowFactor = currentRelativeChild.resolveFlexGrow();
            if (!YGFloatIsUndefined(flexGrowFactor) && flexGrowFactor != 0) {
                baseMainSize = childFlexBasis +
                    collectedFlexItemsValues.remainingFreeSpace /
                    collectedFlexItemsValues.totalFlexGrowFactors * flexGrowFactor;
                boundMainSize = YGNodeBoundAxis(
                    currentRelativeChild,
                    mainAxis,
                    baseMainSize,
                    availableInnerMainDim,
                    availableInnerWidth);

                if (!YGFloatIsUndefined(baseMainSize) &&
                    !YGFloatIsUndefined(boundMainSize) &&
                    baseMainSize != boundMainSize) {
                    deltaFreeSpace += boundMainSize - childFlexBasis;
                    collectedFlexItemsValues.totalFlexGrowFactors -= flexGrowFactor;
                }
            }
        }
    }
    collectedFlexItemsValues.remainingFreeSpace -= deltaFreeSpace;
}

export function YGResolveFlexibleLength(
    node: YGNode,
    collectedFlexItemsValues: YGCollectFlexItemsRowValues,
    mainAxis: YGFlexDirection,
    crossAxis: YGFlexDirection,
    mainAxisownerSize: number,
    availableInnerMainDim: number,
    availableInnerCrossDim: number,
    availableInnerWidth: number,
    availableInnerHeight: number,
    flexBasisOverflows: boolean,
    measureModeCrossDim: YGMeasureMode,
    performLayout: boolean,
    config: YGConfig): void {
    const originalFreeSpace: number = collectedFlexItemsValues.remainingFreeSpace;

    YGDistributeFreeSpaceFirstPass(
        collectedFlexItemsValues,
        mainAxis,
        mainAxisownerSize,
        availableInnerMainDim,
        availableInnerWidth);

    const distributedFreeSpace: number = YGDistributeFreeSpaceSecondPass(
        collectedFlexItemsValues,
        node,
        mainAxis,
        crossAxis,
        mainAxisownerSize,
        availableInnerMainDim,
        availableInnerCrossDim,
        availableInnerWidth,
        availableInnerHeight,
        flexBasisOverflows,
        measureModeCrossDim,
        performLayout,
        config);

    collectedFlexItemsValues.remainingFreeSpace =
        originalFreeSpace - distributedFreeSpace;
}

export function YGJustifyMainAxis(
    node: YGNode,
    collectedFlexItemsValues: YGCollectFlexItemsRowValues,
    startOfLineIndex: number,
    mainAxis: YGFlexDirection,
    crossAxis: YGFlexDirection,
    measureModeMainDim: YGMeasureMode,
    measureModeCrossDim: YGMeasureMode,
    mainAxisownerSize: number,
    ownerWidth: number,
    availableInnerMainDim: number,
    availableInnerCrossDim: number,
    availableInnerWidth: number,
    performLayout: boolean): void {

    const style: YGStyle = node.getStyle();
    if (measureModeMainDim == YGMeasureMode.AtMost &&
        collectedFlexItemsValues.remainingFreeSpace > 0) {
        if (style.minDimensions[dim[mainAxis]].unit != YGUnit.Undefined &&
            !YGResolveValue(style.minDimensions[dim[mainAxis]], mainAxisownerSize)
                .isUndefined()) {
            collectedFlexItemsValues.remainingFreeSpace = YGFloatMax(
                0,
                YGUnwrapFloatOptional(YGResolveValue(
                    style.minDimensions[dim[mainAxis]], mainAxisownerSize)) -
                (availableInnerMainDim -
                    collectedFlexItemsValues.remainingFreeSpace));
        } else {
            collectedFlexItemsValues.remainingFreeSpace = 0;
        }
    }

    let numberOfAutoMarginsOnCurrentLine: number = 0;
    for (let i: number = startOfLineIndex;
        i < collectedFlexItemsValues.endOfLineIndex;
        i++) {
        const child: YGNode = node.getChild(i);
        if (child.getStyle().positionType == YGPositionType.Relative) {
            if (child.marginLeadingValue(mainAxis).unit == YGUnit.Auto) {
                numberOfAutoMarginsOnCurrentLine++;
            }
            if (child.marginTrailingValue(mainAxis).unit == YGUnit.Auto) {
                numberOfAutoMarginsOnCurrentLine++;
            }
        }
    }
    let leadingMainDim: number = 0;
    let betweenMainDim: number = 0;
    const justifyContent: YGJustify = node.getStyle().justifyContent;

    if (numberOfAutoMarginsOnCurrentLine == 0) {
        switch (justifyContent) {
            case YGJustify.Center:
                leadingMainDim = collectedFlexItemsValues.remainingFreeSpace / 2;
                break;
            case YGJustify.FlexEnd:
                leadingMainDim = collectedFlexItemsValues.remainingFreeSpace;
                break;
            case YGJustify.SpaceBetween:
                if (collectedFlexItemsValues.itemsOnLine > 1) {
                    betweenMainDim =
                        YGFloatMax(collectedFlexItemsValues.remainingFreeSpace, 0) /
                        (collectedFlexItemsValues.itemsOnLine - 1);
                } else {
                    betweenMainDim = 0;
                }
                break;
            case YGJustify.SpaceEvenly:

                betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
                    (collectedFlexItemsValues.itemsOnLine + 1);
                leadingMainDim = betweenMainDim;
                break;
            case YGJustify.SpaceAround:

                betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
                    collectedFlexItemsValues.itemsOnLine;
                leadingMainDim = betweenMainDim / 2;
                break;
            case YGJustify.FlexStart:
                break;
        }
    }

    const leadingPaddingAndBorderMain: number = YGUnwrapFloatOptional(
        node.getLeadingPaddingAndBorder(mainAxis, ownerWidth));
    collectedFlexItemsValues.mainDim =
        leadingPaddingAndBorderMain + leadingMainDim;
    collectedFlexItemsValues.crossDim = 0;

    for (let i: number = startOfLineIndex;
        i < collectedFlexItemsValues.endOfLineIndex;
        i++) {
        const child: YGNode = node.getChild(i);
        const childStyle: YGStyle = child.getStyle();
        const childLayout: YGLayout = child.getLayout();
        if (childStyle.display == YGDisplay.None) {
            continue;
        }
        if (childStyle.positionType == YGPositionType.Absolute &&
            child.isLeadingPositionDefined(mainAxis)) {
            if (performLayout) {
                child.setLayoutPosition(
                    YGUnwrapFloatOptional(
                        child.getLeadingPosition(mainAxis, availableInnerMainDim)) +
                    node.getLeadingBorder(mainAxis) +
                    YGUnwrapFloatOptional(
                        child.getLeadingMargin(mainAxis, availableInnerWidth)),
                    pos[mainAxis]);
            }
        } else {
            if (childStyle.positionType == YGPositionType.Relative) {
                if (child.marginLeadingValue(mainAxis).unit == YGUnit.Auto) {
                    collectedFlexItemsValues.mainDim +=
                        collectedFlexItemsValues.remainingFreeSpace /
                        numberOfAutoMarginsOnCurrentLine;
                }

                if (performLayout) {
                    child.setLayoutPosition(
                        childLayout.position[pos[mainAxis]] +
                        collectedFlexItemsValues.mainDim,
                        pos[mainAxis]);
                }

                if (child.marginTrailingValue(mainAxis).unit == YGUnit.Auto) {
                    collectedFlexItemsValues.mainDim +=
                        collectedFlexItemsValues.remainingFreeSpace /
                        numberOfAutoMarginsOnCurrentLine;
                }
                const canSkipFlex: boolean =
                    !performLayout && measureModeCrossDim == YGMeasureMode.Exactly;
                if (canSkipFlex) {
                    collectedFlexItemsValues.mainDim += betweenMainDim +
                        YGUnwrapFloatOptional(child.getMarginForAxis(
                            mainAxis, availableInnerWidth)) +
                        YGUnwrapFloatOptional(childLayout.computedFlexBasis);
                    collectedFlexItemsValues.crossDim = availableInnerCrossDim;
                } else {
                    collectedFlexItemsValues.mainDim += betweenMainDim +
                        YGNodeDimWithMargin(child, mainAxis, availableInnerWidth); collectedFlexItemsValues.crossDim = YGFloatMax(
                            collectedFlexItemsValues.crossDim,
                            YGNodeDimWithMargin(child, crossAxis, availableInnerWidth));
                }
            } else if (performLayout) {
                child.setLayoutPosition(
                    childLayout.position[pos[mainAxis]] +
                    node.getLeadingBorder(mainAxis) + leadingMainDim,
                    pos[mainAxis]);
            }
        }
    }
    collectedFlexItemsValues.mainDim += YGUnwrapFloatOptional(
        node.getTrailingPaddingAndBorder(mainAxis, ownerWidth));
}

export function YGNodelayoutImpl(node: YGNode,
    availableWidth: number,
    availableHeight: number,
    ownerDirection: YGDirection,
    widthMeasureMode: YGMeasureMode,
    heightMeasureMode: YGMeasureMode,
    ownerWidth: number,
    ownerHeight: number,
    performLayout: boolean,
    config: YGConfig): void {

    // YGAssertWithNode(node,YGFloatIsUndefined(availableWidth) ? widthMeasureMode == YGMeasureMode.Undefined
    //         : true,
    //     "availableWidth is indefinite so widthMeasureMode must be "
    //                "YGMeasureMode.Undefined");
    // YGAssertWithNode(node,
    //     YGFloatIsUndefined(availableHeight) ? heightMeasureMode == YGMeasureMode.Undefined
    //         : true,
    //     "availableHeight is indefinite so heightMeasureMode must be "
    //                "YGMeasureMode.Undefined");

    const direction: YGDirection = node.resolveDirection(ownerDirection);
    node.setLayoutDirection(direction);

    const flexRowDirection: YGFlexDirection = YGResolveFlexDirection(YGFlexDirection.Row, direction);
    const flexColumnDirection: YGFlexDirection = YGResolveFlexDirection(YGFlexDirection.Column, direction);

    node.setLayoutMargin(
        YGUnwrapFloatOptional(
            node.getLeadingMargin(flexRowDirection, ownerWidth)),
        YGEdge.Start);
    node.setLayoutMargin(
        YGUnwrapFloatOptional(
            node.getTrailingMargin(flexRowDirection, ownerWidth)),
        YGEdge.End);
    node.setLayoutMargin(
        YGUnwrapFloatOptional(
            node.getLeadingMargin(flexColumnDirection, ownerWidth)),
        YGEdge.Top);
    node.setLayoutMargin(
        YGUnwrapFloatOptional(
            node.getTrailingMargin(flexColumnDirection, ownerWidth)),
        YGEdge.Bottom);

    node.setLayoutBorder(node.getLeadingBorder(flexRowDirection), YGEdge.Start);
    node.setLayoutBorder(node.getTrailingBorder(flexRowDirection), YGEdge.End);
    node.setLayoutBorder(node.getLeadingBorder(flexColumnDirection), YGEdge.Top);
    node.setLayoutBorder(node.getTrailingBorder(flexColumnDirection), YGEdge.Bottom);

    node.setLayoutPadding(
        YGUnwrapFloatOptional(
            node.getLeadingPadding(flexRowDirection, ownerWidth)),
        YGEdge.Start);
    node.setLayoutPadding(
        YGUnwrapFloatOptional(
            node.getTrailingPadding(flexRowDirection, ownerWidth)),
        YGEdge.End);
    node.setLayoutPadding(
        YGUnwrapFloatOptional(
            node.getLeadingPadding(flexColumnDirection, ownerWidth)),
        YGEdge.Top);
    node.setLayoutPadding(
        YGUnwrapFloatOptional(
            node.getTrailingPadding(flexColumnDirection, ownerWidth)),
        YGEdge.Bottom);

    if (node.getMeasure() != null) {
        YGNodeWithMeasureFuncSetMeasuredDimensions(node,
            availableWidth,
            availableHeight,
            widthMeasureMode,
            heightMeasureMode,
            ownerWidth,
            ownerHeight);
        return;
    }

    const childCount: number = YGNodeGetChildCount(node);
    if (childCount == 0) {
        YGNodeEmptyContainerSetMeasuredDimensions(node,
            availableWidth,
            availableHeight,
            widthMeasureMode,
            heightMeasureMode,
            ownerWidth,
            ownerHeight);
        return;
    }
    if (!performLayout && YGNodeFixedSizeSetMeasuredDimensions(node,
        availableWidth,
        availableHeight,
        widthMeasureMode,
        heightMeasureMode,
        ownerWidth,
        ownerHeight)) {
        return;
    }

    node.cloneChildrenIfNeeded();
    node.setLayoutHadOverflow(false);
    const mainAxis: YGFlexDirection = YGResolveFlexDirection(node.getStyle().flexDirection, direction);
    const crossAxis: YGFlexDirection = YGFlexDirectionCross(mainAxis, direction);
    const isMainAxisRow: boolean = YGFlexDirectionIsRow(mainAxis);
    const isNodeFlexWrap: boolean = node.getStyle().flexWrap != YGWrap.NoWrap;

    const mainAxisownerSize: number = isMainAxisRow ? ownerWidth : ownerHeight;
    const crossAxisownerSize: number = isMainAxisRow ? ownerHeight : ownerWidth;

    const leadingPaddingAndBorderCross: number = YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(crossAxis, ownerWidth));
    const paddingAndBorderAxisMain: number = YGNodePaddingAndBorderForAxis(node, mainAxis, ownerWidth);
    const paddingAndBorderAxisCross: number = YGNodePaddingAndBorderForAxis(node, crossAxis, ownerWidth);

    let measureModeMainDim: YGMeasureMode = isMainAxisRow ? widthMeasureMode : heightMeasureMode;
    let measureModeCrossDim: YGMeasureMode = isMainAxisRow ? heightMeasureMode : widthMeasureMode;

    const paddingAndBorderAxisRow: number =
        isMainAxisRow ? paddingAndBorderAxisMain : paddingAndBorderAxisCross;
    const paddingAndBorderAxisColumn: number =
        isMainAxisRow ? paddingAndBorderAxisCross : paddingAndBorderAxisMain;

    const marginAxisRow: number = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
    const marginAxisColumn: number = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

    const minInnerWidth: number =
        YGUnwrapFloatOptional(YGResolveValue(node.getStyle().minDimensions[YGDimension.Width], ownerWidth)) -
        paddingAndBorderAxisRow;
    const maxInnerWidth: number =
        YGUnwrapFloatOptional(YGResolveValue(node.getStyle().maxDimensions[YGDimension.Width], ownerWidth)) -
        paddingAndBorderAxisRow;
    const minInnerHeight: number =
        YGUnwrapFloatOptional(YGResolveValue(node.getStyle().minDimensions[YGDimension.Height], ownerHeight)) -
        paddingAndBorderAxisColumn;
    const maxInnerHeight: number =
        YGUnwrapFloatOptional(YGResolveValue(
            node.getStyle().maxDimensions[YGDimension.Height], ownerHeight)) -
        paddingAndBorderAxisColumn;

    const minInnerMainDim: number = isMainAxisRow ? minInnerWidth : minInnerHeight;
    const maxInnerMainDim: number = isMainAxisRow ? maxInnerWidth : maxInnerHeight;
    const availableInnerWidth: number = YGNodeCalculateAvailableInnerDim(
        node, YGFlexDirection.Row, availableWidth, ownerWidth);
    const availableInnerHeight: number = YGNodeCalculateAvailableInnerDim(
        node, YGFlexDirection.Column, availableHeight, ownerHeight);

    let availableInnerMainDim: number =
        isMainAxisRow ? availableInnerWidth : availableInnerHeight;
    let availableInnerCrossDim: number =
        isMainAxisRow ? availableInnerHeight : availableInnerWidth;

    const totalOuterFlexBasis: number = 0;

    YGNodeComputeFlexBasisForChildren(
        node,
        availableInnerWidth,
        availableInnerHeight,
        widthMeasureMode,
        heightMeasureMode,
        direction,
        mainAxis,
        config,
        performLayout,
        totalOuterFlexBasis);

    const flexBasisOverflows: boolean = measureModeMainDim == YGMeasureMode.Undefined
        ? false
        : totalOuterFlexBasis > availableInnerMainDim;
    if (isNodeFlexWrap && flexBasisOverflows &&
        measureModeMainDim == YGMeasureMode.AtMost) {
        measureModeMainDim = YGMeasureMode.Exactly;
    }

    let startOfLineIndex: number = 0;
    let endOfLineIndex: number = 0;
    let lineCount: number = 0;
    let totalLineCrossDim: number = 0;
    let maxLineMainDim: number = 0;

    let collectedFlexItemsValues: YGCollectFlexItemsRowValues;
    for (; endOfLineIndex < childCount;
        lineCount++ , startOfLineIndex = endOfLineIndex) {
        collectedFlexItemsValues = YGCalculateCollectFlexItemsRowValues(
            node,
            ownerDirection,
            mainAxisownerSize,
            availableInnerWidth,
            availableInnerMainDim,
            startOfLineIndex,
            lineCount);
        endOfLineIndex = collectedFlexItemsValues.endOfLineIndex;
        const canSkipFlex: boolean = !performLayout && measureModeCrossDim == YGMeasureMode.Exactly;
        let sizeBasedOnContent: boolean = false;

        if (measureModeMainDim != YGMeasureMode.Exactly) {
            if (!YGFloatIsUndefined(minInnerMainDim) &&
                collectedFlexItemsValues.sizeConsumedOnCurrentLine <
                minInnerMainDim) {
                availableInnerMainDim = minInnerMainDim;
            } else if (
                !YGFloatIsUndefined(maxInnerMainDim) &&
                collectedFlexItemsValues.sizeConsumedOnCurrentLine >
                maxInnerMainDim) {
                availableInnerMainDim = maxInnerMainDim;
            } else {
                if (!node.getConfig().useLegacyStretchBehaviour &&
                    ((YGFloatIsUndefined(
                        collectedFlexItemsValues.totalFlexGrowFactors) &&
                        collectedFlexItemsValues.totalFlexGrowFactors == 0) ||
                        (YGFloatIsUndefined(node.resolveFlexGrow()) &&
                            node.resolveFlexGrow() == 0))) {
                    availableInnerMainDim =
                        collectedFlexItemsValues.sizeConsumedOnCurrentLine;
                }

                if (node.getConfig().useLegacyStretchBehaviour) {
                    node.setLayoutDidUseLegacyFlag(true);
                }
                sizeBasedOnContent = !node.getConfig().useLegacyStretchBehaviour;
            }
        }

        if (!sizeBasedOnContent && !YGFloatIsUndefined(availableInnerMainDim)) {
            collectedFlexItemsValues.remainingFreeSpace = availableInnerMainDim -
                collectedFlexItemsValues.sizeConsumedOnCurrentLine;
        } else if (collectedFlexItemsValues.sizeConsumedOnCurrentLine < 0) {
            collectedFlexItemsValues.remainingFreeSpace =
                -collectedFlexItemsValues.sizeConsumedOnCurrentLine;
        }

        if (!canSkipFlex) {
            YGResolveFlexibleLength(
                node,
                collectedFlexItemsValues,
                mainAxis,
                crossAxis,
                mainAxisownerSize,
                availableInnerMainDim,
                availableInnerCrossDim,
                availableInnerWidth,
                availableInnerHeight,
                flexBasisOverflows,
                measureModeCrossDim,
                performLayout,
                config);
        }

        node.setLayoutHadOverflow(
            node.getLayout().hadOverflow ||
            (collectedFlexItemsValues.remainingFreeSpace < 0));

        YGJustifyMainAxis(
            node,
            collectedFlexItemsValues,
            startOfLineIndex,
            mainAxis,
            crossAxis,
            measureModeMainDim,
            measureModeCrossDim,
            mainAxisownerSize,
            ownerWidth,
            availableInnerMainDim,
            availableInnerCrossDim,
            availableInnerWidth,
            performLayout);

        let containerCrossAxis: number = availableInnerCrossDim;
        if (measureModeCrossDim == YGMeasureMode.Undefined ||
            measureModeCrossDim == YGMeasureMode.AtMost) {

            containerCrossAxis =
                YGNodeBoundAxis(
                    node,
                    crossAxis,
                    collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross,
                    crossAxisownerSize,
                    ownerWidth) -
                paddingAndBorderAxisCross;
        }

        if (!isNodeFlexWrap && measureModeCrossDim == YGMeasureMode.Exactly) {
            collectedFlexItemsValues.crossDim = availableInnerCrossDim;
        }

        collectedFlexItemsValues.crossDim =
            YGNodeBoundAxis(
                node,
                crossAxis,
                collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross,
                crossAxisownerSize,
                ownerWidth) -
            paddingAndBorderAxisCross;

        if (performLayout) {
            for (let i = startOfLineIndex; i < endOfLineIndex; i++) {
                const child: YGNode = node.getChild(i);
                if (child.getStyle().display == YGDisplay.None) {
                    continue;
                }
                if (child.getStyle().positionType == YGPositionType.Absolute) {
                    const isChildLeadingPosDefined: boolean =
                        child.isLeadingPositionDefined(crossAxis);
                    if (isChildLeadingPosDefined) {
                        child.setLayoutPosition(
                            YGUnwrapFloatOptional(child.getLeadingPosition(
                                crossAxis, availableInnerCrossDim)) +
                            node.getLeadingBorder(crossAxis) +
                            YGUnwrapFloatOptional(child.getLeadingMargin(
                                crossAxis, availableInnerWidth)),
                            pos[crossAxis]);
                    }

                    if (!isChildLeadingPosDefined ||
                        YGFloatIsUndefined(child.getLayout().position[pos[crossAxis]])) {
                        child.setLayoutPosition(
                            node.getLeadingBorder(crossAxis) +
                            YGUnwrapFloatOptional(child.getLeadingMargin(
                                crossAxis, availableInnerWidth)),
                            pos[crossAxis]);
                    }
                } else {
                    let leadingCrossDim: number = leadingPaddingAndBorderCross;
                    const alignItem: YGAlign = YGNodeAlignItem(node, child);
                    if (alignItem == YGAlign.Stretch &&
                        child.marginLeadingValue(crossAxis).unit != YGUnit.Auto &&
                        child.marginTrailingValue(crossAxis).unit != YGUnit.Auto) {
                        if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
                            let childMainSize: number =
                                child.getLayout().measuredDimensions[dim[mainAxis]];
                            let childCrossSize: number =
                                !child.getStyle().aspectRatio.isUndefined()
                                    ? ((YGUnwrapFloatOptional(child.getMarginForAxis(
                                        crossAxis, availableInnerWidth)) +
                                        (isMainAxisRow ? childMainSize /
                                            child.getStyle().aspectRatio.getValue()
                                            : childMainSize *
                                            child.getStyle().aspectRatio.getValue())))
                                    : collectedFlexItemsValues.crossDim;

                            childMainSize += YGUnwrapFloatOptional(
                                child.getMarginForAxis(mainAxis, availableInnerWidth));

                            let childMainMeasureMode: YGMeasureMode = YGMeasureMode.Exactly;
                            let childCrossMeasureMode: YGMeasureMode = YGMeasureMode.Exactly;

                            let childMainMeasureModeRef = { value: childMainMeasureMode }
                            let childMainSizeRef = { value: childMainSize }
                            let childCrossMeasureModeRef = { value: childCrossMeasureMode }
                            let childCrossSizeRef = { value: childCrossSize }

                            YGConstrainMaxSizeForMode(child,
                                mainAxis,
                                availableInnerMainDim,
                                availableInnerWidth,
                                childMainMeasureModeRef,
                                childMainSizeRef);
                            YGConstrainMaxSizeForMode(child,
                                crossAxis,
                                availableInnerCrossDim,
                                availableInnerWidth,
                                childCrossMeasureModeRef,
                                childCrossSizeRef);

                            childMainMeasureMode = childMainMeasureModeRef.value
                            childMainSize = childMainSizeRef.value
                            childCrossMeasureMode = childCrossMeasureModeRef.value
                            childCrossSize = childCrossSizeRef.value

                            const childWidth: number = isMainAxisRow ? childMainSize : childCrossSize;
                            const childHeight: number = !isMainAxisRow ? childMainSize : childCrossSize;

                            const childWidthMeasureMode: YGMeasureMode =
                                YGFloatIsUndefined(childWidth) ? YGMeasureMode.Undefined
                                    : YGMeasureMode.Exactly;
                            const childHeightMeasureMode: YGMeasureMode =
                                YGFloatIsUndefined(childHeight) ? YGMeasureMode.Undefined
                                    : YGMeasureMode.Exactly;

                            YGLayoutNodeInternal(
                                child,
                                childWidth,
                                childHeight,
                                direction,
                                childWidthMeasureMode,
                                childHeightMeasureMode,
                                availableInnerWidth,
                                availableInnerHeight,
                                true,
                                "stretch",
                                config);
                        }
                    } else {
                        const remainingCrossDim: number = containerCrossAxis -
                            YGNodeDimWithMargin(child, crossAxis, availableInnerWidth);

                        if (child.marginLeadingValue(crossAxis).unit == YGUnit.Auto &&
                            child.marginTrailingValue(crossAxis).unit == YGUnit.Auto) {
                            leadingCrossDim += YGFloatMax(0.0, remainingCrossDim / 2);
                        } else if (
                            child.marginTrailingValue(crossAxis).unit == YGUnit.Auto) {

                        } else if (
                            child.marginLeadingValue(crossAxis).unit == YGUnit.Auto) {
                            leadingCrossDim += YGFloatMax(0.0, remainingCrossDim);
                        } else if (alignItem == YGAlign.FlexStart) {
                            // NO=OP
                        } else if (alignItem == YGAlign.Center) {
                            leadingCrossDim += remainingCrossDim / 2;
                        } else {
                            leadingCrossDim += remainingCrossDim;
                        }
                    }

                    child.setLayoutPosition(
                        child.getLayout().position[pos[crossAxis]] + totalLineCrossDim +
                        leadingCrossDim,
                        pos[crossAxis]);
                }
            }
        }

        totalLineCrossDim += collectedFlexItemsValues.crossDim;
        maxLineMainDim = YGFloatMax(maxLineMainDim, collectedFlexItemsValues.mainDim);
    }
    if (performLayout && (lineCount > 1 || YGIsBaselineLayout(node)) &&
        !YGFloatIsUndefined(availableInnerCrossDim)) {
        const remainingAlignContentDim: number = availableInnerCrossDim - totalLineCrossDim;

        let crossDimLead: number = 0;
        let currentLead: number = leadingPaddingAndBorderCross;

        switch (node.getStyle().alignContent) {
            case YGAlign.FlexEnd:
                currentLead += remainingAlignContentDim;
                break;
            case YGAlign.Center:
                currentLead += remainingAlignContentDim / 2;
                break;
            case YGAlign.Stretch:
                if (availableInnerCrossDim > totalLineCrossDim) {
                    crossDimLead = remainingAlignContentDim / lineCount;
                }
                break;
            case YGAlign.SpaceAround:
                if (availableInnerCrossDim > totalLineCrossDim) {
                    currentLead += remainingAlignContentDim / (2 * lineCount);
                    if (lineCount > 1) {
                        crossDimLead = remainingAlignContentDim / lineCount;
                    }
                } else {
                    currentLead += remainingAlignContentDim / 2;
                }
                break;
            case YGAlign.SpaceBetween:
                if (availableInnerCrossDim > totalLineCrossDim && lineCount > 1) {
                    crossDimLead = remainingAlignContentDim / (lineCount - 1);
                }
                break;
            case YGAlign.Auto:
            case YGAlign.FlexStart:
            case YGAlign.Baseline:
                break;
        }

        let endIndex: number = 0;
        for (let i: number = 0; i < lineCount; i++) {
            let startIndex: number = endIndex;
            let ii: number;
            let lineHeight: number = 0;
            let maxAscentForCurrentLine: number = 0;
            let maxDescentForCurrentLine: number = 0;

            for (ii = startIndex; ii < childCount; ii++) {
                const child: YGNode = node.getChild(ii);
                if (child.getStyle().display == YGDisplay.None) {
                    continue;
                }
                if (child.getStyle().positionType == YGPositionType.Relative) {
                    if (child.getLineIndex() != i) {
                        break;
                    }
                    if (YGNodeIsLayoutDimDefined(child, crossAxis)) {
                        lineHeight = YGFloatMax(
                            lineHeight,
                            child.getLayout().measuredDimensions[dim[crossAxis]] +
                            YGUnwrapFloatOptional(child.getMarginForAxis(
                                crossAxis, availableInnerWidth)));
                    }
                    if (YGNodeAlignItem(node, child) == YGAlign.Baseline) {
                        const ascent: number = YGBaseline(child) +
                            YGUnwrapFloatOptional(child.getLeadingMargin(
                                YGFlexDirection.Column, availableInnerWidth));
                        const descent: number =
                            child.getLayout().measuredDimensions[YGDimension.Height] +
                            YGUnwrapFloatOptional(child.getMarginForAxis(
                                YGFlexDirection.Column, availableInnerWidth)) -
                            ascent;
                        maxAscentForCurrentLine =
                            YGFloatMax(maxAscentForCurrentLine, ascent);
                        maxDescentForCurrentLine =
                            YGFloatMax(maxDescentForCurrentLine, descent);
                        lineHeight = YGFloatMax(
                            lineHeight, maxAscentForCurrentLine + maxDescentForCurrentLine);
                    }
                }
            }
            endIndex = ii;
            lineHeight += crossDimLead;

            if (performLayout) {
                for (ii = startIndex; ii < endIndex; ii++) {
                    const child: YGNode = node.getChild(ii);
                    if (child.getStyle().display == YGDisplay.None) {
                        continue;
                    }
                    if (child.getStyle().positionType == YGPositionType.Relative) {
                        switch (YGNodeAlignItem(node, child)) {
                            case YGAlign.FlexStart: {
                                child.setLayoutPosition(
                                    currentLead +
                                    YGUnwrapFloatOptional(child.getLeadingMargin(
                                        crossAxis, availableInnerWidth)),
                                    pos[crossAxis]);
                                break;
                            }
                            case YGAlign.FlexEnd: {
                                child.setLayoutPosition(
                                    currentLead + lineHeight -
                                    YGUnwrapFloatOptional(child.getTrailingMargin(
                                        crossAxis, availableInnerWidth)) -
                                    child.getLayout().measuredDimensions[dim[crossAxis]],
                                    pos[crossAxis]);
                                break;
                            }
                            case YGAlign.Center: {
                                const childHeight: number =
                                    child.getLayout().measuredDimensions[dim[crossAxis]];

                                child.setLayoutPosition(
                                    currentLead + (lineHeight - childHeight) / 2,
                                    pos[crossAxis]);
                                break;
                            }
                            case YGAlign.Stretch: {
                                child.setLayoutPosition(
                                    currentLead +
                                    YGUnwrapFloatOptional(child.getLeadingMargin(
                                        crossAxis, availableInnerWidth)),
                                    pos[crossAxis]);

                                if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
                                    const childWidth: number = isMainAxisRow
                                        ? (child.getLayout()
                                            .measuredDimensions[YGDimension.Width] +
                                            YGUnwrapFloatOptional(child.getMarginForAxis(
                                                mainAxis, availableInnerWidth)))
                                        : lineHeight;

                                    const childHeight: number = !isMainAxisRow
                                        ? (child.getLayout()
                                            .measuredDimensions[YGDimension.Height] +
                                            YGUnwrapFloatOptional(child.getMarginForAxis(
                                                crossAxis, availableInnerWidth)))
                                        : lineHeight;

                                    if (!(YGFloatsEqual(
                                        childWidth,
                                        child.getLayout()
                                            .measuredDimensions[YGDimension.Width]) &&
                                        YGFloatsEqual(
                                            childHeight,
                                            child.getLayout()
                                                .measuredDimensions[YGDimension.Height]))) {
                                        YGLayoutNodeInternal(child,
                                            childWidth,
                                            childHeight,
                                            direction,
                                            YGMeasureMode.Exactly,
                                            YGMeasureMode.Exactly,
                                            availableInnerWidth,
                                            availableInnerHeight,
                                            true,
                                            "multiline-stretch",
                                            config);
                                    }
                                }
                                break;
                            }
                            case YGAlign.Baseline: {
                                child.setLayoutPosition(
                                    currentLead + maxAscentForCurrentLine - YGBaseline(child) +
                                    YGUnwrapFloatOptional(child.getLeadingPosition(
                                        YGFlexDirection.Column, availableInnerCrossDim)),
                                    YGEdge.Top);

                                break;
                            }
                            case YGAlign.Auto:
                            case YGAlign.SpaceBetween:
                            case YGAlign.SpaceAround:
                                break;
                        }
                    }
                }
            }

            currentLead += lineHeight;
        }
    }

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Row,
            availableWidth - marginAxisRow,
            ownerWidth,
            ownerWidth),
        YGDimension.Width);

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Column,
            availableHeight - marginAxisColumn,
            ownerHeight,
            ownerWidth),
        YGDimension.Height);

    if (measureModeMainDim == YGMeasureMode.Undefined ||
        (node.getStyle().overflow != YGOverflow.Scroll &&
            measureModeMainDim == YGMeasureMode.AtMost)) {
        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node, mainAxis, maxLineMainDim, mainAxisownerSize, ownerWidth),
            dim[mainAxis]);

    } else if (
        measureModeMainDim == YGMeasureMode.AtMost &&
        node.getStyle().overflow == YGOverflow.Scroll) {
        node.setLayoutMeasuredDimension(
            YGFloatMax(
                YGFloatMin(
                    availableInnerMainDim + paddingAndBorderAxisMain,
                    YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
                        node, mainAxis, maxLineMainDim, mainAxisownerSize))),
                paddingAndBorderAxisMain),
            dim[mainAxis]);
    }

    if (measureModeCrossDim == YGMeasureMode.Undefined ||
        (node.getStyle().overflow != YGOverflow.Scroll &&
            measureModeCrossDim == YGMeasureMode.AtMost)) {
        node.setLayoutMeasuredDimension(
            YGNodeBoundAxis(
                node,
                crossAxis,
                totalLineCrossDim + paddingAndBorderAxisCross,
                crossAxisownerSize,
                ownerWidth),
            dim[crossAxis]);

    } else if (
        measureModeCrossDim == YGMeasureMode.AtMost &&
        node.getStyle().overflow == YGOverflow.Scroll) {
        node.setLayoutMeasuredDimension(
            YGFloatMax(
                YGFloatMin(
                    availableInnerCrossDim + paddingAndBorderAxisCross,
                    YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
                        node,
                        crossAxis,
                        totalLineCrossDim + paddingAndBorderAxisCross,
                        crossAxisownerSize))),
                paddingAndBorderAxisCross),
            dim[crossAxis]);
    } if (performLayout && node.getStyle().flexWrap == YGWrap.WrapReverse) {
        for (let i: number = 0; i < childCount; i++) {
            const child: YGNode = YGNodeGetChild(node, i);
            if (child.getStyle().positionType == YGPositionType.Relative) {
                child.setLayoutPosition(
                    node.getLayout().measuredDimensions[dim[crossAxis]] -
                    child.getLayout().position[pos[crossAxis]] -
                    child.getLayout().measuredDimensions[dim[crossAxis]],
                    pos[crossAxis]);
            }
        }
    }

    if (performLayout) {
        const children: Array<YGNode> = node.getChildren();
        for (let i = 0; i < children.length; ++i) {
            const child: YGNode = children[i];

            if (child.getStyle().positionType != YGPositionType.Absolute) {
                continue;
            }

            YGNodeAbsoluteLayoutChild(
                node,
                child,
                availableInnerWidth,
                isMainAxisRow ? measureModeMainDim : measureModeCrossDim,
                availableInnerHeight,
                direction,
                config);
        }

        const needsMainTrailingPos: boolean =
            mainAxis == YGFlexDirection.RowReverse || mainAxis == YGFlexDirection.ColumnReverse;
        const needsCrossTrailingPos: boolean =
            crossAxis == YGFlexDirection.RowReverse || crossAxis == YGFlexDirection.ColumnReverse;

        if (needsMainTrailingPos || needsCrossTrailingPos) {
            for (let i = 0; i < childCount; i++) {
                const child: YGNode = node.getChild(i);
                if (child.getStyle().display == YGDisplay.None) {
                    continue;
                }

                if (needsMainTrailingPos) {
                    YGNodeSetChildTrailingPosition(node, child, mainAxis);
                }

                if (needsCrossTrailingPos) {
                    YGNodeSetChildTrailingPosition(node, child, crossAxis);
                }
            }
        }
    }
}


let gDepth: number = 0;
let gPrintTree: boolean = false;
let gPrintChanges: boolean = false;
let gPrintSkips: boolean = false;
const spacer: string = "                                                            ";

export function YGSpacer(level: number): string {
    const spacerLen: number = spacer.length;
    if (level > spacerLen) {
        return spacer;
    } else {
        return spacer.substr(spacerLen - level);
    }
}


export function YGMeasureModeName(mode: YGMeasureMode, performLayout: boolean): string {
    const kMeasureModeNames: Array<string> = ["UNDEFINED", "EXACTLY", "AT_MOST"];
    const kLayoutModeNames: Array<string> = ["LAY_UNDEFINED", "LAY_EXACTLY", "LAY_AT_", "MOST"];

    if (mode >= YGMeasureModeCount) {
        return "";
    }

    return performLayout ? kLayoutModeNames[mode] : kMeasureModeNames[mode];
}

export function YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(
    sizeMode: YGMeasureMode,
    size: number,
    lastComputedSize: number): boolean {
    return sizeMode == YGMeasureMode.Exactly && YGFloatsEqual(size, lastComputedSize);
}

export function YGMeasureModeOldSizeIsUnspecifiedAndStillFits(
    sizeMode: YGMeasureMode,
    size: number,
    lastSizeMode: YGMeasureMode,
    lastComputedSize: number) {
    return sizeMode == YGMeasureMode.AtMost && lastSizeMode == YGMeasureMode.Undefined &&
        (size >= lastComputedSize || YGFloatsEqual(size, lastComputedSize));
}

export function YGMeasureModeNewMeasureSizeIsStricterAndStillValid(
    sizeMode: YGMeasureMode,
    size: number,
    lastSizeMode: YGMeasureMode,
    lastSize: number,
    lastComputedSize: number): boolean {
    return lastSizeMode == YGMeasureMode.AtMost &&
        sizeMode == YGMeasureMode.AtMost && !YGFloatIsUndefined(lastSize) &&
        !YGFloatIsUndefined(size) && !YGFloatIsUndefined(lastComputedSize) &&
        lastSize > size &&
        (lastComputedSize <= size || YGFloatsEqual(size, lastComputedSize));
}

export function YGRoundValueToPixelGrid(value: number,
    pointScaleFactor: number,
    forceCeil: boolean,
    forceFloor: boolean) {

    let scaledValue: number = value * pointScaleFactor;
    const fractial: number = scaledValue % 1.0;

    if (YGFloatsEqual(fractial, 0)) {
        scaledValue = scaledValue - fractial;
    } else if (YGFloatsEqual(fractial, 1.0)) {
        scaledValue = scaledValue - fractial + 1.0;
    } else if (forceCeil) {
        scaledValue = scaledValue - fractial + 1.0;
    } else if (forceFloor) {
        scaledValue = scaledValue - fractial;
    } else {
        scaledValue = scaledValue - fractial +
            (!YGFloatIsUndefined(fractial) &&
                (fractial > 0.5 || YGFloatsEqual(fractial, 0.5))
                ? 1.0
                : 0.0);
    }

    return (YGFloatIsUndefined(scaledValue) ||
        YGFloatIsUndefined(pointScaleFactor))
        ? YGUndefined
        : scaledValue / pointScaleFactor;
}

export function YGNodeCanUseCachedMeasurement(
    widthMode: YGMeasureMode,
    width: number,
    heightMode: YGMeasureMode,
    height: number,
    lastWidthMode: YGMeasureMode,
    lastWidth: number,
    lastHeightMode: YGMeasureMode,
    lastHeight: number,
    lastComputedWidth: number,
    lastComputedHeight: number,
    marginRow: number,
    marginColumn: number,
    config: YGConfig): boolean {
    if ((!YGFloatIsUndefined(lastComputedHeight) && lastComputedHeight < 0) ||
        (!YGFloatIsUndefined(lastComputedWidth) && lastComputedWidth < 0)) {
        return false;
    }

    const useRoundedComparison: boolean =
        config != null && config.pointScaleFactor != 0;
    const effectiveWidth: number =
        useRoundedComparison ? YGRoundValueToPixelGrid(width, config.pointScaleFactor, false, false)
            : width;
    const effectiveHeight: number =
        useRoundedComparison ? YGRoundValueToPixelGrid(height, config.pointScaleFactor, false, false)
            : height;
    const effectiveLastWidth: number =
        useRoundedComparison
            ? YGRoundValueToPixelGrid(lastWidth, config.pointScaleFactor, false, false)
            : lastWidth;
    const effectiveLastHeight: number =
        useRoundedComparison
            ? YGRoundValueToPixelGrid(lastHeight, config.pointScaleFactor, false, false)
            : lastHeight;

    const hasSameWidthSpec: boolean =
        lastWidthMode == widthMode && YGFloatsEqual(effectiveLastWidth, effectiveWidth);
    const hasSameHeightSpec: boolean =
        lastHeightMode == heightMode && YGFloatsEqual(effectiveLastHeight, effectiveHeight);

    const widthIsCompatible: boolean =
        hasSameWidthSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(widthMode,
            width - marginRow,
            lastComputedWidth) ||
        YGMeasureModeOldSizeIsUnspecifiedAndStillFits(widthMode,
            width - marginRow,
            lastWidthMode,
            lastComputedWidth) ||
        YGMeasureModeNewMeasureSizeIsStricterAndStillValid(
            widthMode, width - marginRow, lastWidthMode, lastWidth, lastComputedWidth);

    const heightIsCompatible: boolean =
        hasSameHeightSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(heightMode,
            height - marginColumn,
            lastComputedHeight) ||
        YGMeasureModeOldSizeIsUnspecifiedAndStillFits(heightMode,
            height - marginColumn,
            lastHeightMode,
            lastComputedHeight) ||
        YGMeasureModeNewMeasureSizeIsStricterAndStillValid(
            heightMode, height - marginColumn, lastHeightMode, lastHeight, lastComputedHeight);

    return widthIsCompatible && heightIsCompatible;
}

export function YGLayoutNodeInternal(
    node: YGNode,
    availableWidth: number,
    availableHeight: number,
    ownerDirection: YGDirection,
    widthMeasureMode: YGMeasureMode,
    heightMeasureMode: YGMeasureMode,
    ownerWidth: number,
    ownerHeight: number,
    performLayout: boolean,
    reason: string,
    config: YGConfig) {
    const layout: YGLayout = node.getLayout();

    gDepth++;

    const needToVisitNode: boolean =
        (node.isDirty() && layout.generationCount != gCurrentGenerationCount) ||
        layout.lastOwnerDirection != ownerDirection;

    if (needToVisitNode) {
        layout.nextCachedMeasurementsIndex = 0;
        layout.cachedLayout.widthMeasureMode = (YGMeasureModeCount) - 1;
        layout.cachedLayout.heightMeasureMode = (YGMeasureModeCount) - 1;
        layout.cachedLayout.computedWidth = -1;
        layout.cachedLayout.computedHeight = -1;
    }

    let cachedResults: YGCachedMeasurement = null;

    if (node.getMeasure() != null) {
        const marginAxisRow: number = YGUnwrapFloatOptional(
            node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
        const marginAxisColumn: number = YGUnwrapFloatOptional(
            node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

        if (YGNodeCanUseCachedMeasurement(widthMeasureMode,
            availableWidth,
            heightMeasureMode,
            availableHeight,
            layout.cachedLayout.widthMeasureMode,
            layout.cachedLayout.availableWidth,
            layout.cachedLayout.heightMeasureMode,
            layout.cachedLayout.availableHeight,
            layout.cachedLayout.computedWidth,
            layout.cachedLayout.computedHeight,
            marginAxisRow,
            marginAxisColumn,
            config)) {
            cachedResults = layout.cachedLayout;
        } else {
            for (let i: number = 0; i < layout.nextCachedMeasurementsIndex; i++) {
                if (YGNodeCanUseCachedMeasurement(widthMeasureMode,
                    availableWidth,
                    heightMeasureMode,
                    availableHeight,
                    layout.cachedMeasurements[i].widthMeasureMode,
                    layout.cachedMeasurements[i].availableWidth,
                    layout.cachedMeasurements[i].heightMeasureMode,
                    layout.cachedMeasurements[i].availableHeight,
                    layout.cachedMeasurements[i].computedWidth,
                    layout.cachedMeasurements[i].computedHeight,
                    marginAxisRow,
                    marginAxisColumn,
                    config)) {
                    cachedResults = layout.cachedMeasurements[i];
                    break;
                }
            }
        }
    } else if (performLayout) {
        if (YGFloatsEqual(layout.cachedLayout.availableWidth, availableWidth) &&
            YGFloatsEqual(layout.cachedLayout.availableHeight, availableHeight) &&
            layout.cachedLayout.widthMeasureMode == widthMeasureMode &&
            layout.cachedLayout.heightMeasureMode == heightMeasureMode) {
            cachedResults = layout.cachedLayout;
        }
    } else {
        for (let i: number = 0; i < layout.nextCachedMeasurementsIndex; i++) {
            if (YGFloatsEqual(layout.cachedMeasurements[i].availableWidth, availableWidth) &&
                YGFloatsEqual(layout.cachedMeasurements[i].availableHeight, availableHeight) &&
                layout.cachedMeasurements[i].widthMeasureMode == widthMeasureMode &&
                layout.cachedMeasurements[i].heightMeasureMode == heightMeasureMode) {
                cachedResults = layout.cachedMeasurements[i];
                break;
            }
        }
    }

    if (!needToVisitNode && cachedResults != null) {
        layout.measuredDimensions[YGDimension.Width] = cachedResults.computedWidth;
        layout.measuredDimensions[YGDimension.Height] = cachedResults.computedHeight;

        if (gPrintChanges && gPrintSkips) {
            // YGLog(node, YGLogLevel.Verbose, "%s%d.{[skipped] ", YGSpacer(gDepth), gDepth);
            // if (node.getPrintFunc() != null) {
            //     node.getPrintFunc()(node);
            // }
            //   YGLog(
            //       node,
            //       YGLogLevel.Verbose,
            //       "wm: %s, hm: %s, aw: %f ah: %f => d: (%f, %f) %s\n",
            //       YGMeasureModeName(widthMeasureMode, performLayout),
            //       YGMeasureModeName(heightMeasureMode, performLayout),
            //       availableWidth,
            //       availableHeight,
            //       cachedResults.computedWidth,
            //       cachedResults.computedHeight,
            //       reason);
        }
    } else {
        if (gPrintChanges) {
            // YGLog(
            //     node,
            //     YGLogLevelVerbose,
            //     "%s%d.{%s",
            //     YGSpacer(gDepth),
            //     gDepth,
            //     needToVisitNode ? "*" : "");
            // if (node.getPrintFunc() != null) {
            //     node.getPrintFunc()(node);
            // }
            // YGLog(
            //     node,
            //     YGLogLevelVerbose,
            //     "wm: %s, hm: %s, aw: %f ah: %f %s\n",
            //     YGMeasureModeName(widthMeasureMode, performLayout),
            //     YGMeasureModeName(heightMeasureMode, performLayout),
            //     availableWidth,
            //     availableHeight,
            //     reason);
        }

        YGNodelayoutImpl(node,
            availableWidth,
            availableHeight,
            ownerDirection,
            widthMeasureMode,
            heightMeasureMode,
            ownerWidth,
            ownerHeight,
            performLayout,
            config);

        if (gPrintChanges) {
            // YGLog(
            //     node,
            //     YGLogLevelVerbose,
            //     "%s%d.}%s",
            //     YGSpacer(gDepth),
            //     gDepth,
            //     needToVisitNode ? "*" : "");
            // if (node.getPrintFunc() != null) {
            //     node.getPrintFunc()(node);
            // }
            // YGLog(
            //     node,
            //     YGLogLevelVerbose,
            //     "wm: %s, hm: %s, d: (%f, %f) %s\n",
            //     YGMeasureModeName(widthMeasureMode, performLayout),
            //     YGMeasureModeName(heightMeasureMode, performLayout),
            //     layout.measuredDimensions[YGDimension.Width],
            //     layout.measuredDimensions[YGDimension.Height],
            //     reason);
        }

        layout.lastOwnerDirection = ownerDirection;

        if (cachedResults == null) {
            if (layout.nextCachedMeasurementsIndex == YG_MAX_CACHED_RESULT_COUNT) {
                if (gPrintChanges) {
                    // YGLog(node, YGLogLevelVerbose, "Out of cache entries!\n");
                }
                layout.nextCachedMeasurementsIndex = 0;
            }

            let newCacheEntry: YGCachedMeasurement;
            if (performLayout) {
                newCacheEntry = layout.cachedLayout;
            } else {
                newCacheEntry = layout.cachedMeasurements[layout.nextCachedMeasurementsIndex];
                layout.nextCachedMeasurementsIndex++;
            }

            newCacheEntry.availableWidth = availableWidth;
            newCacheEntry.availableHeight = availableHeight;
            newCacheEntry.widthMeasureMode = widthMeasureMode;
            newCacheEntry.heightMeasureMode = heightMeasureMode;
            newCacheEntry.computedWidth = layout.measuredDimensions[YGDimension.Width];
            newCacheEntry.computedHeight = layout.measuredDimensions[YGDimension.Height];
        }
    }

    if (performLayout) {
        node.setLayoutDimension(
            node.getLayout().measuredDimensions[YGDimension.Width],
            YGDimension.Width);
        node.setLayoutDimension(
            node.getLayout().measuredDimensions[YGDimension.Height],
            YGDimension.Height);

        node.setHasNewLayout(true);
        node.setDirty(false);
    }

    gDepth--;
    layout.generationCount = gCurrentGenerationCount;
    return (needToVisitNode || cachedResults == null);
}

export function YGConfigSetPointScaleFactor(config: YGConfig, pixelsInPoint: number): void {
    //YGAssertWithConfig(config, pixelsInPoint >= 0.0, "Scale factor should not be less than zero");
    if (pixelsInPoint == 0.0) {
        config.pointScaleFactor = 0.0;
    } else {
        config.pointScaleFactor = pixelsInPoint;
    }
}

function fmodf(x: number, y: number) {
    return x % y;
}

export function YGRoundToPixelGrid(node: YGNode, pointScaleFactor: number, absoluteLeft: number, absoluteTop: number): void {
    if (pointScaleFactor == 0.0) {
        return;
    }

    const nodeLeft: number = node.getLayout().position[YGEdge.Left];
    const nodeTop: number = node.getLayout().position[YGEdge.Top];

    const nodeWidth: number = node.getLayout().dimensions[YGDimension.Width];
    const nodeHeight: number = node.getLayout().dimensions[YGDimension.Height];

    const absoluteNodeLeft: number = absoluteLeft + nodeLeft;
    const absoluteNodeTop: number = absoluteTop + nodeTop;

    const absoluteNodeRight: number = absoluteNodeLeft + nodeWidth;
    const absoluteNodeBottom: number = absoluteNodeTop + nodeHeight;

    const textRounding: boolean = node.getNodeType() == YGNodeType.Text;

    node.setLayoutPosition(
        YGRoundValueToPixelGrid(nodeLeft, pointScaleFactor, false, textRounding),
        YGEdge.Left);

    node.setLayoutPosition(
        YGRoundValueToPixelGrid(nodeTop, pointScaleFactor, false, textRounding),
        YGEdge.Top);

    const hasFractionalWidth: boolean = !YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 0) &&
        !YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 1.0);
    const hasFractionalHeight: boolean = !YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 0) &&
        !YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 1.0);

    node.setLayoutDimension(
        YGRoundValueToPixelGrid(
            absoluteNodeRight,
            pointScaleFactor,
            (textRounding && hasFractionalWidth),
            (textRounding && !hasFractionalWidth)) -
        YGRoundValueToPixelGrid(
            absoluteNodeLeft, pointScaleFactor, false, textRounding),
        YGDimension.Width);

    node.setLayoutDimension(
        YGRoundValueToPixelGrid(
            absoluteNodeBottom,
            pointScaleFactor,
            (textRounding && hasFractionalHeight),
            (textRounding && !hasFractionalHeight)) -
        YGRoundValueToPixelGrid(
            absoluteNodeTop, pointScaleFactor, false, textRounding),
        YGDimension.Height);

    const childCount: number = YGNodeGetChildCount(node);
    for (let i = 0; i < childCount; i++) {
        YGRoundToPixelGrid(
            YGNodeGetChild(node, i),
            pointScaleFactor,
            absoluteNodeLeft,
            absoluteNodeTop);
    }
}

export function YGNodeCalculateLayout(
    node: YGNode,
    ownerWidth: number,
    ownerHeight: number,
    ownerDirection: YGDirection): void {

    gCurrentGenerationCount++;
    node.resolveDimension();

    let width: number = YGUndefined;
    let widthMeasureMode: YGMeasureMode = YGMeasureMode.Undefined;

    if (YGNodeIsStyleDimDefined(node, YGFlexDirection.Row, ownerWidth)) {
        width = YGUnwrapFloatOptional(
            YGResolveValue(
                node.getResolvedDimension(dim[YGFlexDirection.Row]), ownerWidth).add(
                    node.getMarginForAxis(YGFlexDirection.Row, ownerWidth)));
        widthMeasureMode = YGMeasureMode.Exactly;
    } else if (!YGResolveValue(
        node.getStyle().maxDimensions[YGDimension.Width], ownerWidth)
        .isUndefined()) {
        width = YGUnwrapFloatOptional(YGResolveValue(
            node.getStyle().maxDimensions[YGDimension.Width], ownerWidth));
        widthMeasureMode = YGMeasureMode.AtMost;
    } else {
        width = ownerWidth;
        widthMeasureMode = YGFloatIsUndefined(width) ? YGMeasureMode.Undefined
            : YGMeasureMode.Exactly;
    }

    let height: number = YGUndefined;
    let heightMeasureMode: YGMeasureMode = YGMeasureMode.Undefined;
    if (YGNodeIsStyleDimDefined(node, YGFlexDirection.Column, ownerHeight)) {
        height = YGUnwrapFloatOptional(
            YGResolveValue(
                node.getResolvedDimension(dim[YGFlexDirection.Column]),
                ownerHeight).add(
                    node.getMarginForAxis(YGFlexDirection.Column, ownerWidth)));
        heightMeasureMode = YGMeasureMode.Exactly;
    } else if (!YGResolveValue(
        node.getStyle().maxDimensions[YGDimension.Height],
        ownerHeight)
        .isUndefined()) {
        height = YGUnwrapFloatOptional(YGResolveValue(node.getStyle().maxDimensions[YGDimension.Height], ownerHeight));
        heightMeasureMode = YGMeasureMode.AtMost;
    } else {
        height = ownerHeight;
        heightMeasureMode = YGFloatIsUndefined(height) ? YGMeasureMode.Undefined
            : YGMeasureMode.Exactly;
    }
    if (YGLayoutNodeInternal(
        node,
        width,
        height,
        ownerDirection,
        widthMeasureMode,
        heightMeasureMode,
        ownerWidth,
        ownerHeight,
        true,
        "initial",
        node.getConfig())) {
        node.setPosition(
            node.getLayout().direction, ownerWidth, ownerHeight, ownerWidth);
        YGRoundToPixelGrid(node, node.getConfig().pointScaleFactor, 0.0, 0.0);

        if (gPrintTree) {
            YGNodePrint(
                node,
                YGPrintOptions.Layout | YGPrintOptions.Children | YGPrintOptions.Style);
        }
    }

    if (node.getConfig().shouldDiffLayoutWithoutLegacyStretchBehaviour &&
        node.didUseLegacyFlag()) {
        const originalNode: YGNode = YGNodeDeepClone(node);
        originalNode.resolveDimension();

        originalNode.markDirtyAndPropogateDownwards();
        gCurrentGenerationCount++;

        originalNode.setAndPropogateUseLegacyFlag(false);
        if (YGLayoutNodeInternal(
            originalNode,
            width,
            height,
            ownerDirection,
            widthMeasureMode,
            heightMeasureMode,
            ownerWidth,
            ownerHeight,
            true,
            "initial",
            originalNode.getConfig())) {
            originalNode.setPosition(
                originalNode.getLayout().direction,
                ownerWidth,
                ownerHeight,
                ownerWidth);
            YGRoundToPixelGrid(
                originalNode,
                originalNode.getConfig().pointScaleFactor,
                0.0,
                0.0);

            node.setLayoutDoesLegacyFlagAffectsLayout(!originalNode.isLayoutTreeEqualToNode(node));

            if (gPrintTree) {
                YGNodePrint(
                    originalNode,
                    YGPrintOptions.Layout | YGPrintOptions.Children | YGPrintOptions.Style);
            }
        }

        YGConfigFreeRecursive(originalNode);
        YGNodeFreeRecursive(originalNode);
    }
}


export function YGConfigSetLogger(config: YGConfig, logger: YGLogger): void {
    if (logger != null) {
        config.logger = logger;
    } else {
        config.logger = YGDefaultLog;
    }
}

export function YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour(
    config: YGConfig,
    shouldDiffLayout: boolean): void {
    config.shouldDiffLayoutWithoutLegacyStretchBehaviour = shouldDiffLayout;
}

export function YGVLog(config: YGConfig,
    node: YGNode,
    level: YGLogLevel,
    format: string,
    ...args: any[]) {

    const logConfig: YGConfig = config != null ? config : YGConfigGetDefault();
    logConfig.logger(logConfig, node, level, format, args);

    if (level == YGLogLevel.Fatal) {
        throw new Error('Abort Yoga');
    }
}

export function YGLogWithConfig(config: YGConfig, level: YGLogLevel, format: string, ...args: any[]): void {
    //YGVLog(config, null, level, format, args);
}

export function YGLog(node: YGNode, level: YGLogLevel, format: string, ...args: any[]): void {
    //YGVLog(node == null ? null : node.getConfig(), node, level, format, args);
}

export function YGAssert(condition: boolean, message: string) {
    if (!condition) {
        //YGLog(null, YGLogLevelFatal, "%s\n", message);
        console.assert(condition, message);
    }
}

export function YGAssertWithNode(node: YGNode, condition: boolean, message: string): void {
    if (!condition) {
        //YGLog(node, YGLogLevelFatal, "%s\n", message);
        console.log(node);
        console.assert(condition, message);
    }
}

export function YGAssertWithConfig(config: YGConfig, condition: boolean, message: string) {
    if (!condition) {
        //YGLogWithConfig(config, YGLogLevelFatal, "%s\n", message);
        console.log(config);
        console.assert(condition, message);
    }
}

export function YGConfigSetExperimentalFeatureEnabled(config: YGConfig,
    feature: YGExperimentalFeature,
    enabled: boolean): void {
    config.experimentalFeatures[feature] = enabled;
}

export function YGConfigIsExperimentalFeatureEnabled(config: YGConfig,
    feature: YGExperimentalFeature) {
    return config.experimentalFeatures[feature];
}

export function YGConfigSetUseWebDefaults(config: YGConfig, enabled: boolean): void {
    config.useWebDefaults = enabled;
}

export function YGConfigSetUseLegacyStretchBehaviour(config: YGConfig,
    useLegacyStretchBehaviour: boolean): void {
    config.useLegacyStretchBehaviour = useLegacyStretchBehaviour;
}

export function YGConfigGetUseWebDefaults(config: YGConfig): boolean {
    return config.useWebDefaults;
}

export function YGConfigSetContext(config: YGConfig, context: any): void {
    config.context = context;
}

export function YGConfigGetContext(config: YGConfig): any {
    return config.context;
}

export function YGConfigSetCloneNodeFunc(config: YGConfig, callback: YGCloneNodeFunc): void {
    config.cloneNodeCallback = callback;
}

export function YGTraverseChildrenPreOrder(children: Array<YGNode>, f: (node: YGNode) => void): void {
    for(let i = 0; i < children.length; ++i) {
        const node: YGNode = children[i];
        f(node);
        YGTraverseChildrenPreOrder(node.getChildren(), f);
    }
}

export function YGTraversePreOrder(node: YGNode, f: (node: YGNode) => void): void {
    if(!node) {
        return;
    }
  f(node);
  YGTraverseChildrenPreOrder(node.getChildren(), f);
}

function ASSERT_FLOAT_EQ(x: number, y: number) {
    console.assert(x === y)
}

const config: YGConfig = YGConfigNew();
const root: YGNode = YGNodeNewWithConfig(config);
YGNodeStyleSetWidth(root, 100);
YGNodeStyleSetHeight(root, 100);

const root_child0: YGNode = YGNodeNewWithConfig(config);
YGNodeStyleSetPositionType(root_child0, YGPositionType.Absolute);
YGNodeStyleSetPosition(root_child0, YGEdge.Start, 10);
YGNodeStyleSetPosition(root_child0, YGEdge.Top, 10);
YGNodeStyleSetWidth(root_child0, 10);
YGNodeStyleSetHeight(root_child0, 10);
YGNodeInsertChild(root, root_child0, 0);
YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.LTR);

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

ASSERT_FLOAT_EQ(10, YGNodeLayoutGetLeft(root_child0));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child0));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetWidth(root_child0));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child0));

YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirection.RTL);

ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));

ASSERT_FLOAT_EQ(80, YGNodeLayoutGetLeft(root_child0));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child0));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetWidth(root_child0));
ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child0));

YGNodeFreeRecursive(root);
YGConfigFree(config);

