import {
    YGMeasureMode,
    YGEdge,
    YGUnit,
    YGLogLevel
} from "./enums";

import { YGNode } from "./ygnode";

import {
    YGFloatIsUndefined,
    YGValue
} from "./yoga";

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
        let isEqual = this.widthMeasureMode == measurement.widthMeasureMode && this.heightMeasureMode == measurement.heightMeasureMode;

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
}

export function YGRoundValueToPixelGrid(value: number, pointScaleFactor: number, forceCeil: boolean, forceFloor: boolean): number {
    return 0;
}

export let trailing: [YGEdge, YGEdge, YGEdge, YGEdge];
export let leading: [YGEdge, YGEdge, YGEdge, YGEdge];

export const YGUndefined: number = undefined;
export const YGValueUndefined: YGValue = new YGValue(YGUndefined, YGUnit.Undefined);
export const YGValueAuto: YGValue = new YGValue(YGUndefined, YGUnit.Auto);
export const YGValueZero: YGValue = new YGValue(0, YGUnit.Point);

export const YG_MAX_CACHED_RESULT_COUNT: number = 16;
export const kDefaultFlexGrow: number = 0.0;
export const kDefaultFlexShrink: number = 0.0;
export const kWebDefaultFlexShrink: number = 1.0;
