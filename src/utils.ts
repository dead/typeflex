// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/Utils.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/Utils.cpp

import { YGUnit, YGFlexDirection, YGDirection } from './enums';

import { YGFloatOptional } from './ygfloatoptional';

import { YGFloatIsUndefined } from './yoga';

import { YGNode } from './ygnode';
import { YGValue } from './ygvalue';

export class YGCollectFlexItemsRowValues {
    public itemsOnLine = 0;
    public sizeConsumedOnCurrentLine = 0;
    public totalFlexGrowFactors = 0;
    public totalFlexShrinkScaledFactors = 0;
    public endOfLineIndex = 0;
    public relativeChildren: Array<YGNode> = [];
    public remainingFreeSpace = 0;
    public mainDim = 0;
    public crossDim = 0;
}

export function YGValueEqual(a: YGValue, b: YGValue): boolean {
    if (a.unit != b.unit) {
        return false;
    }

    if (a.unit == YGUnit.Undefined || (YGFloatIsUndefined(a.value) && YGFloatIsUndefined(b.value))) {
        return true;
    }

    return Math.abs(a.value - b.value) < 0.0001;
}

export function YGFloatsEqual(a: number, b: number): boolean {
    if (!YGFloatIsUndefined(a) && !YGFloatIsUndefined(b)) {
        return Math.abs(a - b) < 0.0001;
    }
    return YGFloatIsUndefined(a) && YGFloatIsUndefined(b);
}

export function YGFloatMax(a: number, b: number): number {
    if (!YGFloatIsUndefined(a) && !YGFloatIsUndefined(b)) {
        return Math.max(a, b);
    }
    return YGFloatIsUndefined(a) ? b : a;
}

export function YGFloatOptionalMax(op1: YGFloatOptional, op2: YGFloatOptional): YGFloatOptional {
    if (!op1.isUndefined() && !op2.isUndefined()) {
        return op1.getValue() > op2.getValue() ? op1 : op2;
    }

    return op1.isUndefined() ? op2 : op1;
}

export function YGFloatMin(a: number, b: number): number {
    if (!YGFloatIsUndefined(a) && !YGFloatIsUndefined(b)) {
        return Math.min(a, b);
    }
    return YGFloatIsUndefined(a) ? b : a;
}

export function YGFloatArrayEqual(val1: Array<number>, val2: Array<number>): boolean {
    let areEqual = true;
    for (let i = 0; i < val1.length && areEqual; ++i) {
        areEqual = YGFloatsEqual(val1[i], val2[i]);
    }
    return areEqual;
}

export function YGValueArrayEqual(val1: Array<YGValue>, val2: Array<YGValue>): boolean {
    let areEqual = true;
    for (let i = 0; i < val1.length && areEqual; ++i) {
        areEqual = YGValueEqual(val1[i], val2[i]);
    }
    return areEqual;
}

export function YGFloatSanitize(val: number): number {
    return YGFloatIsUndefined(val) ? 0 : val;
}

export function YGFlexDirectionCross(flexDirection: YGFlexDirection, direction: YGDirection): YGFlexDirection {
    return YGFlexDirectionIsColumn(flexDirection)
        ? YGResolveFlexDirection(YGFlexDirection.Row, direction)
        : YGFlexDirection.Column;
}

export function YGFlexDirectionIsRow(flexDirection: YGFlexDirection): boolean {
    return flexDirection == YGFlexDirection.Row || flexDirection == YGFlexDirection.RowReverse;
}

export function YGResolveValue(value: YGValue, ownerSize: number): YGFloatOptional {
    switch (value.unit) {
        case YGUnit.Point:
            return new YGFloatOptional(value.value);
        case YGUnit.Percent:
            return new YGFloatOptional(value.value * ownerSize * 0.01);
        default:
            return new YGFloatOptional();
    }
}

export function YGFlexDirectionIsColumn(flexDirection: YGFlexDirection): boolean {
    return flexDirection == YGFlexDirection.Column || flexDirection == YGFlexDirection.ColumnReverse;
}

export function YGResolveFlexDirection(flexDirection: YGFlexDirection, direction: YGDirection): YGFlexDirection {
    if (direction == YGDirection.RTL) {
        if (flexDirection == YGFlexDirection.Row) {
            return YGFlexDirection.RowReverse;
        } else if (flexDirection == YGFlexDirection.RowReverse) {
            return YGFlexDirection.Row;
        }
    }
    return flexDirection;
}

export function YGResolveValueMargin(value: YGValue, ownerSize: number): YGFloatOptional {
    return value.unit == YGUnit.Auto ? new YGFloatOptional(0) : YGResolveValue(value, ownerSize);
}

export function throwLogicalErrorWithMessage(message: string): void {
    throw new Error(message);
}

export function cloneYGValueArray(array: Array<YGValue>): Array<YGValue> {
    const ret = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
        ret[i] = array[i].clone();
    }
    return ret;
}
