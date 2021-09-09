import { YGMeasureMode, YGEdge, YGUnit, YGLogLevel, YGDimension } from "./enums";

import { YGNode } from "./ygnode";

import { YGFloatIsUndefined } from "./yoga";

export class YGCachedMeasurement {
    public availableWidth: number;
    public availableHeight: number;
    public widthMeasureMode: YGMeasureMode;
    public heightMeasureMode: YGMeasureMode;
    public computedWidth: number;
    public computedHeight: number;

    constructor() {
        this.availableWidth = 0;
        this.availableHeight = 0;
        this.widthMeasureMode = YGMeasureMode.AtMost;
        this.heightMeasureMode = YGMeasureMode.AtMost;
        this.computedWidth = -1;
        this.computedHeight = -1;
    }

    isEqual(measurement: YGCachedMeasurement) {
        let isEqual =
            this.widthMeasureMode == measurement.widthMeasureMode &&
            this.heightMeasureMode == measurement.heightMeasureMode;

        if (!YGFloatIsUndefined(this.availableWidth) || !YGFloatIsUndefined(measurement.availableWidth)) {
            isEqual = isEqual && this.availableWidth == measurement.availableWidth;
        }

        if (!YGFloatIsUndefined(this.availableHeight) || !YGFloatIsUndefined(measurement.availableHeight)) {
            isEqual = isEqual && this.availableHeight == measurement.availableHeight;
        }

        if (!YGFloatIsUndefined(this.computedWidth) || !YGFloatIsUndefined(measurement.computedWidth)) {
            isEqual = isEqual && this.computedWidth == measurement.computedWidth;
        }

        if (!YGFloatIsUndefined(this.computedHeight) || !YGFloatIsUndefined(measurement.computedHeight)) {
            isEqual = isEqual && this.computedHeight == measurement.computedHeight;
        }

        return isEqual;
    }

    clone(): YGCachedMeasurement {
        let newCached = new YGCachedMeasurement();
        newCached.availableWidth = this.availableWidth;
        newCached.availableHeight = this.availableHeight;
        newCached.widthMeasureMode = this.widthMeasureMode;
        newCached.heightMeasureMode = this.heightMeasureMode;
        newCached.computedWidth = this.computedWidth;
        newCached.computedHeight = this.computedHeight;
        return newCached;
    }
}

export const leading: [YGEdge, YGEdge, YGEdge, YGEdge] = [YGEdge.Top, YGEdge.Bottom, YGEdge.Left, YGEdge.Right];
export const trailing: [YGEdge, YGEdge, YGEdge, YGEdge] = [YGEdge.Bottom, YGEdge.Top, YGEdge.Right, YGEdge.Left];
export const pos: [YGEdge, YGEdge, YGEdge, YGEdge] = [YGEdge.Top, YGEdge.Bottom, YGEdge.Left, YGEdge.Right];
export const dim: [YGDimension, YGDimension, YGDimension, YGDimension] = [
    YGDimension.Height,
    YGDimension.Height,
    YGDimension.Width,
    YGDimension.Width,
];

export const YG_MAX_CACHED_RESULT_COUNT: number = 16;
export const kDefaultFlexGrow: number = 0.0;
export const kDefaultFlexShrink: number = 0.0;
export const kWebDefaultFlexShrink: number = 1.0;
