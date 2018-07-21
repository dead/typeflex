define("enums", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.YGAlignCount = 8;
    var YGAlign;
    (function (YGAlign) {
        YGAlign[YGAlign["Auto"] = 0] = "Auto";
        YGAlign[YGAlign["FlexStart"] = 1] = "FlexStart";
        YGAlign[YGAlign["Center"] = 2] = "Center";
        YGAlign[YGAlign["FlexEnd"] = 3] = "FlexEnd";
        YGAlign[YGAlign["Stretch"] = 4] = "Stretch";
        YGAlign[YGAlign["Baseline"] = 5] = "Baseline";
        YGAlign[YGAlign["SpaceBetween"] = 6] = "SpaceBetween";
        YGAlign[YGAlign["SpaceAround"] = 7] = "SpaceAround";
    })(YGAlign = exports.YGAlign || (exports.YGAlign = {}));
    function YGAlignToString(value) {
        switch (value) {
            case YGAlign.Auto:
                return "auto";
            case YGAlign.FlexStart:
                return "flex-start";
            case YGAlign.Center:
                return "center";
            case YGAlign.FlexEnd:
                return "flex-end";
            case YGAlign.Stretch:
                return "stretch";
            case YGAlign.Baseline:
                return "baseline";
            case YGAlign.SpaceBetween:
                return "space-between";
            case YGAlign.SpaceAround:
                return "space-around";
        }
        return "unknown";
    }
    exports.YGAlignToString = YGAlignToString;
    exports.YGDimensionCount = 2;
    var YGDimension;
    (function (YGDimension) {
        YGDimension[YGDimension["Width"] = 0] = "Width";
        YGDimension[YGDimension["Height"] = 1] = "Height";
    })(YGDimension = exports.YGDimension || (exports.YGDimension = {}));
    function YGDimensionToString(value) {
        switch (value) {
            case YGDimension.Width:
                return "width";
            case YGDimension.Height:
                return "height";
        }
        return "unknown";
    }
    exports.YGDimensionToString = YGDimensionToString;
    var YGDirection;
    (function (YGDirection) {
        YGDirection[YGDirection["Inherit"] = 0] = "Inherit";
        YGDirection[YGDirection["LTR"] = 1] = "LTR";
        YGDirection[YGDirection["RTL"] = 2] = "RTL";
    })(YGDirection = exports.YGDirection || (exports.YGDirection = {}));
    function YGDirectionToString(value) {
        switch (value) {
            case YGDirection.Inherit:
                return "inherit";
            case YGDirection.LTR:
                return "ltr";
            case YGDirection.RTL:
                return "rtl";
        }
        return "unknown";
    }
    exports.YGDirectionToString = YGDirectionToString;
    exports.YGDisplayCount = 2;
    var YGDisplay;
    (function (YGDisplay) {
        YGDisplay[YGDisplay["Flex"] = 0] = "Flex";
        YGDisplay[YGDisplay["None"] = 1] = "None";
    })(YGDisplay = exports.YGDisplay || (exports.YGDisplay = {}));
    function YGDisplayToString(value) {
        switch (value) {
            case YGDisplay.Flex:
                return "flex";
            case YGDisplay.None:
                return "none";
        }
        return "unknown";
    }
    exports.YGDisplayToString = YGDisplayToString;
    exports.YGEdgeCount = 9;
    var YGEdge;
    (function (YGEdge) {
        YGEdge[YGEdge["Left"] = 0] = "Left";
        YGEdge[YGEdge["Top"] = 1] = "Top";
        YGEdge[YGEdge["Right"] = 2] = "Right";
        YGEdge[YGEdge["Bottom"] = 3] = "Bottom";
        YGEdge[YGEdge["Start"] = 4] = "Start";
        YGEdge[YGEdge["End"] = 5] = "End";
        YGEdge[YGEdge["Horizontal"] = 6] = "Horizontal";
        YGEdge[YGEdge["Vertical"] = 7] = "Vertical";
        YGEdge[YGEdge["All"] = 8] = "All";
    })(YGEdge = exports.YGEdge || (exports.YGEdge = {}));
    function YGEdgeToString(value) {
        switch (value) {
            case YGEdge.Left:
                return "left";
            case YGEdge.Top:
                return "top";
            case YGEdge.Right:
                return "right";
            case YGEdge.Bottom:
                return "bottom";
            case YGEdge.Start:
                return "start";
            case YGEdge.End:
                return "end";
            case YGEdge.Horizontal:
                return "horizontal";
            case YGEdge.Vertical:
                return "vertical";
            case YGEdge.All:
                return "all";
        }
        return "unknown";
    }
    exports.YGEdgeToString = YGEdgeToString;
    exports.YGExperimentalFeatureCount = 1;
    var YGExperimentalFeature;
    (function (YGExperimentalFeature) {
        YGExperimentalFeature[YGExperimentalFeature["WebFlexBasis"] = 0] = "WebFlexBasis";
    })(YGExperimentalFeature = exports.YGExperimentalFeature || (exports.YGExperimentalFeature = {}));
    function YGExperimentalFeatureToString(value) {
        switch (value) {
            case YGExperimentalFeature.WebFlexBasis:
                return "web-flex-basis";
        }
        return "unknown";
    }
    exports.YGExperimentalFeatureToString = YGExperimentalFeatureToString;
    exports.YGFlexDirectionCount = 4;
    var YGFlexDirection;
    (function (YGFlexDirection) {
        YGFlexDirection[YGFlexDirection["Column"] = 0] = "Column";
        YGFlexDirection[YGFlexDirection["ColumnReverse"] = 1] = "ColumnReverse";
        YGFlexDirection[YGFlexDirection["Row"] = 2] = "Row";
        YGFlexDirection[YGFlexDirection["RowReverse"] = 3] = "RowReverse";
    })(YGFlexDirection = exports.YGFlexDirection || (exports.YGFlexDirection = {}));
    function YGFlexDirectionToString(value) {
        switch (value) {
            case YGFlexDirection.Column:
                return "column";
            case YGFlexDirection.ColumnReverse:
                return "column-reverse";
            case YGFlexDirection.Row:
                return "row";
            case YGFlexDirection.RowReverse:
                return "row-reverse";
        }
        return "unknown";
    }
    exports.YGFlexDirectionToString = YGFlexDirectionToString;
    exports.YGJustifyCount = 6;
    var YGJustify;
    (function (YGJustify) {
        YGJustify[YGJustify["FlexStart"] = 0] = "FlexStart";
        YGJustify[YGJustify["Center"] = 1] = "Center";
        YGJustify[YGJustify["FlexEnd"] = 2] = "FlexEnd";
        YGJustify[YGJustify["SpaceBetween"] = 3] = "SpaceBetween";
        YGJustify[YGJustify["SpaceAround"] = 4] = "SpaceAround";
        YGJustify[YGJustify["SpaceEvenly"] = 5] = "SpaceEvenly";
    })(YGJustify = exports.YGJustify || (exports.YGJustify = {}));
    function YGJustifyToString(value) {
        switch (value) {
            case YGJustify.FlexStart:
                return "flex-start";
            case YGJustify.Center:
                return "center";
            case YGJustify.FlexEnd:
                return "flex-end";
            case YGJustify.SpaceBetween:
                return "space-between";
            case YGJustify.SpaceAround:
                return "space-around";
            case YGJustify.SpaceEvenly:
                return "space-evenly";
        }
        return "unknown";
    }
    exports.YGJustifyToString = YGJustifyToString;
    exports.YGLogLevelCount = 6;
    var YGLogLevel;
    (function (YGLogLevel) {
        YGLogLevel[YGLogLevel["Error"] = 0] = "Error";
        YGLogLevel[YGLogLevel["Warn"] = 1] = "Warn";
        YGLogLevel[YGLogLevel["Info"] = 2] = "Info";
        YGLogLevel[YGLogLevel["Debug"] = 3] = "Debug";
        YGLogLevel[YGLogLevel["Verbose"] = 4] = "Verbose";
        YGLogLevel[YGLogLevel["Fatal"] = 5] = "Fatal";
    })(YGLogLevel = exports.YGLogLevel || (exports.YGLogLevel = {}));
    function YGLogLevelToString(value) {
        switch (value) {
            case YGLogLevel.Error:
                return "error";
            case YGLogLevel.Warn:
                return "warn";
            case YGLogLevel.Info:
                return "info";
            case YGLogLevel.Debug:
                return "debug";
            case YGLogLevel.Verbose:
                return "verbose";
            case YGLogLevel.Fatal:
                return "fatal";
        }
        return "unknown";
    }
    exports.YGLogLevelToString = YGLogLevelToString;
    exports.YGMeasureModeCount = 3;
    var YGMeasureMode;
    (function (YGMeasureMode) {
        YGMeasureMode[YGMeasureMode["Undefined"] = 0] = "Undefined";
        YGMeasureMode[YGMeasureMode["Exactly"] = 1] = "Exactly";
        YGMeasureMode[YGMeasureMode["AtMost"] = 2] = "AtMost";
    })(YGMeasureMode = exports.YGMeasureMode || (exports.YGMeasureMode = {}));
    function YGMeasureModeToString(value) {
        switch (value) {
            case YGMeasureMode.Undefined:
                return "undefined";
            case YGMeasureMode.Exactly:
                return "exactly";
            case YGMeasureMode.AtMost:
                return "at-most";
        }
        return "unknown";
    }
    exports.YGMeasureModeToString = YGMeasureModeToString;
    exports.YGNodeTypeCount = 2;
    var YGNodeType;
    (function (YGNodeType) {
        YGNodeType[YGNodeType["Default"] = 0] = "Default";
        YGNodeType[YGNodeType["Text"] = 1] = "Text";
    })(YGNodeType = exports.YGNodeType || (exports.YGNodeType = {}));
    function YGNodeTypeToString(value) {
        switch (value) {
            case YGNodeType.Default:
                return "default";
            case YGNodeType.Text:
                return "text";
        }
        return "unknown";
    }
    exports.YGNodeTypeToString = YGNodeTypeToString;
    exports.YGOverflowCount = 3;
    var YGOverflow;
    (function (YGOverflow) {
        YGOverflow[YGOverflow["Visible"] = 0] = "Visible";
        YGOverflow[YGOverflow["Hidden"] = 1] = "Hidden";
        YGOverflow[YGOverflow["Scroll"] = 2] = "Scroll";
    })(YGOverflow = exports.YGOverflow || (exports.YGOverflow = {}));
    function YGOverflowToString(value) {
        switch (value) {
            case YGOverflow.Visible:
                return "visible";
            case YGOverflow.Hidden:
                return "hidden";
            case YGOverflow.Scroll:
                return "scroll";
        }
        return "unknown";
    }
    exports.YGOverflowToString = YGOverflowToString;
    exports.YGPositionTypeCount = 2;
    var YGPositionType;
    (function (YGPositionType) {
        YGPositionType[YGPositionType["Relative"] = 0] = "Relative";
        YGPositionType[YGPositionType["Absolute"] = 1] = "Absolute";
    })(YGPositionType = exports.YGPositionType || (exports.YGPositionType = {}));
    function YGPositionTypeToString(value) {
        switch (value) {
            case YGPositionType.Relative:
                return "relative";
            case YGPositionType.Absolute:
                return "absolute";
        }
        return "unknown";
    }
    exports.YGPositionTypeToString = YGPositionTypeToString;
    exports.YGPrintOptionsCount = 3;
    var YGPrintOptions;
    (function (YGPrintOptions) {
        YGPrintOptions[YGPrintOptions["Layout"] = 1] = "Layout";
        YGPrintOptions[YGPrintOptions["Style"] = 2] = "Style";
        YGPrintOptions[YGPrintOptions["Children"] = 4] = "Children";
    })(YGPrintOptions = exports.YGPrintOptions || (exports.YGPrintOptions = {}));
    function YGPrintOptionsToString(value) {
        switch (value) {
            case YGPrintOptions.Layout:
                return "layout";
            case YGPrintOptions.Style:
                return "style";
            case YGPrintOptions.Children:
                return "children";
        }
        return "unknown";
    }
    exports.YGPrintOptionsToString = YGPrintOptionsToString;
    exports.YGUnitCount = 4;
    var YGUnit;
    (function (YGUnit) {
        YGUnit[YGUnit["Undefined"] = 0] = "Undefined";
        YGUnit[YGUnit["Point"] = 1] = "Point";
        YGUnit[YGUnit["Percent"] = 2] = "Percent";
        YGUnit[YGUnit["Auto"] = 3] = "Auto";
    })(YGUnit = exports.YGUnit || (exports.YGUnit = {}));
    function YGUnitToString(value) {
        switch (value) {
            case YGUnit.Undefined:
                return "undefined";
            case YGUnit.Point:
                return "point";
            case YGUnit.Percent:
                return "percent";
            case YGUnit.Auto:
                return "auto";
        }
        return "unknown";
    }
    exports.YGUnitToString = YGUnitToString;
    exports.YGWrapCount = 3;
    var YGWrap;
    (function (YGWrap) {
        YGWrap[YGWrap["NoWrap"] = 0] = "NoWrap";
        YGWrap[YGWrap["Wrap"] = 1] = "Wrap";
        YGWrap[YGWrap["WrapReverse"] = 2] = "WrapReverse";
    })(YGWrap = exports.YGWrap || (exports.YGWrap = {}));
    function YGWrapToString(value) {
        switch (value) {
            case YGWrap.NoWrap:
                return "no-wrap";
            case YGWrap.Wrap:
                return "wrap";
            case YGWrap.WrapReverse:
                return "wrap-reverse";
        }
        return "unknown";
    }
    exports.YGWrapToString = YGWrapToString;
});
define("ygconfig", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var kYGDefaultExperimentalFeatures = [false, false, false];
    var YGConfig = /** @class */ (function () {
        function YGConfig(logger) {
            this.cloneNodeCallback = null;
            this.experimentalFeatures = kYGDefaultExperimentalFeatures;
            this.useWebDefaults = false;
            this.useLegacyStretchBehaviour = false;
            this.shouldDiffLayoutWithoutLegacyStretchBehaviour = false;
            this.pointScaleFactor = 1.0;
            this.logger = logger;
            this.context = null;
        }
        return YGConfig;
    }());
    exports.YGConfig = YGConfig;
});
define("utils", ["require", "exports", "enums", "ygfloatoptional", "yoga", "internal"], function (require, exports, enums_1, ygfloatoptional_1, yoga_1, internal_1) {
    "use strict";
    exports.__esModule = true;
    var YGCollectFlexItemsRowValues = /** @class */ (function () {
        function YGCollectFlexItemsRowValues() {
            this.itemsOnLine = 0;
            this.sizeConsumedOnCurrentLine = 0;
            this.totalFlexGrowFactors = 0;
            this.totalFlexShrinkScaledFactors = 0;
            this.endOfLineIndex = 0;
            this.relativeChildren = [];
            this.remainingFreeSpace = 0;
            this.mainDim = 0;
            this.crossDim = 0;
        }
        return YGCollectFlexItemsRowValues;
    }());
    exports.YGCollectFlexItemsRowValues = YGCollectFlexItemsRowValues;
    function YGValueEqual(a, b) {
        if (a.unit != b.unit) {
            return false;
        }
        if (a.unit == enums_1.YGUnit.Undefined || (yoga_1.YGFloatIsUndefined(a.value) && yoga_1.YGFloatIsUndefined(b.value))) {
            return true;
        }
        return Math.abs(a.value - b.value) < 0.0001;
    }
    exports.YGValueEqual = YGValueEqual;
    function YGFloatsEqual(a, b) {
        if (!yoga_1.YGFloatIsUndefined(a) && !yoga_1.YGFloatIsUndefined(b)) {
            return Math.abs(a - b) < 0.0001;
        }
        return yoga_1.YGFloatIsUndefined(a) && yoga_1.YGFloatIsUndefined(b);
    }
    exports.YGFloatsEqual = YGFloatsEqual;
    function YGFloatMax(a, b) {
        if (!yoga_1.YGFloatIsUndefined(a) && !yoga_1.YGFloatIsUndefined(b)) {
            return Math.max(a, b);
        }
        return yoga_1.YGFloatIsUndefined(a) ? b : a;
    }
    exports.YGFloatMax = YGFloatMax;
    function YGFloatOptionalMax(op1, op2) {
        if (!op1.isUndefined() && !op2.isUndefined()) {
            return op1.getValue() > op2.getValue() ? op1 : op2;
        }
        return op1.isUndefined() ? op2 : op1;
    }
    exports.YGFloatOptionalMax = YGFloatOptionalMax;
    function YGFloatMin(a, b) {
        if (!yoga_1.YGFloatIsUndefined(a) && !yoga_1.YGFloatIsUndefined(b)) {
            return Math.min(a, b);
        }
        return yoga_1.YGFloatIsUndefined(a) ? b : a;
    }
    exports.YGFloatMin = YGFloatMin;
    function YGFloatArrayEqual(val1, val2) {
        var areEqual = true;
        for (var i = 0; i < val1.length && areEqual; ++i) {
            areEqual = YGFloatsEqual(val1[i], val2[i]);
        }
        return areEqual;
    }
    exports.YGFloatArrayEqual = YGFloatArrayEqual;
    function YGValueArrayEqual(val1, val2) {
        var areEqual = true;
        for (var i = 0; i < val1.length && areEqual; ++i) {
            areEqual = YGValueEqual(val1[i], val2[i]);
        }
        return areEqual;
    }
    exports.YGValueArrayEqual = YGValueArrayEqual;
    function YGFloatSanitize(val) {
        return yoga_1.YGFloatIsUndefined(val) ? 0 : val;
    }
    exports.YGFloatSanitize = YGFloatSanitize;
    function YGUnwrapFloatOptional(op) {
        return op.isUndefined() ? internal_1.YGUndefined : op.getValue();
    }
    exports.YGUnwrapFloatOptional = YGUnwrapFloatOptional;
    function YGFlexDirectionCross(flexDirection, direction) {
        return YGFlexDirectionIsColumn(flexDirection) ? YGResolveFlexDirection(enums_1.YGFlexDirection.Row, direction) : enums_1.YGFlexDirection.Column;
    }
    exports.YGFlexDirectionCross = YGFlexDirectionCross;
    function YGFlexDirectionIsRow(flexDirection) {
        return flexDirection == enums_1.YGFlexDirection.Row || flexDirection == enums_1.YGFlexDirection.RowReverse;
    }
    exports.YGFlexDirectionIsRow = YGFlexDirectionIsRow;
    function YGResolveValue(value, ownerSize) {
        switch (value.unit) {
            case enums_1.YGUnit.Undefined:
            case enums_1.YGUnit.Auto:
                return new ygfloatoptional_1.YGFloatOptional();
            case enums_1.YGUnit.Point:
                return new ygfloatoptional_1.YGFloatOptional(value.value);
            case enums_1.YGUnit.Percent:
                return new ygfloatoptional_1.YGFloatOptional(value.value * ownerSize * 0.01);
        }
        return new ygfloatoptional_1.YGFloatOptional();
    }
    exports.YGResolveValue = YGResolveValue;
    function YGFlexDirectionIsColumn(flexDirection) {
        return flexDirection == enums_1.YGFlexDirection.Column || flexDirection == enums_1.YGFlexDirection.ColumnReverse;
    }
    exports.YGFlexDirectionIsColumn = YGFlexDirectionIsColumn;
    function YGResolveFlexDirection(flexDirection, direction) {
        if (direction == enums_1.YGDirection.RTL) {
            if (flexDirection == enums_1.YGFlexDirection.Row) {
                return enums_1.YGFlexDirection.RowReverse;
            }
            else if (flexDirection == enums_1.YGFlexDirection.RowReverse) {
                return enums_1.YGFlexDirection.Row;
            }
        }
        return flexDirection;
    }
    exports.YGResolveFlexDirection = YGResolveFlexDirection;
    function YGResolveValueMargin(value, ownerSize) {
        return value.unit == enums_1.YGUnit.Auto ? new ygfloatoptional_1.YGFloatOptional(0) : YGResolveValue(value, ownerSize);
    }
    exports.YGResolveValueMargin = YGResolveValueMargin;
});
define("yglayout", ["require", "exports", "enums", "ygfloatoptional", "internal", "utils", "yoga"], function (require, exports, enums_2, ygfloatoptional_2, internal_2, utils_1, yoga_2) {
    "use strict";
    exports.__esModule = true;
    var kYGDefaultDimensionValues = [undefined, undefined];
    var YG_MAX_CACHED_RESULT_COUNT = 16;
    var YGLayout = /** @class */ (function () {
        function YGLayout() {
            this.dimensions = kYGDefaultDimensionValues;
            this.direction = enums_2.YGDirection.Inherit;
            this.computedFlexBasisGeneration = 0;
            this.computedFlexBasis = new ygfloatoptional_2.YGFloatOptional();
            this.hadOverflow = false;
            this.generationCount = 0;
            this.lastOwnerDirection = enums_2.YGDirection.RTL;
            this.nextCachedMeasurementsIndex = 0;
            this.measuredDimensions = kYGDefaultDimensionValues;
            this.cachedLayout = new internal_2.YGCachedMeasurement();
            this.didUseLegacyFlag = false;
            this.doesLegacyStretchFlagAffectsLayout = false;
        }
        YGLayout.prototype.equal = function (layout) {
            var isEqual = utils_1.YGFloatArrayEqual(this.position, layout.position) &&
                utils_1.YGFloatArrayEqual(this.dimensions, layout.dimensions) &&
                utils_1.YGFloatArrayEqual(this.margin, layout.margin) &&
                utils_1.YGFloatArrayEqual(this.border, layout.border) &&
                utils_1.YGFloatArrayEqual(this.padding, layout.padding) &&
                this.direction == layout.direction &&
                this.hadOverflow == layout.hadOverflow &&
                this.lastOwnerDirection == layout.lastOwnerDirection &&
                this.nextCachedMeasurementsIndex == layout.nextCachedMeasurementsIndex &&
                this.cachedLayout == layout.cachedLayout &&
                this.computedFlexBasis == layout.computedFlexBasis;
            for (var i = 0; i < YG_MAX_CACHED_RESULT_COUNT && isEqual; ++i) {
                isEqual = isEqual && this.cachedMeasurements[i] == layout.cachedMeasurements[i];
            }
            if (!yoga_2.YGFloatIsUndefined(this.measuredDimensions[0]) || !yoga_2.YGFloatIsUndefined(layout.measuredDimensions[0])) {
                isEqual = isEqual && (this.measuredDimensions[0] == layout.measuredDimensions[0]);
            }
            if (!yoga_2.YGFloatIsUndefined(this.measuredDimensions[1]) || !yoga_2.YGFloatIsUndefined(layout.measuredDimensions[1])) {
                isEqual = isEqual && (this.measuredDimensions[1] == layout.measuredDimensions[1]);
            }
            return isEqual;
        };
        YGLayout.prototype.diff = function (layout) {
            return !this.equal(layout);
        };
        YGLayout.prototype.clean = function () {
            this.dimensions = kYGDefaultDimensionValues;
            this.direction = enums_2.YGDirection.Inherit;
            this.computedFlexBasisGeneration = 0;
            this.computedFlexBasis = new ygfloatoptional_2.YGFloatOptional();
            this.hadOverflow = false;
            this.generationCount = 0;
            this.lastOwnerDirection = enums_2.YGDirection.RTL;
            this.nextCachedMeasurementsIndex = 0;
            this.measuredDimensions = kYGDefaultDimensionValues;
            this.cachedLayout = new internal_2.YGCachedMeasurement();
            this.didUseLegacyFlag = false;
            this.doesLegacyStretchFlagAffectsLayout = false;
        };
        return YGLayout;
    }());
    exports.YGLayout = YGLayout;
});
define("ygstyle", ["require", "exports", "enums", "utils", "yoga", "ygfloatoptional"], function (require, exports, enums_3, utils_2, yoga_3, ygfloatoptional_3) {
    "use strict";
    exports.__esModule = true;
    var kYGValueUndefined = new yoga_3.YGValue(0, enums_3.YGUnit.Undefined);
    var kYGValueAuto = new yoga_3.YGValue(0, enums_3.YGUnit.Auto);
    var kYGDefaultEdgeValuesUnit = [
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined,
        kYGValueUndefined
    ];
    var kYGDefaultDimensionValuesAutoUnit = [kYGValueAuto, kYGValueAuto];
    var kYGDefaultDimensionValuesUnit = [kYGValueUndefined, kYGValueUndefined];
    var YGStyle = /** @class */ (function () {
        function YGStyle() {
            this.margin = new Array(enums_3.YGEdgeCount);
            this.position = new Array(enums_3.YGEdgeCount);
            this.padding = new Array(enums_3.YGEdgeCount);
            this.border = new Array(enums_3.YGEdgeCount);
            this.direction = enums_3.YGDirection.Inherit;
            this.flexDirection = enums_3.YGFlexDirection.Column;
            this.justifyContent = enums_3.YGJustify.FlexStart;
            this.alignContent = enums_3.YGAlign.FlexStart;
            this.alignItems = enums_3.YGAlign.Stretch;
            this.alignSelf = enums_3.YGAlign.Auto;
            this.positionType = enums_3.YGPositionType.Relative;
            this.flexWrap = enums_3.YGWrap.NoWrap;
            this.overflow = enums_3.YGOverflow.Visible;
            this.display = enums_3.YGDisplay.Flex;
            this.flex = new ygfloatoptional_3.YGFloatOptional();
            this.flexGrow = new ygfloatoptional_3.YGFloatOptional();
            this.flexShrink = new ygfloatoptional_3.YGFloatOptional();
            this.flexBasis = kYGValueAuto;
            this.margin = kYGDefaultEdgeValuesUnit;
            this.position = kYGDefaultEdgeValuesUnit;
            this.padding = kYGDefaultEdgeValuesUnit;
            this.border = kYGDefaultEdgeValuesUnit;
            this.dimensions = kYGDefaultDimensionValuesAutoUnit;
            this.minDimensions = kYGDefaultDimensionValuesUnit;
            this.maxDimensions = kYGDefaultDimensionValuesUnit;
        }
        YGStyle.prototype.isEqual = function (style) {
            var areNonFloatValuesEqual = this.direction == style.direction &&
                this.flexDirection == style.flexDirection &&
                this.justifyContent == style.justifyContent &&
                this.alignContent == style.alignContent &&
                this.alignItems == style.alignItems &&
                this.alignSelf == style.alignSelf &&
                this.positionType == style.positionType &&
                this.flexWrap == style.flexWrap &&
                this.overflow == style.overflow &&
                this.display == style.display &&
                utils_2.YGValueEqual(this.flexBasis, style.flexBasis) &&
                utils_2.YGValueArrayEqual(this.margin, style.margin) &&
                utils_2.YGValueArrayEqual(this.position, style.position) &&
                utils_2.YGValueArrayEqual(this.padding, style.padding) &&
                utils_2.YGValueArrayEqual(this.border, style.border) &&
                utils_2.YGValueArrayEqual(this.dimensions, style.dimensions) &&
                utils_2.YGValueArrayEqual(this.minDimensions, style.minDimensions) &&
                utils_2.YGValueArrayEqual(this.maxDimensions, style.maxDimensions);
            areNonFloatValuesEqual = areNonFloatValuesEqual && this.flex.isUndefined() == style.flex.isUndefined();
            if (areNonFloatValuesEqual && !this.flex.isUndefined() && !style.flex.isUndefined()) {
                areNonFloatValuesEqual = areNonFloatValuesEqual && this.flex.getValue() == style.flex.getValue();
            }
            areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexGrow.isUndefined() == style.flexGrow.isUndefined();
            if (areNonFloatValuesEqual && !this.flexGrow.isUndefined()) {
                areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexGrow.getValue() == style.flexGrow.getValue();
            }
            areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexShrink.isUndefined() == style.flexShrink.isUndefined();
            if (areNonFloatValuesEqual && !style.flexShrink.isUndefined()) {
                areNonFloatValuesEqual = areNonFloatValuesEqual && this.flexShrink.getValue() == style.flexShrink.getValue();
            }
            if (!(this.aspectRatio.isUndefined() && style.aspectRatio.isUndefined())) {
                areNonFloatValuesEqual = areNonFloatValuesEqual && this.aspectRatio.getValue() == style.aspectRatio.getValue();
            }
            return areNonFloatValuesEqual;
        };
        YGStyle.prototype.isDiff = function (style) {
            return !this.isEqual(style);
        };
        return YGStyle;
    }());
    exports.YGStyle = YGStyle;
});
define("yoga", ["require", "exports", "enums", "ygnode", "ygconfig", "yglayout", "ygfloatoptional", "utils", "internal"], function (require, exports, enums_4, ygnode_1, ygconfig_1, yglayout_1, ygfloatoptional_4, utils_3, internal_3) {
    "use strict";
    exports.__esModule = true;
    var YGSize = /** @class */ (function () {
        function YGSize() {
        }
        return YGSize;
    }());
    exports.YGSize = YGSize;
    var YGValue = /** @class */ (function () {
        function YGValue(value, unit) {
            this.value = value;
            this.unit = unit;
        }
        return YGValue;
    }());
    exports.YGValue = YGValue;
    ;
    ;
    ;
    ;
    ;
    ;
    function YGDefaultLog(config, node, level, format) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        switch (level) {
            case enums_4.YGLogLevel.Error:
            case enums_4.YGLogLevel.Fatal:
                return console.error(format, args);
            case enums_4.YGLogLevel.Warn:
            case enums_4.YGLogLevel.Info:
            case enums_4.YGLogLevel.Debug:
            case enums_4.YGLogLevel.Verbose:
            default:
                return console.log(format, args);
        }
    }
    function YGFloatIsUndefined(value) {
        if (value === undefined) {
            return true;
        }
        return false;
    }
    exports.YGFloatIsUndefined = YGFloatIsUndefined;
    function YGComputedEdgeValue(edges, edge, defaultValue) {
        if (edges[edge].unit != enums_4.YGUnit.Undefined) {
            return edges[edge];
        }
        if ((edge == enums_4.YGEdge.Top || edge == enums_4.YGEdge.Bottom) && edges[enums_4.YGEdge.Vertical].unit != enums_4.YGUnit.Undefined) {
            return edges[enums_4.YGEdge.Vertical];
        }
        if ((edge == enums_4.YGEdge.Left || edge == enums_4.YGEdge.Right || edge == enums_4.YGEdge.Start || edge == enums_4.YGEdge.End) && edges[enums_4.YGEdge.Horizontal].unit != enums_4.YGUnit.Undefined) {
            return edges[enums_4.YGEdge.Horizontal];
        }
        if (edges[enums_4.YGEdge.All].unit != enums_4.YGUnit.Undefined) {
            return edges[enums_4.YGEdge.All];
        }
        if (edge == enums_4.YGEdge.Start || edge == enums_4.YGEdge.End) {
            return internal_3.YGValueUndefined;
        }
        return defaultValue;
    }
    exports.YGComputedEdgeValue = YGComputedEdgeValue;
    function YGNodeGetContext(node) {
        return node.getContext();
    }
    exports.YGNodeGetContext = YGNodeGetContext;
    function YGNodeSetContext(node, context) {
        return node.setContext(context);
    }
    exports.YGNodeSetContext = YGNodeSetContext;
    function YGNodeGetMeasureFunc(node) {
        return node.getMeasure();
    }
    exports.YGNodeGetMeasureFunc = YGNodeGetMeasureFunc;
    function YGNodeSetMeasureFunc(node, measureFunc) {
        node.setMeasureFunc(measureFunc);
    }
    exports.YGNodeSetMeasureFunc = YGNodeSetMeasureFunc;
    function YGNodeGetBaselineFunc(node) {
        return node.getBaseline();
    }
    exports.YGNodeGetBaselineFunc = YGNodeGetBaselineFunc;
    function YGNodeSetBaselineFunc(node, baselineFunc) {
        node.setBaseLineFunc(baselineFunc);
    }
    exports.YGNodeSetBaselineFunc = YGNodeSetBaselineFunc;
    function YGNodeGetDirtiedFunc(node) {
        return node.getDirtied();
    }
    exports.YGNodeGetDirtiedFunc = YGNodeGetDirtiedFunc;
    function YGNodeSetDirtiedFunc(node, dirtiedFunc) {
        node.setDirtiedFunc(dirtiedFunc);
    }
    exports.YGNodeSetDirtiedFunc = YGNodeSetDirtiedFunc;
    function YGNodeGetPrintFunc(node) {
        return node.getPrintFunc();
    }
    exports.YGNodeGetPrintFunc = YGNodeGetPrintFunc;
    function YGNodeSetPrintFunc(node, printFunc) {
        node.setPrintFunc(printFunc);
    }
    exports.YGNodeSetPrintFunc = YGNodeSetPrintFunc;
    function YGNodeGetHasNewLayout(node) {
        return node.getHasNewLayout();
    }
    exports.YGNodeGetHasNewLayout = YGNodeGetHasNewLayout;
    function YGNodeSetHasNewLayout(node, hasNewLayout) {
        node.setHasNewLayout(hasNewLayout);
    }
    exports.YGNodeSetHasNewLayout = YGNodeSetHasNewLayout;
    function YGNodeGetNodeType(node) {
        return node.getNodeType();
    }
    exports.YGNodeGetNodeType = YGNodeGetNodeType;
    function YGNodeSetNodeType(node, nodeType) {
        node.setNodeType(nodeType);
    }
    exports.YGNodeSetNodeType = YGNodeSetNodeType;
    function YGNodeIsDirty(node) {
        return node.isDirty();
    }
    exports.YGNodeIsDirty = YGNodeIsDirty;
    function YGNodeLayoutGetDidUseLegacyFlag(node) {
        return node.didUseLegacyFlag();
    }
    exports.YGNodeLayoutGetDidUseLegacyFlag = YGNodeLayoutGetDidUseLegacyFlag;
    function YGNodeMarkDirtyAndPropogateToDescendants(node) {
        node.markDirtyAndPropogateDownwards();
    }
    exports.YGNodeMarkDirtyAndPropogateToDescendants = YGNodeMarkDirtyAndPropogateToDescendants;
    var gNodeInstanceCount = 0;
    var gConfigInstanceCount = 0;
    function YGNodeNewWithConfig(config) {
        var node = new ygnode_1.YGNode();
        gNodeInstanceCount++;
        if (config.useWebDefaults) {
            node.setStyleFlexDirection(enums_4.YGFlexDirection.Row);
            node.setStyleAlignContent(enums_4.YGAlign.Stretch);
        }
        node.setConfig(config);
        return node;
    }
    exports.YGNodeNewWithConfig = YGNodeNewWithConfig;
    function YGConfigGetDefault() {
        return YGConfigNew();
    }
    exports.YGConfigGetDefault = YGConfigGetDefault;
    function YGNodeNew() {
        return YGNodeNewWithConfig(YGConfigGetDefault());
    }
    exports.YGNodeNew = YGNodeNew;
    function YGNodeClone(oldNode) {
        var node = new ygnode_1.YGNode(oldNode);
        gNodeInstanceCount++;
        node.setOwner(null);
        return node;
    }
    exports.YGNodeClone = YGNodeClone;
    function YGConfigClone(oldConfig) {
        var config = new ygconfig_1.YGConfig(oldConfig.logger);
        gConfigInstanceCount++;
        return config;
    }
    exports.YGConfigClone = YGConfigClone;
    function YGNodeDeepClone(oldNode) {
        var node = YGNodeClone(oldNode);
        var vec = new Array(oldNode.getChildren().length);
        var childNode = null;
        for (var i = 0; i < oldNode.getChildren().length; ++i) {
            var item = oldNode.getChild(i);
            childNode = YGNodeDeepClone(item);
            childNode.setOwner(node);
            vec.push(childNode);
        }
        node.setChildren(vec);
        if (oldNode.getConfig() != null) {
            node.setConfig(YGConfigClone(oldNode.getConfig()));
        }
        return node;
    }
    exports.YGNodeDeepClone = YGNodeDeepClone;
    function YGNodeFree(node) {
        var owner = node.getOwner();
        if (owner != null) {
            owner.removeChild(node);
            node.setOwner(null);
        }
        var childCount = YGNodeGetChildCount(node);
        for (var i = 0; i < childCount; i++) {
            var child = YGNodeGetChild(node, i);
            child.setOwner(null);
        }
        node.clearChildren();
        gNodeInstanceCount--;
    }
    exports.YGNodeFree = YGNodeFree;
    function YGConfigFreeRecursive(root) {
        if (root.getConfig() != null) {
            gConfigInstanceCount--;
            root.setConfig(null);
        }
        for (var i = 0; i < root.getChildrenCount(); ++i) {
            YGConfigFreeRecursive(root.getChild(i));
        }
    }
    exports.YGConfigFreeRecursive = YGConfigFreeRecursive;
    function YGNodeFreeRecursive(root) {
        while (YGNodeGetChildCount(root) > 0) {
            var child = YGNodeGetChild(root, 0);
            if (child.getOwner() != root) {
                break;
            }
            YGNodeRemoveChild(root, child);
            YGNodeFreeRecursive(child);
        }
        YGNodeFree(root);
    }
    exports.YGNodeFreeRecursive = YGNodeFreeRecursive;
    function YGNodeReset(node) {
        //YGAssertWithNode(node, YGNodeGetChildCount(node) == 0, "Cannot reset a node which still has children attached");
        //YGAssertWithNode(node, node->getOwner() == nullptr, "Cannot reset a node still attached to a owner");
        node.clearChildren();
        var config = node.getConfig();
        node.fromNode(new ygnode_1.YGNode());
        if (config.useWebDefaults) {
            node.setStyleFlexDirection(enums_4.YGFlexDirection.Row);
            node.setStyleAlignContent(enums_4.YGAlign.Stretch);
        }
        node.setConfig(config);
    }
    exports.YGNodeReset = YGNodeReset;
    function YGNodeGetInstanceCount() {
        return gNodeInstanceCount;
    }
    exports.YGNodeGetInstanceCount = YGNodeGetInstanceCount;
    function YGConfigGetInstanceCount() {
        return gConfigInstanceCount;
    }
    exports.YGConfigGetInstanceCount = YGConfigGetInstanceCount;
    function YGConfigNew() {
        var config = new ygconfig_1.YGConfig(YGDefaultLog);
        gConfigInstanceCount++;
        return config;
    }
    exports.YGConfigNew = YGConfigNew;
    function YGConfigFree(config) {
        gConfigInstanceCount--;
    }
    exports.YGConfigFree = YGConfigFree;
    function YGConfigCopy(dest, src) {
        Object.assign(dest, src);
    }
    exports.YGConfigCopy = YGConfigCopy;
    function YGNodeInsertChild(node, child, index) {
        //YGAssertWithNode(node, child.getOwner() == null, "Child already has a owner, it must be removed first.");
        //YGAssertWithNode(node, node.getMeasure() == null, "Cannot add child: Nodes with measure functions cannot have children.");
        node.cloneChildrenIfNeeded();
        node.insertChildIndex(child, index);
        var owner = child.getOwner() ? null : node;
        child.setOwner(owner);
        node.markDirtyAndPropogate();
    }
    exports.YGNodeInsertChild = YGNodeInsertChild;
    function YGNodeInsertSharedChild(node, child, index) {
        //YGAssertWithNode(node, node.getMeasure() == null, "Cannot add child: Nodes with measure functions cannot have children.");
        node.insertChildIndex(child, index);
        child.setOwner(null);
        node.markDirtyAndPropogate();
    }
    exports.YGNodeInsertSharedChild = YGNodeInsertSharedChild;
    function YGNodeRemoveChild(owner, excludedChild) {
        var childCount = YGNodeGetChildCount(owner);
        if (childCount == 0) {
            return;
        }
        var firstChild = YGNodeGetChild(owner, 0);
        if (firstChild.getOwner() == owner) {
            if (owner.removeChild(excludedChild)) {
                excludedChild.setLayout((new ygnode_1.YGNode()).getLayout());
                excludedChild.setOwner(null);
                owner.markDirtyAndPropogate();
            }
            return;
        }
        var cloneNodeCallback = owner.getConfig().cloneNodeCallback;
        var nextInsertIndex = 0;
        for (var i = 0; i < childCount; i++) {
            var oldChild = owner.getChild(i);
            if (excludedChild == oldChild) {
                owner.markDirtyAndPropogate();
                continue;
            }
            var newChild = null;
            if (cloneNodeCallback) {
                newChild = cloneNodeCallback(oldChild, owner, nextInsertIndex);
            }
            if (newChild == null) {
                newChild = YGNodeClone(oldChild);
            }
            owner.replaceChildIndex(newChild, nextInsertIndex);
            newChild.setOwner(owner);
            nextInsertIndex++;
        }
        while (nextInsertIndex < childCount) {
            owner.removeChildIndex(nextInsertIndex);
            nextInsertIndex++;
        }
    }
    exports.YGNodeRemoveChild = YGNodeRemoveChild;
    function YGNodeRemoveAllChildren(owner) {
        var childCount = YGNodeGetChildCount(owner);
        if (childCount == 0) {
            return;
        }
        var firstChild = YGNodeGetChild(owner, 0);
        if (firstChild.getOwner() == owner) {
            for (var i = 0; i < childCount; i++) {
                var oldChild = YGNodeGetChild(owner, i);
                oldChild.setLayout(new yglayout_1.YGLayout()); // new YGNode().getLayout()
                oldChild.setOwner(null);
            }
            owner.clearChildren();
            owner.markDirtyAndPropogate();
            return;
        }
        owner.setChildren(new Array());
        owner.markDirtyAndPropogate();
    }
    exports.YGNodeRemoveAllChildren = YGNodeRemoveAllChildren;
    function YGNodeSetChildrenInternal(owner, children) {
        if (!owner) {
            return;
        }
        var ownerChildren = owner.getChildren();
        if (children.length == 0) {
            if (ownerChildren.length > 0) {
                for (var i = 0; i < ownerChildren.length; i++) {
                    var child = ownerChildren[i];
                    child.setLayout(new yglayout_1.YGLayout());
                    child.setOwner(null);
                }
                owner.setChildren(new Array());
                owner.markDirtyAndPropogate();
            }
        }
        else {
            if (ownerChildren.length > 0) {
                for (var i = 0; i < ownerChildren.length; i++) {
                    var oldChild = ownerChildren[i];
                    if (children.indexOf(oldChild) < 0) {
                        oldChild.setLayout(new yglayout_1.YGLayout());
                        oldChild.setOwner(null);
                    }
                }
            }
            owner.setChildren(children);
            for (var i = 0; i < children.length; i++) {
                children[i].setOwner(owner);
            }
            owner.markDirtyAndPropogate();
        }
    }
    exports.YGNodeSetChildrenInternal = YGNodeSetChildrenInternal;
    /*function YGNodeSetChildren(owner: YGNode, c: Array<YGNode>, count: number) {
        YGVector children = { c, c + count };
        YGNodeSetChildrenInternal(owner, children);
    }*/
    function YGNodeSetChildren(owner, children) {
        YGNodeSetChildrenInternal(owner, children);
    }
    exports.YGNodeSetChildren = YGNodeSetChildren;
    function YGNodeGetChild(node, index) {
        var children = node.getChildren();
        if (index < children.length) {
            return children[index];
        }
        return null;
    }
    exports.YGNodeGetChild = YGNodeGetChild;
    function YGNodeGetChildCount(node) {
        return node.getChildrenCount();
    }
    exports.YGNodeGetChildCount = YGNodeGetChildCount;
    function YGNodeGetOwner(node) {
        return node.getOwner();
    }
    exports.YGNodeGetOwner = YGNodeGetOwner;
    function YGNodeGetParent(node) {
        return node.getOwner();
    }
    exports.YGNodeGetParent = YGNodeGetParent;
    function YGNodeMarkDirty(node) {
        //YGAssertWithNode(node, node.getMeasure() != null, "Only leaf nodes with custom measure functions should manually mark themselves as dirty");
        node.markDirtyAndPropogate();
    }
    exports.YGNodeMarkDirty = YGNodeMarkDirty;
    function YGNodeCopyStyle(dstNode, srcNode) {
        if (!(dstNode.getStyle().isEqual(srcNode.getStyle()))) {
            dstNode.setStyle(srcNode.getStyle());
            dstNode.markDirtyAndPropogate();
        }
    }
    exports.YGNodeCopyStyle = YGNodeCopyStyle;
    function YGNodeStyleGetFlexGrow(node) {
        return node.getStyle().flexGrow.isUndefined() ? internal_3.kDefaultFlexGrow : node.getStyle().flexGrow.getValue();
    }
    exports.YGNodeStyleGetFlexGrow = YGNodeStyleGetFlexGrow;
    function YGNodeStyleGetFlexShrink(node) {
        return node.getStyle().flexShrink.isUndefined() ? (node.getConfig().useWebDefaults ? internal_3.kWebDefaultFlexShrink : internal_3.kDefaultFlexShrink) : node.getStyle().flexShrink.getValue();
    }
    exports.YGNodeStyleGetFlexShrink = YGNodeStyleGetFlexShrink;
    // MACROS START
    function YGNodeStyleSetDirection(node, direction) {
        if (node.getStyle().direction != direction) {
            var style = node.getStyle();
            style.direction = direction;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetDirection = YGNodeStyleSetDirection;
    function YGNodeStyleGetDirection(node) {
        return node.getStyle().direction;
    }
    exports.YGNodeStyleGetDirection = YGNodeStyleGetDirection;
    function YGNodeStyleSetFlexDirection(node, flexDirection) {
        if (node.getStyle().flexDirection != flexDirection) {
            var style = node.getStyle();
            style.flexDirection = flexDirection;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexDirection = YGNodeStyleSetFlexDirection;
    function YGNodeStyleGetFlexDirection(node) {
        return node.getStyle().flexDirection;
    }
    exports.YGNodeStyleGetFlexDirection = YGNodeStyleGetFlexDirection;
    function YGNodeStyleSetJustifyContent(node, justifyContent) {
        if (node.getStyle().justifyContent != justifyContent) {
            var style = node.getStyle();
            style.justifyContent = justifyContent;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetJustifyContent = YGNodeStyleSetJustifyContent;
    function YGNodeStyleGetJustifyContent(node) {
        return node.getStyle().justifyContent;
    }
    exports.YGNodeStyleGetJustifyContent = YGNodeStyleGetJustifyContent;
    function YGNodeStyleSetAlignContent(node, alignContent) {
        if (node.getStyle().alignContent != alignContent) {
            var style = node.getStyle();
            style.alignContent = alignContent;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetAlignContent = YGNodeStyleSetAlignContent;
    function YGNodeStyleGetAlignContent(node) {
        return node.getStyle().alignContent;
    }
    exports.YGNodeStyleGetAlignContent = YGNodeStyleGetAlignContent;
    function YGNodeStyleSetAlignItems(node, alignItems) {
        if (node.getStyle().alignItems != alignItems) {
            var style = node.getStyle();
            style.alignItems = alignItems;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetAlignItems = YGNodeStyleSetAlignItems;
    function YGNodeStyleGetAlignItems(node) {
        return node.getStyle().alignItems;
    }
    exports.YGNodeStyleGetAlignItems = YGNodeStyleGetAlignItems;
    function YGNodeStyleSetAlignSelf(node, alignSelf) {
        if (node.getStyle().alignSelf != alignSelf) {
            var style = node.getStyle();
            style.alignSelf = alignSelf;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetAlignSelf = YGNodeStyleSetAlignSelf;
    function YGNodeStyleGetAlignSelf(node) {
        return node.getStyle().alignSelf;
    }
    exports.YGNodeStyleGetAlignSelf = YGNodeStyleGetAlignSelf;
    function YGNodeStyleSetPositionType(node, positionType) {
        if (node.getStyle().positionType != positionType) {
            var style = node.getStyle();
            style.positionType = positionType;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetPositionType = YGNodeStyleSetPositionType;
    function YGNodeStyleGetPositionType(node) {
        return node.getStyle().positionType;
    }
    exports.YGNodeStyleGetPositionType = YGNodeStyleGetPositionType;
    function YGNodeStyleSetFlexWrap(node, flexWrap) {
        if (node.getStyle().flexWrap != flexWrap) {
            var style = node.getStyle();
            style.flexWrap = flexWrap;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexWrap = YGNodeStyleSetFlexWrap;
    function YGNodeStyleGetFlexWrap(node) {
        return node.getStyle().flexWrap;
    }
    exports.YGNodeStyleGetFlexWrap = YGNodeStyleGetFlexWrap;
    function YGNodeStyleSetOverflow(node, overflow) {
        if (node.getStyle().overflow != overflow) {
            var style = node.getStyle();
            style.overflow = overflow;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetOverflow = YGNodeStyleSetOverflow;
    function YGNodeStyleGetOverflow(node) {
        return node.getStyle().overflow;
    }
    exports.YGNodeStyleGetOverflow = YGNodeStyleGetOverflow;
    function YGNodeStyleSetDisplay(node, display) {
        if (node.getStyle().display != display) {
            var style = node.getStyle();
            style.display = display;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetDisplay = YGNodeStyleSetDisplay;
    function YGNodeStyleGetDisplay(node) {
        return node.getStyle().display;
    }
    exports.YGNodeStyleGetDisplay = YGNodeStyleGetDisplay;
    function YGNodeStyleSetPosition(node, edge, position) {
        var value = new YGValue(utils_3.YGFloatSanitize(position), YGFloatIsUndefined(position) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().position[edge].value != value.value &&
            value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().position[edge].unit != value.unit) {
            var style = node.getStyle();
            style.position[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetPosition = YGNodeStyleSetPosition;
    function YGNodeStyleSetPositionPercent(node, edge, position) {
        var value = new YGValue(utils_3.YGFloatSanitize(position), YGFloatIsUndefined(position) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().position[edge].value != value.value &&
            value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().position[edge].unit != value.unit) {
            var style = node.getStyle();
            style.position[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetPositionPercent = YGNodeStyleSetPositionPercent;
    function YGNodeStyleGetPosition(node, edge) {
        var value = node.getStyle().position[edge];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetPosition = YGNodeStyleGetPosition;
    function YGNodeStyleSetMargin(node, edge, margin) {
        var value = new YGValue(utils_3.YGFloatSanitize(margin), YGFloatIsUndefined(margin) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().margin[edge].value != value.value &&
            value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().margin[edge].unit != value.unit) {
            var style = node.getStyle();
            style.margin[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMargin = YGNodeStyleSetMargin;
    function YGNodeStyleSetMarginPercent(node, edge, margin) {
        var value = new YGValue(utils_3.YGFloatSanitize(margin), YGFloatIsUndefined(margin) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().margin[edge].value != value.value &&
            value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().margin[edge].unit != value.unit) {
            var style = node.getStyle();
            style.margin[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMarginPercent = YGNodeStyleSetMarginPercent;
    function YGNodeStyleGetMargin(node, edge) {
        var value = node.getStyle().margin[edge];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetMargin = YGNodeStyleGetMargin;
    function YGNodeStyleSetPadding(node, edge, padding) {
        var value = new YGValue(utils_3.YGFloatSanitize(padding), YGFloatIsUndefined(padding) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().padding[edge].value != value.value &&
            value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().padding[edge].unit != value.unit) {
            var style = node.getStyle();
            style.padding[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetPadding = YGNodeStyleSetPadding;
    function YGNodeStyleSetPaddingPercent(node, edge, padding) {
        var value = new YGValue(utils_3.YGFloatSanitize(padding), YGFloatIsUndefined(padding) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().padding[edge].value != value.value &&
            value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().padding[edge].unit != value.unit) {
            var style = node.getStyle();
            style.padding[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetPaddingPercent = YGNodeStyleSetPaddingPercent;
    function YGNodeStyleGetPadding(node, edge) {
        var value = node.getStyle().padding[edge];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetPadding = YGNodeStyleGetPadding;
    function YGNodeStyleSetMarginAuto(node, edge) {
        if (node.getStyle().margin[edge].unit != enums_4.YGUnit.Auto) {
            var style = node.getStyle();
            style.margin[edge].value = 0;
            style.margin[edge].unit = enums_4.YGUnit.Auto;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMarginAuto = YGNodeStyleSetMarginAuto;
    function YGNodeStyleSetWidth(node, width) {
        var value = new YGValue(utils_3.YGFloatSanitize(width), YGFloatIsUndefined(width) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().dimensions[enums_4.YGDimension.Width].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().dimensions[enums_4.YGDimension.Width].unit != value.unit) {
            var style = node.getStyle();
            style.dimensions[enums_4.YGDimension.Width] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetWidth = YGNodeStyleSetWidth;
    function YGNodeStyleSetWidthPercent(node, width) {
        if (node.getStyle().dimensions[enums_4.YGDimension.Width].value != utils_3.YGFloatSanitize(width) ||
            node.getStyle().dimensions[enums_4.YGDimension.Width].unit != enums_4.YGUnit.Percent) {
            var style = node.getStyle();
            style.dimensions[enums_4.YGDimension.Width].value = utils_3.YGFloatSanitize(width);
            style.dimensions[enums_4.YGDimension.Width].unit = YGFloatIsUndefined(width) ? enums_4.YGUnit.Auto : enums_4.YGUnit.Percent;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetWidthPercent = YGNodeStyleSetWidthPercent;
    function YGNodeStyleSetWidthAuto(node) {
        if (node.getStyle().dimensions[enums_4.YGDimension.Width].unit != enums_4.YGUnit.Auto) {
            var style = node.getStyle();
            style.dimensions[enums_4.YGDimension.Width].value = 0;
            style.dimensions[enums_4.YGDimension.Width].unit = enums_4.YGUnit.Auto;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetWidthAuto = YGNodeStyleSetWidthAuto;
    function YGNodeStyleGetWidth(node) {
        var value = node.getStyle().dimensions[enums_4.YGDimension.Width];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetWidth = YGNodeStyleGetWidth;
    function YGNodeStyleSetHeight(node, height) {
        var value = new YGValue(utils_3.YGFloatSanitize(height), YGFloatIsUndefined(height) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().dimensions[enums_4.YGDimension.Height].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().dimensions[enums_4.YGDimension.Height].unit != value.unit) {
            var style = node.getStyle();
            style.dimensions[enums_4.YGDimension.Height] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetHeight = YGNodeStyleSetHeight;
    function YGNodeStyleSetHeightPercent(node, height) {
        if (node.getStyle().dimensions[enums_4.YGDimension.Height].value != utils_3.YGFloatSanitize(height) ||
            node.getStyle().dimensions[enums_4.YGDimension.Height].unit != enums_4.YGUnit.Percent) {
            var style = node.getStyle();
            style.dimensions[enums_4.YGDimension.Height].value = utils_3.YGFloatSanitize(height);
            style.dimensions[enums_4.YGDimension.Height].unit = YGFloatIsUndefined(height) ? enums_4.YGUnit.Auto : enums_4.YGUnit.Percent;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetHeightPercent = YGNodeStyleSetHeightPercent;
    function YGNodeStyleSetHeightAuto(node) {
        if (node.getStyle().dimensions[enums_4.YGDimension.Height].unit != enums_4.YGUnit.Auto) {
            var style = node.getStyle();
            style.dimensions[enums_4.YGDimension.Height].value = 0;
            style.dimensions[enums_4.YGDimension.Height].unit = enums_4.YGUnit.Auto;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetHeightAuto = YGNodeStyleSetHeightAuto;
    function YGNodeStyleGetHeight(node) {
        var value = node.getStyle().dimensions[enums_4.YGDimension.Height];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetHeight = YGNodeStyleGetHeight;
    function YGNodeStyleSetMinWidth(node, minWidth) {
        var value = new YGValue(utils_3.YGFloatSanitize(minWidth), YGFloatIsUndefined(minWidth) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().minDimensions[enums_4.YGDimension.Width].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().minDimensions[enums_4.YGDimension.Width].unit != value.unit) {
            var style = node.getStyle();
            style.minDimensions[enums_4.YGDimension.Width] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMinWidth = YGNodeStyleSetMinWidth;
    function YGNodeStyleSetMinWidthPercent(node, minWidth) {
        var value = new YGValue(utils_3.YGFloatSanitize(minWidth), YGFloatIsUndefined(minWidth) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().minDimensions[enums_4.YGDimension.Width].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().minDimensions[enums_4.YGDimension.Width].unit != value.unit) {
            var style = node.getStyle();
            style.minDimensions[enums_4.YGDimension.Width] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMinWidthPercent = YGNodeStyleSetMinWidthPercent;
    function YGNodeStyleGetMinWidth(node) {
        var value = node.getStyle().minDimensions[enums_4.YGDimension.Width];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetMinWidth = YGNodeStyleGetMinWidth;
    function YGNodeStyleSetMinHeight(node, minHeight) {
        var value = new YGValue(utils_3.YGFloatSanitize(minHeight), YGFloatIsUndefined(minHeight) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().minDimensions[enums_4.YGDimension.Height].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().minDimensions[enums_4.YGDimension.Height].unit != value.unit) {
            var style = node.getStyle();
            style.minDimensions[enums_4.YGDimension.Height] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMinHeight = YGNodeStyleSetMinHeight;
    function YGNodeStyleSetMinHeightPercent(node, minHeight) {
        var value = new YGValue(utils_3.YGFloatSanitize(minHeight), YGFloatIsUndefined(minHeight) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().minDimensions[enums_4.YGDimension.Height].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().minDimensions[enums_4.YGDimension.Height].unit != value.unit) {
            var style = node.getStyle();
            style.minDimensions[enums_4.YGDimension.Height] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMinHeightPercent = YGNodeStyleSetMinHeightPercent;
    function YGNodeStyleGetMinHeight(node) {
        var value = node.getStyle().minDimensions[enums_4.YGDimension.Height];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetMinHeight = YGNodeStyleGetMinHeight;
    function YGNodeStyleSetMaxWidth(node, maxWidth) {
        var value = new YGValue(utils_3.YGFloatSanitize(maxWidth), YGFloatIsUndefined(maxWidth) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().maxDimensions[enums_4.YGDimension.Width].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().maxDimensions[enums_4.YGDimension.Width].unit != value.unit) {
            var style = node.getStyle();
            style.maxDimensions[enums_4.YGDimension.Width] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMaxWidth = YGNodeStyleSetMaxWidth;
    function YGNodeStyleSetMaxWidthPercent(node, maxWidth) {
        var value = new YGValue(utils_3.YGFloatSanitize(maxWidth), YGFloatIsUndefined(maxWidth) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().maxDimensions[enums_4.YGDimension.Width].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().maxDimensions[enums_4.YGDimension.Width].unit != value.unit) {
            var style = node.getStyle();
            style.maxDimensions[enums_4.YGDimension.Width] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMaxWidthPercent = YGNodeStyleSetMaxWidthPercent;
    function YGNodeStyleGetMaxWidth(node) {
        var value = node.getStyle().maxDimensions[enums_4.YGDimension.Width];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetMaxWidth = YGNodeStyleGetMaxWidth;
    function YGNodeStyleSetMaxHeight(node, maxHeight) {
        var value = new YGValue(utils_3.YGFloatSanitize(maxHeight), YGFloatIsUndefined(maxHeight) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().maxDimensions[enums_4.YGDimension.Height].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().maxDimensions[enums_4.YGDimension.Height].unit != value.unit) {
            var style = node.getStyle();
            style.maxDimensions[enums_4.YGDimension.Height] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMaxHeight = YGNodeStyleSetMaxHeight;
    function YGNodeStyleSetMaxHeightPercent(node, maxHeight) {
        var value = new YGValue(utils_3.YGFloatSanitize(maxHeight), YGFloatIsUndefined(maxHeight) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Percent);
        if ((node.getStyle().maxDimensions[enums_4.YGDimension.Height].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().maxDimensions[enums_4.YGDimension.Height].unit != value.unit) {
            var style = node.getStyle();
            style.maxDimensions[enums_4.YGDimension.Height] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetMaxHeightPercent = YGNodeStyleSetMaxHeightPercent;
    function YGNodeStyleGetMaxHeight(node) {
        var value = node.getStyle().maxDimensions[enums_4.YGDimension.Height];
        if (value.unit == enums_4.YGUnit.Undefined || value.unit == enums_4.YGUnit.Auto) {
            value.value = internal_3.YGUndefined;
        }
        return value;
    }
    exports.YGNodeStyleGetMaxHeight = YGNodeStyleGetMaxHeight;
    function YGNodeLayoutGetLeft(node) {
        return node.getLayout().position[enums_4.YGEdge.Left];
    }
    exports.YGNodeLayoutGetLeft = YGNodeLayoutGetLeft;
    function YGNodeLayoutGetTop(node) {
        return node.getLayout().position[enums_4.YGEdge.Top];
    }
    exports.YGNodeLayoutGetTop = YGNodeLayoutGetTop;
    function YGNodeLayoutGetRight(node) {
        return node.getLayout().position[enums_4.YGEdge.Right];
    }
    exports.YGNodeLayoutGetRight = YGNodeLayoutGetRight;
    function YGNodeLayoutGetBottom(node) {
        return node.getLayout().position[enums_4.YGEdge.Bottom];
    }
    exports.YGNodeLayoutGetBottom = YGNodeLayoutGetBottom;
    function YGNodeLayoutGetWidth(node) {
        return node.getLayout().dimensions[enums_4.YGDimension.Width];
    }
    exports.YGNodeLayoutGetWidth = YGNodeLayoutGetWidth;
    function YGNodeLayoutGetHeight(node) {
        return node.getLayout().dimensions[enums_4.YGDimension.Height];
    }
    exports.YGNodeLayoutGetHeight = YGNodeLayoutGetHeight;
    function YGNodeLayoutGetDirection(node) {
        return node.getLayout().direction;
    }
    exports.YGNodeLayoutGetDirection = YGNodeLayoutGetDirection;
    function YGNodeLayoutGetHadOverflow(node) {
        return node.getLayout().hadOverflow;
    }
    exports.YGNodeLayoutGetHadOverflow = YGNodeLayoutGetHadOverflow;
    function YGNodeLayoutGetMargin(node, edge) {
        // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");
        if (edge == enums_4.YGEdge.Left) {
            if (node.getLayout().direction == enums_4.YGDirection.RTL) {
                return node.getLayout().margin[enums_4.YGEdge.End];
            }
            else {
                return node.getLayout().margin[enums_4.YGEdge.Start];
            }
        }
        if (edge == enums_4.YGEdge.Right) {
            if (node.getLayout().direction == enums_4.YGDirection.RTL) {
                return node.getLayout().margin[enums_4.YGEdge.Start];
            }
            else {
                return node.getLayout().margin[enums_4.YGEdge.End];
            }
        }
        return node.getLayout().margin[edge];
    }
    exports.YGNodeLayoutGetMargin = YGNodeLayoutGetMargin;
    function YGNodeLayoutGetBorder(node, edge) {
        // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");
        if (edge == enums_4.YGEdge.Left) {
            if (node.getLayout().direction == enums_4.YGDirection.RTL) {
                return node.getLayout().border[enums_4.YGEdge.End];
            }
            else {
                return node.getLayout().border[enums_4.YGEdge.Start];
            }
        }
        if (edge == enums_4.YGEdge.Right) {
            if (node.getLayout().direction == enums_4.YGDirection.RTL) {
                return node.getLayout().border[enums_4.YGEdge.Start];
            }
            else {
                return node.getLayout().border[enums_4.YGEdge.End];
            }
        }
        return node.getLayout().border[edge];
    }
    exports.YGNodeLayoutGetBorder = YGNodeLayoutGetBorder;
    function YGNodeLayoutGetPadding(node, edge) {
        // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");
        if (edge == enums_4.YGEdge.Left) {
            if (node.getLayout().direction == enums_4.YGDirection.RTL) {
                return node.getLayout().padding[enums_4.YGEdge.End];
            }
            else {
                return node.getLayout().padding[enums_4.YGEdge.Start];
            }
        }
        if (edge == enums_4.YGEdge.Right) {
            if (node.getLayout().direction == enums_4.YGDirection.RTL) {
                return node.getLayout().padding[enums_4.YGEdge.Start];
            }
            else {
                return node.getLayout().padding[enums_4.YGEdge.End];
            }
        }
        return node.getLayout().padding[edge];
    }
    exports.YGNodeLayoutGetPadding = YGNodeLayoutGetPadding;
    // MACROS END
    function YGNodeStyleSetFlex(node, flex) {
        if (node.getStyle().flex.isDiffValue(flex)) {
            var style = node.getStyle();
            if (YGFloatIsUndefined(flex)) {
                style.flex = new ygfloatoptional_4.YGFloatOptional();
            }
            else {
                style.flex = new ygfloatoptional_4.YGFloatOptional(flex);
            }
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlex = YGNodeStyleSetFlex;
    function YGNodeStyleGetFlex(node) {
        return node.getStyle().flex.isUndefined() ? internal_3.YGUndefined : node.getStyle().flex.getValue();
    }
    exports.YGNodeStyleGetFlex = YGNodeStyleGetFlex;
    function YGNodeStyleSetFlexGrow(node, flexGrow) {
        if (node.getStyle().flexGrow.isDiffValue(flexGrow)) {
            var style = node.getStyle();
            if (YGFloatIsUndefined(flexGrow)) {
                style.flexGrow = new ygfloatoptional_4.YGFloatOptional();
            }
            else {
                style.flexGrow = new ygfloatoptional_4.YGFloatOptional(flexGrow);
            }
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexGrow = YGNodeStyleSetFlexGrow;
    function YGNodeStyleSetFlexShrink(node, flexShrink) {
        if (node.getStyle().flexShrink.isDiffValue(flexShrink)) {
            var style = node.getStyle();
            if (YGFloatIsUndefined(flexShrink)) {
                style.flexShrink = new ygfloatoptional_4.YGFloatOptional();
            }
            else {
                style.flexShrink = new ygfloatoptional_4.YGFloatOptional(flexShrink);
            }
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexShrink = YGNodeStyleSetFlexShrink;
    function YGNodeStyleGetFlexBasis(node) {
        var flexBasis = node.getStyle().flexBasis;
        if (flexBasis.unit == enums_4.YGUnit.Undefined || flexBasis.unit == enums_4.YGUnit.Auto) {
            flexBasis.value = internal_3.YGUndefined;
        }
        return flexBasis;
    }
    exports.YGNodeStyleGetFlexBasis = YGNodeStyleGetFlexBasis;
    function YGNodeStyleSetFlexBasis(node, flexBasis) {
        var value = new YGValue(utils_3.YGFloatSanitize(flexBasis), YGFloatIsUndefined(flexBasis) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().flexBasis.value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().flexBasis.unit != value.unit) {
            var style = node.getStyle();
            style.flexBasis = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexBasis = YGNodeStyleSetFlexBasis;
    function YGNodeStyleSetFlexBasisPercent(node, flexBasisPercent) {
        if (node.getStyle().flexBasis.value != flexBasisPercent || node.getStyle().flexBasis.unit != enums_4.YGUnit.Percent) {
            var style = node.getStyle();
            style.flexBasis.value = utils_3.YGFloatSanitize(flexBasisPercent);
            style.flexBasis.unit = YGFloatIsUndefined(flexBasisPercent) ? enums_4.YGUnit.Auto : enums_4.YGUnit.Percent;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexBasisPercent = YGNodeStyleSetFlexBasisPercent;
    function YGNodeStyleSetFlexBasisAuto(node) {
        if (node.getStyle().flexBasis.unit != enums_4.YGUnit.Auto) {
            var style = node.getStyle();
            style.flexBasis.value = 0;
            style.flexBasis.unit = enums_4.YGUnit.Auto;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetFlexBasisAuto = YGNodeStyleSetFlexBasisAuto;
    function YGNodeStyleSetBorder(node, edge, border) {
        var value = new YGValue(utils_3.YGFloatSanitize(border), YGFloatIsUndefined(border) ? enums_4.YGUnit.Undefined : enums_4.YGUnit.Point);
        if ((node.getStyle().border[edge].value != value.value && value.unit != enums_4.YGUnit.Undefined) ||
            node.getStyle().border[edge].unit != value.unit) {
            var style = node.getStyle();
            style.border[edge] = value;
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetBorder = YGNodeStyleSetBorder;
    function YGNodeStyleGetBorder(node, edge) {
        if (node.getStyle().border[edge].unit == enums_4.YGUnit.Undefined ||
            node.getStyle().border[edge].unit == enums_4.YGUnit.Auto) {
            return internal_3.YGUndefined;
        }
        return node.getStyle().border[edge].value;
    }
    exports.YGNodeStyleGetBorder = YGNodeStyleGetBorder;
    function YGNodeStyleGetAspectRatio(node) {
        var op = node.getStyle().aspectRatio;
        return op.isUndefined() ? internal_3.YGUndefined : op.getValue();
    }
    exports.YGNodeStyleGetAspectRatio = YGNodeStyleGetAspectRatio;
    function YGNodeStyleSetAspectRatio(node, aspectRatio) {
        if (node.getStyle().aspectRatio.isDiffValue(aspectRatio)) {
            var style = node.getStyle();
            style.aspectRatio = new ygfloatoptional_4.YGFloatOptional(aspectRatio);
            node.setStyle(style);
            node.markDirtyAndPropogate();
        }
    }
    exports.YGNodeStyleSetAspectRatio = YGNodeStyleSetAspectRatio;
    function YGNodeLayoutGetDidLegacyStretchFlagAffectLayout(node) {
        return node.getLayout().doesLegacyStretchFlagAffectsLayout;
    }
    exports.YGNodeLayoutGetDidLegacyStretchFlagAffectLayout = YGNodeLayoutGetDidLegacyStretchFlagAffectLayout;
    var gCurrentGenerationCount = 0;
    function YGNodePrintInternal(node, options) {
        //const str: string = YGNodeToString(str, node, options, 0);
        //YGLog(node, YGLogLevel.Debug, str);
    }
    exports.YGNodePrintInternal = YGNodePrintInternal;
    function YGNodePrint(node, options) {
        YGNodePrintInternal(node, options);
    }
    exports.YGNodePrint = YGNodePrint;
    function YGNodePaddingAndBorderForAxis(node, axis, widthSize) {
        return utils_3.YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(axis, widthSize).add(node.getTrailingPaddingAndBorder(axis, widthSize)));
    }
    exports.YGNodePaddingAndBorderForAxis = YGNodePaddingAndBorderForAxis;
    function YGNodeAlignItem(node, child) {
        var align = child.getStyle().alignSelf == enums_4.YGAlign.Auto
            ? node.getStyle().alignItems
            : child.getStyle().alignSelf;
        if (align == enums_4.YGAlign.Baseline && utils_3.YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
            return enums_4.YGAlign.FlexStart;
        }
        return align;
    }
    exports.YGNodeAlignItem = YGNodeAlignItem;
    function YGBaseline(node) {
        if (node.getBaseline() != null) {
            var baseline_1 = node.getBaseline()(node, node.getLayout().measuredDimensions[enums_4.YGDimension.Width], node.getLayout().measuredDimensions[enums_4.YGDimension.Height]);
            //YGAssertWithNode(node, !YGFloatIsUndefined(baseline), "Expect custom baseline function to not return NaN");
            return baseline_1;
        }
        var baselineChild = null;
        var childCount = YGNodeGetChildCount(node);
        for (var i = 0; i < childCount; i++) {
            var child = YGNodeGetChild(node, i);
            if (child.getLineIndex() > 0) {
                break;
            }
            if (child.getStyle().positionType == enums_4.YGPositionType.Absolute) {
                continue;
            }
            if (YGNodeAlignItem(node, child) == enums_4.YGAlign.Baseline) {
                baselineChild = child;
                break;
            }
            if (baselineChild == null) {
                baselineChild = child;
            }
        }
        if (baselineChild == null) {
            return node.getLayout().measuredDimensions[enums_4.YGDimension.Height];
        }
        var baseline = YGBaseline(baselineChild);
        return baseline + baselineChild.getLayout().position[enums_4.YGEdge.Top];
    }
    exports.YGBaseline = YGBaseline;
    function YGIsBaselineLayout(node) {
        if (utils_3.YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
            return false;
        }
        if (node.getStyle().alignItems == enums_4.YGAlign.Baseline) {
            return true;
        }
        var childCount = YGNodeGetChildCount(node);
        for (var i = 0; i < childCount; i++) {
            var child = YGNodeGetChild(node, i);
            if (child.getStyle().positionType == enums_4.YGPositionType.Relative &&
                child.getStyle().alignSelf == enums_4.YGAlign.Baseline) {
                return true;
            }
        }
        return false;
    }
    exports.YGIsBaselineLayout = YGIsBaselineLayout;
    var dim = [enums_4.YGDimension.Height, enums_4.YGDimension.Height, enums_4.YGDimension.Width, enums_4.YGDimension.Width];
    function YGNodeDimWithMargin(node, axis, widthSize) {
        return node.getLayout().measuredDimensions[dim[axis]] +
            utils_3.YGUnwrapFloatOptional(node.getLeadingMargin(axis, widthSize).add(node.getTrailingMargin(axis, widthSize)));
    }
    exports.YGNodeDimWithMargin = YGNodeDimWithMargin;
    function YGNodeIsStyleDimDefined(node, axis, ownerSize) {
        var isUndefined = YGFloatIsUndefined(node.getResolvedDimension(dim[axis]).value);
        return !(node.getResolvedDimension(dim[axis]).unit == enums_4.YGUnit.Auto ||
            node.getResolvedDimension(dim[axis]).unit == enums_4.YGUnit.Undefined ||
            (node.getResolvedDimension(dim[axis]).unit == enums_4.YGUnit.Point &&
                !isUndefined && node.getResolvedDimension(dim[axis]).value < 0.0) ||
            (node.getResolvedDimension(dim[axis]).unit == enums_4.YGUnit.Percent &&
                !isUndefined &&
                (node.getResolvedDimension(dim[axis]).value < 0.0 ||
                    YGFloatIsUndefined(ownerSize))));
    }
    exports.YGNodeIsStyleDimDefined = YGNodeIsStyleDimDefined;
    function YGNodeIsLayoutDimDefined(node, axis) {
        var value = node.getLayout().measuredDimensions[dim[axis]];
        return !YGFloatIsUndefined(value) && value >= 0.0;
    }
    exports.YGNodeIsLayoutDimDefined = YGNodeIsLayoutDimDefined;
    function YGNodeBoundAxisWithinMinAndMax(node, axis, value, axisSize) {
        var min;
        var max;
        if (utils_3.YGFlexDirectionIsColumn(axis)) {
            min = utils_3.YGResolveValue(node.getStyle().minDimensions[enums_4.YGDimension.Height], axisSize);
            max = utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Height], axisSize);
        }
        else if (utils_3.YGFlexDirectionIsRow(axis)) {
            min = utils_3.YGResolveValue(node.getStyle().minDimensions[enums_4.YGDimension.Width], axisSize);
            max = utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Width], axisSize);
        }
        if (!max.isUndefined() && max.getValue() >= 0 && value > max.getValue()) {
            return max;
        }
        if (!min.isUndefined() && min.getValue() >= 0 && value < min.getValue()) {
            return min;
        }
        return new ygfloatoptional_4.YGFloatOptional(value);
    }
    exports.YGNodeBoundAxisWithinMinAndMax = YGNodeBoundAxisWithinMinAndMax;
    function YGNodeBoundAxis(node, axis, value, axisSize, widthSize) {
        return utils_3.YGFloatMax(utils_3.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(node, axis, value, axisSize)), YGNodePaddingAndBorderForAxis(node, axis, widthSize));
    }
    exports.YGNodeBoundAxis = YGNodeBoundAxis;
    function YGNodeSetChildTrailingPosition(node, child, axis) {
        var size = child.getLayout().measuredDimensions[dim[axis]];
        child.setLayoutPosition(node.getLayout().measuredDimensions[dim[axis]] - size -
            child.getLayout().position[internal_3.pos[axis]], internal_3.trailing[axis]);
    }
    exports.YGNodeSetChildTrailingPosition = YGNodeSetChildTrailingPosition;
    function YGConstrainMaxSizeForMode(node, axis, ownerAxisSize, ownerWidth, mode, size) {
        var maxSize = utils_3.YGResolveValue(node.getStyle().maxDimensions[dim[axis]], ownerAxisSize).add(node.getMarginForAxis(axis, ownerWidth));
        switch (mode.value) {
            case enums_4.YGMeasureMode.Exactly:
            case enums_4.YGMeasureMode.AtMost:
                size.value = (maxSize.isUndefined() || size.value < maxSize.getValue()) ? size.value : maxSize.getValue();
                break;
            case enums_4.YGMeasureMode.Undefined:
                if (!maxSize.isUndefined()) {
                    mode.value = enums_4.YGMeasureMode.AtMost;
                    size.value = maxSize.getValue();
                }
                break;
        }
    }
    exports.YGConstrainMaxSizeForMode = YGConstrainMaxSizeForMode;
    function YGNodeComputeFlexBasisForChild(node, child, width, widthMode, height, ownerWidth, ownerHeight, heightMode, direction, config) {
        var mainAxis = utils_3.YGResolveFlexDirection(node.getStyle().flexDirection, direction);
        var isMainAxisRow = utils_3.YGFlexDirectionIsRow(mainAxis);
        var mainAxisSize = isMainAxisRow ? width : height;
        var mainAxisownerSize = isMainAxisRow ? ownerWidth : ownerHeight;
        var childWidth;
        var childHeight;
        var childWidthMeasureMode;
        var childHeightMeasureMode;
        var resolvedFlexBasis = utils_3.YGResolveValue(child.resolveFlexBasisPtr(), mainAxisownerSize);
        var isRowStyleDimDefined = YGNodeIsStyleDimDefined(child, enums_4.YGFlexDirection.Row, ownerWidth);
        var isColumnStyleDimDefined = YGNodeIsStyleDimDefined(child, enums_4.YGFlexDirection.Column, ownerHeight);
        if (!resolvedFlexBasis.isUndefined() && !YGFloatIsUndefined(mainAxisSize)) {
            if (child.getLayout().computedFlexBasis.isUndefined() ||
                (YGConfigIsExperimentalFeatureEnabled(child.getConfig(), enums_4.YGExperimentalFeature.WebFlexBasis) &&
                    child.getLayout().computedFlexBasisGeneration != gCurrentGenerationCount)) {
                var paddingAndBorder = new ygfloatoptional_4.YGFloatOptional(YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth));
                child.setLayoutComputedFlexBasis(utils_3.YGFloatOptionalMax(resolvedFlexBasis, paddingAndBorder));
            }
        }
        else if (isMainAxisRow && isRowStyleDimDefined) {
            var paddingAndBorder = new ygfloatoptional_4.YGFloatOptional(YGNodePaddingAndBorderForAxis(child, enums_4.YGFlexDirection.Row, ownerWidth));
            child.setLayoutComputedFlexBasis(utils_3.YGFloatOptionalMax(utils_3.YGResolveValue(child.getResolvedDimension(enums_4.YGDimension.Width), ownerWidth), paddingAndBorder));
        }
        else if (!isMainAxisRow && isColumnStyleDimDefined) {
            var paddingAndBorder = new ygfloatoptional_4.YGFloatOptional(YGNodePaddingAndBorderForAxis(child, enums_4.YGFlexDirection.Column, ownerWidth));
            child.setLayoutComputedFlexBasis(utils_3.YGFloatOptionalMax(utils_3.YGResolveValue(child.getResolvedDimension(enums_4.YGDimension.Height), ownerHeight), paddingAndBorder));
        }
        else {
            childWidth = internal_3.YGUndefined;
            childHeight = internal_3.YGUndefined;
            childWidthMeasureMode = enums_4.YGMeasureMode.Undefined;
            childHeightMeasureMode = enums_4.YGMeasureMode.Undefined;
            var marginRow = utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Row, ownerWidth));
            var marginColumn = utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Column, ownerWidth));
            if (isRowStyleDimDefined) {
                childWidth = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(child.getResolvedDimension(enums_4.YGDimension.Width), ownerWidth)) + marginRow;
                childWidthMeasureMode = enums_4.YGMeasureMode.Exactly;
            }
            if (isColumnStyleDimDefined) {
                childHeight = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(child.getResolvedDimension(enums_4.YGDimension.Height), ownerHeight)) + marginColumn;
                childHeightMeasureMode = enums_4.YGMeasureMode.Exactly;
            }
            if ((!isMainAxisRow && node.getStyle().overflow == enums_4.YGOverflow.Scroll) ||
                node.getStyle().overflow != enums_4.YGOverflow.Scroll) {
                if (YGFloatIsUndefined(childWidth) && !YGFloatIsUndefined(width)) {
                    childWidth = width;
                    childWidthMeasureMode = enums_4.YGMeasureMode.AtMost;
                }
            }
            if ((isMainAxisRow && node.getStyle().overflow == enums_4.YGOverflow.Scroll) ||
                node.getStyle().overflow != enums_4.YGOverflow.Scroll) {
                if (YGFloatIsUndefined(childHeight) && !YGFloatIsUndefined(height)) {
                    childHeight = height;
                    childHeightMeasureMode = enums_4.YGMeasureMode.AtMost;
                }
            }
            if (!child.getStyle().aspectRatio.isUndefined()) {
                if (!isMainAxisRow && childWidthMeasureMode == enums_4.YGMeasureMode.Exactly) {
                    childHeight = marginColumn + (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
                    childHeightMeasureMode = enums_4.YGMeasureMode.Exactly;
                }
                else if (isMainAxisRow && childHeightMeasureMode == enums_4.YGMeasureMode.Exactly) {
                    childWidth = marginRow + (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
                    childWidthMeasureMode = enums_4.YGMeasureMode.Exactly;
                }
            }
            var hasExactWidth = !YGFloatIsUndefined(width) && widthMode == enums_4.YGMeasureMode.Exactly;
            var childWidthStretch = YGNodeAlignItem(node, child) == enums_4.YGAlign.Stretch;
            childWidthMeasureMode != enums_4.YGMeasureMode.Exactly;
            if (!isMainAxisRow && !isRowStyleDimDefined && hasExactWidth && childWidthStretch) {
                childWidth = width;
                childWidthMeasureMode = enums_4.YGMeasureMode.Exactly;
                if (!child.getStyle().aspectRatio.isUndefined()) {
                    childHeight =
                        (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
                    childHeightMeasureMode = enums_4.YGMeasureMode.Exactly;
                }
            }
            var hasExactHeight = !YGFloatIsUndefined(height) && heightMode == enums_4.YGMeasureMode.Exactly;
            var childHeightStretch = YGNodeAlignItem(node, child) == enums_4.YGAlign.Stretch && childHeightMeasureMode != enums_4.YGMeasureMode.Exactly;
            if (isMainAxisRow && !isColumnStyleDimDefined && hasExactHeight && childHeightStretch) {
                childHeight = height;
                childHeightMeasureMode = enums_4.YGMeasureMode.Exactly;
                if (!child.getStyle().aspectRatio.isUndefined()) {
                    childWidth = (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
                    childWidthMeasureMode = enums_4.YGMeasureMode.Exactly;
                }
            }
            var childWidthMeasureModeRef = { value: childWidthMeasureMode };
            var childWidthRef = { value: childWidth };
            var childHeightMeasureModeRef = { value: childHeightMeasureMode };
            var childHeightRef = { value: childHeight };
            YGConstrainMaxSizeForMode(child, enums_4.YGFlexDirection.Row, ownerWidth, ownerWidth, childWidthMeasureModeRef, childWidthRef);
            YGConstrainMaxSizeForMode(child, enums_4.YGFlexDirection.Column, ownerHeight, ownerWidth, childHeightMeasureModeRef, childHeightRef);
            YGLayoutNodeInternal(child, childWidthRef.value, childHeightRef.value, direction, childWidthMeasureModeRef.value, childWidthMeasureModeRef.value, ownerWidth, ownerHeight, false, "measure", config);
            child.setLayoutComputedFlexBasis(new ygfloatoptional_4.YGFloatOptional(utils_3.YGFloatMax(child.getLayout().measuredDimensions[dim[mainAxis]], YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth))));
        }
        child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
    }
    exports.YGNodeComputeFlexBasisForChild = YGNodeComputeFlexBasisForChild;
    function YGNodeAbsoluteLayoutChild(node, child, width, widthMode, height, direction, config) {
        var mainAxis = utils_3.YGResolveFlexDirection(node.getStyle().flexDirection, direction);
        var crossAxis = utils_3.YGFlexDirectionCross(mainAxis, direction);
        var isMainAxisRow = utils_3.YGFlexDirectionIsRow(mainAxis);
        var childWidth = internal_3.YGUndefined;
        var childHeight = internal_3.YGUndefined;
        var childWidthMeasureMode = enums_4.YGMeasureMode.Undefined;
        var childHeightMeasureMode = enums_4.YGMeasureMode.Undefined;
        var marginRow = utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Row, width));
        var marginColumn = utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Column, width));
        if (YGNodeIsStyleDimDefined(child, enums_4.YGFlexDirection.Row, width)) {
            childWidth = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(child.getResolvedDimension(enums_4.YGDimension.Width), width)) + marginRow;
        }
        else {
            if (child.isLeadingPositionDefined(enums_4.YGFlexDirection.Row) && child.isTrailingPosDefined(enums_4.YGFlexDirection.Row)) {
                childWidth = node.getLayout().measuredDimensions[enums_4.YGDimension.Width] -
                    (node.getLeadingBorder(enums_4.YGFlexDirection.Row) +
                        node.getTrailingBorder(enums_4.YGFlexDirection.Row)) -
                    utils_3.YGUnwrapFloatOptional(child.getLeadingPosition(enums_4.YGFlexDirection.Row, width).add(child.getTrailingPosition(enums_4.YGFlexDirection.Row, width)));
                childWidth = YGNodeBoundAxis(child, enums_4.YGFlexDirection.Row, childWidth, width, width);
            }
        }
        if (YGNodeIsStyleDimDefined(child, enums_4.YGFlexDirection.Column, height)) {
            childHeight =
                utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(child.getResolvedDimension(enums_4.YGDimension.Height), height)) +
                    marginColumn;
        }
        else {
            if (child.isLeadingPositionDefined(enums_4.YGFlexDirection.Column) && child.isTrailingPosDefined(enums_4.YGFlexDirection.Column)) {
                childHeight =
                    node.getLayout().measuredDimensions[enums_4.YGDimension.Height] -
                        (node.getLeadingBorder(enums_4.YGFlexDirection.Column) +
                            node.getTrailingBorder(enums_4.YGFlexDirection.Column)) -
                        utils_3.YGUnwrapFloatOptional(child.getLeadingPosition(enums_4.YGFlexDirection.Column, height).add(child.getTrailingPosition(enums_4.YGFlexDirection.Column, height)));
                childHeight = YGNodeBoundAxis(child, enums_4.YGFlexDirection.Column, childHeight, height, width);
            }
        }
        if (YGFloatIsUndefined(childWidth) ? !YGFloatIsUndefined(childHeight) : YGFloatIsUndefined(childHeight)) { // if( foo ? !bar : bar ) { XOR ^ REMOVED
            if (!child.getStyle().aspectRatio.isUndefined()) {
                if (YGFloatIsUndefined(childWidth)) {
                    childWidth = marginRow + (childHeight - marginColumn) * child.getStyle().aspectRatio.getValue();
                }
                else if (YGFloatIsUndefined(childHeight)) {
                    childHeight = marginColumn + (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
                }
            }
        }
        if (YGFloatIsUndefined(childWidth) || YGFloatIsUndefined(childHeight)) {
            childWidthMeasureMode = YGFloatIsUndefined(childWidth) ? enums_4.YGMeasureMode.Undefined : enums_4.YGMeasureMode.Exactly;
            childHeightMeasureMode = YGFloatIsUndefined(childHeight) ? enums_4.YGMeasureMode.Undefined : enums_4.YGMeasureMode.Exactly;
            if (!isMainAxisRow && YGFloatIsUndefined(childWidth) && widthMode != enums_4.YGMeasureMode.Undefined && !YGFloatIsUndefined(width) && width > 0) {
                childWidth = width;
                childWidthMeasureMode = enums_4.YGMeasureMode.AtMost;
            }
            YGLayoutNodeInternal(child, childWidth, childHeight, direction, childWidthMeasureMode, childHeightMeasureMode, childWidth, childHeight, false, "abs-measure", config);
            childWidth = child.getLayout().measuredDimensions[enums_4.YGDimension.Width] +
                utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Row, width));
            childHeight = child.getLayout().measuredDimensions[enums_4.YGDimension.Height] +
                utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Column, width));
        }
        YGLayoutNodeInternal(child, childWidth, childHeight, direction, enums_4.YGMeasureMode.Exactly, enums_4.YGMeasureMode.Exactly, childWidth, childHeight, true, "abs-layout", config);
        if (child.isTrailingPosDefined(mainAxis) && !child.isLeadingPositionDefined(mainAxis)) {
            child.setLayoutPosition(node.getLayout().measuredDimensions[dim[mainAxis]] -
                child.getLayout().measuredDimensions[dim[mainAxis]] -
                node.getTrailingBorder(mainAxis) -
                utils_3.YGUnwrapFloatOptional(child.getTrailingMargin(mainAxis, width)) -
                utils_3.YGUnwrapFloatOptional(child.getTrailingPosition(mainAxis, isMainAxisRow ? width : height)), internal_3.leading[mainAxis]);
        }
        else if (!child.isLeadingPositionDefined(mainAxis) && node.getStyle().justifyContent == enums_4.YGJustify.Center) {
            child.setLayoutPosition((node.getLayout().measuredDimensions[dim[mainAxis]] -
                child.getLayout().measuredDimensions[dim[mainAxis]]) /
                2.0, internal_3.leading[mainAxis]);
        }
        else if (!child.isLeadingPositionDefined(mainAxis) && node.getStyle().justifyContent == enums_4.YGJustify.FlexEnd) {
            child.setLayoutPosition((node.getLayout().measuredDimensions[dim[mainAxis]] -
                child.getLayout().measuredDimensions[dim[mainAxis]]), internal_3.leading[mainAxis]);
        }
        if (child.isTrailingPosDefined(crossAxis) && !child.isLeadingPositionDefined(crossAxis)) {
            child.setLayoutPosition(node.getLayout().measuredDimensions[dim[crossAxis]] -
                child.getLayout().measuredDimensions[dim[crossAxis]] -
                node.getTrailingBorder(crossAxis) -
                utils_3.YGUnwrapFloatOptional(child.getTrailingMargin(crossAxis, width)) -
                utils_3.YGUnwrapFloatOptional(child.getTrailingPosition(crossAxis, isMainAxisRow ? height : width)), internal_3.leading[crossAxis]);
        }
        else if (!child.isLeadingPositionDefined(crossAxis) && YGNodeAlignItem(node, child) == enums_4.YGAlign.Center) {
            child.setLayoutPosition((node.getLayout().measuredDimensions[dim[crossAxis]] -
                child.getLayout().measuredDimensions[dim[crossAxis]]) /
                2.0, internal_3.leading[crossAxis]);
        }
        else if (!child.isLeadingPositionDefined(crossAxis) &&
            ((YGNodeAlignItem(node, child) == enums_4.YGAlign.FlexEnd) ? !(node.getStyle().flexWrap == enums_4.YGWrap.WrapReverse) : (node.getStyle().flexWrap == enums_4.YGWrap.WrapReverse))) { // XOR
            child.setLayoutPosition((node.getLayout().measuredDimensions[dim[crossAxis]] -
                child.getLayout().measuredDimensions[dim[crossAxis]]), internal_3.leading[crossAxis]);
        }
    }
    exports.YGNodeAbsoluteLayoutChild = YGNodeAbsoluteLayoutChild;
    function YGNodeWithMeasureFuncSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight) {
        //YGAssertWithNode(node, node.getMeasure() != null, "Expected node to have custom measure function");
        var paddingAndBorderAxisRow = YGNodePaddingAndBorderForAxis(node, enums_4.YGFlexDirection.Row, availableWidth);
        var paddingAndBorderAxisColumn = YGNodePaddingAndBorderForAxis(node, enums_4.YGFlexDirection.Column, availableWidth);
        var marginAxisRow = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Row, availableWidth));
        var marginAxisColumn = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Column, availableWidth));
        var innerWidth = YGFloatIsUndefined(availableWidth)
            ? availableWidth
            : utils_3.YGFloatMax(0, availableWidth - marginAxisRow - paddingAndBorderAxisRow);
        var innerHeight = YGFloatIsUndefined(availableHeight)
            ? availableHeight
            : utils_3.YGFloatMax(0, availableHeight - marginAxisColumn - paddingAndBorderAxisColumn);
        if (widthMeasureMode == enums_4.YGMeasureMode.Exactly && heightMeasureMode == enums_4.YGMeasureMode.Exactly) {
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Row, availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_4.YGDimension.Width);
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Column, availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_4.YGDimension.Height);
        }
        else {
            var measuredSize = node.getMeasure()(node, innerWidth, widthMeasureMode, innerHeight, heightMeasureMode);
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Row, (widthMeasureMode == enums_4.YGMeasureMode.Undefined ||
                widthMeasureMode == enums_4.YGMeasureMode.AtMost)
                ? measuredSize.width + paddingAndBorderAxisRow
                : availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_4.YGDimension.Width);
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Column, (heightMeasureMode == enums_4.YGMeasureMode.Undefined ||
                heightMeasureMode == enums_4.YGMeasureMode.AtMost)
                ? measuredSize.height + paddingAndBorderAxisColumn
                : availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_4.YGDimension.Height);
        }
    }
    exports.YGNodeWithMeasureFuncSetMeasuredDimensions = YGNodeWithMeasureFuncSetMeasuredDimensions;
    function YGNodeEmptyContainerSetMeasuredDimensions(node, availableHeight, availableWidth, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight) {
        var paddingAndBorderAxisRow = YGNodePaddingAndBorderForAxis(node, enums_4.YGFlexDirection.Row, ownerWidth);
        var paddingAndBorderAxisColumn = YGNodePaddingAndBorderForAxis(node, enums_4.YGFlexDirection.Column, ownerWidth);
        var marginAxisRow = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Row, ownerWidth));
        var marginAxisColumn = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Column, ownerWidth));
        node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Row, (widthMeasureMode == enums_4.YGMeasureMode.Undefined ||
            widthMeasureMode == enums_4.YGMeasureMode.AtMost)
            ? paddingAndBorderAxisRow
            : availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_4.YGDimension.Width);
        node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Column, (heightMeasureMode == enums_4.YGMeasureMode.Undefined ||
            heightMeasureMode == enums_4.YGMeasureMode.AtMost)
            ? paddingAndBorderAxisColumn
            : availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_4.YGDimension.Height);
    }
    exports.YGNodeEmptyContainerSetMeasuredDimensions = YGNodeEmptyContainerSetMeasuredDimensions;
    function YGNodeFixedSizeSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight) {
        if ((!YGFloatIsUndefined(availableWidth) && widthMeasureMode == enums_4.YGMeasureMode.AtMost && availableWidth <= 0) ||
            (!YGFloatIsUndefined(availableHeight) && heightMeasureMode == enums_4.YGMeasureMode.AtMost && availableHeight <= 0) ||
            (widthMeasureMode == enums_4.YGMeasureMode.Exactly && heightMeasureMode == enums_4.YGMeasureMode.Exactly)) {
            var marginAxisColumn = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Column, ownerWidth));
            var marginAxisRow = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Row, ownerWidth));
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Row, YGFloatIsUndefined(availableWidth) ||
                (widthMeasureMode == enums_4.YGMeasureMode.AtMost && availableWidth < 0)
                ? 0
                : availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_4.YGDimension.Width);
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Column, YGFloatIsUndefined(availableHeight) ||
                (heightMeasureMode == enums_4.YGMeasureMode.AtMost && availableHeight < 0)
                ? 0
                : availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_4.YGDimension.Height);
            return true;
        }
        return false;
    }
    exports.YGNodeFixedSizeSetMeasuredDimensions = YGNodeFixedSizeSetMeasuredDimensions;
    function YGZeroOutLayoutRecursivly(node) {
        node.getLayout().clean();
        node.setHasNewLayout(true);
        node.cloneChildrenIfNeeded();
        var childCount = YGNodeGetChildCount(node);
        for (var i = 0; i < childCount; i++) {
            var child = node.getChild(i);
            YGZeroOutLayoutRecursivly(child);
        }
    }
    exports.YGZeroOutLayoutRecursivly = YGZeroOutLayoutRecursivly;
    function YGNodeCalculateAvailableInnerDim(node, axis, availableDim, ownerDim) {
        var direction = utils_3.YGFlexDirectionIsRow(axis) ? enums_4.YGFlexDirection.Row : enums_4.YGFlexDirection.Column;
        var dimension = utils_3.YGFlexDirectionIsRow(axis) ? enums_4.YGDimension.Width : enums_4.YGDimension.Height;
        var margin = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(direction, ownerDim));
        var paddingAndBorder = YGNodePaddingAndBorderForAxis(node, direction, ownerDim);
        var availableInnerDim = availableDim - margin - paddingAndBorder;
        if (!YGFloatIsUndefined(availableInnerDim)) {
            var minDimensionOptional = utils_3.YGResolveValue(node.getStyle().minDimensions[dimension], ownerDim);
            var minInnerDim = minDimensionOptional.isUndefined()
                ? 0.0
                : minDimensionOptional.getValue() - paddingAndBorder;
            var maxDimensionOptional = utils_3.YGResolveValue(node.getStyle().maxDimensions[dimension], ownerDim);
            var maxInnerDim = maxDimensionOptional.isUndefined()
                ? Number.MAX_VALUE
                : maxDimensionOptional.getValue() - paddingAndBorder;
            availableInnerDim = utils_3.YGFloatMax(utils_3.YGFloatMin(availableInnerDim, maxInnerDim), minInnerDim);
        }
        return availableInnerDim;
    }
    exports.YGNodeCalculateAvailableInnerDim = YGNodeCalculateAvailableInnerDim;
    function YGNodeComputeFlexBasisForChildren(node, availableInnerWidth, availableInnerHeight, widthMeasureMode, heightMeasureMode, direction, mainAxis, config, performLayout, totalOuterFlexBasis) {
        var singleFlexChild = null;
        var children = node.getChildren();
        var measureModeMainDim = utils_3.YGFlexDirectionIsRow(mainAxis) ? widthMeasureMode : heightMeasureMode;
        if (measureModeMainDim == enums_4.YGMeasureMode.Exactly) {
            for (var i = 0; i < children.length; ++i) {
                var child = children[i];
                if (singleFlexChild != null) {
                    if (child.isNodeFlexible()) {
                        singleFlexChild = null;
                        break;
                    }
                }
                else if (child.resolveFlexGrow() > 0.0 && child.resolveFlexShrink() > 0.0) {
                    singleFlexChild = child;
                }
            }
        }
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            child.resolveDimension();
            if (child.getStyle().display == enums_4.YGDisplay.None) {
                YGZeroOutLayoutRecursivly(child);
                child.setHasNewLayout(true);
                child.setDirty(false);
                continue;
            }
            if (performLayout) {
                var childDirection = child.resolveDirection(direction);
                var mainDim = utils_3.YGFlexDirectionIsRow(mainAxis)
                    ? availableInnerWidth
                    : availableInnerHeight;
                var crossDim = utils_3.YGFlexDirectionIsRow(mainAxis)
                    ? availableInnerHeight
                    : availableInnerWidth;
                child.setPosition(childDirection, mainDim, crossDim, availableInnerWidth);
            }
            if (child.getStyle().positionType == enums_4.YGPositionType.Absolute) {
                continue;
            }
            if (child == singleFlexChild) {
                child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
                child.setLayoutComputedFlexBasis(new ygfloatoptional_4.YGFloatOptional(0));
            }
            else {
                YGNodeComputeFlexBasisForChild(node, child, availableInnerWidth, widthMeasureMode, availableInnerHeight, availableInnerWidth, availableInnerHeight, heightMeasureMode, direction, config);
            }
            totalOuterFlexBasis += utils_3.YGUnwrapFloatOptional(child.getLayout().computedFlexBasis.add(child.getMarginForAxis(mainAxis, availableInnerWidth)));
        }
    }
    exports.YGNodeComputeFlexBasisForChildren = YGNodeComputeFlexBasisForChildren;
    function YGCalculateCollectFlexItemsRowValues(node, ownerDirection, mainAxisownerSize, availableInnerWidth, availableInnerMainDim, startOfLineIndex, lineCount) {
        var flexAlgoRowMeasurement = new utils_3.YGCollectFlexItemsRowValues();
        flexAlgoRowMeasurement.relativeChildren = new Array(node.getChildren().length);
        var sizeConsumedOnCurrentLineIncludingMinConstraint = 0;
        var mainAxis = utils_3.YGResolveFlexDirection(node.getStyle().flexDirection, node.resolveDirection(ownerDirection));
        var isNodeFlexWrap = node.getStyle().flexWrap != enums_4.YGWrap.NoWrap;
        var endOfLineIndex = startOfLineIndex;
        for (; endOfLineIndex < node.getChildrenCount(); endOfLineIndex++) {
            var child = node.getChild(endOfLineIndex);
            if (child.getStyle().display == enums_4.YGDisplay.None ||
                child.getStyle().positionType == enums_4.YGPositionType.Absolute) {
                continue;
            }
            child.setLineIndex(lineCount);
            var childMarginMainAxis = utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth));
            var flexBasisWithMinAndMaxConstraints = utils_3.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(child, mainAxis, utils_3.YGUnwrapFloatOptional(child.getLayout().computedFlexBasis), mainAxisownerSize));
            if (sizeConsumedOnCurrentLineIncludingMinConstraint +
                flexBasisWithMinAndMaxConstraints + childMarginMainAxis >
                availableInnerMainDim && isNodeFlexWrap && flexAlgoRowMeasurement.itemsOnLine > 0) {
                break;
            }
            sizeConsumedOnCurrentLineIncludingMinConstraint += flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
            flexAlgoRowMeasurement.sizeConsumedOnCurrentLine += flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
            flexAlgoRowMeasurement.itemsOnLine++;
            if (child.isNodeFlexible()) {
                flexAlgoRowMeasurement.totalFlexGrowFactors += child.resolveFlexGrow();
                flexAlgoRowMeasurement.totalFlexShrinkScaledFactors +=
                    -child.resolveFlexShrink() *
                        utils_3.YGUnwrapFloatOptional(child.getLayout().computedFlexBasis);
            }
            flexAlgoRowMeasurement.relativeChildren.push(child);
        }
        if (flexAlgoRowMeasurement.totalFlexGrowFactors > 0 &&
            flexAlgoRowMeasurement.totalFlexGrowFactors < 1) {
            flexAlgoRowMeasurement.totalFlexGrowFactors = 1;
        }
        if (flexAlgoRowMeasurement.totalFlexShrinkScaledFactors > 0 &&
            flexAlgoRowMeasurement.totalFlexShrinkScaledFactors < 1) {
            flexAlgoRowMeasurement.totalFlexShrinkScaledFactors = 1;
        }
        flexAlgoRowMeasurement.endOfLineIndex = endOfLineIndex;
        return flexAlgoRowMeasurement;
    }
    exports.YGCalculateCollectFlexItemsRowValues = YGCalculateCollectFlexItemsRowValues;
    function YGDistributeFreeSpaceSecondPass(collectedFlexItemsValues, node, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config) {
        var childFlexBasis = 0;
        var flexShrinkScaledFactor = 0;
        var flexGrowFactor = 0;
        var deltaFreeSpace = 0;
        var isMainAxisRow = utils_3.YGFlexDirectionIsRow(mainAxis);
        var isNodeFlexWrap = node.getStyle().flexWrap != enums_4.YGWrap.NoWrap;
        for (var i = 0; i < collectedFlexItemsValues.relativeChildren.length; ++i) {
            var currentRelativeChild = collectedFlexItemsValues.relativeChildren[i];
            childFlexBasis = utils_3.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(currentRelativeChild, mainAxis, utils_3.YGUnwrapFloatOptional(currentRelativeChild.getLayout().computedFlexBasis), mainAxisownerSize));
            var updatedMainSize = childFlexBasis;
            if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) &&
                collectedFlexItemsValues.remainingFreeSpace < 0) {
                flexShrinkScaledFactor =
                    -currentRelativeChild.resolveFlexShrink() * childFlexBasis;
                if (flexShrinkScaledFactor != 0) {
                    var childSize = void 0;
                    if (!YGFloatIsUndefined(collectedFlexItemsValues.totalFlexShrinkScaledFactors) &&
                        collectedFlexItemsValues.totalFlexShrinkScaledFactors == 0) {
                        childSize = childFlexBasis + flexShrinkScaledFactor;
                    }
                    else {
                        childSize = childFlexBasis +
                            (collectedFlexItemsValues.remainingFreeSpace /
                                collectedFlexItemsValues.totalFlexShrinkScaledFactors) *
                                flexShrinkScaledFactor;
                    }
                    updatedMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, childSize, availableInnerMainDim, availableInnerWidth);
                }
            }
            else if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) &&
                collectedFlexItemsValues.remainingFreeSpace > 0) {
                flexGrowFactor = currentRelativeChild.resolveFlexGrow();
                if (!YGFloatIsUndefined(flexGrowFactor) && flexGrowFactor != 0) {
                    updatedMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, childFlexBasis +
                        collectedFlexItemsValues.remainingFreeSpace /
                            collectedFlexItemsValues.totalFlexGrowFactors *
                            flexGrowFactor, availableInnerMainDim, availableInnerWidth);
                }
            }
            deltaFreeSpace += updatedMainSize - childFlexBasis;
            var marginMain = utils_3.YGUnwrapFloatOptional(currentRelativeChild.getMarginForAxis(mainAxis, availableInnerWidth));
            var marginCross = utils_3.YGUnwrapFloatOptional(currentRelativeChild.getMarginForAxis(crossAxis, availableInnerWidth));
            var childCrossSize = void 0;
            var childMainSize = updatedMainSize + marginMain;
            var childCrossMeasureMode = void 0;
            var childMainMeasureMode = enums_4.YGMeasureMode.Exactly;
            if (!currentRelativeChild.getStyle().aspectRatio.isUndefined()) {
                childCrossSize = isMainAxisRow ? (childMainSize - marginMain) /
                    currentRelativeChild.getStyle().aspectRatio.getValue()
                    : (childMainSize - marginMain) *
                        currentRelativeChild.getStyle().aspectRatio.getValue();
                childCrossMeasureMode = enums_4.YGMeasureMode.Exactly;
                childCrossSize += marginCross;
            }
            else if (!YGFloatIsUndefined(availableInnerCrossDim) &&
                !YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim) &&
                measureModeCrossDim == enums_4.YGMeasureMode.Exactly &&
                !(isNodeFlexWrap && flexBasisOverflows) &&
                YGNodeAlignItem(node, currentRelativeChild) == enums_4.YGAlign.Stretch &&
                currentRelativeChild.marginLeadingValue(crossAxis).unit !=
                    enums_4.YGUnit.Auto &&
                currentRelativeChild.marginTrailingValue(crossAxis).unit !=
                    enums_4.YGUnit.Auto) {
                childCrossSize = availableInnerCrossDim;
                childCrossMeasureMode = enums_4.YGMeasureMode.Exactly;
            }
            else if (!YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim)) {
                childCrossSize = availableInnerCrossDim;
                childCrossMeasureMode = YGFloatIsUndefined(childCrossSize)
                    ? enums_4.YGMeasureMode.Undefined
                    : enums_4.YGMeasureMode.AtMost;
            }
            else {
                childCrossSize =
                    utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(currentRelativeChild.getResolvedDimension(dim[crossAxis]), availableInnerCrossDim)) +
                        marginCross;
                var isLoosePercentageMeasurement = currentRelativeChild.getResolvedDimension(dim[crossAxis]).unit ==
                    enums_4.YGUnit.Percent;
                measureModeCrossDim != enums_4.YGMeasureMode.Exactly;
                childCrossMeasureMode =
                    YGFloatIsUndefined(childCrossSize) || isLoosePercentageMeasurement
                        ? enums_4.YGMeasureMode.Undefined
                        : enums_4.YGMeasureMode.Exactly;
            }
            var childMainMeasureModeRef = { value: childMainMeasureMode };
            var childMainSizeRef = { value: childMainSize };
            var childCrossMeasureModeRef = { value: childCrossMeasureMode };
            var childCrossSizeRef = { value: childCrossSize };
            YGConstrainMaxSizeForMode(currentRelativeChild, mainAxis, availableInnerMainDim, availableInnerWidth, childMainMeasureModeRef, childMainSizeRef);
            YGConstrainMaxSizeForMode(currentRelativeChild, crossAxis, availableInnerCrossDim, availableInnerWidth, childCrossMeasureModeRef, childCrossSizeRef);
            childMainMeasureMode = childMainMeasureModeRef.value;
            childMainSize = childMainSizeRef.value;
            childCrossMeasureMode = childCrossMeasureModeRef.value;
            childCrossSize = childCrossSizeRef.value;
            var requiresStretchLayout = !YGNodeIsStyleDimDefined(currentRelativeChild, crossAxis, availableInnerCrossDim) &&
                YGNodeAlignItem(node, currentRelativeChild) == enums_4.YGAlign.Stretch &&
                currentRelativeChild.marginLeadingValue(crossAxis).unit != enums_4.YGUnit.Auto &&
                currentRelativeChild.marginTrailingValue(crossAxis).unit != enums_4.YGUnit.Auto;
            var childWidth = isMainAxisRow ? childMainSize : childCrossSize;
            var childHeight = !isMainAxisRow ? childMainSize : childCrossSize;
            var childWidthMeasureMode = isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
            var childHeightMeasureMode = !isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
            YGLayoutNodeInternal(currentRelativeChild, childWidth, childHeight, node.getLayout().direction, childWidthMeasureMode, childHeightMeasureMode, availableInnerWidth, availableInnerHeight, performLayout && !requiresStretchLayout, "flex", config);
            node.setLayoutHadOverflow(node.getLayout().hadOverflow ||
                currentRelativeChild.getLayout().hadOverflow);
        }
        return deltaFreeSpace;
    }
    exports.YGDistributeFreeSpaceSecondPass = YGDistributeFreeSpaceSecondPass;
    function YGDistributeFreeSpaceFirstPass(collectedFlexItemsValues, mainAxis, mainAxisownerSize, availableInnerMainDim, availableInnerWidth) {
        var flexShrinkScaledFactor = 0;
        var flexGrowFactor = 0;
        var baseMainSize = 0;
        var boundMainSize = 0;
        var deltaFreeSpace = 0;
        for (var i = 0; i < collectedFlexItemsValues.relativeChildren.length; ++i) {
            var currentRelativeChild = collectedFlexItemsValues.relativeChildren[i];
            var childFlexBasis = utils_3.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(currentRelativeChild, mainAxis, utils_3.YGUnwrapFloatOptional(currentRelativeChild.getLayout().computedFlexBasis), mainAxisownerSize));
            if (collectedFlexItemsValues.remainingFreeSpace < 0) {
                flexShrinkScaledFactor =
                    -currentRelativeChild.resolveFlexShrink() * childFlexBasis;
                if (!YGFloatIsUndefined(flexShrinkScaledFactor) &&
                    flexShrinkScaledFactor != 0) {
                    baseMainSize = childFlexBasis +
                        collectedFlexItemsValues.remainingFreeSpace /
                            collectedFlexItemsValues.totalFlexShrinkScaledFactors *
                            flexShrinkScaledFactor;
                    boundMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, baseMainSize, availableInnerMainDim, availableInnerWidth);
                    if (!YGFloatIsUndefined(baseMainSize) &&
                        !YGFloatIsUndefined(boundMainSize) &&
                        baseMainSize != boundMainSize) {
                        deltaFreeSpace += boundMainSize - childFlexBasis;
                        collectedFlexItemsValues.totalFlexShrinkScaledFactors -=
                            flexShrinkScaledFactor;
                    }
                }
            }
            else if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) &&
                collectedFlexItemsValues.remainingFreeSpace > 0) {
                flexGrowFactor = currentRelativeChild.resolveFlexGrow();
                if (!YGFloatIsUndefined(flexGrowFactor) && flexGrowFactor != 0) {
                    baseMainSize = childFlexBasis +
                        collectedFlexItemsValues.remainingFreeSpace /
                            collectedFlexItemsValues.totalFlexGrowFactors * flexGrowFactor;
                    boundMainSize = YGNodeBoundAxis(currentRelativeChild, mainAxis, baseMainSize, availableInnerMainDim, availableInnerWidth);
                    if (!YGFloatIsUndefined(baseMainSize) &&
                        !YGFloatIsUndefined(boundMainSize) &&
                        baseMainSize != boundMainSize) {
                        deltaFreeSpace += boundMainSize - childFlexBasis;
                        collectedFlexItemsValues.totalFlexGrowFactors -= flexGrowFactor;
                    }
                }
            }
        }
        collectedFlexItemsValues.remainingFreeSpace -= deltaFreeSpace;
    }
    exports.YGDistributeFreeSpaceFirstPass = YGDistributeFreeSpaceFirstPass;
    function YGResolveFlexibleLength(node, collectedFlexItemsValues, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config) {
        var originalFreeSpace = collectedFlexItemsValues.remainingFreeSpace;
        YGDistributeFreeSpaceFirstPass(collectedFlexItemsValues, mainAxis, mainAxisownerSize, availableInnerMainDim, availableInnerWidth);
        var distributedFreeSpace = YGDistributeFreeSpaceSecondPass(collectedFlexItemsValues, node, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config);
        collectedFlexItemsValues.remainingFreeSpace =
            originalFreeSpace - distributedFreeSpace;
    }
    exports.YGResolveFlexibleLength = YGResolveFlexibleLength;
    function YGJustifyMainAxis(node, collectedFlexItemsValues, startOfLineIndex, mainAxis, crossAxis, measureModeMainDim, measureModeCrossDim, mainAxisownerSize, ownerWidth, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, performLayout) {
        var style = node.getStyle();
        if (measureModeMainDim == enums_4.YGMeasureMode.AtMost &&
            collectedFlexItemsValues.remainingFreeSpace > 0) {
            if (style.minDimensions[dim[mainAxis]].unit != enums_4.YGUnit.Undefined &&
                !utils_3.YGResolveValue(style.minDimensions[dim[mainAxis]], mainAxisownerSize)
                    .isUndefined()) {
                collectedFlexItemsValues.remainingFreeSpace = utils_3.YGFloatMax(0, utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(style.minDimensions[dim[mainAxis]], mainAxisownerSize)) -
                    (availableInnerMainDim -
                        collectedFlexItemsValues.remainingFreeSpace));
            }
            else {
                collectedFlexItemsValues.remainingFreeSpace = 0;
            }
        }
        var numberOfAutoMarginsOnCurrentLine = 0;
        for (var i = startOfLineIndex; i < collectedFlexItemsValues.endOfLineIndex; i++) {
            var child = node.getChild(i);
            if (child.getStyle().positionType == enums_4.YGPositionType.Relative) {
                if (child.marginLeadingValue(mainAxis).unit == enums_4.YGUnit.Auto) {
                    numberOfAutoMarginsOnCurrentLine++;
                }
                if (child.marginTrailingValue(mainAxis).unit == enums_4.YGUnit.Auto) {
                    numberOfAutoMarginsOnCurrentLine++;
                }
            }
        }
        var leadingMainDim = 0;
        var betweenMainDim = 0;
        var justifyContent = node.getStyle().justifyContent;
        if (numberOfAutoMarginsOnCurrentLine == 0) {
            switch (justifyContent) {
                case enums_4.YGJustify.Center:
                    leadingMainDim = collectedFlexItemsValues.remainingFreeSpace / 2;
                    break;
                case enums_4.YGJustify.FlexEnd:
                    leadingMainDim = collectedFlexItemsValues.remainingFreeSpace;
                    break;
                case enums_4.YGJustify.SpaceBetween:
                    if (collectedFlexItemsValues.itemsOnLine > 1) {
                        betweenMainDim =
                            utils_3.YGFloatMax(collectedFlexItemsValues.remainingFreeSpace, 0) /
                                (collectedFlexItemsValues.itemsOnLine - 1);
                    }
                    else {
                        betweenMainDim = 0;
                    }
                    break;
                case enums_4.YGJustify.SpaceEvenly:
                    betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
                        (collectedFlexItemsValues.itemsOnLine + 1);
                    leadingMainDim = betweenMainDim;
                    break;
                case enums_4.YGJustify.SpaceAround:
                    betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
                        collectedFlexItemsValues.itemsOnLine;
                    leadingMainDim = betweenMainDim / 2;
                    break;
                case enums_4.YGJustify.FlexStart:
                    break;
            }
        }
        var leadingPaddingAndBorderMain = utils_3.YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(mainAxis, ownerWidth));
        collectedFlexItemsValues.mainDim =
            leadingPaddingAndBorderMain + leadingMainDim;
        collectedFlexItemsValues.crossDim = 0;
        for (var i = startOfLineIndex; i < collectedFlexItemsValues.endOfLineIndex; i++) {
            var child = node.getChild(i);
            var childStyle = child.getStyle();
            var childLayout = child.getLayout();
            if (childStyle.display == enums_4.YGDisplay.None) {
                continue;
            }
            if (childStyle.positionType == enums_4.YGPositionType.Absolute &&
                child.isLeadingPositionDefined(mainAxis)) {
                if (performLayout) {
                    child.setLayoutPosition(utils_3.YGUnwrapFloatOptional(child.getLeadingPosition(mainAxis, availableInnerMainDim)) +
                        node.getLeadingBorder(mainAxis) +
                        utils_3.YGUnwrapFloatOptional(child.getLeadingMargin(mainAxis, availableInnerWidth)), internal_3.pos[mainAxis]);
                }
            }
            else {
                if (childStyle.positionType == enums_4.YGPositionType.Relative) {
                    if (child.marginLeadingValue(mainAxis).unit == enums_4.YGUnit.Auto) {
                        collectedFlexItemsValues.mainDim +=
                            collectedFlexItemsValues.remainingFreeSpace /
                                numberOfAutoMarginsOnCurrentLine;
                    }
                    if (performLayout) {
                        child.setLayoutPosition(childLayout.position[internal_3.pos[mainAxis]] +
                            collectedFlexItemsValues.mainDim, internal_3.pos[mainAxis]);
                    }
                    if (child.marginTrailingValue(mainAxis).unit == enums_4.YGUnit.Auto) {
                        collectedFlexItemsValues.mainDim +=
                            collectedFlexItemsValues.remainingFreeSpace /
                                numberOfAutoMarginsOnCurrentLine;
                    }
                    var canSkipFlex = !performLayout && measureModeCrossDim == enums_4.YGMeasureMode.Exactly;
                    if (canSkipFlex) {
                        collectedFlexItemsValues.mainDim += betweenMainDim +
                            utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth)) +
                            utils_3.YGUnwrapFloatOptional(childLayout.computedFlexBasis);
                        collectedFlexItemsValues.crossDim = availableInnerCrossDim;
                    }
                    else {
                        collectedFlexItemsValues.mainDim += betweenMainDim +
                            YGNodeDimWithMargin(child, mainAxis, availableInnerWidth);
                        collectedFlexItemsValues.crossDim = utils_3.YGFloatMax(collectedFlexItemsValues.crossDim, YGNodeDimWithMargin(child, crossAxis, availableInnerWidth));
                    }
                }
                else if (performLayout) {
                    child.setLayoutPosition(childLayout.position[internal_3.pos[mainAxis]] +
                        node.getLeadingBorder(mainAxis) + leadingMainDim, internal_3.pos[mainAxis]);
                }
            }
        }
        collectedFlexItemsValues.mainDim += utils_3.YGUnwrapFloatOptional(node.getTrailingPaddingAndBorder(mainAxis, ownerWidth));
    }
    exports.YGJustifyMainAxis = YGJustifyMainAxis;
    function YGNodelayoutImpl(node, availableWidth, availableHeight, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, performLayout, config) {
        // YGAssertWithNode(node,YGFloatIsUndefined(availableWidth) ? widthMeasureMode == YGMeasureMode.Undefined
        //         : true,
        //     "availableWidth is indefinite so widthMeasureMode must be "
        //                "YGMeasureMode.Undefined");
        // YGAssertWithNode(node,
        //     YGFloatIsUndefined(availableHeight) ? heightMeasureMode == YGMeasureMode.Undefined
        //         : true,
        //     "availableHeight is indefinite so heightMeasureMode must be "
        //                "YGMeasureMode.Undefined");
        var direction = node.resolveDirection(ownerDirection);
        node.setLayoutDirection(direction);
        var flexRowDirection = utils_3.YGResolveFlexDirection(enums_4.YGFlexDirection.Row, direction);
        var flexColumnDirection = utils_3.YGResolveFlexDirection(enums_4.YGFlexDirection.Column, direction);
        node.setLayoutMargin(utils_3.YGUnwrapFloatOptional(node.getLeadingMargin(flexRowDirection, ownerWidth)), enums_4.YGEdge.Start);
        node.setLayoutMargin(utils_3.YGUnwrapFloatOptional(node.getTrailingMargin(flexRowDirection, ownerWidth)), enums_4.YGEdge.End);
        node.setLayoutMargin(utils_3.YGUnwrapFloatOptional(node.getLeadingMargin(flexColumnDirection, ownerWidth)), enums_4.YGEdge.Top);
        node.setLayoutMargin(utils_3.YGUnwrapFloatOptional(node.getTrailingMargin(flexColumnDirection, ownerWidth)), enums_4.YGEdge.Bottom);
        node.setLayoutBorder(node.getLeadingBorder(flexRowDirection), enums_4.YGEdge.Start);
        node.setLayoutBorder(node.getTrailingBorder(flexRowDirection), enums_4.YGEdge.End);
        node.setLayoutBorder(node.getLeadingBorder(flexColumnDirection), enums_4.YGEdge.Top);
        node.setLayoutBorder(node.getTrailingBorder(flexColumnDirection), enums_4.YGEdge.Bottom);
        node.setLayoutPadding(utils_3.YGUnwrapFloatOptional(node.getLeadingPadding(flexRowDirection, ownerWidth)), enums_4.YGEdge.Start);
        node.setLayoutPadding(utils_3.YGUnwrapFloatOptional(node.getTrailingPadding(flexRowDirection, ownerWidth)), enums_4.YGEdge.End);
        node.setLayoutPadding(utils_3.YGUnwrapFloatOptional(node.getLeadingPadding(flexColumnDirection, ownerWidth)), enums_4.YGEdge.Top);
        node.setLayoutPadding(utils_3.YGUnwrapFloatOptional(node.getTrailingPadding(flexColumnDirection, ownerWidth)), enums_4.YGEdge.Bottom);
        if (node.getMeasure() != null) {
            YGNodeWithMeasureFuncSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight);
            return;
        }
        var childCount = YGNodeGetChildCount(node);
        if (childCount == 0) {
            YGNodeEmptyContainerSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight);
            return;
        }
        if (!performLayout && YGNodeFixedSizeSetMeasuredDimensions(node, availableWidth, availableHeight, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight)) {
            return;
        }
        node.cloneChildrenIfNeeded();
        node.setLayoutHadOverflow(false);
        var mainAxis = utils_3.YGResolveFlexDirection(node.getStyle().flexDirection, direction);
        var crossAxis = utils_3.YGFlexDirectionCross(mainAxis, direction);
        var isMainAxisRow = utils_3.YGFlexDirectionIsRow(mainAxis);
        var isNodeFlexWrap = node.getStyle().flexWrap != enums_4.YGWrap.NoWrap;
        var mainAxisownerSize = isMainAxisRow ? ownerWidth : ownerHeight;
        var crossAxisownerSize = isMainAxisRow ? ownerHeight : ownerWidth;
        var leadingPaddingAndBorderCross = utils_3.YGUnwrapFloatOptional(node.getLeadingPaddingAndBorder(crossAxis, ownerWidth));
        var paddingAndBorderAxisMain = YGNodePaddingAndBorderForAxis(node, mainAxis, ownerWidth);
        var paddingAndBorderAxisCross = YGNodePaddingAndBorderForAxis(node, crossAxis, ownerWidth);
        var measureModeMainDim = isMainAxisRow ? widthMeasureMode : heightMeasureMode;
        var measureModeCrossDim = isMainAxisRow ? heightMeasureMode : widthMeasureMode;
        var paddingAndBorderAxisRow = isMainAxisRow ? paddingAndBorderAxisMain : paddingAndBorderAxisCross;
        var paddingAndBorderAxisColumn = isMainAxisRow ? paddingAndBorderAxisCross : paddingAndBorderAxisMain;
        var marginAxisRow = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Row, ownerWidth));
        var marginAxisColumn = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Column, ownerWidth));
        var minInnerWidth = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getStyle().minDimensions[enums_4.YGDimension.Width], ownerWidth)) -
            paddingAndBorderAxisRow;
        var maxInnerWidth = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Width], ownerWidth)) -
            paddingAndBorderAxisRow;
        var minInnerHeight = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getStyle().minDimensions[enums_4.YGDimension.Height], ownerHeight)) -
            paddingAndBorderAxisColumn;
        var maxInnerHeight = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Height], ownerHeight)) -
            paddingAndBorderAxisColumn;
        var minInnerMainDim = isMainAxisRow ? minInnerWidth : minInnerHeight;
        var maxInnerMainDim = isMainAxisRow ? maxInnerWidth : maxInnerHeight;
        var availableInnerWidth = YGNodeCalculateAvailableInnerDim(node, enums_4.YGFlexDirection.Row, availableWidth, ownerWidth);
        var availableInnerHeight = YGNodeCalculateAvailableInnerDim(node, enums_4.YGFlexDirection.Column, availableHeight, ownerHeight);
        var availableInnerMainDim = isMainAxisRow ? availableInnerWidth : availableInnerHeight;
        var availableInnerCrossDim = isMainAxisRow ? availableInnerHeight : availableInnerWidth;
        var totalOuterFlexBasis = 0;
        YGNodeComputeFlexBasisForChildren(node, availableInnerWidth, availableInnerHeight, widthMeasureMode, heightMeasureMode, direction, mainAxis, config, performLayout, totalOuterFlexBasis);
        var flexBasisOverflows = measureModeMainDim == enums_4.YGMeasureMode.Undefined
            ? false
            : totalOuterFlexBasis > availableInnerMainDim;
        if (isNodeFlexWrap && flexBasisOverflows &&
            measureModeMainDim == enums_4.YGMeasureMode.AtMost) {
            measureModeMainDim = enums_4.YGMeasureMode.Exactly;
        }
        var startOfLineIndex = 0;
        var endOfLineIndex = 0;
        var lineCount = 0;
        var totalLineCrossDim = 0;
        var maxLineMainDim = 0;
        var collectedFlexItemsValues;
        for (; endOfLineIndex < childCount; lineCount++, startOfLineIndex = endOfLineIndex) {
            collectedFlexItemsValues = YGCalculateCollectFlexItemsRowValues(node, ownerDirection, mainAxisownerSize, availableInnerWidth, availableInnerMainDim, startOfLineIndex, lineCount);
            endOfLineIndex = collectedFlexItemsValues.endOfLineIndex;
            var canSkipFlex = !performLayout && measureModeCrossDim == enums_4.YGMeasureMode.Exactly;
            var sizeBasedOnContent = false;
            if (measureModeMainDim != enums_4.YGMeasureMode.Exactly) {
                if (!YGFloatIsUndefined(minInnerMainDim) &&
                    collectedFlexItemsValues.sizeConsumedOnCurrentLine <
                        minInnerMainDim) {
                    availableInnerMainDim = minInnerMainDim;
                }
                else if (!YGFloatIsUndefined(maxInnerMainDim) &&
                    collectedFlexItemsValues.sizeConsumedOnCurrentLine >
                        maxInnerMainDim) {
                    availableInnerMainDim = maxInnerMainDim;
                }
                else {
                    if (!node.getConfig().useLegacyStretchBehaviour &&
                        ((YGFloatIsUndefined(collectedFlexItemsValues.totalFlexGrowFactors) &&
                            collectedFlexItemsValues.totalFlexGrowFactors == 0) ||
                            (YGFloatIsUndefined(node.resolveFlexGrow()) &&
                                node.resolveFlexGrow() == 0))) {
                        availableInnerMainDim =
                            collectedFlexItemsValues.sizeConsumedOnCurrentLine;
                    }
                    if (node.getConfig().useLegacyStretchBehaviour) {
                        node.setLayoutDidUseLegacyFlag(true);
                    }
                    sizeBasedOnContent = !node.getConfig().useLegacyStretchBehaviour;
                }
            }
            if (!sizeBasedOnContent && !YGFloatIsUndefined(availableInnerMainDim)) {
                collectedFlexItemsValues.remainingFreeSpace = availableInnerMainDim -
                    collectedFlexItemsValues.sizeConsumedOnCurrentLine;
            }
            else if (collectedFlexItemsValues.sizeConsumedOnCurrentLine < 0) {
                collectedFlexItemsValues.remainingFreeSpace =
                    -collectedFlexItemsValues.sizeConsumedOnCurrentLine;
            }
            if (!canSkipFlex) {
                YGResolveFlexibleLength(node, collectedFlexItemsValues, mainAxis, crossAxis, mainAxisownerSize, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, availableInnerHeight, flexBasisOverflows, measureModeCrossDim, performLayout, config);
            }
            node.setLayoutHadOverflow(node.getLayout().hadOverflow ||
                (collectedFlexItemsValues.remainingFreeSpace < 0));
            YGJustifyMainAxis(node, collectedFlexItemsValues, startOfLineIndex, mainAxis, crossAxis, measureModeMainDim, measureModeCrossDim, mainAxisownerSize, ownerWidth, availableInnerMainDim, availableInnerCrossDim, availableInnerWidth, performLayout);
            var containerCrossAxis = availableInnerCrossDim;
            if (measureModeCrossDim == enums_4.YGMeasureMode.Undefined ||
                measureModeCrossDim == enums_4.YGMeasureMode.AtMost) {
                containerCrossAxis =
                    YGNodeBoundAxis(node, crossAxis, collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross, crossAxisownerSize, ownerWidth) -
                        paddingAndBorderAxisCross;
            }
            if (!isNodeFlexWrap && measureModeCrossDim == enums_4.YGMeasureMode.Exactly) {
                collectedFlexItemsValues.crossDim = availableInnerCrossDim;
            }
            collectedFlexItemsValues.crossDim =
                YGNodeBoundAxis(node, crossAxis, collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross, crossAxisownerSize, ownerWidth) -
                    paddingAndBorderAxisCross;
            if (performLayout) {
                for (var i = startOfLineIndex; i < endOfLineIndex; i++) {
                    var child = node.getChild(i);
                    if (child.getStyle().display == enums_4.YGDisplay.None) {
                        continue;
                    }
                    if (child.getStyle().positionType == enums_4.YGPositionType.Absolute) {
                        var isChildLeadingPosDefined = child.isLeadingPositionDefined(crossAxis);
                        if (isChildLeadingPosDefined) {
                            child.setLayoutPosition(utils_3.YGUnwrapFloatOptional(child.getLeadingPosition(crossAxis, availableInnerCrossDim)) +
                                node.getLeadingBorder(crossAxis) +
                                utils_3.YGUnwrapFloatOptional(child.getLeadingMargin(crossAxis, availableInnerWidth)), internal_3.pos[crossAxis]);
                        }
                        if (!isChildLeadingPosDefined ||
                            YGFloatIsUndefined(child.getLayout().position[internal_3.pos[crossAxis]])) {
                            child.setLayoutPosition(node.getLeadingBorder(crossAxis) +
                                utils_3.YGUnwrapFloatOptional(child.getLeadingMargin(crossAxis, availableInnerWidth)), internal_3.pos[crossAxis]);
                        }
                    }
                    else {
                        var leadingCrossDim = leadingPaddingAndBorderCross;
                        var alignItem = YGNodeAlignItem(node, child);
                        if (alignItem == enums_4.YGAlign.Stretch &&
                            child.marginLeadingValue(crossAxis).unit != enums_4.YGUnit.Auto &&
                            child.marginTrailingValue(crossAxis).unit != enums_4.YGUnit.Auto) {
                            if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
                                var childMainSize = child.getLayout().measuredDimensions[dim[mainAxis]];
                                var childCrossSize = !child.getStyle().aspectRatio.isUndefined()
                                    ? ((utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(crossAxis, availableInnerWidth)) +
                                        (isMainAxisRow ? childMainSize /
                                            child.getStyle().aspectRatio.getValue()
                                            : childMainSize *
                                                child.getStyle().aspectRatio.getValue())))
                                    : collectedFlexItemsValues.crossDim;
                                childMainSize += utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth));
                                var childMainMeasureMode = enums_4.YGMeasureMode.Exactly;
                                var childCrossMeasureMode = enums_4.YGMeasureMode.Exactly;
                                var childMainMeasureModeRef = { value: childMainMeasureMode };
                                var childMainSizeRef = { value: childMainSize };
                                var childCrossMeasureModeRef = { value: childCrossMeasureMode };
                                var childCrossSizeRef = { value: childCrossSize };
                                YGConstrainMaxSizeForMode(child, mainAxis, availableInnerMainDim, availableInnerWidth, childMainMeasureModeRef, childMainSizeRef);
                                YGConstrainMaxSizeForMode(child, crossAxis, availableInnerCrossDim, availableInnerWidth, childCrossMeasureModeRef, childCrossSizeRef);
                                childMainMeasureMode = childMainMeasureModeRef.value;
                                childMainSize = childMainSizeRef.value;
                                childCrossMeasureMode = childCrossMeasureModeRef.value;
                                childCrossSize = childCrossSizeRef.value;
                                var childWidth = isMainAxisRow ? childMainSize : childCrossSize;
                                var childHeight = !isMainAxisRow ? childMainSize : childCrossSize;
                                var childWidthMeasureMode = YGFloatIsUndefined(childWidth) ? enums_4.YGMeasureMode.Undefined
                                    : enums_4.YGMeasureMode.Exactly;
                                var childHeightMeasureMode = YGFloatIsUndefined(childHeight) ? enums_4.YGMeasureMode.Undefined
                                    : enums_4.YGMeasureMode.Exactly;
                                YGLayoutNodeInternal(child, childWidth, childHeight, direction, childWidthMeasureMode, childHeightMeasureMode, availableInnerWidth, availableInnerHeight, true, "stretch", config);
                            }
                        }
                        else {
                            var remainingCrossDim = containerCrossAxis -
                                YGNodeDimWithMargin(child, crossAxis, availableInnerWidth);
                            if (child.marginLeadingValue(crossAxis).unit == enums_4.YGUnit.Auto &&
                                child.marginTrailingValue(crossAxis).unit == enums_4.YGUnit.Auto) {
                                leadingCrossDim += utils_3.YGFloatMax(0.0, remainingCrossDim / 2);
                            }
                            else if (child.marginTrailingValue(crossAxis).unit == enums_4.YGUnit.Auto) {
                            }
                            else if (child.marginLeadingValue(crossAxis).unit == enums_4.YGUnit.Auto) {
                                leadingCrossDim += utils_3.YGFloatMax(0.0, remainingCrossDim);
                            }
                            else if (alignItem == enums_4.YGAlign.FlexStart) {
                                // NO=OP
                            }
                            else if (alignItem == enums_4.YGAlign.Center) {
                                leadingCrossDim += remainingCrossDim / 2;
                            }
                            else {
                                leadingCrossDim += remainingCrossDim;
                            }
                        }
                        child.setLayoutPosition(child.getLayout().position[internal_3.pos[crossAxis]] + totalLineCrossDim +
                            leadingCrossDim, internal_3.pos[crossAxis]);
                    }
                }
            }
            totalLineCrossDim += collectedFlexItemsValues.crossDim;
            maxLineMainDim = utils_3.YGFloatMax(maxLineMainDim, collectedFlexItemsValues.mainDim);
        }
        if (performLayout && (lineCount > 1 || YGIsBaselineLayout(node)) &&
            !YGFloatIsUndefined(availableInnerCrossDim)) {
            var remainingAlignContentDim = availableInnerCrossDim - totalLineCrossDim;
            var crossDimLead = 0;
            var currentLead = leadingPaddingAndBorderCross;
            switch (node.getStyle().alignContent) {
                case enums_4.YGAlign.FlexEnd:
                    currentLead += remainingAlignContentDim;
                    break;
                case enums_4.YGAlign.Center:
                    currentLead += remainingAlignContentDim / 2;
                    break;
                case enums_4.YGAlign.Stretch:
                    if (availableInnerCrossDim > totalLineCrossDim) {
                        crossDimLead = remainingAlignContentDim / lineCount;
                    }
                    break;
                case enums_4.YGAlign.SpaceAround:
                    if (availableInnerCrossDim > totalLineCrossDim) {
                        currentLead += remainingAlignContentDim / (2 * lineCount);
                        if (lineCount > 1) {
                            crossDimLead = remainingAlignContentDim / lineCount;
                        }
                    }
                    else {
                        currentLead += remainingAlignContentDim / 2;
                    }
                    break;
                case enums_4.YGAlign.SpaceBetween:
                    if (availableInnerCrossDim > totalLineCrossDim && lineCount > 1) {
                        crossDimLead = remainingAlignContentDim / (lineCount - 1);
                    }
                    break;
                case enums_4.YGAlign.Auto:
                case enums_4.YGAlign.FlexStart:
                case enums_4.YGAlign.Baseline:
                    break;
            }
            var endIndex = 0;
            for (var i = 0; i < lineCount; i++) {
                var startIndex = endIndex;
                var ii = void 0;
                var lineHeight = 0;
                var maxAscentForCurrentLine = 0;
                var maxDescentForCurrentLine = 0;
                for (ii = startIndex; ii < childCount; ii++) {
                    var child = node.getChild(ii);
                    if (child.getStyle().display == enums_4.YGDisplay.None) {
                        continue;
                    }
                    if (child.getStyle().positionType == enums_4.YGPositionType.Relative) {
                        if (child.getLineIndex() != i) {
                            break;
                        }
                        if (YGNodeIsLayoutDimDefined(child, crossAxis)) {
                            lineHeight = utils_3.YGFloatMax(lineHeight, child.getLayout().measuredDimensions[dim[crossAxis]] +
                                utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(crossAxis, availableInnerWidth)));
                        }
                        if (YGNodeAlignItem(node, child) == enums_4.YGAlign.Baseline) {
                            var ascent = YGBaseline(child) +
                                utils_3.YGUnwrapFloatOptional(child.getLeadingMargin(enums_4.YGFlexDirection.Column, availableInnerWidth));
                            var descent = child.getLayout().measuredDimensions[enums_4.YGDimension.Height] +
                                utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(enums_4.YGFlexDirection.Column, availableInnerWidth)) -
                                ascent;
                            maxAscentForCurrentLine =
                                utils_3.YGFloatMax(maxAscentForCurrentLine, ascent);
                            maxDescentForCurrentLine =
                                utils_3.YGFloatMax(maxDescentForCurrentLine, descent);
                            lineHeight = utils_3.YGFloatMax(lineHeight, maxAscentForCurrentLine + maxDescentForCurrentLine);
                        }
                    }
                }
                endIndex = ii;
                lineHeight += crossDimLead;
                if (performLayout) {
                    for (ii = startIndex; ii < endIndex; ii++) {
                        var child = node.getChild(ii);
                        if (child.getStyle().display == enums_4.YGDisplay.None) {
                            continue;
                        }
                        if (child.getStyle().positionType == enums_4.YGPositionType.Relative) {
                            switch (YGNodeAlignItem(node, child)) {
                                case enums_4.YGAlign.FlexStart: {
                                    child.setLayoutPosition(currentLead +
                                        utils_3.YGUnwrapFloatOptional(child.getLeadingMargin(crossAxis, availableInnerWidth)), internal_3.pos[crossAxis]);
                                    break;
                                }
                                case enums_4.YGAlign.FlexEnd: {
                                    child.setLayoutPosition(currentLead + lineHeight -
                                        utils_3.YGUnwrapFloatOptional(child.getTrailingMargin(crossAxis, availableInnerWidth)) -
                                        child.getLayout().measuredDimensions[dim[crossAxis]], internal_3.pos[crossAxis]);
                                    break;
                                }
                                case enums_4.YGAlign.Center: {
                                    var childHeight = child.getLayout().measuredDimensions[dim[crossAxis]];
                                    child.setLayoutPosition(currentLead + (lineHeight - childHeight) / 2, internal_3.pos[crossAxis]);
                                    break;
                                }
                                case enums_4.YGAlign.Stretch: {
                                    child.setLayoutPosition(currentLead +
                                        utils_3.YGUnwrapFloatOptional(child.getLeadingMargin(crossAxis, availableInnerWidth)), internal_3.pos[crossAxis]);
                                    if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
                                        var childWidth = isMainAxisRow
                                            ? (child.getLayout()
                                                .measuredDimensions[enums_4.YGDimension.Width] +
                                                utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(mainAxis, availableInnerWidth)))
                                            : lineHeight;
                                        var childHeight = !isMainAxisRow
                                            ? (child.getLayout()
                                                .measuredDimensions[enums_4.YGDimension.Height] +
                                                utils_3.YGUnwrapFloatOptional(child.getMarginForAxis(crossAxis, availableInnerWidth)))
                                            : lineHeight;
                                        if (!(utils_3.YGFloatsEqual(childWidth, child.getLayout()
                                            .measuredDimensions[enums_4.YGDimension.Width]) &&
                                            utils_3.YGFloatsEqual(childHeight, child.getLayout()
                                                .measuredDimensions[enums_4.YGDimension.Height]))) {
                                            YGLayoutNodeInternal(child, childWidth, childHeight, direction, enums_4.YGMeasureMode.Exactly, enums_4.YGMeasureMode.Exactly, availableInnerWidth, availableInnerHeight, true, "multiline-stretch", config);
                                        }
                                    }
                                    break;
                                }
                                case enums_4.YGAlign.Baseline: {
                                    child.setLayoutPosition(currentLead + maxAscentForCurrentLine - YGBaseline(child) +
                                        utils_3.YGUnwrapFloatOptional(child.getLeadingPosition(enums_4.YGFlexDirection.Column, availableInnerCrossDim)), enums_4.YGEdge.Top);
                                    break;
                                }
                                case enums_4.YGAlign.Auto:
                                case enums_4.YGAlign.SpaceBetween:
                                case enums_4.YGAlign.SpaceAround:
                                    break;
                            }
                        }
                    }
                }
                currentLead += lineHeight;
            }
        }
        node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Row, availableWidth - marginAxisRow, ownerWidth, ownerWidth), enums_4.YGDimension.Width);
        node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, enums_4.YGFlexDirection.Column, availableHeight - marginAxisColumn, ownerHeight, ownerWidth), enums_4.YGDimension.Height);
        if (measureModeMainDim == enums_4.YGMeasureMode.Undefined ||
            (node.getStyle().overflow != enums_4.YGOverflow.Scroll &&
                measureModeMainDim == enums_4.YGMeasureMode.AtMost)) {
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, mainAxis, maxLineMainDim, mainAxisownerSize, ownerWidth), dim[mainAxis]);
        }
        else if (measureModeMainDim == enums_4.YGMeasureMode.AtMost &&
            node.getStyle().overflow == enums_4.YGOverflow.Scroll) {
            node.setLayoutMeasuredDimension(utils_3.YGFloatMax(utils_3.YGFloatMin(availableInnerMainDim + paddingAndBorderAxisMain, utils_3.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(node, mainAxis, maxLineMainDim, mainAxisownerSize))), paddingAndBorderAxisMain), dim[mainAxis]);
        }
        if (measureModeCrossDim == enums_4.YGMeasureMode.Undefined ||
            (node.getStyle().overflow != enums_4.YGOverflow.Scroll &&
                measureModeCrossDim == enums_4.YGMeasureMode.AtMost)) {
            node.setLayoutMeasuredDimension(YGNodeBoundAxis(node, crossAxis, totalLineCrossDim + paddingAndBorderAxisCross, crossAxisownerSize, ownerWidth), dim[crossAxis]);
        }
        else if (measureModeCrossDim == enums_4.YGMeasureMode.AtMost &&
            node.getStyle().overflow == enums_4.YGOverflow.Scroll) {
            node.setLayoutMeasuredDimension(utils_3.YGFloatMax(utils_3.YGFloatMin(availableInnerCrossDim + paddingAndBorderAxisCross, utils_3.YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(node, crossAxis, totalLineCrossDim + paddingAndBorderAxisCross, crossAxisownerSize))), paddingAndBorderAxisCross), dim[crossAxis]);
        }
        if (performLayout && node.getStyle().flexWrap == enums_4.YGWrap.WrapReverse) {
            for (var i = 0; i < childCount; i++) {
                var child = YGNodeGetChild(node, i);
                if (child.getStyle().positionType == enums_4.YGPositionType.Relative) {
                    child.setLayoutPosition(node.getLayout().measuredDimensions[dim[crossAxis]] -
                        child.getLayout().position[internal_3.pos[crossAxis]] -
                        child.getLayout().measuredDimensions[dim[crossAxis]], internal_3.pos[crossAxis]);
                }
            }
        }
        if (performLayout) {
            var children = node.getChildren();
            for (var i = 0; i < children.length; ++i) {
                var child = children[i];
                if (child.getStyle().positionType != enums_4.YGPositionType.Absolute) {
                    continue;
                }
                YGNodeAbsoluteLayoutChild(node, child, availableInnerWidth, isMainAxisRow ? measureModeMainDim : measureModeCrossDim, availableInnerHeight, direction, config);
            }
            var needsMainTrailingPos = mainAxis == enums_4.YGFlexDirection.RowReverse || mainAxis == enums_4.YGFlexDirection.ColumnReverse;
            var needsCrossTrailingPos = crossAxis == enums_4.YGFlexDirection.RowReverse || crossAxis == enums_4.YGFlexDirection.ColumnReverse;
            if (needsMainTrailingPos || needsCrossTrailingPos) {
                for (var i = 0; i < childCount; i++) {
                    var child = node.getChild(i);
                    if (child.getStyle().display == enums_4.YGDisplay.None) {
                        continue;
                    }
                    if (needsMainTrailingPos) {
                        YGNodeSetChildTrailingPosition(node, child, mainAxis);
                    }
                    if (needsCrossTrailingPos) {
                        YGNodeSetChildTrailingPosition(node, child, crossAxis);
                    }
                }
            }
        }
    }
    exports.YGNodelayoutImpl = YGNodelayoutImpl;
    var gDepth = 0;
    var gPrintTree = false;
    var gPrintChanges = false;
    var gPrintSkips = false;
    var spacer = "                                                            ";
    function YGSpacer(level) {
        var spacerLen = spacer.length;
        if (level > spacerLen) {
            return spacer;
        }
        else {
            return spacer.substr(spacerLen - level);
        }
    }
    exports.YGSpacer = YGSpacer;
    function YGMeasureModeName(mode, performLayout) {
        var kMeasureModeNames = ["UNDEFINED", "EXACTLY", "AT_MOST"];
        var kLayoutModeNames = ["LAY_UNDEFINED", "LAY_EXACTLY", "LAY_AT_", "MOST"];
        if (mode >= enums_4.YGMeasureModeCount) {
            return "";
        }
        return performLayout ? kLayoutModeNames[mode] : kMeasureModeNames[mode];
    }
    exports.YGMeasureModeName = YGMeasureModeName;
    function YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(sizeMode, size, lastComputedSize) {
        return sizeMode == enums_4.YGMeasureMode.Exactly && utils_3.YGFloatsEqual(size, lastComputedSize);
    }
    exports.YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize = YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize;
    function YGMeasureModeOldSizeIsUnspecifiedAndStillFits(sizeMode, size, lastSizeMode, lastComputedSize) {
        return sizeMode == enums_4.YGMeasureMode.AtMost && lastSizeMode == enums_4.YGMeasureMode.Undefined &&
            (size >= lastComputedSize || utils_3.YGFloatsEqual(size, lastComputedSize));
    }
    exports.YGMeasureModeOldSizeIsUnspecifiedAndStillFits = YGMeasureModeOldSizeIsUnspecifiedAndStillFits;
    function YGMeasureModeNewMeasureSizeIsStricterAndStillValid(sizeMode, size, lastSizeMode, lastSize, lastComputedSize) {
        return lastSizeMode == enums_4.YGMeasureMode.AtMost &&
            sizeMode == enums_4.YGMeasureMode.AtMost && !YGFloatIsUndefined(lastSize) &&
            !YGFloatIsUndefined(size) && !YGFloatIsUndefined(lastComputedSize) &&
            lastSize > size &&
            (lastComputedSize <= size || utils_3.YGFloatsEqual(size, lastComputedSize));
    }
    exports.YGMeasureModeNewMeasureSizeIsStricterAndStillValid = YGMeasureModeNewMeasureSizeIsStricterAndStillValid;
    function YGRoundValueToPixelGrid(value, pointScaleFactor, forceCeil, forceFloor) {
        var scaledValue = value * pointScaleFactor;
        var fractial = scaledValue % 1.0;
        if (utils_3.YGFloatsEqual(fractial, 0)) {
            scaledValue = scaledValue - fractial;
        }
        else if (utils_3.YGFloatsEqual(fractial, 1.0)) {
            scaledValue = scaledValue - fractial + 1.0;
        }
        else if (forceCeil) {
            scaledValue = scaledValue - fractial + 1.0;
        }
        else if (forceFloor) {
            scaledValue = scaledValue - fractial;
        }
        else {
            scaledValue = scaledValue - fractial +
                (!YGFloatIsUndefined(fractial) &&
                    (fractial > 0.5 || utils_3.YGFloatsEqual(fractial, 0.5))
                    ? 1.0
                    : 0.0);
        }
        return (YGFloatIsUndefined(scaledValue) ||
            YGFloatIsUndefined(pointScaleFactor))
            ? internal_3.YGUndefined
            : scaledValue / pointScaleFactor;
    }
    exports.YGRoundValueToPixelGrid = YGRoundValueToPixelGrid;
    function YGNodeCanUseCachedMeasurement(widthMode, width, heightMode, height, lastWidthMode, lastWidth, lastHeightMode, lastHeight, lastComputedWidth, lastComputedHeight, marginRow, marginColumn, config) {
        if ((!YGFloatIsUndefined(lastComputedHeight) && lastComputedHeight < 0) ||
            (!YGFloatIsUndefined(lastComputedWidth) && lastComputedWidth < 0)) {
            return false;
        }
        var useRoundedComparison = config != null && config.pointScaleFactor != 0;
        var effectiveWidth = useRoundedComparison ? YGRoundValueToPixelGrid(width, config.pointScaleFactor, false, false)
            : width;
        var effectiveHeight = useRoundedComparison ? YGRoundValueToPixelGrid(height, config.pointScaleFactor, false, false)
            : height;
        var effectiveLastWidth = useRoundedComparison
            ? YGRoundValueToPixelGrid(lastWidth, config.pointScaleFactor, false, false)
            : lastWidth;
        var effectiveLastHeight = useRoundedComparison
            ? YGRoundValueToPixelGrid(lastHeight, config.pointScaleFactor, false, false)
            : lastHeight;
        var hasSameWidthSpec = lastWidthMode == widthMode && utils_3.YGFloatsEqual(effectiveLastWidth, effectiveWidth);
        var hasSameHeightSpec = lastHeightMode == heightMode && utils_3.YGFloatsEqual(effectiveLastHeight, effectiveHeight);
        var widthIsCompatible = hasSameWidthSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(widthMode, width - marginRow, lastComputedWidth) ||
            YGMeasureModeOldSizeIsUnspecifiedAndStillFits(widthMode, width - marginRow, lastWidthMode, lastComputedWidth) ||
            YGMeasureModeNewMeasureSizeIsStricterAndStillValid(widthMode, width - marginRow, lastWidthMode, lastWidth, lastComputedWidth);
        var heightIsCompatible = hasSameHeightSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(heightMode, height - marginColumn, lastComputedHeight) ||
            YGMeasureModeOldSizeIsUnspecifiedAndStillFits(heightMode, height - marginColumn, lastHeightMode, lastComputedHeight) ||
            YGMeasureModeNewMeasureSizeIsStricterAndStillValid(heightMode, height - marginColumn, lastHeightMode, lastHeight, lastComputedHeight);
        return widthIsCompatible && heightIsCompatible;
    }
    exports.YGNodeCanUseCachedMeasurement = YGNodeCanUseCachedMeasurement;
    function YGLayoutNodeInternal(node, availableWidth, availableHeight, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, performLayout, reason, config) {
        var layout = node.getLayout();
        gDepth++;
        var needToVisitNode = (node.isDirty() && layout.generationCount != gCurrentGenerationCount) ||
            layout.lastOwnerDirection != ownerDirection;
        if (needToVisitNode) {
            layout.nextCachedMeasurementsIndex = 0;
            layout.cachedLayout.widthMeasureMode = (enums_4.YGMeasureModeCount) - 1;
            layout.cachedLayout.heightMeasureMode = (enums_4.YGMeasureModeCount) - 1;
            layout.cachedLayout.computedWidth = -1;
            layout.cachedLayout.computedHeight = -1;
        }
        var cachedResults = null;
        if (node.getMeasure() != null) {
            var marginAxisRow = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Row, ownerWidth));
            var marginAxisColumn = utils_3.YGUnwrapFloatOptional(node.getMarginForAxis(enums_4.YGFlexDirection.Column, ownerWidth));
            if (YGNodeCanUseCachedMeasurement(widthMeasureMode, availableWidth, heightMeasureMode, availableHeight, layout.cachedLayout.widthMeasureMode, layout.cachedLayout.availableWidth, layout.cachedLayout.heightMeasureMode, layout.cachedLayout.availableHeight, layout.cachedLayout.computedWidth, layout.cachedLayout.computedHeight, marginAxisRow, marginAxisColumn, config)) {
                cachedResults = layout.cachedLayout;
            }
            else {
                for (var i = 0; i < layout.nextCachedMeasurementsIndex; i++) {
                    if (YGNodeCanUseCachedMeasurement(widthMeasureMode, availableWidth, heightMeasureMode, availableHeight, layout.cachedMeasurements[i].widthMeasureMode, layout.cachedMeasurements[i].availableWidth, layout.cachedMeasurements[i].heightMeasureMode, layout.cachedMeasurements[i].availableHeight, layout.cachedMeasurements[i].computedWidth, layout.cachedMeasurements[i].computedHeight, marginAxisRow, marginAxisColumn, config)) {
                        cachedResults = layout.cachedMeasurements[i];
                        break;
                    }
                }
            }
        }
        else if (performLayout) {
            if (utils_3.YGFloatsEqual(layout.cachedLayout.availableWidth, availableWidth) &&
                utils_3.YGFloatsEqual(layout.cachedLayout.availableHeight, availableHeight) &&
                layout.cachedLayout.widthMeasureMode == widthMeasureMode &&
                layout.cachedLayout.heightMeasureMode == heightMeasureMode) {
                cachedResults = layout.cachedLayout;
            }
        }
        else {
            for (var i = 0; i < layout.nextCachedMeasurementsIndex; i++) {
                if (utils_3.YGFloatsEqual(layout.cachedMeasurements[i].availableWidth, availableWidth) &&
                    utils_3.YGFloatsEqual(layout.cachedMeasurements[i].availableHeight, availableHeight) &&
                    layout.cachedMeasurements[i].widthMeasureMode == widthMeasureMode &&
                    layout.cachedMeasurements[i].heightMeasureMode == heightMeasureMode) {
                    cachedResults = layout.cachedMeasurements[i];
                    break;
                }
            }
        }
        if (!needToVisitNode && cachedResults != null) {
            layout.measuredDimensions[enums_4.YGDimension.Width] = cachedResults.computedWidth;
            layout.measuredDimensions[enums_4.YGDimension.Height] = cachedResults.computedHeight;
            if (gPrintChanges && gPrintSkips) {
                // YGLog(node, YGLogLevel.Verbose, "%s%d.{[skipped] ", YGSpacer(gDepth), gDepth);
                // if (node.getPrintFunc() != null) {
                //     node.getPrintFunc()(node);
                // }
                //   YGLog(
                //       node,
                //       YGLogLevel.Verbose,
                //       "wm: %s, hm: %s, aw: %f ah: %f => d: (%f, %f) %s\n",
                //       YGMeasureModeName(widthMeasureMode, performLayout),
                //       YGMeasureModeName(heightMeasureMode, performLayout),
                //       availableWidth,
                //       availableHeight,
                //       cachedResults.computedWidth,
                //       cachedResults.computedHeight,
                //       reason);
            }
        }
        else {
            if (gPrintChanges) {
                // YGLog(
                //     node,
                //     YGLogLevelVerbose,
                //     "%s%d.{%s",
                //     YGSpacer(gDepth),
                //     gDepth,
                //     needToVisitNode ? "*" : "");
                // if (node.getPrintFunc() != null) {
                //     node.getPrintFunc()(node);
                // }
                // YGLog(
                //     node,
                //     YGLogLevelVerbose,
                //     "wm: %s, hm: %s, aw: %f ah: %f %s\n",
                //     YGMeasureModeName(widthMeasureMode, performLayout),
                //     YGMeasureModeName(heightMeasureMode, performLayout),
                //     availableWidth,
                //     availableHeight,
                //     reason);
            }
            YGNodelayoutImpl(node, availableWidth, availableHeight, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, performLayout, config);
            if (gPrintChanges) {
                // YGLog(
                //     node,
                //     YGLogLevelVerbose,
                //     "%s%d.}%s",
                //     YGSpacer(gDepth),
                //     gDepth,
                //     needToVisitNode ? "*" : "");
                // if (node.getPrintFunc() != null) {
                //     node.getPrintFunc()(node);
                // }
                // YGLog(
                //     node,
                //     YGLogLevelVerbose,
                //     "wm: %s, hm: %s, d: (%f, %f) %s\n",
                //     YGMeasureModeName(widthMeasureMode, performLayout),
                //     YGMeasureModeName(heightMeasureMode, performLayout),
                //     layout.measuredDimensions[YGDimension.Width],
                //     layout.measuredDimensions[YGDimension.Height],
                //     reason);
            }
            layout.lastOwnerDirection = ownerDirection;
            if (cachedResults == null) {
                if (layout.nextCachedMeasurementsIndex == internal_3.YG_MAX_CACHED_RESULT_COUNT) {
                    if (gPrintChanges) {
                        // YGLog(node, YGLogLevelVerbose, "Out of cache entries!\n");
                    }
                    layout.nextCachedMeasurementsIndex = 0;
                }
                var newCacheEntry = void 0;
                if (performLayout) {
                    newCacheEntry = layout.cachedLayout;
                }
                else {
                    newCacheEntry = layout.cachedMeasurements[layout.nextCachedMeasurementsIndex];
                    layout.nextCachedMeasurementsIndex++;
                }
                newCacheEntry.availableWidth = availableWidth;
                newCacheEntry.availableHeight = availableHeight;
                newCacheEntry.widthMeasureMode = widthMeasureMode;
                newCacheEntry.heightMeasureMode = heightMeasureMode;
                newCacheEntry.computedWidth = layout.measuredDimensions[enums_4.YGDimension.Width];
                newCacheEntry.computedHeight = layout.measuredDimensions[enums_4.YGDimension.Height];
            }
        }
        if (performLayout) {
            node.setLayoutDimension(node.getLayout().measuredDimensions[enums_4.YGDimension.Width], enums_4.YGDimension.Width);
            node.setLayoutDimension(node.getLayout().measuredDimensions[enums_4.YGDimension.Height], enums_4.YGDimension.Height);
            node.setHasNewLayout(true);
            node.setDirty(false);
        }
        gDepth--;
        layout.generationCount = gCurrentGenerationCount;
        return (needToVisitNode || cachedResults == null);
    }
    exports.YGLayoutNodeInternal = YGLayoutNodeInternal;
    function YGConfigSetPointScaleFactor(config, pixelsInPoint) {
        //YGAssertWithConfig(config, pixelsInPoint >= 0.0, "Scale factor should not be less than zero");
        if (pixelsInPoint == 0.0) {
            config.pointScaleFactor = 0.0;
        }
        else {
            config.pointScaleFactor = pixelsInPoint;
        }
    }
    exports.YGConfigSetPointScaleFactor = YGConfigSetPointScaleFactor;
    function fmodf(x, y) {
        return x % y;
    }
    function YGRoundToPixelGrid(node, pointScaleFactor, absoluteLeft, absoluteTop) {
        if (pointScaleFactor == 0.0) {
            return;
        }
        var nodeLeft = node.getLayout().position[enums_4.YGEdge.Left];
        var nodeTop = node.getLayout().position[enums_4.YGEdge.Top];
        var nodeWidth = node.getLayout().dimensions[enums_4.YGDimension.Width];
        var nodeHeight = node.getLayout().dimensions[enums_4.YGDimension.Height];
        var absoluteNodeLeft = absoluteLeft + nodeLeft;
        var absoluteNodeTop = absoluteTop + nodeTop;
        var absoluteNodeRight = absoluteNodeLeft + nodeWidth;
        var absoluteNodeBottom = absoluteNodeTop + nodeHeight;
        var textRounding = node.getNodeType() == enums_4.YGNodeType.Text;
        node.setLayoutPosition(YGRoundValueToPixelGrid(nodeLeft, pointScaleFactor, false, textRounding), enums_4.YGEdge.Left);
        node.setLayoutPosition(YGRoundValueToPixelGrid(nodeTop, pointScaleFactor, false, textRounding), enums_4.YGEdge.Top);
        var hasFractionalWidth = !utils_3.YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 0) &&
            !utils_3.YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 1.0);
        var hasFractionalHeight = !utils_3.YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 0) &&
            !utils_3.YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 1.0);
        node.setLayoutDimension(YGRoundValueToPixelGrid(absoluteNodeRight, pointScaleFactor, (textRounding && hasFractionalWidth), (textRounding && !hasFractionalWidth)) -
            YGRoundValueToPixelGrid(absoluteNodeLeft, pointScaleFactor, false, textRounding), enums_4.YGDimension.Width);
        node.setLayoutDimension(YGRoundValueToPixelGrid(absoluteNodeBottom, pointScaleFactor, (textRounding && hasFractionalHeight), (textRounding && !hasFractionalHeight)) -
            YGRoundValueToPixelGrid(absoluteNodeTop, pointScaleFactor, false, textRounding), enums_4.YGDimension.Height);
        var childCount = YGNodeGetChildCount(node);
        for (var i = 0; i < childCount; i++) {
            YGRoundToPixelGrid(YGNodeGetChild(node, i), pointScaleFactor, absoluteNodeLeft, absoluteNodeTop);
        }
    }
    exports.YGRoundToPixelGrid = YGRoundToPixelGrid;
    function YGNodeCalculateLayout(node, ownerWidth, ownerHeight, ownerDirection) {
        gCurrentGenerationCount++;
        node.resolveDimension();
        var width = internal_3.YGUndefined;
        var widthMeasureMode = enums_4.YGMeasureMode.Undefined;
        if (YGNodeIsStyleDimDefined(node, enums_4.YGFlexDirection.Row, ownerWidth)) {
            width = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getResolvedDimension(dim[enums_4.YGFlexDirection.Row]), ownerWidth).add(node.getMarginForAxis(enums_4.YGFlexDirection.Row, ownerWidth)));
            widthMeasureMode = enums_4.YGMeasureMode.Exactly;
        }
        else if (!utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Width], ownerWidth)
            .isUndefined()) {
            width = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Width], ownerWidth));
            widthMeasureMode = enums_4.YGMeasureMode.AtMost;
        }
        else {
            width = ownerWidth;
            widthMeasureMode = YGFloatIsUndefined(width) ? enums_4.YGMeasureMode.Undefined
                : enums_4.YGMeasureMode.Exactly;
        }
        var height = internal_3.YGUndefined;
        var heightMeasureMode = enums_4.YGMeasureMode.Undefined;
        if (YGNodeIsStyleDimDefined(node, enums_4.YGFlexDirection.Column, ownerHeight)) {
            height = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getResolvedDimension(dim[enums_4.YGFlexDirection.Column]), ownerHeight).add(node.getMarginForAxis(enums_4.YGFlexDirection.Column, ownerWidth)));
            heightMeasureMode = enums_4.YGMeasureMode.Exactly;
        }
        else if (!utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Height], ownerHeight)
            .isUndefined()) {
            height = utils_3.YGUnwrapFloatOptional(utils_3.YGResolveValue(node.getStyle().maxDimensions[enums_4.YGDimension.Height], ownerHeight));
            heightMeasureMode = enums_4.YGMeasureMode.AtMost;
        }
        else {
            height = ownerHeight;
            heightMeasureMode = YGFloatIsUndefined(height) ? enums_4.YGMeasureMode.Undefined
                : enums_4.YGMeasureMode.Exactly;
        }
        if (YGLayoutNodeInternal(node, width, height, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, true, "initial", node.getConfig())) {
            node.setPosition(node.getLayout().direction, ownerWidth, ownerHeight, ownerWidth);
            YGRoundToPixelGrid(node, node.getConfig().pointScaleFactor, 0.0, 0.0);
            if (gPrintTree) {
                YGNodePrint(node, enums_4.YGPrintOptions.Layout | enums_4.YGPrintOptions.Children | enums_4.YGPrintOptions.Style);
            }
        }
        if (node.getConfig().shouldDiffLayoutWithoutLegacyStretchBehaviour &&
            node.didUseLegacyFlag()) {
            var originalNode = YGNodeDeepClone(node);
            originalNode.resolveDimension();
            originalNode.markDirtyAndPropogateDownwards();
            gCurrentGenerationCount++;
            originalNode.setAndPropogateUseLegacyFlag(false);
            if (YGLayoutNodeInternal(originalNode, width, height, ownerDirection, widthMeasureMode, heightMeasureMode, ownerWidth, ownerHeight, true, "initial", originalNode.getConfig())) {
                originalNode.setPosition(originalNode.getLayout().direction, ownerWidth, ownerHeight, ownerWidth);
                YGRoundToPixelGrid(originalNode, originalNode.getConfig().pointScaleFactor, 0.0, 0.0);
                node.setLayoutDoesLegacyFlagAffectsLayout(!originalNode.isLayoutTreeEqualToNode(node));
                if (gPrintTree) {
                    YGNodePrint(originalNode, enums_4.YGPrintOptions.Layout | enums_4.YGPrintOptions.Children | enums_4.YGPrintOptions.Style);
                }
            }
            YGConfigFreeRecursive(originalNode);
            YGNodeFreeRecursive(originalNode);
        }
    }
    exports.YGNodeCalculateLayout = YGNodeCalculateLayout;
    function YGConfigSetLogger(config, logger) {
        if (logger != null) {
            config.logger = logger;
        }
        else {
            config.logger = YGDefaultLog;
        }
    }
    exports.YGConfigSetLogger = YGConfigSetLogger;
    function YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour(config, shouldDiffLayout) {
        config.shouldDiffLayoutWithoutLegacyStretchBehaviour = shouldDiffLayout;
    }
    exports.YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour = YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour;
    function YGVLog(config, node, level, format) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        var logConfig = config != null ? config : YGConfigGetDefault();
        logConfig.logger(logConfig, node, level, format, args);
        if (level == enums_4.YGLogLevel.Fatal) {
            throw new Error('Abort Yoga');
        }
    }
    exports.YGVLog = YGVLog;
    function YGLogWithConfig(config, level, format) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        //YGVLog(config, null, level, format, args);
    }
    exports.YGLogWithConfig = YGLogWithConfig;
    function YGLog(node, level, format) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        //YGVLog(node == null ? null : node.getConfig(), node, level, format, args);
    }
    exports.YGLog = YGLog;
    function YGAssert(condition, message) {
        if (!condition) {
            //YGLog(null, YGLogLevelFatal, "%s\n", message);
            console.assert(condition, message);
        }
    }
    exports.YGAssert = YGAssert;
    function YGAssertWithNode(node, condition, message) {
        if (!condition) {
            //YGLog(node, YGLogLevelFatal, "%s\n", message);
            console.log(node);
            console.assert(condition, message);
        }
    }
    exports.YGAssertWithNode = YGAssertWithNode;
    function YGAssertWithConfig(config, condition, message) {
        if (!condition) {
            //YGLogWithConfig(config, YGLogLevelFatal, "%s\n", message);
            console.log(config);
            console.assert(condition, message);
        }
    }
    exports.YGAssertWithConfig = YGAssertWithConfig;
    function YGConfigSetExperimentalFeatureEnabled(config, feature, enabled) {
        config.experimentalFeatures[feature] = enabled;
    }
    exports.YGConfigSetExperimentalFeatureEnabled = YGConfigSetExperimentalFeatureEnabled;
    function YGConfigIsExperimentalFeatureEnabled(config, feature) {
        return config.experimentalFeatures[feature];
    }
    exports.YGConfigIsExperimentalFeatureEnabled = YGConfigIsExperimentalFeatureEnabled;
    function YGConfigSetUseWebDefaults(config, enabled) {
        config.useWebDefaults = enabled;
    }
    exports.YGConfigSetUseWebDefaults = YGConfigSetUseWebDefaults;
    function YGConfigSetUseLegacyStretchBehaviour(config, useLegacyStretchBehaviour) {
        config.useLegacyStretchBehaviour = useLegacyStretchBehaviour;
    }
    exports.YGConfigSetUseLegacyStretchBehaviour = YGConfigSetUseLegacyStretchBehaviour;
    function YGConfigGetUseWebDefaults(config) {
        return config.useWebDefaults;
    }
    exports.YGConfigGetUseWebDefaults = YGConfigGetUseWebDefaults;
    function YGConfigSetContext(config, context) {
        config.context = context;
    }
    exports.YGConfigSetContext = YGConfigSetContext;
    function YGConfigGetContext(config) {
        return config.context;
    }
    exports.YGConfigGetContext = YGConfigGetContext;
    function YGConfigSetCloneNodeFunc(config, callback) {
        config.cloneNodeCallback = callback;
    }
    exports.YGConfigSetCloneNodeFunc = YGConfigSetCloneNodeFunc;
    function YGTraverseChildrenPreOrder(children, f) {
        for (var i = 0; i < children.length; ++i) {
            var node = children[i];
            f(node);
            YGTraverseChildrenPreOrder(node.getChildren(), f);
        }
    }
    exports.YGTraverseChildrenPreOrder = YGTraverseChildrenPreOrder;
    function YGTraversePreOrder(node, f) {
        if (!node) {
            return;
        }
        f(node);
        YGTraverseChildrenPreOrder(node.getChildren(), f);
    }
    exports.YGTraversePreOrder = YGTraversePreOrder;
    function ASSERT_FLOAT_EQ(x, y) {
        console.assert(x === y);
    }
    var config = YGConfigNew();
    var root = YGNodeNewWithConfig(config);
    YGNodeStyleSetWidth(root, 100);
    YGNodeStyleSetHeight(root, 100);
    var root_child0 = YGNodeNewWithConfig(config);
    YGNodeStyleSetPositionType(root_child0, enums_4.YGPositionType.Absolute);
    YGNodeStyleSetPosition(root_child0, enums_4.YGEdge.Start, 10);
    YGNodeStyleSetPosition(root_child0, enums_4.YGEdge.Top, 10);
    YGNodeStyleSetWidth(root_child0, 10);
    YGNodeStyleSetHeight(root_child0, 10);
    YGNodeInsertChild(root, root_child0, 0);
    YGNodeCalculateLayout(root, internal_3.YGUndefined, internal_3.YGUndefined, enums_4.YGDirection.LTR);
    ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
    ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
    ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
    ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetLeft(root_child0));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child0));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetWidth(root_child0));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child0));
    YGNodeCalculateLayout(root, internal_3.YGUndefined, internal_3.YGUndefined, enums_4.YGDirection.RTL);
    ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
    ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
    ASSERT_FLOAT_EQ(100, YGNodeLayoutGetWidth(root));
    ASSERT_FLOAT_EQ(100, YGNodeLayoutGetHeight(root));
    ASSERT_FLOAT_EQ(80, YGNodeLayoutGetLeft(root_child0));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetTop(root_child0));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetWidth(root_child0));
    ASSERT_FLOAT_EQ(10, YGNodeLayoutGetHeight(root_child0));
    YGNodeFreeRecursive(root);
    YGConfigFree(config);
});
define("ygfloatoptional", ["require", "exports", "yoga"], function (require, exports, yoga_4) {
    "use strict";
    exports.__esModule = true;
    var YGFloatOptional = /** @class */ (function () {
        function YGFloatOptional(value) {
            if (value === void 0) { value = undefined; }
            if (value instanceof YGFloatOptional) {
                this.value_ = value.getValue();
                this.isUndefined_ = value.isUndefined();
                return;
            }
            if (yoga_4.YGFloatIsUndefined(value)) {
                this.value_ = 0;
                this.isUndefined_ = true;
            }
            else {
                this.value_ = value;
                this.isUndefined_ = false;
            }
        }
        YGFloatOptional.prototype.getValue = function () {
            if (this.isUndefined_) {
                throw "Tried to get value of an undefined YGFloatOptional";
            }
            return this.value_;
        };
        YGFloatOptional.prototype.setValue = function (value) {
            this.value_ = value;
            this.isUndefined_ = false;
        };
        YGFloatOptional.prototype.isUndefined = function () {
            return this.isUndefined_;
        };
        YGFloatOptional.prototype.add = function (op) {
            if (!this.isUndefined_ && !op.isUndefined()) {
                return new YGFloatOptional(this.value_ + op.getValue());
            }
            return new YGFloatOptional();
        };
        YGFloatOptional.prototype.isBigger = function (op) {
            if (this.isUndefined_ || op.isUndefined()) {
                return false;
            }
            return this.value_ > op.getValue();
        };
        YGFloatOptional.prototype.isSmaller = function (op) {
            if (this.isUndefined_ || op.isUndefined()) {
                return false;
            }
            return this.value_ < op.getValue();
        };
        YGFloatOptional.prototype.isBiggerEqual = function (op) {
            return this.isEqual(op) ? true : this.isBigger(op);
        };
        YGFloatOptional.prototype.isSmallerEqual = function (op) {
            return this.isEqual(op) ? true : this.isSmaller(op);
        };
        YGFloatOptional.prototype.isEqual = function (op) {
            if (this.isUndefined_ == op.isUndefined()) {
                return this.isUndefined_ ? true : this.value_ == op.getValue();
            }
            return false;
        };
        YGFloatOptional.prototype.isDiff = function (op) {
            return !this.isEqual(op);
        };
        YGFloatOptional.prototype.isEqualValue = function (val) {
            if (yoga_4.YGFloatIsUndefined(val) == this.isUndefined_) {
                return this.isUndefined_ || val == this.value_;
            }
            return false;
        };
        YGFloatOptional.prototype.isDiffValue = function (val) {
            return !this.isEqualValue(val);
        };
        return YGFloatOptional;
    }());
    exports.YGFloatOptional = YGFloatOptional;
});
define("ygnode", ["require", "exports", "enums", "ygfloatoptional", "ygconfig", "utils", "yglayout", "ygstyle", "internal", "yoga"], function (require, exports, enums_5, ygfloatoptional_5, ygconfig_2, utils_4, yglayout_2, ygstyle_1, internal_4, yoga_5) {
    "use strict";
    exports.__esModule = true;
    var YGNode = /** @class */ (function () {
        function YGNode(contextOrNodeOrConfig, print, hasNewLayout, nodeType, measure, baseline, dirtied, style, layout, lineIndex, owner, children, config, isDirty, resolvedDimensions) {
            if (contextOrNodeOrConfig === void 0) { contextOrNodeOrConfig = null; }
            if (print === void 0) { print = null; }
            if (hasNewLayout === void 0) { hasNewLayout = true; }
            if (nodeType === void 0) { nodeType = enums_5.YGNodeType.Default; }
            if (measure === void 0) { measure = null; }
            if (baseline === void 0) { baseline = null; }
            if (dirtied === void 0) { dirtied = null; }
            if (style === void 0) { style = new ygstyle_1.YGStyle(); }
            if (layout === void 0) { layout = new yglayout_2.YGLayout(); }
            if (lineIndex === void 0) { lineIndex = 0; }
            if (owner === void 0) { owner = null; }
            if (children === void 0) { children = []; }
            if (config === void 0) { config = null; }
            if (isDirty === void 0) { isDirty = false; }
            if (resolvedDimensions === void 0) { resolvedDimensions = [internal_4.YGValueUndefined, internal_4.YGValueUndefined]; }
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
            if (contextOrNodeOrConfig instanceof ygconfig_2.YGConfig) {
                this.config_ = contextOrNodeOrConfig;
                this.context_ = null;
            }
            else {
                this.context_ = contextOrNodeOrConfig;
            }
        }
        YGNode.prototype.relativePosition = function (axis, axisSize) {
            if (this.isLeadingPositionDefined(axis)) {
                return this.getLeadingPosition(axis, axisSize);
            }
            var trailingPosition = this.getTrailingPosition(axis, axisSize);
            if (!trailingPosition.isUndefined()) {
                trailingPosition.setValue(-1 * trailingPosition.getValue());
            }
            return trailingPosition;
        };
        YGNode.prototype.operatorAtrib = function (node) {
            if (node == this) {
                return this;
            }
            this.clearChildren();
            this.fromNode(node);
            return this;
        };
        YGNode.prototype.fromNode = function (node) {
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
        };
        YGNode.prototype.getContext = function () {
            return this.context_;
        };
        YGNode.prototype.getPrintFunc = function () {
            return this.print_;
        };
        YGNode.prototype.getHasNewLayout = function () {
            return this.hasNewLayout_;
        };
        YGNode.prototype.getNodeType = function () {
            return this.nodeType_;
        };
        YGNode.prototype.getMeasure = function () {
            return this.measure_;
        };
        YGNode.prototype.getBaseline = function () {
            return this.baseline_;
        };
        YGNode.prototype.getDirtied = function () {
            return this.dirtied_;
        };
        YGNode.prototype.getStyle = function () {
            return this.style_;
        };
        YGNode.prototype.getLayout = function () {
            return this.layout_;
        };
        YGNode.prototype.getLineIndex = function () {
            return this.lineIndex_;
        };
        YGNode.prototype.getOwner = function () {
            return this.owner_;
        };
        YGNode.prototype.getParent = function () {
            return this.getOwner();
        };
        YGNode.prototype.getChildren = function () {
            return this.children_;
        };
        YGNode.prototype.getChildrenCount = function () {
            return this.children_.length;
        };
        YGNode.prototype.getChild = function (index) {
            return this.children_[index];
        };
        YGNode.prototype.getConfig = function () {
            return this.config_;
        };
        YGNode.prototype.isDirty = function () {
            return this.isDirty_;
        };
        YGNode.prototype.getResolvedDimensions = function () {
            return this.resolvedDimensions_;
        };
        YGNode.prototype.getResolvedDimension = function (index) {
            return this.resolvedDimensions_[index];
        };
        YGNode.prototype.getLeadingPosition = function (axis, axisSize) {
            if (utils_4.YGFlexDirectionIsRow(axis)) {
                var leadingPosition_1 = yoga_5.YGComputedEdgeValue(this.style_.position, enums_5.YGEdge.Start, internal_4.YGValueUndefined);
                if (leadingPosition_1.unit != enums_5.YGUnit.Undefined) {
                    return utils_4.YGResolveValue(leadingPosition_1, axisSize);
                }
            }
            var leadingPosition = yoga_5.YGComputedEdgeValue(this.style_.position, internal_4.leading[axis], internal_4.YGValueUndefined);
            return leadingPosition.unit == enums_5.YGUnit.Undefined ? new ygfloatoptional_5.YGFloatOptional(0) : utils_4.YGResolveValue(leadingPosition, axisSize);
        };
        YGNode.prototype.isLeadingPositionDefined = function (axis) {
            return (utils_4.YGFlexDirectionIsRow(axis) && (yoga_5.YGComputedEdgeValue(this.style_.position, enums_5.YGEdge.Start, internal_4.YGValueUndefined)).unit != enums_5.YGUnit.Undefined) ||
                (yoga_5.YGComputedEdgeValue(this.style_.position, internal_4.leading[axis], internal_4.YGValueUndefined)).unit != enums_5.YGUnit.Undefined;
        };
        YGNode.prototype.isTrailingPosDefined = function (axis) {
            return (utils_4.YGFlexDirectionIsRow(axis) && (yoga_5.YGComputedEdgeValue(this.style_.position, enums_5.YGEdge.End, internal_4.YGValueUndefined)).unit != enums_5.YGUnit.Undefined) ||
                (yoga_5.YGComputedEdgeValue(this.style_.position, internal_4.leading[axis], internal_4.YGValueUndefined)).unit != enums_5.YGUnit.Undefined;
        };
        YGNode.prototype.getTrailingPosition = function (axis, axisSize) {
            if (utils_4.YGFlexDirectionIsRow(axis)) {
                var trailingPosition_1 = yoga_5.YGComputedEdgeValue(this.style_.position, enums_5.YGEdge.End, internal_4.YGValueUndefined);
                if (trailingPosition_1.unit != enums_5.YGUnit.Undefined) {
                    return utils_4.YGResolveValue(trailingPosition_1, axisSize);
                }
            }
            var trailingPosition = yoga_5.YGComputedEdgeValue(this.style_.position, internal_4.trailing[axis], internal_4.YGValueUndefined);
            return trailingPosition.unit == enums_5.YGUnit.Undefined ? new ygfloatoptional_5.YGFloatOptional(0) : utils_4.YGResolveValue(trailingPosition, axisSize);
        };
        YGNode.prototype.getLeadingMargin = function (axis, widthSize) {
            if (utils_4.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_5.YGEdge.Start].unit != enums_5.YGUnit.Undefined) {
                return utils_4.YGResolveValueMargin(this.style_.margin[enums_5.YGEdge.Start], widthSize);
            }
            return utils_4.YGResolveValueMargin(yoga_5.YGComputedEdgeValue(this.style_.margin, internal_4.leading[axis], internal_4.YGValueZero), widthSize);
        };
        YGNode.prototype.getTrailingMargin = function (axis, widthSize) {
            if (utils_4.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_5.YGEdge.End].unit != enums_5.YGUnit.Undefined) {
                return utils_4.YGResolveValueMargin(this.style_.margin[enums_5.YGEdge.End], widthSize);
            }
            return utils_4.YGResolveValueMargin(yoga_5.YGComputedEdgeValue(this.style_.margin, internal_4.leading[axis], internal_4.YGValueZero), widthSize);
        };
        YGNode.prototype.getLeadingBorder = function (axis) {
            if (utils_4.YGFlexDirectionIsRow(axis) &&
                this.style_.border[enums_5.YGEdge.Start].unit != enums_5.YGUnit.Undefined &&
                !yoga_5.YGFloatIsUndefined(this.style_.border[enums_5.YGEdge.Start].value) &&
                this.style_.border[enums_5.YGEdge.Start].value > 0.0) {
                return this.style_.border[enums_5.YGEdge.Start].value;
            }
            var computedEdgeValue = yoga_5.YGComputedEdgeValue(this.style_.border, internal_4.leading[axis], internal_4.YGValueZero).value;
            return utils_4.YGFloatMax(computedEdgeValue, 0.0);
        };
        YGNode.prototype.getTrailingBorder = function (axis) {
            if (utils_4.YGFlexDirectionIsRow(axis) &&
                this.style_.border[enums_5.YGEdge.End].unit != enums_5.YGUnit.Undefined &&
                !yoga_5.YGFloatIsUndefined(this.style_.border[enums_5.YGEdge.End].value) &&
                this.style_.border[enums_5.YGEdge.End].value > 0.0) {
                return this.style_.border[enums_5.YGEdge.End].value;
            }
            var computedEdgeValue = yoga_5.YGComputedEdgeValue(this.style_.border, internal_4.trailing[axis], internal_4.YGValueZero).value;
            return utils_4.YGFloatMax(computedEdgeValue, 0.0);
        };
        YGNode.prototype.getLeadingPadding = function (axis, widthSize) {
            var paddingEdgeStart = utils_4.YGResolveValue(this.style_.padding[enums_5.YGEdge.Start], widthSize);
            if (utils_4.YGFlexDirectionIsRow(axis) &&
                this.style_.padding[enums_5.YGEdge.Start].unit != enums_5.YGUnit.Undefined &&
                !paddingEdgeStart.isUndefined() && paddingEdgeStart.getValue() > 0.0) {
                return paddingEdgeStart;
            }
            var resolvedValue = utils_4.YGResolveValue(yoga_5.YGComputedEdgeValue(this.style_.padding, internal_4.leading[axis], internal_4.YGValueZero), widthSize);
            return utils_4.YGFloatOptionalMax(resolvedValue, new ygfloatoptional_5.YGFloatOptional(0.0));
        };
        YGNode.prototype.getTrailingPadding = function (axis, widthSize) {
            var paddingEdgeEnd = utils_4.YGResolveValue(this.style_.padding[enums_5.YGEdge.End], widthSize);
            if (utils_4.YGFlexDirectionIsRow(axis) &&
                this.style_.padding[enums_5.YGEdge.Start].unit != enums_5.YGUnit.Undefined &&
                !paddingEdgeEnd.isUndefined() && paddingEdgeEnd.getValue() >= 0.0) {
                return paddingEdgeEnd;
            }
            var resolvedValue = utils_4.YGResolveValue(yoga_5.YGComputedEdgeValue(this.style_.padding, internal_4.trailing[axis], internal_4.YGValueZero), widthSize);
            return utils_4.YGFloatOptionalMax(resolvedValue, new ygfloatoptional_5.YGFloatOptional(0.0));
        };
        YGNode.prototype.getLeadingPaddingAndBorder = function (axis, widthSize) {
            return this.getLeadingPadding(axis, widthSize).add(new ygfloatoptional_5.YGFloatOptional(this.getLeadingBorder(axis)));
        };
        YGNode.prototype.getTrailingPaddingAndBorder = function (axis, widthSize) {
            return this.getTrailingPadding(axis, widthSize).add(new ygfloatoptional_5.YGFloatOptional(this.getTrailingBorder(axis)));
        };
        YGNode.prototype.getMarginForAxis = function (axis, widthSize) {
            return this.getLeadingMargin(axis, widthSize).add(this.getTrailingMargin(axis, widthSize));
        };
        YGNode.prototype.setContext = function (context) {
            this.context_ = context;
        };
        YGNode.prototype.setPrintFunc = function (printFunc) {
            this.print_ = printFunc;
        };
        YGNode.prototype.setHasNewLayout = function (hasNewLayout) {
            this.hasNewLayout_ = hasNewLayout;
        };
        YGNode.prototype.setNodeType = function (nodeType) {
            this.nodeType_ = nodeType;
        };
        YGNode.prototype.setMeasureFunc = function (measureFunc) {
            if (measureFunc == null) {
                this.measure_ = null;
                this.nodeType_ = enums_5.YGNodeType.Default;
            }
            else {
                //YGAssertWithNode(this, this.children_.size() == 0, "Cannot set measure function: Nodes with measure functions cannot have children.");
                if (this.children_.length == 0) {
                    console.error("Cannot set measure function: Nodes with measure functions cannot have children.");
                }
                this.measure_ = measureFunc;
                this.setNodeType(enums_5.YGNodeType.Text);
            }
            this.measure_ = measureFunc;
        };
        YGNode.prototype.setBaseLineFunc = function (baseLineFunc) {
            this.baseline_ = baseLineFunc;
        };
        YGNode.prototype.setDirtiedFunc = function (dirtiedFunc) {
            this.dirtied_ = dirtiedFunc;
        };
        YGNode.prototype.setStyle = function (style) {
            this.style_ = style;
        };
        YGNode.prototype.setStyleFlexDirection = function (direction) {
            this.style_.flexDirection = direction;
        };
        YGNode.prototype.setStyleAlignContent = function (alignContent) {
            this.style_.alignContent = alignContent;
        };
        YGNode.prototype.setLayout = function (layout) {
            this.layout_ = layout;
        };
        YGNode.prototype.setLineIndex = function (lineIndex) {
            this.lineIndex_ = lineIndex;
        };
        YGNode.prototype.setOwner = function (owner) {
            this.owner_ = owner;
        };
        YGNode.prototype.setChildren = function (children) {
            this.children_ = children;
        };
        YGNode.prototype.setConfig = function (config) {
            this.config_ = config;
        };
        YGNode.prototype.setDirty = function (isDirty) {
            this.isDirty_ = isDirty;
        };
        YGNode.prototype.setLayoutLastOwnerDirection = function (direction) {
            this.layout_.lastOwnerDirection = direction;
        };
        YGNode.prototype.setLayoutComputedFlexBasis = function (computedFlexBasis) {
            this.layout_.computedFlexBasis = computedFlexBasis;
        };
        YGNode.prototype.setLayoutComputedFlexBasisGeneration = function (computedFlexBasisGeneration) {
            this.layout_.computedFlexBasisGeneration = computedFlexBasisGeneration;
        };
        YGNode.prototype.setLayoutMeasuredDimension = function (measuredDimension, index) {
            this.layout_.measuredDimensions[index] = measuredDimension;
        };
        YGNode.prototype.setLayoutHadOverflow = function (hadOverflow) {
            this.layout_.hadOverflow = hadOverflow;
        };
        YGNode.prototype.setLayoutDimension = function (dimension, index) {
            this.layout_.dimensions[index] = dimension;
        };
        YGNode.prototype.setLayoutDirection = function (direction) {
            this.layout_.direction = direction;
        };
        YGNode.prototype.setLayoutMargin = function (margin, index) {
            this.layout_.margin[index] = margin;
        };
        YGNode.prototype.setLayoutBorder = function (border, index) {
            this.layout_.border[index] = border;
        };
        YGNode.prototype.setLayoutPadding = function (padding, index) {
            this.layout_.padding[index] = padding;
        };
        YGNode.prototype.setLayoutPosition = function (position, index) {
            this.layout_.position[index] = position;
        };
        YGNode.prototype.setPosition = function (direction, mainSize, crossSize, ownerWidth) {
            var directionRespectingRoot = this.owner_ != null ? direction : enums_5.YGDirection.LTR;
            var mainAxis = utils_4.YGResolveFlexDirection(this.style_.flexDirection, directionRespectingRoot);
            var crossAxis = utils_4.YGFlexDirectionCross(mainAxis, directionRespectingRoot);
            var relativePositionMain = this.relativePosition(mainAxis, mainSize);
            var relativePositionCross = this.relativePosition(crossAxis, crossSize);
            this.setLayoutPosition(utils_4.YGUnwrapFloatOptional(this.getLeadingMargin(mainAxis, ownerWidth).add(relativePositionMain)), internal_4.leading[mainAxis]);
            this.setLayoutPosition(utils_4.YGUnwrapFloatOptional(this.getTrailingMargin(mainAxis, ownerWidth).add(relativePositionMain)), internal_4.trailing[mainAxis]);
            this.setLayoutPosition(utils_4.YGUnwrapFloatOptional(this.getLeadingMargin(crossAxis, ownerWidth).add(relativePositionCross)), internal_4.leading[crossAxis]);
            this.setLayoutPosition(utils_4.YGUnwrapFloatOptional(this.getTrailingMargin(crossAxis, ownerWidth).add(relativePositionCross)), internal_4.leading[crossAxis]);
        };
        YGNode.prototype.setAndPropogateUseLegacyFlag = function (useLegacyFlag) {
            this.config_.useLegacyStretchBehaviour = useLegacyFlag;
            for (var i = 0; i < this.children_.length; i++) {
                this.children_[i].getConfig().useLegacyStretchBehaviour = useLegacyFlag;
            }
        };
        YGNode.prototype.setLayoutDoesLegacyFlagAffectsLayout = function (doesLegacyFlagAffectsLayout) {
            this.layout_.doesLegacyStretchFlagAffectsLayout = doesLegacyFlagAffectsLayout;
        };
        YGNode.prototype.setLayoutDidUseLegacyFlag = function (didUseLegacyFlag) {
            this.layout_.didUseLegacyFlag = didUseLegacyFlag;
        };
        YGNode.prototype.markDirtyAndPropogateDownwards = function () {
            this.isDirty_ = true;
            for (var i = 0; i < this.children_.length; i++) {
                this.children_[i].markDirtyAndPropogateDownwards();
            }
        };
        YGNode.prototype.marginLeadingValue = function (axis) {
            if (utils_4.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_5.YGEdge.Start].unit != enums_5.YGUnit.Undefined) {
                return this.style_.margin[enums_5.YGEdge.Start];
            }
            else {
                return this.style_.margin[internal_4.leading[axis]];
            }
        };
        YGNode.prototype.marginTrailingValue = function (axis) {
            if (utils_4.YGFlexDirectionIsRow(axis) && this.style_.margin[enums_5.YGEdge.End].unit != enums_5.YGUnit.Undefined) {
                return this.style_.margin[enums_5.YGEdge.End];
            }
            else {
                return this.style_.margin[internal_4.trailing[axis]];
            }
        };
        YGNode.prototype.resolveFlexBasisPtr = function () {
            var flexBasis = this.style_.flexBasis;
            if (flexBasis.unit != enums_5.YGUnit.Auto && flexBasis.unit != enums_5.YGUnit.Undefined) {
                return flexBasis;
            }
            if (!this.style_.flex.isUndefined() && this.style_.flex.getValue() > 0.0) {
                return this.config_.useWebDefaults ? internal_4.YGValueAuto : internal_4.YGValueZero;
            }
            return internal_4.YGValueAuto;
        };
        YGNode.prototype.resolveDimension = function () {
            for (var dim = enums_5.YGDimension.Width; dim < enums_5.YGDimensionCount; dim++) {
                if (this.style_.maxDimensions[dim].unit != enums_5.YGUnit.Undefined && utils_4.YGValueEqual(this.style_.maxDimensions[dim], this.style_.minDimensions[dim])) {
                    this.resolvedDimensions_[dim] = this.style_.maxDimensions[dim];
                }
                else {
                    this.resolvedDimensions_[dim] = this.style_.dimensions[dim];
                }
            }
        };
        YGNode.prototype.resolveDirection = function (ownerDirection) {
            if (this.style_.direction == enums_5.YGDirection.Inherit) {
                return ownerDirection > enums_5.YGDirection.Inherit ? ownerDirection : enums_5.YGDirection.LTR;
            }
            else {
                return this.style_.direction;
            }
        };
        YGNode.prototype.clearChildren = function () {
            while (this.children_.length > 0) {
                this.children_.pop();
            }
        };
        YGNode.prototype.replaceChild = function (oldChild, newChild) {
            var index = this.children_.indexOf(oldChild);
            if (index >= 0) {
                this.children_[index] = newChild;
            }
        };
        YGNode.prototype.replaceChildIndex = function (child, index) {
            this.children_[index] = child;
        };
        YGNode.prototype.insertChildIndex = function (child, index) {
            this.children_.splice(index, 0, child);
        };
        YGNode.prototype.removeChild = function (child) {
            var index = this.children_.indexOf(child);
            if (index >= 0) {
                this.children_.splice(index, 1);
                return true;
            }
            return false;
        };
        YGNode.prototype.removeChildIndex = function (index) {
            this.children_.splice(index, 1);
        };
        YGNode.prototype.cloneChildrenIfNeeded = function () {
            var childCount = this.children_.length;
            if (childCount == 0) {
                return;
            }
            var firstChild = this.children_[0];
            if (firstChild.getOwner() == this) {
                return;
            }
            var cloneNodeCallback = this.config_.cloneNodeCallback;
            for (var i = 0; i < childCount; ++i) {
                var oldChild = this.children_[i];
                var newChild = null;
                if (cloneNodeCallback) {
                    newChild = cloneNodeCallback(oldChild, this, i);
                }
                if (newChild == null) {
                    newChild = yoga_5.YGNodeClone(oldChild);
                }
                this.replaceChildIndex(newChild, i);
                newChild.setOwner(this);
            }
        };
        YGNode.prototype.markDirtyAndPropogate = function () {
            if (!this.isDirty_) {
                this.setDirty(true);
                this.setLayoutComputedFlexBasis(new ygfloatoptional_5.YGFloatOptional());
                if (this.owner_) {
                    this.owner_.markDirtyAndPropogate();
                }
            }
        };
        YGNode.prototype.resolveFlexGrow = function () {
            if (this.owner_ == null) {
                return 0.0;
            }
            if (!this.style_.flexGrow.isUndefined()) {
                return this.style_.flexGrow.getValue();
            }
            if (!this.style_.flex.isUndefined() && this.style_.flex.getValue() > 0.0) {
                return this.style_.flex.getValue();
            }
            return internal_4.kDefaultFlexGrow;
        };
        YGNode.prototype.resolveFlexShrink = function () {
            if (this.owner_ == null) {
                return 0.0;
            }
            if (!this.style_.flexShrink.isUndefined()) {
                return this.style_.flexShrink.getValue();
            }
            if (!this.config_.useWebDefaults && !this.style_.flex.isUndefined() && this.style_.flex.getValue() < 0.0) {
                return -this.style_.flex.getValue();
            }
            return this.config_.useWebDefaults ? internal_4.kWebDefaultFlexShrink : internal_4.kDefaultFlexShrink;
        };
        YGNode.prototype.isNodeFlexible = function () {
            return ((this.style_.positionType == enums_5.YGPositionType.Relative) && (this.resolveFlexGrow() != 0 || this.resolveFlexShrink() != 0));
        };
        YGNode.prototype.didUseLegacyFlag = function () {
            var didUseLegacyFlag = this.layout_.didUseLegacyFlag;
            if (didUseLegacyFlag) {
                return true;
            }
            for (var i = 0; i < this.children_.length; i++) {
                if (this.children_[i].getLayout().didUseLegacyFlag) {
                    didUseLegacyFlag = true;
                    break;
                }
            }
            return didUseLegacyFlag;
        };
        YGNode.prototype.isLayoutTreeEqualToNode = function (node) {
            if (this.children_.length != node.getChildren().length) {
                return false;
            }
            if (this.layout_ != node.getLayout()) {
                return false;
            }
            if (this.children_.length == 0) {
                return true;
            }
            var isLayoutTreeEqual = true;
            for (var i = 0; i < this.children_.length; ++i) {
                var otherNodeChildren = node.getChild(i);
                isLayoutTreeEqual = this.children_[i].isLayoutTreeEqualToNode(otherNodeChildren);
                if (!isLayoutTreeEqual) {
                    return false;
                }
            }
            return isLayoutTreeEqual;
        };
        return YGNode;
    }());
    exports.YGNode = YGNode;
});
define("internal", ["require", "exports", "enums", "yoga"], function (require, exports, enums_6, yoga_6) {
    "use strict";
    exports.__esModule = true;
    var YGCachedMeasurement = /** @class */ (function () {
        function YGCachedMeasurement() {
            this.availableWidth = 0;
            this.availableHeight = 0;
            this.widthMeasureMode = enums_6.YGMeasureMode.AtMost;
            this.heightMeasureMode = enums_6.YGMeasureMode.AtMost;
            this.computedWidth = -1;
            this.computedHeight = -1;
        }
        YGCachedMeasurement.prototype.isEqual = function (measurement) {
            var isEqual = this.widthMeasureMode == measurement.widthMeasureMode && this.heightMeasureMode == measurement.heightMeasureMode;
            if (!yoga_6.YGFloatIsUndefined(this.availableWidth) || !yoga_6.YGFloatIsUndefined(measurement.availableWidth)) {
                isEqual = isEqual && this.availableWidth == measurement.availableWidth;
            }
            if (!yoga_6.YGFloatIsUndefined(this.availableHeight) || !yoga_6.YGFloatIsUndefined(measurement.availableHeight)) {
                isEqual = isEqual && this.availableHeight == measurement.availableHeight;
            }
            if (!yoga_6.YGFloatIsUndefined(this.computedWidth) || !yoga_6.YGFloatIsUndefined(measurement.computedWidth)) {
                isEqual = isEqual && this.computedWidth == measurement.computedWidth;
            }
            if (!yoga_6.YGFloatIsUndefined(this.computedHeight) || !yoga_6.YGFloatIsUndefined(measurement.computedHeight)) {
                isEqual = isEqual && this.computedHeight == measurement.computedHeight;
            }
            return isEqual;
        };
        return YGCachedMeasurement;
    }());
    exports.YGCachedMeasurement = YGCachedMeasurement;
    function YGRoundValueToPixelGrid(value, pointScaleFactor, forceCeil, forceFloor) {
        return 0;
    }
    exports.YGRoundValueToPixelGrid = YGRoundValueToPixelGrid;
    exports.trailing = [enums_6.YGEdge.Bottom, enums_6.YGEdge.Top, enums_6.YGEdge.Right, enums_6.YGEdge.Left];
    exports.leading = [enums_6.YGEdge.Top, enums_6.YGEdge.Bottom, enums_6.YGEdge.Left, enums_6.YGEdge.Right];
    exports.pos = [enums_6.YGEdge.Top, enums_6.YGEdge.Bottom, enums_6.YGEdge.Left, enums_6.YGEdge.Right];
    exports.YGUndefined = undefined;
    exports.YGValueUndefined = new yoga_6.YGValue(exports.YGUndefined, enums_6.YGUnit.Undefined);
    exports.YGValueAuto = new yoga_6.YGValue(exports.YGUndefined, enums_6.YGUnit.Auto);
    exports.YGValueZero = new yoga_6.YGValue(0, enums_6.YGUnit.Point);
    exports.YG_MAX_CACHED_RESULT_COUNT = 16;
    exports.kDefaultFlexGrow = 0.0;
    exports.kDefaultFlexShrink = 0.0;
    exports.kWebDefaultFlexShrink = 1.0;
});
//# sourceMappingURL=yoga.js.map