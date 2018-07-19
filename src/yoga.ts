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
    YGExperimentalFeature
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
    YGFloatOptionalMax
} from "./utils";

import {
    YGValueUndefined,
    kDefaultFlexGrow,
    kWebDefaultFlexShrink,
    kDefaultFlexShrink,
    YGUndefined,
    pos,
    trailing,
    leading
} from "./internal";

export class YGSize {
    public width: number;
    public height: number;
}

export class YGValue {
    public value: number;
    public unit: YGUnit;

    constructor(value, unit) {
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
    Object.assign(dest, src);
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

        let childWidthMeasureModeRef = {value: childWidthMeasureMode}
        let childWidthRef = {value: childWidth}
        let childHeightMeasureModeRef = {value: childHeightMeasureMode}
        let childHeightRef = {value: childHeight}

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

