import {
    YGUnit,
    YGEdge,
    YGNodeType,
    YGFlexDirection,
    YGAlign,
} from "./enums";

import { YGNode } from "./ygnode";
import { YGConfig } from "./ygconfig";

import {
    YGValueUndefined,
    YGVector
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

export function YGNodeGetDirtiedFunc(node: YGNode) : YGDirtiedFunc {
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
    const vec: YGVector = new YGVector();
    vec.reserve(oldNode.getChildren().size());

    let childNode: YGNode = null;
    for (let i: number = 0; i < oldNode.getChildren().size(); ++i) {
        const item: YGNode = oldNode.getChild(i);
        childNode = YGNodeDeepClone(item);
        childNode.setOwner(node);
        vec.push_back(childNode);
    }
    node.setChildren(vec);

    if (oldNode.getConfig() != null) {
        node.setConfig(YGConfigClone(oldNode.getConfig()));
    }

    if (oldNode.getNextChild() != null) {
        node.setNextChild(YGNodeDeepClone(oldNode.getNextChild()));
    }

    return node;
}

export function YGNodeFree(node: YGNode): void {
    const owner: YGNode = node.getOwner();

    if (owner != null) {
        owner.removeChild(node);
        node.setOwner(null);
    }

    const childCount:number = YGNodeGetChildCount(node);
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

export function YGNodeReset(node: YGNode):void {
    //YGAssertWithNode(node, YGNodeGetChildCount(node) == 0, "Cannot reset a node which still has children attached");
    //YGAssertWithNode(node, node->getOwner() == nullptr, "Cannot reset a node still attached to a owner");

    node.clearChildren();
    const config: YGConfig = node.getConfig();

    node.reset();

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

export function YGNodeRemoveChild(owner: YGNode, excludedChild: YGNode) : void {
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


