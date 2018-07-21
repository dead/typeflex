import { 
    YGFlexDirection,
    YGDirection,
    YGNodeType,
    YGUnit,
    YGEdge,
    YGDimension,
    YGDimensionCount,
    YGPositionType,
    YGAlign
} from "./enums";

import { YGFloatOptional } from "./ygfloatoptional";
import { YGConfig } from "./ygconfig";

import {
    YGFlexDirectionIsRow,
    YGResolveValue,
    YGResolveValueMargin,
    YGFloatOptionalMax,
    YGFloatMax,
    YGFlexDirectionCross,
    YGResolveFlexDirection,
    YGValueEqual,
    YGUnwrapFloatOptional
} from "./utils";

import { YGLayout } from "./yglayout";
import { YGStyle } from "./ygstyle";
import { YGValue } from "./ygvalue";

import {
    trailing,
    leading,
    kDefaultFlexGrow,
    kDefaultFlexShrink,
    kWebDefaultFlexShrink
} from "./internal";

import {
    YGComputedEdgeValue,
    YGFloatIsUndefined,
    YGPrintFunc,
    YGMeasureFunc,
    YGBaselineFunc,
    YGDirtiedFunc,
    YGCloneNodeFunc,
    YGNodeClone,
    YGValueUndefined,
    YGValueZero,
    YGValueAuto,
} from "./yoga";

class YGNode {
    private context_: any;
    private print_: YGPrintFunc;
    private hasNewLayout_: boolean;
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

        let trailingPosition = this.getTrailingPosition(axis, axisSize);
        if (!trailingPosition.isUndefined()) {
            trailingPosition.setValue(-1 * trailingPosition.getValue());
        }

        return trailingPosition;
    }

    constructor(node?: YGNode);
    constructor(config?: YGConfig);
    constructor(contextOrNodeOrConfig: any|YGNode|YGConfig = null,
                print: YGPrintFunc = null,
                hasNewLayout: boolean = true,
                nodeType: YGNodeType = YGNodeType.Default,
                measure: YGMeasureFunc = null,
                baseline: YGBaselineFunc = null,
                dirtied: YGDirtiedFunc = null,
                style: YGStyle = new YGStyle(),
                layout: YGLayout = new YGLayout(),
                lineIndex: number = 0,
                owner: YGNode = null,
                children: Array<YGNode> = [],
                config: YGConfig = null,
                isDirty: boolean = false,
                resolvedDimensions: [YGValue, YGValue] = [YGValueUndefined, YGValueUndefined]
                ) {
        if (contextOrNodeOrConfig instanceof YGNode) {
            this.fromNode(contextOrNodeOrConfig);
            return;
        }

        this.print_ = print;
        this.hasNewLayout_ = hasNewLayout;
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

        if (contextOrNodeOrConfig instanceof YGConfig) {
            this.config_ = contextOrNodeOrConfig;
            this.context_ = null;
        } else {
            this.context_ = contextOrNodeOrConfig;
        }
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
        this.context_ = node.context_;
        this.print_ = node.print_;
        this.hasNewLayout_ = node.hasNewLayout_;
        this.nodeType_ = node.nodeType_;
        this.measure_ = node.measure_;
        this.baseline_ = node.baseline_;
        this.dirtied_ = node.dirtied_;
        this.style_ = node.style_;
        this.layout_ = node.layout_;
        this.lineIndex_ = node.lineIndex_;
        this.owner_ = node.owner_;
        this.children_ = node.children_;
        this.config_ = node.config_;
        this.isDirty_ = node.isDirty_;
        this.resolvedDimensions_ = node.resolvedDimensions_;
    }

    getContext(): any {
        return this.context_;
    }

    getPrintFunc(): YGPrintFunc {
        return this.print_;
    }

    getHasNewLayout(): boolean {
        return this.hasNewLayout_;
    }

    getNodeType(): YGNodeType {
        return this.nodeType_;
    }

    getMeasure(): YGMeasureFunc {
        return this.measure_;
    }

    getBaseline(): YGBaselineFunc {
        return this.baseline_;
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
        if (YGFlexDirectionIsRow(axis)) {
            const leadingPosition: YGValue = YGComputedEdgeValue(this.style_.position, YGEdge.Start, YGValueUndefined);
            if (leadingPosition.unit != YGUnit.Undefined) {
                return YGResolveValue(leadingPosition, axisSize);
            }
        }

        const leadingPosition: YGValue = YGComputedEdgeValue(this.style_.position, leading[axis], YGValueUndefined);
        return leadingPosition.unit == YGUnit.Undefined ? new YGFloatOptional(0) : YGResolveValue(leadingPosition, axisSize);
    }

    isLeadingPositionDefined(axis: YGFlexDirection): boolean {
        return (YGFlexDirectionIsRow(axis) && (YGComputedEdgeValue(this.style_.position, YGEdge.Start, YGValueUndefined)).unit != YGUnit.Undefined) ||
               (YGComputedEdgeValue(this.style_.position, leading[axis], YGValueUndefined)).unit != YGUnit.Undefined;
    }

    isTrailingPosDefined(axis: YGFlexDirection): boolean {
        return (YGFlexDirectionIsRow(axis) && (YGComputedEdgeValue(this.style_.position, YGEdge.End, YGValueUndefined)).unit != YGUnit.Undefined) ||
               (YGComputedEdgeValue(this.style_.position, leading[axis], YGValueUndefined)).unit != YGUnit.Undefined;
    }

    getTrailingPosition(axis: YGFlexDirection, axisSize: number): YGFloatOptional {
        if (YGFlexDirectionIsRow(axis)) {
            const trailingPosition: YGValue = YGComputedEdgeValue(this.style_.position, YGEdge.End, YGValueUndefined);
            if (trailingPosition.unit != YGUnit.Undefined) {
                return YGResolveValue(trailingPosition, axisSize);
            }
        }

        const trailingPosition: YGValue = YGComputedEdgeValue(this.style_.position, trailing[axis], YGValueUndefined);
        return trailingPosition.unit == YGUnit.Undefined ? new YGFloatOptional(0) : YGResolveValue(trailingPosition, axisSize);
    }

    getLeadingMargin(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        if (YGFlexDirectionIsRow(axis) && this.style_.margin[YGEdge.Start].unit != YGUnit.Undefined) {
            return YGResolveValueMargin(this.style_.margin[YGEdge.Start], widthSize);
        }

        return YGResolveValueMargin(YGComputedEdgeValue(this.style_.margin, leading[axis], YGValueZero), widthSize);
    }

    getTrailingMargin(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        if (YGFlexDirectionIsRow(axis) && this.style_.margin[YGEdge.End].unit != YGUnit.Undefined) {
            return YGResolveValueMargin(this.style_.margin[YGEdge.End], widthSize);
        }

        return YGResolveValueMargin(YGComputedEdgeValue(this.style_.margin, leading[axis], YGValueZero), widthSize);
    }

    getLeadingBorder(axis: YGFlexDirection): number {
        if (YGFlexDirectionIsRow(axis) &&
            this.style_.border[YGEdge.Start].unit != YGUnit.Undefined &&
            !YGFloatIsUndefined(this.style_.border[YGEdge.Start].value) &&
            this.style_.border[YGEdge.Start].value > 0.0) {
            return this.style_.border[YGEdge.Start].value;
        }

        const computedEdgeValue: number = YGComputedEdgeValue(this.style_.border, leading[axis], YGValueZero).value;
        return YGFloatMax(computedEdgeValue, 0.0);
    }

    getTrailingBorder(axis: YGFlexDirection): number {
        if (YGFlexDirectionIsRow(axis) &&
            this.style_.border[YGEdge.End].unit != YGUnit.Undefined &&
            !YGFloatIsUndefined(this.style_.border[YGEdge.End].value) &&
            this.style_.border[YGEdge.End].value > 0.0) {
            return this.style_.border[YGEdge.End].value;
        }

        const computedEdgeValue: number = YGComputedEdgeValue(this.style_.border, trailing[axis], YGValueZero).value;
        return YGFloatMax(computedEdgeValue, 0.0);
    }

    getLeadingPadding(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        const paddingEdgeStart: YGFloatOptional = YGResolveValue(this.style_.padding[YGEdge.Start], widthSize);
        if (YGFlexDirectionIsRow(axis) &&
            this.style_.padding[YGEdge.Start].unit != YGUnit.Undefined &&
            !paddingEdgeStart.isUndefined() && paddingEdgeStart.getValue() > 0.0) {
            return paddingEdgeStart;
        }

        const resolvedValue: YGFloatOptional = YGResolveValue(YGComputedEdgeValue(this.style_.padding, leading[axis], YGValueZero), widthSize);
        return YGFloatOptionalMax(resolvedValue, new YGFloatOptional(0.0));
    }

    getTrailingPadding(axis: YGFlexDirection, widthSize: number): YGFloatOptional {
        const paddingEdgeEnd: YGFloatOptional = YGResolveValue(this.style_.padding[YGEdge.End], widthSize);
        if (YGFlexDirectionIsRow(axis) &&
            this.style_.padding[YGEdge.Start].unit != YGUnit.Undefined &&
            !paddingEdgeEnd.isUndefined() && paddingEdgeEnd.getValue() >= 0.0) {
            return paddingEdgeEnd;
        }

        const resolvedValue: YGFloatOptional = YGResolveValue(YGComputedEdgeValue(this.style_.padding, trailing[axis], YGValueZero), widthSize);
        return YGFloatOptionalMax(resolvedValue, new YGFloatOptional(0.0));
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

    setMeasureFunc(measureFunc: YGMeasureFunc): void {
        if (measureFunc == null) {
            this.measure_ = null;
            this.nodeType_ = YGNodeType.Default;
        }
        else {
            //YGAssertWithNode(this, this.children_.size() == 0, "Cannot set measure function: Nodes with measure functions cannot have children.");
            if (this.children_.length == 0) {
                console.error("Cannot set measure function: Nodes with measure functions cannot have children.");
            }
            this.measure_ = measureFunc;
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

    setLayout(layout: YGLayout) : void{
        this.layout_ = layout;
    }

    setLineIndex(lineIndex: number): void {
        this.lineIndex_ = lineIndex;
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
        this.isDirty_ = isDirty;
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

    setLayoutMargin(margin: number , index: number): void {
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

        this.setLayoutPosition(YGUnwrapFloatOptional(this.getLeadingMargin(mainAxis, ownerWidth).add(relativePositionMain)), leading[mainAxis]);
        this.setLayoutPosition(YGUnwrapFloatOptional(this.getTrailingMargin(mainAxis, ownerWidth).add(relativePositionMain)), trailing[mainAxis]);
        this.setLayoutPosition(YGUnwrapFloatOptional(this.getLeadingMargin(crossAxis, ownerWidth).add(relativePositionCross)), leading[crossAxis]);
        this.setLayoutPosition(YGUnwrapFloatOptional(this.getTrailingMargin(crossAxis, ownerWidth).add(relativePositionCross)), leading[crossAxis]);
    }

    setAndPropogateUseLegacyFlag(useLegacyFlag: boolean): void {
        this.config_.useLegacyStretchBehaviour = useLegacyFlag;

        for(let i = 0; i < this.children_.length; i++) {
            this.children_[i].getConfig().useLegacyStretchBehaviour = useLegacyFlag;
        }
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
            return this.config_.useWebDefaults ? YGValueAuto : YGValueZero;
        }

        return YGValueAuto;
    }

    resolveDimension(): void {
        for (let dim = YGDimension.Width; dim < YGDimensionCount; dim++) {
            if (this.style_.maxDimensions[dim].unit != YGUnit.Undefined && YGValueEqual(this.style_.maxDimensions[dim], this.style_.minDimensions[dim])) {
                this.resolvedDimensions_[dim] = this.style_.maxDimensions[dim];
            } else {
                this.resolvedDimensions_[dim] = this.style_.dimensions[dim];
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

    cloneChildrenIfNeeded(): void {
        const childCount: number = this.children_.length;
        if (childCount == 0) {
            return;
        }

        const firstChild: YGNode = this.children_[0];
        if (firstChild.getOwner() == this) {
            return;
        }

        const cloneNodeCallback: YGCloneNodeFunc = this.config_.cloneNodeCallback;
        for (let i: number = 0; i < childCount; ++i) {
            const oldChild: YGNode = this.children_[i];
            let newChild: YGNode = null;

            if (cloneNodeCallback) {
                newChild = cloneNodeCallback(oldChild, this, i);
            }

            if (newChild == null) {
                newChild = YGNodeClone(oldChild);
            }

            this.replaceChildIndex(newChild, i);
            newChild.setOwner(this);
        }
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
            return this.style_.flexGrow.getValue();
        }

        if (!this.style_.flex.isUndefined() && this.style_.flex.getValue() > 0.0) {
            return this.style_.flex.getValue();
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
        return ((this.style_.positionType == YGPositionType.Relative) && (this.resolveFlexGrow() != 0 || this.resolveFlexShrink() != 0));
    }

    didUseLegacyFlag(): boolean {
        let didUseLegacyFlag: boolean = this.layout_.didUseLegacyFlag;
        if (didUseLegacyFlag) {
            return true;
        }

        for (let i: number = 0; i < this.children_.length; i++) {
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

        if (this.layout_ != node.getLayout()) {
            return false;
        }

        if (this.children_.length == 0) {
            return true;
        }

        let isLayoutTreeEqual: boolean = true;
        for (let i: number = 0; i < this.children_.length; ++i) {
            const otherNodeChildren: YGNode = node.getChild(i);
            isLayoutTreeEqual = this.children_[i].isLayoutTreeEqualToNode(otherNodeChildren);
            if (!isLayoutTreeEqual) {
                return false;
            }
        }

        return isLayoutTreeEqual;
    }

}

export {
    YGNode
}