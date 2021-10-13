// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGNode.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGNode.cpp

import {
    YGFlexDirection,
    YGDirection,
    YGNodeType,
    YGUnit,
    YGEdge,
    YGDimension,
    YGPositionType,
    YGAlign,
    YGMeasureMode,
} from './enums';

import { YGFloatOptional } from './ygfloatoptional';
import { YGConfig } from './ygconfig';

import {
    YGFlexDirectionIsRow,
    YGResolveValue,
    YGResolveValueMargin,
    YGFloatOptionalMax,
    YGFloatMax,
    YGFlexDirectionCross,
    YGResolveFlexDirection,
    YGValueEqual,
} from './utils';

import { YGLayout } from './yglayout';
import { YGStyle } from './ygstyle';
import { YGValue } from './ygvalue';

import { trailing, leading, kDefaultFlexGrow, kDefaultFlexShrink, kWebDefaultFlexShrink } from './internal';

import { YGPrintFunc, YGMeasureFunc, YGBaselineFunc, YGDirtiedFunc, YGSize, YGAssertWithNode } from './yoga';

import { YGValueUndefined, YGValueZero, YGValueAuto } from './ygvalue';

interface IterChildrenCallback {
    (node: YGNode, cloneContext: any): void;
}

class YGNode {
    private context_: any;
    private print_: YGPrintFunc;
    private hasNewLayout_: boolean;
    private isReferenceBaseline_: boolean;
    private nodeType_: YGNodeType;
    private measure_: YGMeasureFunc;
    private baseline_: YGBaselineFunc;
    private dirtied_: YGDirtiedFunc;
    private style_: YGStyle;
    private layout_: YGLayout;
    private lineIndex_: number;
    private owner_: YGNode;
    private children_: Array<YGNode>;
    private config_: YGConfig;
    private isDirty_: boolean;
    private resolvedDimensions_: [YGValue, YGValue];

    private relativePosition(axis: YGFlexDirection, axisSize: number): YGFloatOptional {
        if (this.isLeadingPositionDefined(axis)) {
            return this.getLeadingPosition(axis, axisSize);
        }

        const trailingPosition: YGFloatOptional = this.getTrailingPosition(axis, axisSize);
        if (!trailingPosition.isUndefined()) {
            trailingPosition.setValue(-1 * trailingPosition.getValue());
        }

        return trailingPosition;
    }

    constructor(node?: YGNode);
    constructor(config?: YGConfig);
    constructor(
        contextOrNodeOrConfig: any | YGNode | YGConfig = null,
        print: YGPrintFunc = null,
        hasNewLayout = true,
        isReferenceBaseline = false,
        nodeType: YGNodeType = YGNodeType.Default,
        measure: YGMeasureFunc = null,
        baseline: YGBaselineFunc = null,
        dirtied: YGDirtiedFunc = null,
        style: YGStyle = new YGStyle(),
        layout: YGLayout = new YGLayout(),
        lineIndex = 0,
        owner: YGNode = null,
        children: Array<YGNode> = [],
        config: YGConfig = null,
        isDirty = false,
        resolvedDimensions: [YGValue, YGValue] = [YGValueUndefined(), YGValueUndefined()],
    ) {
        if (contextOrNodeOrConfig instanceof YGNode) {
            console.log('from node');
            this.fromNode(contextOrNodeOrConfig);
            return;
        }

        this.initialize(
            print,
            hasNewLayout,
            isReferenceBaseline,
            nodeType,
            measure,
            baseline,
            dirtied,
            style,
            layout,
            lineIndex,
            owner,
            children,
            config,
            isDirty,
            resolvedDimensions,
        );

        if (contextOrNodeOrConfig instanceof YGConfig) {
            this.config_ = contextOrNodeOrConfig;
            this.context_ = null;
        } else {
            this.context_ = contextOrNodeOrConfig;
        }
    }

    initialize(
        print: YGPrintFunc = null,
        hasNewLayout = true,
        isReferenceBaseline = false,
        nodeType: YGNodeType = YGNodeType.Default,
        measure: YGMeasureFunc = null,
        baseline: YGBaselineFunc = null,
        dirtied: YGDirtiedFunc = null,
        style: YGStyle = new YGStyle(),
        layout: YGLayout = new YGLayout(),
        lineIndex = 0,
        owner: YGNode = null,
        children: Array<YGNode> = [],
        config: YGConfig = null,
        isDirty = false,
        resolvedDimensions: [YGValue, YGValue] = [YGValueUndefined(), YGValueUndefined()],
    ): void {
        this.print_ = print;
        this.hasNewLayout_ = hasNewLayout;
        this.isReferenceBaseline_ = isReferenceBaseline;
        this.nodeType_ = nodeType;
        this.measure_ = measure;
        this.baseline_ = baseline;
        this.dirtied_ = dirtied;
        this.style_ = style;
        this.layout_ = layout;
        this.lineIndex_ = lineIndex;
        this.owner_ = owner;
        this.children_ = children;
        this.config_ = config;
        this.isDirty_ = isDirty;
        this.resolvedDimensions_ = resolvedDimensions;
        this.context_ = null;
    }

    operatorAtrib(node: YGNode): YGNode {
        if (node == this) {
            return this;
        }

        this.clearChildren();
        this.fromNode(node);
        return this;
    }

    fromNode(node: YGNode): void {
        console.log(node);

        this.context_ = node.context_;
        this.print_ = node.print_;
        this.hasNewLayout_ = node.hasNewLayout_;
        this.isReferenceBaseline_ = node.isReferenceBaseline_;
        this.nodeType_ = node.nodeType_;
        this.measure_ = node.measure_;
        this.baseline_ = node.baseline_;
        this.dirtied_ = node.dirtied_;

        this.style_ = node.style_; //
        // this.style_ = node.style_.clone();

        this.layout_ = node.layout_; //
        // this.layout_ = node.layout_.clone();

        this.lineIndex_ = node.lineIndex_;
        this.owner_ = node.owner_;

        this.children_ = node.children_; //
        // let newChildren: Array<YGNode> = new Array(node.children_.length);
        // for(let i = 0; i < node.children_.length; ++i) {
        //     newChildren[i] = node.children_[i]
        // }
        // this.children_ = newChildren;

        this.config_ = node.config_;
        this.isDirty_ = node.isDirty_;

        this.resolvedDimensions_ = node.resolvedDimensions_; //
        // this.resolvedDimensions_ = [node.resolvedDimensions_[0].clone(), node.resolvedDimensions_[1].clone()];
    }

    print(printContext?: any): void {
        if (this.print_ != null) {
            this.print_(this, printContext);
        }
    }

    computeEdgeValueForRow(edges: Array<YGValue>, rowEdge: YGEdge, edge: YGEdge, defaultValue: YGValue): YGValue {
        if (!edges[rowEdge].isUndefined()) {
            return edges[rowEdge];
        } else if (!edges[edge].isUndefined()) {
            return edges[edge];
        } else if (!edges[YGEdge.Horizontal].isUndefined()) {
            return edges[YGEdge.Horizontal];
        } else if (!edges[YGEdge.All].isUndefined()) {
            return edges[YGEdge.All];
        } else {
            return defaultValue;
        }
    }

    computeEdgeValueForColumn(edges: Array<YGValue>, edge: YGEdge, defaultValue: YGValue): YGValue {
        if (!edges[edge].isUndefined()) {
            return edges[edge];
        } else if (!edges[YGEdge.Vertical].isUndefined()) {
            return edges[YGEdge.Vertical];
        } else if (!edges[YGEdge.All].isUndefined()) {
            return edges[YGEdge.All];
        } else {
            return defaultValue;
        }
    }

    measure(
        width: number,
        widthMode: YGMeasureMode,
        height: number,
        heightMode: YGMeasureMode,
        layoutContext?: any,
    ): YGSize {
        return this.measure_(this, width, widthMode, height, heightMode, layoutContext);
    }

    baseline(width: number, height: number, layoutContext?: any): number {
        return this.baseline_(this, width, height, layoutContext);
    }

    // TODO: Move useWebDefaults to the node and not the config?
    useWebDefaults(): void {
        this.config_.useWebDefaults = true;
        this.style_.flexDirection = YGFlexDirection.Row;
        this.style_.alignContent = YGAlign.Stretch;
    }

    hasMeasureFunc(): boolean {
        return this.measure_ != null;
    }

    hasBaselineFunc(): boolean {
        return this.baseline_ != null;
    }

    getContext(): any {
        return this.context_;
    }

    getHasNewLayout(): boolean {
        return this.hasNewLayout_;
    }

    getNodeType(): YGNodeType {
        return this.nodeType_;
    }

    getDirtied(): YGDirtiedFunc {
        return this.dirtied_;
    }

    getStyle(): YGStyle {
        return this.style_;
    }

    getLayout(): YGLayout {
        return this.layout_;
    }

    getLineIndex(): number {
        return this.lineIndex_;
    }

    isReferenceBaseline(): boolean {
        return this.isReferenceBaseline_;
    }

    getOwner(): YGNode {
        return this.owner_;
    }

    getParent(): YGNode {
        return this.getOwner();
    }

    getChildren(): Array<YGNode> {
        return this.children_;
    }

    getChildrenCount(): number {
        return this.children_.length;
    }

    getChild(index: number): YGNode {
        return this.children_[index];
    }

    getConfig(): YGConfig {
        return this.config_;
    }

    isDirty(): boolean {
        return this.isDirty_;
    }

    getResolvedDimensions(): [YGValue, YGValue] {
        return this.resolvedDimensions_;
    }

    getResolvedDimension(index: number): YGValue {
        return this.resolvedDimensions_[index];
    }

    getLeadingPosition(axis: YGFlexDirection, axisSize: number): YGFloatOptional {
        const leadingPosition = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.position, YGEdge.Start, leading[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.position, leading[axis], YGValueZero());
        return YGResolveValue(leadingPosition, axisSize);
    }

    isLeadingPositionDefined(axis: YGFlexDirection): boolean {
        const leadingPosition = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.position, YGEdge.Start, leading[axis], YGValueUndefined())
            : this.computeEdgeValueForColumn(this.style_.position, leading[axis], YGValueUndefined());
        return !leadingPosition.isUndefined();
    }

    isTrailingPosDefined(axis: YGFlexDirection): boolean {
        const trailingPosition = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.position, YGEdge.End, trailing[axis], YGValueUndefined())
            : this.computeEdgeValueForColumn(this.style_.position, trailing[axis], YGValueUndefined());
        return !trailingPosition.isUndefined();
    }

    getTrailingPosition(axis: YGFlexDirection, axisSize: number): YGFloatOptional {
        const trailingPosition = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.position, YGEdge.End, trailing[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.position, trailing[axis], YGValueZero());
        return YGResolveValue(trailingPosition, axisSize);
    }

    getLeadingMargin(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        const leadingMargin = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.margin, YGEdge.Start, leading[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.margin, leading[axis], YGValueZero());
        return YGResolveValueMargin(leadingMargin, widthSize);
    }

    getTrailingMargin(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        const trailingMargin: YGValue = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.margin, YGEdge.End, trailing[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.margin, trailing[axis], YGValueZero());
        return YGResolveValueMargin(trailingMargin, widthSize);
    }

    getLeadingBorder(axis: YGFlexDirection): number {
        const leadingBorder: YGValue = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.border, YGEdge.Start, leading[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.border, leading[axis], YGValueZero());
        return YGFloatMax(leadingBorder.value, 0.0);
    }

    getTrailingBorder(axis: YGFlexDirection): number {
        const trailingBorder: YGValue = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.border, YGEdge.End, trailing[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.border, trailing[axis], YGValueZero());
        return YGFloatMax(trailingBorder.value, 0.0);
    }

    getLeadingPadding(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        const leadingPadding = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.padding, YGEdge.Start, leading[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.padding, leading[axis], YGValueZero());
        return YGFloatOptionalMax(YGResolveValue(leadingPadding, widthSize), new YGFloatOptional(0.0));
    }

    getTrailingPadding(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        const trailingPadding = YGFlexDirectionIsRow(axis)
            ? this.computeEdgeValueForRow(this.style_.padding, YGEdge.End, trailing[axis], YGValueZero())
            : this.computeEdgeValueForColumn(this.style_.padding, trailing[axis], YGValueZero());
        return YGFloatOptionalMax(YGResolveValue(trailingPadding, widthSize), new YGFloatOptional(0.0));
    }

    getLeadingPaddingAndBorder(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        return this.getLeadingPadding(axis, widthSize).add(new YGFloatOptional(this.getLeadingBorder(axis)));
    }

    getTrailingPaddingAndBorder(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        return this.getTrailingPadding(axis, widthSize).add(new YGFloatOptional(this.getTrailingBorder(axis)));
    }

    getMarginForAxis(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        return this.getLeadingMargin(axis, widthSize).add(this.getTrailingMargin(axis, widthSize));
    }

    setContext(context: any): void {
        this.context_ = context;
    }

    setPrintFunc(printFunc: YGPrintFunc): void {
        this.print_ = printFunc;
    }

    setHasNewLayout(hasNewLayout: boolean): void {
        this.hasNewLayout_ = hasNewLayout;
    }

    setNodeType(nodeType: YGNodeType): void {
        this.nodeType_ = nodeType;
    }

    /**
     * deviation: Upstream uses method overloading with a union for callbacks
     * with and without context functions. TypeScript doesn't support method
     * overloading in classes the same way C++ does, so the context function is
     * made an optional parameter of YGMeasureFunc.
     */
    setMeasureFunc(measureFunc: YGMeasureFunc): void {
        if (measureFunc == null) {
            this.setNodeType(YGNodeType.Default);
        } else {
            //YGAssertWithNode(this, this.children_.size() == 0, "Cannot set measure function: Nodes with measure functions cannot have children.");
            if (this.children_.length != 0) {
                console.error('Cannot set measure function: Nodes with measure functions cannot have children.');
            }
            this.setNodeType(YGNodeType.Text);
        }

        this.measure_ = measureFunc;
    }

    setBaseLineFunc(baseLineFunc: YGBaselineFunc): void {
        this.baseline_ = baseLineFunc;
    }

    setDirtiedFunc(dirtiedFunc: YGDirtiedFunc): void {
        this.dirtied_ = dirtiedFunc;
    }

    setStyle(style: YGStyle): void {
        this.style_ = style;
    }

    setStyleFlexDirection(direction: YGFlexDirection): void {
        this.style_.flexDirection = direction;
    }

    setStyleAlignContent(alignContent: YGAlign): void {
        this.style_.alignContent = alignContent;
    }

    setLayout(layout: YGLayout): void {
        this.layout_ = layout;
    }

    setLineIndex(lineIndex: number): void {
        this.lineIndex_ = lineIndex;
    }

    setIsReferenceBaseline(isReferenceBaseline: boolean): void {
        this.isReferenceBaseline_ = isReferenceBaseline;
    }

    setOwner(owner: YGNode): void {
        this.owner_ = owner;
    }

    setChildren(children: Array<YGNode>): void {
        this.children_ = children;
    }

    setConfig(config: YGConfig): void {
        this.config_ = config;
    }

    setDirty(isDirty: boolean): void {
        if (isDirty == this.isDirty_) {
            return;
        }
        this.isDirty_ = isDirty;
        if (isDirty && this.dirtied_) {
            this.dirtied_(this);
        }
    }

    setLayoutLastOwnerDirection(direction: YGDirection): void {
        this.layout_.lastOwnerDirection = direction;
    }

    setLayoutComputedFlexBasis(computedFlexBasis: YGFloatOptional): void {
        this.layout_.computedFlexBasis = computedFlexBasis;
    }

    setLayoutComputedFlexBasisGeneration(computedFlexBasisGeneration: number): void {
        this.layout_.computedFlexBasisGeneration = computedFlexBasisGeneration;
    }

    setLayoutMeasuredDimension(measuredDimension: number, index: number): void {
        this.layout_.measuredDimensions[index] = measuredDimension;
    }

    setLayoutHadOverflow(hadOverflow: boolean): void {
        this.layout_.hadOverflow = hadOverflow;
    }

    setLayoutDimension(dimension: number, index: number): void {
        this.layout_.dimensions[index] = dimension;
    }

    setLayoutDirection(direction: YGDirection): void {
        this.layout_.direction = direction;
    }

    setLayoutMargin(margin: number, index: number): void {
        this.layout_.margin[index] = margin;
    }

    setLayoutBorder(border: number, index: number): void {
        this.layout_.border[index] = border;
    }

    setLayoutPadding(padding: number, index: number): void {
        this.layout_.padding[index] = padding;
    }

    setLayoutPosition(position: number, index: number): void {
        this.layout_.position[index] = position;
    }

    setPosition(direction: YGDirection, mainSize: number, crossSize: number, ownerWidth: number): void {
        const directionRespectingRoot: YGDirection = this.owner_ != null ? direction : YGDirection.LTR;
        const mainAxis: YGFlexDirection = YGResolveFlexDirection(this.style_.flexDirection, directionRespectingRoot);
        const crossAxis: YGFlexDirection = YGFlexDirectionCross(mainAxis, directionRespectingRoot);
        const relativePositionMain: YGFloatOptional = this.relativePosition(mainAxis, mainSize);
        const relativePositionCross: YGFloatOptional = this.relativePosition(crossAxis, crossSize);

        this.setLayoutPosition(
            this.getLeadingMargin(mainAxis, ownerWidth).add(relativePositionMain).unwrap(),
            leading[mainAxis],
        );
        this.setLayoutPosition(
            this.getTrailingMargin(mainAxis, ownerWidth).add(relativePositionMain).unwrap(),
            trailing[mainAxis],
        );
        this.setLayoutPosition(
            this.getLeadingMargin(crossAxis, ownerWidth).add(relativePositionCross).unwrap(),
            leading[crossAxis],
        );
        this.setLayoutPosition(
            this.getTrailingMargin(crossAxis, ownerWidth).add(relativePositionCross).unwrap(),
            trailing[crossAxis],
        );
    }

    setLayoutDoesLegacyFlagAffectsLayout(doesLegacyFlagAffectsLayout: boolean): void {
        this.layout_.doesLegacyStretchFlagAffectsLayout = doesLegacyFlagAffectsLayout;
    }

    setLayoutDidUseLegacyFlag(didUseLegacyFlag: boolean): void {
        this.layout_.didUseLegacyFlag = didUseLegacyFlag;
    }

    markDirtyAndPropogateDownwards(): void {
        this.isDirty_ = true;
        for (let i = 0; i < this.children_.length; i++) {
            this.children_[i].markDirtyAndPropogateDownwards();
        }
    }

    marginLeadingValue(axis: YGFlexDirection): YGValue {
        if (YGFlexDirectionIsRow(axis) && this.style_.margin[YGEdge.Start].unit != YGUnit.Undefined) {
            return this.style_.margin[YGEdge.Start];
        } else {
            return this.style_.margin[leading[axis]];
        }
    }

    marginTrailingValue(axis: YGFlexDirection): YGValue {
        if (YGFlexDirectionIsRow(axis) && this.style_.margin[YGEdge.End].unit != YGUnit.Undefined) {
            return this.style_.margin[YGEdge.End];
        } else {
            return this.style_.margin[trailing[axis]];
        }
    }

    resolveFlexBasisPtr(): YGValue {
        const flexBasis: YGValue = this.style_.flexBasis;

        if (flexBasis.unit != YGUnit.Auto && flexBasis.unit != YGUnit.Undefined) {
            return flexBasis;
        }

        if (!this.style_.flex.isUndefined() && this.style_.flex.getValue() > 0.0) {
            return this.config_.useWebDefaults ? YGValueAuto() : YGValueZero();
        }

        return YGValueAuto();
    }

    resolveDimension(): void {
        const style: YGStyle = this.getStyle();
        for (const dim of [YGDimension.Width, YGDimension.Height]) {
            if (
                !style.maxDimensions[dim].isUndefined() &&
                YGValueEqual(style.maxDimensions[dim], style.minDimensions[dim])
            ) {
                this.resolvedDimensions_[dim] = style.maxDimensions[dim];
            } else {
                this.resolvedDimensions_[dim] = style.dimensions[dim];
            }
        }
    }

    resolveDirection(ownerDirection: YGDirection): YGDirection {
        if (this.style_.direction == YGDirection.Inherit) {
            return ownerDirection > YGDirection.Inherit ? ownerDirection : YGDirection.LTR;
        } else {
            return this.style_.direction;
        }
    }

    clearChildren(): void {
        while (this.children_.length > 0) {
            this.children_.pop();
        }
    }

    replaceChild(oldChild: YGNode, newChild: YGNode): void {
        const index = this.children_.indexOf(oldChild);
        if (index >= 0) {
            this.children_[index] = newChild;
        }
    }

    replaceChildIndex(child: YGNode, index: number): void {
        this.children_[index] = child;
    }

    insertChildIndex(child: YGNode, index: number): void {
        this.children_.splice(index, 0, child);
    }

    removeChild(child: YGNode): boolean {
        const index = this.children_.indexOf(child);

        if (index >= 0) {
            this.children_.splice(index, 1);
            return true;
        }

        return false;
    }

    removeChildIndex(index: number): void {
        this.children_.splice(index, 1);
    }

    iterChildrenAfterCloningIfNeeded(callback: IterChildrenCallback, cloneContext: any): void {
        let i = 0;
        for (let child of this.children_) {
            if (child.getOwner() != this) {
                child = this.config_.cloneNode(child, this, i, cloneContext);
                child.setOwner(this);
            }
            i += 1;

            callback(child, cloneContext);
        }
    }

    cloneChildrenIfNeeded(cloneContext?: any): void {
        this.iterChildrenAfterCloningIfNeeded((node: YGNode, cloneContext: any) => {}, cloneContext);
    }

    markDirtyAndPropogate(): void {
        if (!this.isDirty_) {
            this.setDirty(true);
            this.setLayoutComputedFlexBasis(new YGFloatOptional());

            if (this.owner_) {
                this.owner_.markDirtyAndPropogate();
            }
        }
    }

    resolveFlexGrow(): number {
        if (this.owner_ == null) {
            return 0.0;
        }

        if (!this.style_.flexGrow.isUndefined()) {
            return this.style_.flexGrow.unwrap();
        }

        if (!this.style_.flex.isUndefined() && this.style_.flex.unwrap() > 0.0) {
            return this.style_.flex.unwrap();
        }

        return kDefaultFlexGrow;
    }

    resolveFlexShrink(): number {
        if (this.owner_ == null) {
            return 0.0;
        }

        if (!this.style_.flexShrink.isUndefined()) {
            return this.style_.flexShrink.getValue();
        }

        if (!this.config_.useWebDefaults && !this.style_.flex.isUndefined() && this.style_.flex.getValue() < 0.0) {
            return -this.style_.flex.getValue();
        }

        return this.config_.useWebDefaults ? kWebDefaultFlexShrink : kDefaultFlexShrink;
    }

    isNodeFlexible(): boolean {
        return (
            this.style_.positionType != YGPositionType.Absolute &&
            (this.resolveFlexGrow() != 0 || this.resolveFlexShrink() != 0)
        );
    }

    didUseLegacyFlag(): boolean {
        let didUseLegacyFlag: boolean = this.layout_.didUseLegacyFlag;
        if (didUseLegacyFlag) {
            return true;
        }

        for (let i = 0; i < this.children_.length; i++) {
            if (this.children_[i].getLayout().didUseLegacyFlag) {
                didUseLegacyFlag = true;
                break;
            }
        }

        return didUseLegacyFlag;
    }

    isLayoutTreeEqualToNode(node: YGNode): boolean {
        if (this.children_.length != node.getChildren().length) {
            return false;
        }

        if (this.layout_.diff(node.getLayout())) {
            return false;
        }

        if (this.children_.length == 0) {
            return true;
        }

        let isLayoutTreeEqual = true;
        for (let i = 0; i < this.children_.length; ++i) {
            const otherNodeChildren: YGNode = node.getChild(i);
            isLayoutTreeEqual = this.children_[i].isLayoutTreeEqualToNode(otherNodeChildren);
            if (!isLayoutTreeEqual) {
                return false;
            }
        }

        return isLayoutTreeEqual;
    }

    reset(): void {
        YGAssertWithNode(this, this.children_.length == 0, 'Cannot reset a node which still has children attached');
        YGAssertWithNode(this, this.owner_ == null, 'Cannot reset a node still attached to a owner');

        this.clearChildren();

        // TODO: Move useWebDefaults to the node and not the config?
        const config = this.getConfig();
        const webDefaults = config.useWebDefaults;

        this.initialize();
        this.setConfig(config);

        if (webDefaults) {
            this.useWebDefaults();
        }
    }
}

export { YGNode };
