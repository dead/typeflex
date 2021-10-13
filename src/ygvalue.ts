// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGValue.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGValue.cpp

import { YGUnit } from './enums';

export const YGUndefined: number = undefined;
export const YGValueZero: () => YGValue = () => new YGValue(0, YGUnit.Point);
export const YGValueUndefined: () => YGValue = () => new YGValue(YGUndefined, YGUnit.Undefined);
export const YGValueAuto: () => YGValue = () => new YGValue(YGUndefined, YGUnit.Auto);

export class YGValue {
    public value: number;
    public unit: YGUnit;

    constructor(value: number, unit: YGUnit) {
        this.value = value;
        this.unit = unit;
    }

    eq(value: YGValue): boolean {
        const lhs = this;
        const rhs = value;

        if (lhs.unit != rhs.unit) {
            return false;
        }

        switch (lhs.unit) {
            case YGUnit.Undefined:
            case YGUnit.Auto:
                return true;
            case YGUnit.Point:
            case YGUnit.Percent:
                return lhs.value == rhs.value;
        }

        return false;
    }

    neq(value: YGValue): boolean {
        return !this.eq(value);
    }

    subtract(value: YGValue): YGValue {
        return new YGValue(-value.value, value.unit);
    }

    clone(): YGValue {
        return new YGValue(this.value, this.unit);
    }

    // deviation: upstream this is only provided in CompactValue.
    isUndefined(): boolean {
        return this.unit == YGUnit.Undefined;
    }
}
