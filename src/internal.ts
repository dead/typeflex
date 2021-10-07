// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/Yoga-internal.h

import { YGMeasureMode, YGEdge, YGDimension } from './enums';

import { YGFloatIsUndefined } from './yoga';

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
        this.widthMeasureMode = YGMeasureMode.Undefined;
        this.heightMeasureMode = YGMeasureMode.Undefined;
        this.computedWidth = -1;
        this.computedHeight = -1;
    }

    isEqual(measurement: YGCachedMeasurement): boolean {
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
        const newCached = new YGCachedMeasurement();
        newCached.availableWidth = this.availableWidth;
        newCached.availableHeight = this.availableHeight;
        newCached.widthMeasureMode = this.widthMeasureMode;
        newCached.heightMeasureMode = this.heightMeasureMode;
        newCached.computedWidth = this.computedWidth;
        newCached.computedHeight = this.computedHeight;
        return newCached;
    }
}

export const leading: [YGEdge.Top, YGEdge.Bottom, YGEdge.Left, YGEdge.Right] = [
    YGEdge.Top,
    YGEdge.Bottom,
    YGEdge.Left,
    YGEdge.Right,
];
export const trailing: [YGEdge.Bottom, YGEdge.Top, YGEdge.Right, YGEdge.Left] = [
    YGEdge.Bottom,
    YGEdge.Top,
    YGEdge.Right,
    YGEdge.Left,
];
export const pos: [YGEdge.Top, YGEdge.Bottom, YGEdge.Left, YGEdge.Right] = [
    YGEdge.Top,
    YGEdge.Bottom,
    YGEdge.Left,
    YGEdge.Right,
];
export const dim: [YGDimension.Height, YGDimension.Height, YGDimension.Width, YGDimension.Width] = [
    YGDimension.Height,
    YGDimension.Height,
    YGDimension.Width,
    YGDimension.Width,
];

export const YG_MAX_CACHED_RESULT_COUNT = 16;
export const kDefaultFlexGrow = 0.0;
export const kDefaultFlexShrink = 0.0;
export const kWebDefaultFlexShrink = 1.0;
