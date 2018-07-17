import {
    YGUnit,
    YGEdge,
    YGNodeType,
    YGFlexDirection,
    YGAlign,
    YGMeasureMode,
    YGLogLevel
} from "./enums";

import { YGNode } from "./ygnode";
import { YGConfig } from "./ygconfig";
import { YGLayout } from "./yglayout";

import {
    YGValueUndefined,
    kDefaultFlexGrow,
    kWebDefaultFlexShrink,
    kDefaultFlexShrink

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

/*
// YG_NODE_STYLE_PROPERTY_SETTER_IMPL
export function YGNodeStyleSet##name(node: YGNode, paramName: type): void {
    if(node.getStyle().instanceName != paramName) {
        const style: YGStyle = node.getStyle();
        style.instanceName = paramName;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

// YG_NODE_STYLE_PROPERTY_SETTER_UNIT_IMPL
export function YGNodeStyleSet##name(node: YGNode, paramName: type): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point
    );

    if ((node.getStyle().instanceName.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName.unit != value.unit) {
        YGStyle style = node.getStyle();
        style.instanceName = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

void YGNodeStyleSet##name##Percent(node: YGNode, paramName: type) {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().instanceName.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName.unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName = value;                  
        node.setStyle(style);                       
        node.markDirtyAndPropogate();               
    }
}

// YG_NODE_STYLE_PROPERTY_SETTER_UNIT_AUTO_IMPL
export function YGNodeStyleSet##name##(node: YGNode, paramName: type): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().instanceName.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName.unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSet##name##Percent(node: YGNode, paramName: type): void {
    if ((node.getStyle().instanceName.value != YGFloatSanitize(paramName) ||
        node.getStyle().instanceName.unit != YGUnit.Percent) {
        const style: YGStyle = node.getStyle();
        style.instanceName.value = YGFloatSanitize(paramName);
        style.instanceName.unit = YGFloatIsUndefined(paramName) ? YGUnit.Auto : YGUnit.Percent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSet##name##Auto(node: YGNode): void {
    if (node.getStyle().instanceName.unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.instanceName.value = 0;
        style.instanceName.unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

*/

