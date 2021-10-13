// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGLayout.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGLayout.cpp

import { YGDirection } from './enums';
import { YGFloatOptional } from './ygfloatoptional';
import { YGCachedMeasurement } from './internal';
import { YGFloatArrayEqual } from './utils';
import { YGFloatIsUndefined } from './yoga';

const kYGDefaultDimensionValues: () => [number, number] = () => [undefined, undefined];
const YG_MAX_CACHED_RESULT_COUNT = 16;

function buildCache(c: number): Array<YGCachedMeasurement> {
    const ret: Array<YGCachedMeasurement> = [];
    for (let i = 0; i < c; i++) {
        ret.push(new YGCachedMeasurement());
    }
    return ret;
}

class YGLayout {
    public position: [number, number, number, number];
    public dimensions: [number, number];
    public margin: [number, number, number, number, number, number];
    public border: [number, number, number, number, number, number];
    public padding: [number, number, number, number, number, number];
    public direction: YGDirection;

    public computedFlexBasisGeneration: number;
    public computedFlexBasis: YGFloatOptional;
    public hadOverflow: boolean;

    public generationCount: number;
    public lastOwnerDirection: YGDirection;

    public nextCachedMeasurementsIndex: number;
    public cachedMeasurements: Array<YGCachedMeasurement>;
    public measuredDimensions: Array<number>;

    public cachedLayout: YGCachedMeasurement;
    public didUseLegacyFlag: boolean;
    public doesLegacyStretchFlagAffectsLayout: boolean;

    constructor() {
        this.dimensions = kYGDefaultDimensionValues();
        this.direction = YGDirection.Inherit;
        this.computedFlexBasisGeneration = 0;
        this.computedFlexBasis = new YGFloatOptional();
        this.hadOverflow = false;
        this.generationCount = 0;
        this.lastOwnerDirection = YGDirection.Inherit;
        this.nextCachedMeasurementsIndex = 0;
        this.measuredDimensions = kYGDefaultDimensionValues();
        this.cachedLayout = new YGCachedMeasurement();
        this.didUseLegacyFlag = false;
        this.doesLegacyStretchFlagAffectsLayout = false;
        this.position = [undefined, undefined, undefined, undefined];
        this.margin = [undefined, undefined, undefined, undefined, undefined, undefined];
        this.border = [undefined, undefined, undefined, undefined, undefined, undefined];
        this.padding = [undefined, undefined, undefined, undefined, undefined, undefined];
        this.cachedMeasurements = buildCache(YG_MAX_CACHED_RESULT_COUNT);
    }

    getDirection(): YGDirection {
        return this.direction;
    }

    setDirection(direction: YGDirection): void {
        this.direction = direction;
    }

    getDidUseLegacyFlag(): boolean {
        return this.didUseLegacyFlag;
    }

    setDidUseLegacyFlag(val: boolean): void {
        this.didUseLegacyFlag = val;
    }

    getDoesLegacyStretchFlagAffectsLayout(): boolean {
        return this.doesLegacyStretchFlagAffectsLayout;
    }

    setDoesLegacyStretchFlagAffectsLayout(val: boolean): void {
        this.doesLegacyStretchFlagAffectsLayout = true;
    }

    getHadOverflow(): boolean {
        return this.hadOverflow;
    }

    setHadOverflow(hadOverflow: boolean): void {
        this.hadOverflow = hadOverflow;
    }

    equal(layout: YGLayout): boolean {
        let isEqual: boolean =
            YGFloatArrayEqual(this.position, layout.position) &&
            YGFloatArrayEqual(this.dimensions, layout.dimensions) &&
            YGFloatArrayEqual(this.margin, layout.margin) &&
            YGFloatArrayEqual(this.border, layout.border) &&
            YGFloatArrayEqual(this.padding, layout.padding) &&
            this.direction == layout.direction &&
            this.hadOverflow == layout.hadOverflow &&
            this.lastOwnerDirection == layout.lastOwnerDirection &&
            this.nextCachedMeasurementsIndex == layout.nextCachedMeasurementsIndex &&
            this.cachedLayout == layout.cachedLayout &&
            this.computedFlexBasis == layout.computedFlexBasis;

        for (let i = 0; i < YG_MAX_CACHED_RESULT_COUNT && isEqual; ++i) {
            isEqual = isEqual && this.cachedMeasurements[i] == layout.cachedMeasurements[i];
        }

        if (!YGFloatIsUndefined(this.measuredDimensions[0]) || !YGFloatIsUndefined(layout.measuredDimensions[0])) {
            isEqual = isEqual && this.measuredDimensions[0] == layout.measuredDimensions[0];
        }

        if (!YGFloatIsUndefined(this.measuredDimensions[1]) || !YGFloatIsUndefined(layout.measuredDimensions[1])) {
            isEqual = isEqual && this.measuredDimensions[1] == layout.measuredDimensions[1];
        }

        return isEqual;
    }

    diff(layout: YGLayout): boolean {
        return !this.equal(layout);
    }

    clean(): void {
        this.dimensions = kYGDefaultDimensionValues();
        this.direction = YGDirection.Inherit;
        this.computedFlexBasisGeneration = 0;
        this.computedFlexBasis = new YGFloatOptional();
        this.hadOverflow = false;
        this.generationCount = 0;
        this.lastOwnerDirection = YGDirection.RTL;
        this.nextCachedMeasurementsIndex = 0;
        this.measuredDimensions = kYGDefaultDimensionValues();
        this.cachedLayout = new YGCachedMeasurement();
        this.didUseLegacyFlag = false;
        this.doesLegacyStretchFlagAffectsLayout = false;
        this.position = [undefined, undefined, undefined, undefined];
        this.margin = [undefined, undefined, undefined, undefined, undefined, undefined];
        this.border = [undefined, undefined, undefined, undefined, undefined, undefined];
        this.padding = [undefined, undefined, undefined, undefined, undefined, undefined];
        this.cachedMeasurements = buildCache(YG_MAX_CACHED_RESULT_COUNT);
    }

    clone(): YGLayout {
        const newLayout = new YGLayout();
        newLayout.dimensions = [this.dimensions[0], this.dimensions[1]];
        newLayout.direction = this.direction;
        newLayout.computedFlexBasisGeneration = this.computedFlexBasisGeneration;
        newLayout.computedFlexBasis = this.computedFlexBasis.clone();
        newLayout.hadOverflow = this.hadOverflow;
        newLayout.generationCount = this.generationCount;
        newLayout.lastOwnerDirection = this.lastOwnerDirection;
        newLayout.nextCachedMeasurementsIndex = this.nextCachedMeasurementsIndex;
        newLayout.measuredDimensions = [this.measuredDimensions[0], this.measuredDimensions[1]];
        newLayout.cachedLayout = this.cachedLayout.clone();
        newLayout.didUseLegacyFlag = this.didUseLegacyFlag;
        newLayout.doesLegacyStretchFlagAffectsLayout = this.doesLegacyStretchFlagAffectsLayout;
        newLayout.position = [this.position[0], this.position[1], this.position[2], this.position[3]];
        newLayout.margin = [
            this.margin[0],
            this.margin[1],
            this.margin[2],
            this.margin[3],
            this.margin[4],
            this.margin[5],
        ];
        newLayout.border = [
            this.border[0],
            this.border[1],
            this.border[2],
            this.border[3],
            this.border[4],
            this.border[5],
        ];
        newLayout.padding = [
            this.padding[0],
            this.padding[1],
            this.padding[2],
            this.padding[3],
            this.padding[4],
            this.padding[5],
        ];
        newLayout.cachedMeasurements = buildCache(YG_MAX_CACHED_RESULT_COUNT);
        return newLayout;
    }
}

export { YGLayout };
