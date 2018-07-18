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
    YGDimension
} from "./enums";

import { YGNode } from "./ygnode";
import { YGConfig } from "./ygconfig";
import { YGLayout } from "./yglayout";
import { YGStyle } from "./ygstyle";

import {
    YGFloatSanitize
} from "./utils";

import {
    YGValueUndefined,
    kDefaultFlexGrow,
    kWebDefaultFlexShrink,
    kDefaultFlexShrink,
    YGUndefined

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
export interface YGBaselineFunc { (node: YGNode, width: number, height: number): void };
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

