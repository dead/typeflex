import {
    YGUnit
} from "./enums";

export class YGValue {
    public value: number;
    public unit: YGUnit;

    constructor(value: number, unit: YGUnit) {
        this.value = value;
        this.unit = unit;
    }
}
