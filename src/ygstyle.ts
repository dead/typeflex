// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGStyle.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGStyle.cpp

import {
    YGDirection,
    YGFlexDirection,
    YGPositionType,
    YGJustify,
    YGAlign,
    YGWrap,
    YGOverflow,
    YGDisplay,
    YGEdgeCount,
    YGUnit,
} from './enums';

import { YGValueEqual, YGValueArrayEqual, cloneYGValueArray } from './utils';

import { YGValue } from './ygvalue';
import { YGFloatOptional } from './ygfloatoptional';

const kYGValueUndefined: () => YGValue = () => new YGValue(0, YGUnit.Undefined);
const kYGValueAuto: () => YGValue = () => new YGValue(0, YGUnit.Auto);
const kYGDefaultEdgeValuesUnit: () => Array<YGValue> = () => [
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
    kYGValueUndefined(),
];
const kYGDefaultDimensionValuesAutoUnit: () => [YGValue, YGValue] = () => [kYGValueAuto(), kYGValueAuto()];
const kYGDefaultDimensionValuesUnit: () => [YGValue, YGValue] = () => [kYGValueUndefined(), kYGValueUndefined()];

class YGStyle {
    public direction: YGDirection;
    public flexDirection: YGFlexDirection;
    public justifyContent: YGJustify;
    public alignContent: YGAlign;
    public alignItems: YGAlign;
    public alignSelf: YGAlign;
    public positionType: YGPositionType;
    public flexWrap: YGWrap;
    public overflow: YGOverflow;
    public display: YGDisplay;
    public flex: YGFloatOptional;
    public flexGrow: YGFloatOptional;
    public flexShrink: YGFloatOptional;
    public flexBasis: YGValue;
    public margin: Array<YGValue> = new Array(YGEdgeCount);
    public position: Array<YGValue> = new Array(YGEdgeCount);
    public padding: Array<YGValue> = new Array(YGEdgeCount);
    public border: Array<YGValue> = new Array(YGEdgeCount);
    public dimensions: [YGValue, YGValue];
    public minDimensions: [YGValue, YGValue];
    public maxDimensions: [YGValue, YGValue];
    public aspectRatio: YGFloatOptional;

    constructor() {
        this.direction = YGDirection.Inherit;
        this.flexDirection = YGFlexDirection.Column;
        this.justifyContent = YGJustify.FlexStart;
        this.alignContent = YGAlign.FlexStart;
        this.alignItems = YGAlign.Stretch;
        this.alignSelf = YGAlign.Auto;
        this.positionType = YGPositionType.Relative;
        this.flexWrap = YGWrap.NoWrap;
        this.overflow = YGOverflow.Visible;
        this.display = YGDisplay.Flex;
        this.flex = new YGFloatOptional();
        this.flexGrow = new YGFloatOptional();
        this.flexShrink = new YGFloatOptional();
        this.flexBasis = kYGValueAuto();
        this.margin = kYGDefaultEdgeValuesUnit();
        this.position = kYGDefaultEdgeValuesUnit();
        this.padding = kYGDefaultEdgeValuesUnit();
        this.border = kYGDefaultEdgeValuesUnit();
        this.dimensions = kYGDefaultDimensionValuesAutoUnit();
        this.minDimensions = kYGDefaultDimensionValuesUnit();
        this.maxDimensions = kYGDefaultDimensionValuesUnit();
        this.aspectRatio = new YGFloatOptional();
    }

    isEqual(style: YGStyle): boolean {
        let areNonFloatValuesEqual: boolean =
            this.direction == style.direction &&
            this.flexDirection == style.flexDirection &&
            this.justifyContent == style.justifyContent &&
            this.alignContent == style.alignContent &&
            this.alignItems == style.alignItems &&
            this.alignSelf == style.alignSelf &&
            this.positionType == style.positionType &&
            this.flexWrap == style.flexWrap &&
            this.overflow == style.overflow &&
            this.display == style.display &&
            YGValueEqual(this.flexBasis, style.flexBasis) &&
            YGValueArrayEqual(this.margin, style.margin) &&
            YGValueArrayEqual(this.position, style.position) &&
            YGValueArrayEqual(this.padding, style.padding) &&
            YGValueArrayEqual(this.border, style.border) &&
            YGValueArrayEqual(this.dimensions, style.dimensions) &&
            YGValueArrayEqual(this.minDimensions, style.minDimensions) &&
            YGValueArrayEqual(this.maxDimensions, style.maxDimensions);

        areNonFloatValuesEqual = areNonFloatValuesEqual && this.flex.isUndefined() == style.flex.isUndefined();
        if (areNonFloatValuesEqual && !this.flex.isUndefined() && !style.flex.isUndefined()) {
            areNonFloatValuesEqual = areNonFloatValuesEqual && this.flex.getValue() == style.flex.getValue();
        }

        areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexGrow.isUndefined() == style.flexGrow.isUndefined();
        if (areNonFloatValuesEqual && !this.flexGrow.isUndefined()) {
            areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexGrow.getValue() == style.flexGrow.getValue();
        }

        areNonFloatValuesEqual =
            areNonFloatValuesEqual && this.flexShrink.isUndefined() == style.flexShrink.isUndefined();
        if (areNonFloatValuesEqual && !style.flexShrink.isUndefined()) {
            areNonFloatValuesEqual =
                areNonFloatValuesEqual && this.flexShrink.getValue() == style.flexShrink.getValue();
        }

        if (!(this.aspectRatio.isUndefined() && style.aspectRatio.isUndefined())) {
            areNonFloatValuesEqual =
                areNonFloatValuesEqual && this.aspectRatio.getValue() == style.aspectRatio.getValue();
        }

        return areNonFloatValuesEqual;
    }

    isDiff(style: YGStyle): boolean {
        return !this.isEqual(style);
    }

    clone(): YGStyle {
        const newStyle: YGStyle = new YGStyle();
        newStyle.direction = this.direction;
        newStyle.flexDirection = this.flexDirection;
        newStyle.justifyContent = this.justifyContent;
        newStyle.alignContent = this.alignContent;
        newStyle.alignItems = this.alignItems;
        newStyle.alignSelf = this.alignSelf;
        newStyle.positionType = this.positionType;
        newStyle.flexWrap = this.flexWrap;
        newStyle.overflow = this.overflow;
        newStyle.display = this.display;
        newStyle.flex = this.flex.clone();
        newStyle.flexGrow = this.flexGrow.clone();
        newStyle.flexShrink = this.flexShrink.clone();
        newStyle.flexBasis = this.flexBasis.clone();
        newStyle.margin = cloneYGValueArray(this.margin);
        newStyle.position = cloneYGValueArray(this.position);
        newStyle.padding = cloneYGValueArray(this.padding);
        newStyle.border = cloneYGValueArray(this.border);
        newStyle.dimensions = [this.dimensions[0].clone(), this.dimensions[1].clone()];
        newStyle.minDimensions = [this.minDimensions[0].clone(), this.minDimensions[1].clone()];
        newStyle.maxDimensions = [this.maxDimensions[0].clone(), this.maxDimensions[1].clone()];
        newStyle.aspectRatio = this.aspectRatio.clone();
        return newStyle;
    }
}

export { YGStyle };
