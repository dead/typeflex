// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGEnums.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGEnums.cpp

export const YGAlignCount = 8;

export enum YGAlign {
    Auto,
    FlexStart,
    Center,
    FlexEnd,
    Stretch,
    Baseline,
    SpaceBetween,
    SpaceAround,
}

export function YGAlignToString(value: YGAlign): string {
    switch (value) {
        case YGAlign.Auto:
            return 'auto';
        case YGAlign.FlexStart:
            return 'flex-start';
        case YGAlign.Center:
            return 'center';
        case YGAlign.FlexEnd:
            return 'flex-end';
        case YGAlign.Stretch:
            return 'stretch';
        case YGAlign.Baseline:
            return 'baseline';
        case YGAlign.SpaceBetween:
            return 'space-between';
        case YGAlign.SpaceAround:
            return 'space-around';
    }

    return 'unknown';
}

export const YGDimensionCount = 2;

export enum YGDimension {
    Width,
    Height,
}

export function YGDimensionToString(value: YGDimension): string {
    switch (value) {
        case YGDimension.Width:
            return 'width';
        case YGDimension.Height:
            return 'height';
    }

    return 'unknown';
}

export enum YGDirection {
    Inherit,
    LTR,
    RTL,
}

export function YGDirectionToString(value: YGDirection): string {
    switch (value) {
        case YGDirection.Inherit:
            return 'inherit';
        case YGDirection.LTR:
            return 'ltr';
        case YGDirection.RTL:
            return 'rtl';
    }

    return 'unknown';
}

export const YGDisplayCount = 2;

export enum YGDisplay {
    Flex,
    None,
}

export function YGDisplayToString(value: YGDisplay): string {
    switch (value) {
        case YGDisplay.Flex:
            return 'flex';
        case YGDisplay.None:
            return 'none';
    }

    return 'unknown';
}

export const YGEdgeCount = 9;

export enum YGEdge {
    Left,
    Top,
    Right,
    Bottom,
    Start,
    End,
    Horizontal,
    Vertical,
    All,
}

export function YGEdgeToString(value: YGEdge): string {
    switch (value) {
        case YGEdge.Left:
            return 'left';
        case YGEdge.Top:
            return 'top';
        case YGEdge.Right:
            return 'right';
        case YGEdge.Bottom:
            return 'bottom';
        case YGEdge.Start:
            return 'start';
        case YGEdge.End:
            return 'end';
        case YGEdge.Horizontal:
            return 'horizontal';
        case YGEdge.Vertical:
            return 'vertical';
        case YGEdge.All:
            return 'all';
    }

    return 'unknown';
}

export const YGExperimentalFeatureCount = 1;

export enum YGExperimentalFeature {
    WebFlexBasis,
}

export function YGExperimentalFeatureToString(value: YGExperimentalFeature): string {
    switch (value) {
        case YGExperimentalFeature.WebFlexBasis:
            return 'web-flex-basis';
    }

    return 'unknown';
}

export const YGFlexDirectionCount = 4;

export enum YGFlexDirection {
    Column,
    ColumnReverse,
    Row,
    RowReverse,
}

export function YGFlexDirectionToString(value: YGFlexDirection): string {
    switch (value) {
        case YGFlexDirection.Column:
            return 'column';
        case YGFlexDirection.ColumnReverse:
            return 'column-reverse';
        case YGFlexDirection.Row:
            return 'row';
        case YGFlexDirection.RowReverse:
            return 'row-reverse';
    }

    return 'unknown';
}

export const YGJustifyCount = 6;

export enum YGJustify {
    FlexStart,
    Center,
    FlexEnd,
    SpaceBetween,
    SpaceAround,
    SpaceEvenly,
}

export function YGJustifyToString(value: YGJustify): string {
    switch (value) {
        case YGJustify.FlexStart:
            return 'flex-start';
        case YGJustify.Center:
            return 'center';
        case YGJustify.FlexEnd:
            return 'flex-end';
        case YGJustify.SpaceBetween:
            return 'space-between';
        case YGJustify.SpaceAround:
            return 'space-around';
        case YGJustify.SpaceEvenly:
            return 'space-evenly';
    }

    return 'unknown';
}

export const YGLogLevelCount = 6;

export enum YGLogLevel {
    Error,
    Warn,
    Info,
    Debug,
    Verbose,
    Fatal,
}

export function YGLogLevelToString(value: YGLogLevel): string {
    switch (value) {
        case YGLogLevel.Error:
            return 'error';
        case YGLogLevel.Warn:
            return 'warn';
        case YGLogLevel.Info:
            return 'info';
        case YGLogLevel.Debug:
            return 'debug';
        case YGLogLevel.Verbose:
            return 'verbose';
        case YGLogLevel.Fatal:
            return 'fatal';
    }

    return 'unknown';
}

export const YGMeasureModeCount = 3;

export enum YGMeasureMode {
    Undefined,
    Exactly,
    AtMost,
}

export function YGMeasureModeToString(value: YGMeasureMode): string {
    switch (value) {
        case YGMeasureMode.Undefined:
            return 'undefined';
        case YGMeasureMode.Exactly:
            return 'exactly';
        case YGMeasureMode.AtMost:
            return 'at-most';
    }

    return 'unknown';
}

export const YGNodeTypeCount = 2;

export enum YGNodeType {
    Default,
    Text,
}

export function YGNodeTypeToString(value: YGNodeType): string {
    switch (value) {
        case YGNodeType.Default:
            return 'default';
        case YGNodeType.Text:
            return 'text';
    }

    return 'unknown';
}

export const YGOverflowCount = 3;

export enum YGOverflow {
    Visible,
    Hidden,
    Scroll,
}

export function YGOverflowToString(value: YGOverflow): string {
    switch (value) {
        case YGOverflow.Visible:
            return 'visible';
        case YGOverflow.Hidden:
            return 'hidden';
        case YGOverflow.Scroll:
            return 'scroll';
    }

    return 'unknown';
}

export const YGPositionTypeCount = 2;

export enum YGPositionType {
    Static,
    Relative,
    Absolute,
}

export function YGPositionTypeToString(value: YGPositionType): string {
    switch (value) {
        case YGPositionType.Static:
            return 'static';
        case YGPositionType.Relative:
            return 'relative';
        case YGPositionType.Absolute:
            return 'absolute';
    }

    return 'unknown';
}

export const YGPrintOptionsCount = 3;

export enum YGPrintOptions {
    Layout = 1,
    Style = 2,
    Children = 4,
}

export function YGPrintOptionsToString(value: YGPrintOptions): string {
    switch (value) {
        case YGPrintOptions.Layout:
            return 'layout';
        case YGPrintOptions.Style:
            return 'style';
        case YGPrintOptions.Children:
            return 'children';
    }

    return 'unknown';
}

export const YGUnitCount = 4;

export enum YGUnit {
    Undefined,
    Point,
    Percent,
    Auto,
}

export function YGUnitToString(value: YGUnit): string {
    switch (value) {
        case YGUnit.Undefined:
            return 'undefined';
        case YGUnit.Point:
            return 'point';
        case YGUnit.Percent:
            return 'percent';
        case YGUnit.Auto:
            return 'auto';
    }

    return 'unknown';
}

export const YGWrapCount = 3;

export enum YGWrap {
    NoWrap,
    Wrap,
    WrapReverse,
}

export function YGWrapToString(value: YGWrap): string {
    switch (value) {
        case YGWrap.NoWrap:
            return 'no-wrap';
        case YGWrap.Wrap:
            return 'wrap';
        case YGWrap.WrapReverse:
            return 'wrap-reverse';
    }

    return 'unknown';
}
