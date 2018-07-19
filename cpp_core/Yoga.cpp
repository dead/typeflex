void YGNodeAbsoluteLayoutChild(node: YGNode,
                                      child: YGNode,
                                      float width,
                                      YGMeasureMode widthMode,
                                      float height,
                                      YGDirection direction,
                                      YGConfig config) {
  YGFlexDirection mainAxis =
      YGResolveFlexDirection(node.getStyle().flexDirection, direction);
  YGFlexDirection crossAxis = YGFlexDirectionCross(mainAxis, direction);
  bool isMainAxisRow = YGFlexDirectionIsRow(mainAxis);

  float childWidth = YGUndefined;
  float childHeight = YGUndefined;
  YGMeasureMode childWidthMeasureMode = YGMeasureMode.Undefined;
  YGMeasureMode childHeightMeasureMode = YGMeasureMode.Undefined;

  float marginRow =
      YGUnwrapFloatOptional(child.getMarginForAxis(YGFlexDirection.Row, width));
  float marginColumn = YGUnwrapFloatOptional(
      child.getMarginForAxis(YGFlexDirection.Column, width));

  if (YGNodeIsStyleDimDefined(child, YGFlexDirection.Row, width)) {
    childWidth =
        YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimension.Width), width)) +
        marginRow;
  } else {    if (child.isLeadingPositionDefined(YGFlexDirection.Row) 
        child.isTrailingPosDefined(YGFlexDirection.Row)) {
      childWidth = node.getLayout().measuredDimensions[YGDimension.Width] -
          (node.getLeadingBorder(YGFlexDirection.Row) +
           node.getTrailingBorder(YGFlexDirection.Row)) -
          YGUnwrapFloatOptional(
                       child.getLeadingPosition(YGFlexDirection.Row, width) +
                       child.getTrailingPosition(YGFlexDirection.Row, width));
      childWidth = YGNodeBoundAxis(child, YGFlexDirection.Row, childWidth, width, width);
    }
  }

  if (YGNodeIsStyleDimDefined(child, YGFlexDirection.Column, height)) {
    childHeight =
        YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimension.Height), height)) +
        marginColumn;
  } else {    if (child.isLeadingPositionDefined(YGFlexDirection.Column) 
        child.isTrailingPosDefined(YGFlexDirection.Column)) {
      childHeight =
          node.getLayout().measuredDimensions[YGDimension.Height] -
          (node.getLeadingBorder(YGFlexDirection.Column) +
           node.getTrailingBorder(YGFlexDirection.Column)) -
          YGUnwrapFloatOptional(
              child.getLeadingPosition(YGFlexDirection.Column, height) +
              child.getTrailingPosition(YGFlexDirection.Column, height));
      childHeight = YGNodeBoundAxis(child, YGFlexDirection.Column, childHeight, height, width);
    }
  }  if (YGFloatIsUndefined(childWidth) ^ YGFloatIsUndefined(childHeight)) {
    if (!child.getStyle().aspectRatio.isUndefined()) {
      if (YGFloatIsUndefined(childWidth)) {
        childWidth = marginRow +
            (childHeight - marginColumn) *
                child.getStyle().aspectRatio.getValue();
      } else if (YGFloatIsUndefined(childHeight)) {
        childHeight = marginColumn +
            (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
      }
    }
  }  if (YGFloatIsUndefined(childWidth) || YGFloatIsUndefined(childHeight)) {
    childWidthMeasureMode =
        YGFloatIsUndefined(childWidth) ? YGMeasureMode.Undefined : YGMeasureMode.Exactly;
    childHeightMeasureMode =
        YGFloatIsUndefined(childHeight) ? YGMeasureMode.Undefined : YGMeasureMode.Exactly;    if (!isMainAxisRow  YGFloatIsUndefined(childWidth) 
        widthMode != YGMeasureMode.Undefined  !YGFloatIsUndefined(width) 
        width > 0) {
      childWidth = width;
      childWidthMeasureMode = YGMeasureMode.AtMost;
    }

    YGLayoutNodeInternal(child,
                         childWidth,
                         childHeight,
                         direction,
                         childWidthMeasureMode,
                         childHeightMeasureMode,
                         childWidth,
                         childHeight,
                         false,
                         "abs-measure",
                         config);
    childWidth = child.getLayout().measuredDimensions[YGDimension.Width] +
        YGUnwrapFloatOptional(
                     child.getMarginForAxis(YGFlexDirection.Row, width));
    childHeight = child.getLayout().measuredDimensions[YGDimension.Height] +
        YGUnwrapFloatOptional(
                      child.getMarginForAxis(YGFlexDirection.Column, width));
  }

  YGLayoutNodeInternal(child,
                       childWidth,
                       childHeight,
                       direction,
                       YGMeasureMode.Exactly,
                       YGMeasureMode.Exactly,
                       childWidth,
                       childHeight,
                       true,
                       "abs-layout",
                       config);

  if (child.isTrailingPosDefined(mainAxis) 
      !child.isLeadingPositionDefined(mainAxis)) {
    child.setLayoutPosition(
        node.getLayout().measuredDimensions[dim[mainAxis]] -
            child.getLayout().measuredDimensions[dim[mainAxis]] -
            node.getTrailingBorder(mainAxis) -
            YGUnwrapFloatOptional(child.getTrailingMargin(mainAxis, width)) -
            YGUnwrapFloatOptional(child.getTrailingPosition(
                mainAxis, isMainAxisRow ? width : height)),
        leading[mainAxis]);
  } else if (
      !child.isLeadingPositionDefined(mainAxis) 
      node.getStyle().justifyContent == YGJustifyCenter) {
    child.setLayoutPosition(
        (node.getLayout().measuredDimensions[dim[mainAxis]] -
         child.getLayout().measuredDimensions[dim[mainAxis]]) /
            2.0f,
        leading[mainAxis]);
  } else if (
      !child.isLeadingPositionDefined(mainAxis) 
      node.getStyle().justifyContent == YGJustifyFlexEnd) {
    child.setLayoutPosition(
        (node.getLayout().measuredDimensions[dim[mainAxis]] -
         child.getLayout().measuredDimensions[dim[mainAxis]]),
        leading[mainAxis]);
  }

  if (child.isTrailingPosDefined(crossAxis) 
      !child.isLeadingPositionDefined(crossAxis)) {
    child.setLayoutPosition(
        node.getLayout().measuredDimensions[dim[crossAxis]] -
            child.getLayout().measuredDimensions[dim[crossAxis]] -
            node.getTrailingBorder(crossAxis) -
            YGUnwrapFloatOptional(child.getTrailingMargin(crossAxis, width)) -
            YGUnwrapFloatOptional(child.getTrailingPosition(
                crossAxis, isMainAxisRow ? height : width)),
        leading[crossAxis]);

  } else if (
      !child.isLeadingPositionDefined(crossAxis) 
      YGNodeAlignItem(node, child) == YGAlignCenter) {
    child.setLayoutPosition(
        (node.getLayout().measuredDimensions[dim[crossAxis]] -
         child.getLayout().measuredDimensions[dim[crossAxis]]) /
            2.0f,
        leading[crossAxis]);
  } else if (
      !child.isLeadingPositionDefined(crossAxis) 
      ((YGNodeAlignItem(node, child) == YGAlign.FlexEnd) ^
       (node.getStyle().flexWrap == YGWrapWrapReverse))) {
    child.setLayoutPosition(
        (node.getLayout().measuredDimensions[dim[crossAxis]] -
         child.getLayout().measuredDimensions[dim[crossAxis]]),
        leading[crossAxis]);
  }
}

void YGNodeWithMeasureFuncSetMeasuredDimensions(node: YGNode,
                                                       float availableWidth,
                                                       float availableHeight,
                                                       YGMeasureMode widthMeasureMode,
                                                       YGMeasureMode heightMeasureMode,
                                                       float ownerWidth,
                                                       float ownerHeight) {
  YGAssertWithNode(
      node,
      node.getMeasure() != null,
      "Expected node to have custom measure function");

  float paddingAndBorderAxisRow =
      YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Row, availableWidth);
  float paddingAndBorderAxisColumn =
      YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Column, availableWidth);
  float marginAxisRow = YGUnwrapFloatOptional(
      node.getMarginForAxis(YGFlexDirection.Row, availableWidth));
  float marginAxisColumn = YGUnwrapFloatOptional(
      node.getMarginForAxis(YGFlexDirection.Column, availableWidth));  float innerWidth = YGFloatIsUndefined(availableWidth)
      ? availableWidth
      : YGFloatMax(0, availableWidth - marginAxisRow - paddingAndBorderAxisRow);
  float innerHeight = YGFloatIsUndefined(availableHeight)
      ? availableHeight
      : YGFloatMax(
            0, availableHeight - marginAxisColumn - paddingAndBorderAxisColumn);

  if (widthMeasureMode == YGMeasureMode.Exactly 
      heightMeasureMode == YGMeasureMode.Exactly) {

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Row,
            availableWidth - marginAxisRow,
            ownerWidth,
            ownerWidth),
        YGDimension.Width);
    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Column,
            availableHeight - marginAxisColumn,
            ownerHeight,
            ownerWidth),
        YGDimension.Height);
  } else {

    YGSize measuredSize = node.getMeasure()(
        node, innerWidth, widthMeasureMode, innerHeight, heightMeasureMode);

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Row,
            (widthMeasureMode == YGMeasureMode.Undefined ||
             widthMeasureMode == YGMeasureMode.AtMost)
                ? measuredSize.width + paddingAndBorderAxisRow
                : availableWidth - marginAxisRow,
            ownerWidth,
            ownerWidth),
        YGDimension.Width);

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Column,
            (heightMeasureMode == YGMeasureMode.Undefined ||
             heightMeasureMode == YGMeasureMode.AtMost)
                ? measuredSize.height + paddingAndBorderAxisColumn
                : availableHeight - marginAxisColumn,
            ownerHeight,
            ownerWidth),
        YGDimension.Height);
  }
}
void YGNodeEmptyContainerSetMeasuredDimensions(node: YGNode,
                                                      float availableWidth,
                                                      float availableHeight,
                                                      YGMeasureMode widthMeasureMode,
                                                      YGMeasureMode heightMeasureMode,
                                                      float ownerWidth,
                                                      float ownerHeight) {
  float paddingAndBorderAxisRow =
      YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Row, ownerWidth);
  float paddingAndBorderAxisColumn =
      YGNodePaddingAndBorderForAxis(node, YGFlexDirection.Column, ownerWidth);
  float marginAxisRow = YGUnwrapFloatOptional(
      node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
  float marginAxisColumn = YGUnwrapFloatOptional(
      node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

  node.setLayoutMeasuredDimension(
      YGNodeBoundAxis(
          node,
          YGFlexDirection.Row,
          (widthMeasureMode == YGMeasureMode.Undefined ||
           widthMeasureMode == YGMeasureMode.AtMost)
              ? paddingAndBorderAxisRow
              : availableWidth - marginAxisRow,
          ownerWidth,
          ownerWidth),
      YGDimension.Width);

  node.setLayoutMeasuredDimension(
      YGNodeBoundAxis(
          node,
          YGFlexDirection.Column,
          (heightMeasureMode == YGMeasureMode.Undefined ||
           heightMeasureMode == YGMeasureMode.AtMost)
              ? paddingAndBorderAxisColumn
              : availableHeight - marginAxisColumn,
          ownerHeight,
          ownerWidth),
      YGDimension.Height);
}

bool YGNodeFixedSizeSetMeasuredDimensions(YGNodenode,
                                                 float availableWidth,
                                                 float availableHeight,
                                                 YGMeasureMode widthMeasureMode,
                                                 YGMeasureMode heightMeasureMode,
                                                 float ownerWidth,
                                                 float ownerHeight) {
  if ((!YGFloatIsUndefined(availableWidth) 
       widthMeasureMode == YGMeasureMode.AtMost  availableWidth <= 0.0f) ||
      (!YGFloatIsUndefined(availableHeight) 
       heightMeasureMode == YGMeasureMode.AtMost  availableHeight <= 0.0f) ||
      (widthMeasureMode == YGMeasureMode.Exactly 
       heightMeasureMode == YGMeasureMode.Exactly)) {
    float marginAxisColumn = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));
    float marginAxisRow = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Row,
            YGFloatIsUndefined(availableWidth) ||
                    (widthMeasureMode == YGMeasureMode.AtMost 
                     availableWidth < 0.0f)
                ? 0.0f
                : availableWidth - marginAxisRow,
            ownerWidth,
            ownerWidth),
        YGDimension.Width);

    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Column,
            YGFloatIsUndefined(availableHeight) ||
                    (heightMeasureMode == YGMeasureMode.AtMost 
                     availableHeight < 0.0f)
                ? 0.0f
                : availableHeight - marginAxisColumn,
            ownerHeight,
            ownerWidth),
        YGDimension.Height);
    return true;
  }

  return false;
}

void YGZeroOutLayoutRecursivly(node: YGNode) {
  memset((node.getLayout()), 0, sizeof(YGLayout));
  node.setHasNewLayout(true);
  node.cloneChildrenIfNeeded();
  childCount = YGNodeGetChildCount(node);
  for (i = 0; i < childCount; i++) {
    child: YGNode = node.getChild(i);
    YGZeroOutLayoutRecursivly(child);
  }
}

float YGNodeCalculateAvailableInnerDim(
    node: YGNode,
    YGFlexDirection axis,
    float availableDim,
    float ownerDim) {
  YGFlexDirection direction =
      YGFlexDirectionIsRow(axis) ? YGFlexDirection.Row : YGFlexDirection.Column;
  YGDimension dimension =
      YGFlexDirectionIsRow(axis) ? YGDimension.Width : YGDimension.Height;

  float margin =
      YGUnwrapFloatOptional(node.getMarginForAxis(direction, ownerDim));
  float paddingAndBorder =
      YGNodePaddingAndBorderForAxis(node, direction, ownerDim);

  float availableInnerDim = availableDim - margin - paddingAndBorder;  if (!YGFloatIsUndefined(availableInnerDim)) {    YGFloatOptional minDimensionOptional = YGResolveValue(node.getStyle().minDimensions[dimension], ownerDim);
    float minInnerDim = minDimensionOptional.isUndefined()
        ? 0.0f
        : minDimensionOptional.getValue() - paddingAndBorder;

    YGFloatOptional maxDimensionOptional = YGResolveValue(node.getStyle().maxDimensions[dimension], ownerDim) ;

    float maxInnerDim = maxDimensionOptional.isUndefined()
        ? FLT_MAX
        : maxDimensionOptional.getValue() - paddingAndBorder;
    availableInnerDim =
        YGFloatMax(YGFloatMin(availableInnerDim, maxInnerDim), minInnerDim);
  }

  return availableInnerDim;
}

void YGNodeComputeFlexBasisForChildren(
    node: YGNode,
    float availableInnerWidth,
    float availableInnerHeight,
    YGMeasureMode widthMeasureMode,
    YGMeasureMode heightMeasureMode,
    YGDirection direction,
    YGFlexDirection mainAxis,
    YGConfig config,
    bool performLayout,
    float totalOuterFlexBasis) {
  singleFlexChild: YGNode = null;
  YGVector children = node.getChildren();
  YGMeasureMode measureModeMainDim =
      YGFlexDirectionIsRow(mainAxis) ? widthMeasureMode : heightMeasureMode;  if (measureModeMainDim == YGMeasureMode.Exactly) {
    for (auto child : children) {
      if (singleFlexChild != null) {
        if (child.isNodeFlexible()) {

          singleFlexChild = null;
          break;
        }
      } else if (
          child.resolveFlexGrow() > 0.0f 
          child.resolveFlexShrink() > 0.0f) {
        singleFlexChild = child;
      }
    }
  }

  for (auto child : children) {
    child.resolveDimension();
    if (child.getStyle().display == YGDisplay.None) {
      YGZeroOutLayoutRecursivly(child);
      child.setHasNewLayout(true);
      child.setDirty(false);
      continue;
    }
    if (performLayout) {

      YGDirection childDirection = child.resolveDirection(direction);
      float mainDim = YGFlexDirectionIsRow(mainAxis)
          ? availableInnerWidth
          : availableInnerHeight;
      float crossDim = YGFlexDirectionIsRow(mainAxis)
          ? availableInnerHeight
          : availableInnerWidth;
      child.setPosition(
          childDirection, mainDim, crossDim, availableInnerWidth);
    }

    if (child.getStyle().positionType == YGPositionType.Absolute) {
      continue;
    }
    if (child == singleFlexChild) {
      child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
      child.setLayoutComputedFlexBasis(YGFloatOptional(0));
    } else {
      YGNodeComputeFlexBasisForChild(
          node,
          child,
          availableInnerWidth,
          widthMeasureMode,
          availableInnerHeight,
          availableInnerWidth,
          availableInnerHeight,
          heightMeasureMode,
          direction,
          config);
    }

    totalOuterFlexBasis += YGUnwrapFloatOptional(
        child.getLayout().computedFlexBasis +
        child.getMarginForAxis(mainAxis, availableInnerWidth));
  }
}
YGCollectFlexItemsRowValues YGCalculateCollectFlexItemsRowValues(
    YGNode node,
    YGDirection ownerDirection,
    float mainAxisownerSize,
    float availableInnerWidth,
    float availableInnerMainDim,
    startOfLineIndex,
    lineCount) {
  YGCollectFlexItemsRowValues flexAlgoRowMeasurement = {};
  flexAlgoRowMeasurement.relativeChildren.reserve(node.getChildren().size());

  float sizeConsumedOnCurrentLineIncludingMinConstraint = 0;
  YGFlexDirection mainAxis = YGResolveFlexDirection(
      node.getStyle().flexDirection, node.resolveDirection(ownerDirection));
  bool isNodeFlexWrap = node.getStyle().flexWrap != YGWrapNoWrap;  endOfLineIndex = startOfLineIndex;
  for (; endOfLineIndex < node.getChildrenCount(); endOfLineIndex++) {
    child: YGNode = node.getChild(endOfLineIndex);
    if (child.getStyle().display == YGDisplay.None ||
        child.getStyle().positionType == YGPositionType.Absolute) {
      continue;
    }
    child.setLineIndex(lineCount);
    float childMarginMainAxis = YGUnwrapFloatOptional(
        child.getMarginForAxis(mainAxis, availableInnerWidth));
    float flexBasisWithMinAndMaxConstraints =
        YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
            child,
            mainAxis,
            YGUnwrapFloatOptional(child.getLayout().computedFlexBasis),
            mainAxisownerSize));    if (sizeConsumedOnCurrentLineIncludingMinConstraint +
                flexBasisWithMinAndMaxConstraints + childMarginMainAxis >
            availableInnerMainDim 
        isNodeFlexWrap  flexAlgoRowMeasurement.itemsOnLine > 0) {
      break;
    }

    sizeConsumedOnCurrentLineIncludingMinConstraint +=
        flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
    flexAlgoRowMeasurement.sizeConsumedOnCurrentLine +=
        flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
    flexAlgoRowMeasurement.itemsOnLine++;

    if (child.isNodeFlexible()) {
      flexAlgoRowMeasurement.totalFlexGrowFactors += child.resolveFlexGrow();      flexAlgoRowMeasurement.totalFlexShrinkScaledFactors +=
          -child.resolveFlexShrink() *
          YGUnwrapFloatOptional(child.getLayout().computedFlexBasis);
    }

    flexAlgoRowMeasurement.relativeChildren.push_back(child);
  }  if (flexAlgoRowMeasurement.totalFlexGrowFactors > 0 
      flexAlgoRowMeasurement.totalFlexGrowFactors < 1) {
    flexAlgoRowMeasurement.totalFlexGrowFactors = 1;
  }  if (flexAlgoRowMeasurement.totalFlexShrinkScaledFactors > 0 
      flexAlgoRowMeasurement.totalFlexShrinkScaledFactors < 1) {
    flexAlgoRowMeasurement.totalFlexShrinkScaledFactors = 1;
  }
  flexAlgoRowMeasurement.endOfLineIndex = endOfLineIndex;
  return flexAlgoRowMeasurement;
}
float YGDistributeFreeSpaceSecondPass(
    YGCollectFlexItemsRowValues collectedFlexItemsValues,
    node: YGNode,
    YGFlexDirection mainAxis,
    YGFlexDirection crossAxis,
    float mainAxisownerSize,
    float availableInnerMainDim,
    float availableInnerCrossDim,
    float availableInnerWidth,
    float availableInnerHeight,
    bool flexBasisOverflows,
    YGMeasureMode measureModeCrossDim,
    bool performLayout,
    YGConfig config) {
  float childFlexBasis = 0;
  float flexShrinkScaledFactor = 0;
  float flexGrowFactor = 0;
  float deltaFreeSpace = 0;
  bool isMainAxisRow = YGFlexDirectionIsRow(mainAxis);
  bool isNodeFlexWrap = node.getStyle().flexWrap != YGWrapNoWrap;

  for (auto currentRelativeChild : collectedFlexItemsValues.relativeChildren) {
    childFlexBasis = YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
        currentRelativeChild,
        mainAxis,
        YGUnwrapFloatOptional(
            currentRelativeChild.getLayout().computedFlexBasis),
        mainAxisownerSize));
    float updatedMainSize = childFlexBasis;

    if (!YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) 
        collectedFlexItemsValues.remainingFreeSpace < 0) {
      flexShrinkScaledFactor =
          -currentRelativeChild.resolveFlexShrink() * childFlexBasis;

      if (flexShrinkScaledFactor != 0) {
        float childSize;

        if (!YGFloatIsUndefined(
                collectedFlexItemsValues.totalFlexShrinkScaledFactors) 
            collectedFlexItemsValues.totalFlexShrinkScaledFactors == 0) {
          childSize = childFlexBasis + flexShrinkScaledFactor;
        } else {
          childSize = childFlexBasis +
              (collectedFlexItemsValues.remainingFreeSpace /
               collectedFlexItemsValues.totalFlexShrinkScaledFactors) *
                  flexShrinkScaledFactor;
        }

        updatedMainSize = YGNodeBoundAxis(
            currentRelativeChild,
            mainAxis,
            childSize,
            availableInnerMainDim,
            availableInnerWidth);
      }
    } else if (
        !YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) 
        collectedFlexItemsValues.remainingFreeSpace > 0) {
      flexGrowFactor = currentRelativeChild.resolveFlexGrow();      if (!YGFloatIsUndefined(flexGrowFactor)  flexGrowFactor != 0) {
        updatedMainSize = YGNodeBoundAxis(
            currentRelativeChild,
            mainAxis,
            childFlexBasis +
                collectedFlexItemsValues.remainingFreeSpace /
                    collectedFlexItemsValues.totalFlexGrowFactors *
                    flexGrowFactor,
            availableInnerMainDim,
            availableInnerWidth);
      }
    }

    deltaFreeSpace += updatedMainSize - childFlexBasis;

    float marginMain = YGUnwrapFloatOptional(
        currentRelativeChild.getMarginForAxis(mainAxis, availableInnerWidth));
    float marginCross = YGUnwrapFloatOptional(
        currentRelativeChild.getMarginForAxis(crossAxis, availableInnerWidth));

    float childCrossSize;
    float childMainSize = updatedMainSize + marginMain;
    YGMeasureMode childCrossMeasureMode;
    YGMeasureMode childMainMeasureMode = YGMeasureMode.Exactly;

    if (!currentRelativeChild.getStyle().aspectRatio.isUndefined()) {
      childCrossSize = isMainAxisRow ? (childMainSize - marginMain) /
              currentRelativeChild.getStyle().aspectRatio.getValue()
                                     : (childMainSize - marginMain) *
              currentRelativeChild.getStyle().aspectRatio.getValue();
      childCrossMeasureMode = YGMeasureMode.Exactly;

      childCrossSize += marginCross;
    } else if (
        !YGFloatIsUndefined(availableInnerCrossDim) 
        !YGNodeIsStyleDimDefined(
            currentRelativeChild, crossAxis, availableInnerCrossDim) 
        measureModeCrossDim == YGMeasureMode.Exactly 
        !(isNodeFlexWrap  flexBasisOverflows) 
        YGNodeAlignItem(node, currentRelativeChild) == YGAlign.Stretch 
        currentRelativeChild.marginLeadingValue(crossAxis).unit !=
            YGUnit.Auto 
        currentRelativeChild.marginTrailingValue(crossAxis).unit !=
            YGUnit.Auto) {
      childCrossSize = availableInnerCrossDim;
      childCrossMeasureMode = YGMeasureMode.Exactly;
    } else if (!YGNodeIsStyleDimDefined(
                   currentRelativeChild, crossAxis, availableInnerCrossDim)) {
      childCrossSize = availableInnerCrossDim;
      childCrossMeasureMode = YGFloatIsUndefined(childCrossSize)
          ? YGMeasureMode.Undefined
          : YGMeasureMode.AtMost;
    } else {
      childCrossSize =
          YGUnwrapFloatOptional(YGResolveValue(
              currentRelativeChild.getResolvedDimension(dim[crossAxis]),
              availableInnerCrossDim)) +
          marginCross;
      bool isLoosePercentageMeasurement =
          currentRelativeChild.getResolvedDimension(dim[crossAxis]).unit ==
              YGUnit.Percent 
          measureModeCrossDim != YGMeasureMode.Exactly;
      childCrossMeasureMode =
          YGFloatIsUndefined(childCrossSize) || isLoosePercentageMeasurement
          ? YGMeasureMode.Undefined
          : YGMeasureMode.Exactly;
    }

    YGConstrainMaxSizeForMode(
        currentRelativeChild,
        mainAxis,
        availableInnerMainDim,
        availableInnerWidth,
        childMainMeasureMode,
        childMainSize);
    YGConstrainMaxSizeForMode(
        currentRelativeChild,
        crossAxis,
        availableInnerCrossDim,
        availableInnerWidth,
        childCrossMeasureMode,
        childCrossSize);

    bool requiresStretchLayout =
        !YGNodeIsStyleDimDefined(
            currentRelativeChild, crossAxis, availableInnerCrossDim) 
        YGNodeAlignItem(node, currentRelativeChild) == YGAlign.Stretch 
        currentRelativeChild.marginLeadingValue(crossAxis).unit !=
            YGUnit.Auto 
        currentRelativeChild.marginTrailingValue(crossAxis).unit != YGUnit.Auto;

    float childWidth = isMainAxisRow ? childMainSize : childCrossSize;
    float childHeight = !isMainAxisRow ? childMainSize : childCrossSize;

    YGMeasureMode childWidthMeasureMode =
        isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
    YGMeasureMode childHeightMeasureMode =
        !isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;    YGLayoutNodeInternal(
        currentRelativeChild,
        childWidth,
        childHeight,
        node.getLayout().direction,
        childWidthMeasureMode,
        childHeightMeasureMode,
        availableInnerWidth,
        availableInnerHeight,
        performLayout  !requiresStretchLayout,
        "flex",
        config);
    node.setLayoutHadOverflow(
        node.getLayout().hadOverflow |
        currentRelativeChild.getLayout().hadOverflow);
  }
  return deltaFreeSpace;
}
void YGDistributeFreeSpaceFirstPass(
    YGCollectFlexItemsRowValues collectedFlexItemsValues,
    YGFlexDirection mainAxis,
    float mainAxisownerSize,
    float availableInnerMainDim,
    float availableInnerWidth) {
  float flexShrinkScaledFactor = 0;
  float flexGrowFactor = 0;
  float baseMainSize = 0;
  float boundMainSize = 0;
  float deltaFreeSpace = 0;

  for (auto currentRelativeChild : collectedFlexItemsValues.relativeChildren) {
    float childFlexBasis = YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
        currentRelativeChild,
        mainAxis,
        YGUnwrapFloatOptional(
            currentRelativeChild.getLayout().computedFlexBasis),
        mainAxisownerSize));

    if (collectedFlexItemsValues.remainingFreeSpace < 0) {
      flexShrinkScaledFactor =
          -currentRelativeChild.resolveFlexShrink() * childFlexBasis;      if (!YGFloatIsUndefined(flexShrinkScaledFactor) 
          flexShrinkScaledFactor != 0) {
        baseMainSize = childFlexBasis +
            collectedFlexItemsValues.remainingFreeSpace /
                collectedFlexItemsValues.totalFlexShrinkScaledFactors *
                flexShrinkScaledFactor;
        boundMainSize = YGNodeBoundAxis(
            currentRelativeChild,
            mainAxis,
            baseMainSize,
            availableInnerMainDim,
            availableInnerWidth);
        if (!YGFloatIsUndefined(baseMainSize) 
            !YGFloatIsUndefined(boundMainSize) 
            baseMainSize != boundMainSize) {          deltaFreeSpace += boundMainSize - childFlexBasis;
          collectedFlexItemsValues.totalFlexShrinkScaledFactors -=
              flexShrinkScaledFactor;
        }
      }
    } else if (
        !YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) 
        collectedFlexItemsValues.remainingFreeSpace > 0) {
      flexGrowFactor = currentRelativeChild.resolveFlexGrow();      if (!YGFloatIsUndefined(flexGrowFactor)  flexGrowFactor != 0) {
        baseMainSize = childFlexBasis +
            collectedFlexItemsValues.remainingFreeSpace /
                collectedFlexItemsValues.totalFlexGrowFactors * flexGrowFactor;
        boundMainSize = YGNodeBoundAxis(
            currentRelativeChild,
            mainAxis,
            baseMainSize,
            availableInnerMainDim,
            availableInnerWidth);

        if (!YGFloatIsUndefined(baseMainSize) 
            !YGFloatIsUndefined(boundMainSize) 
            baseMainSize != boundMainSize) {          deltaFreeSpace += boundMainSize - childFlexBasis;
          collectedFlexItemsValues.totalFlexGrowFactors -= flexGrowFactor;
        }
      }
    }
  }
  collectedFlexItemsValues.remainingFreeSpace -= deltaFreeSpace;
}
void YGResolveFlexibleLength(
    node: YGNode,
    YGCollectFlexItemsRowValues collectedFlexItemsValues,
    YGFlexDirection mainAxis,
    YGFlexDirection crossAxis,
    float mainAxisownerSize,
    float availableInnerMainDim,
    float availableInnerCrossDim,
    float availableInnerWidth,
    float availableInnerHeight,
    bool flexBasisOverflows,
    YGMeasureMode measureModeCrossDim,
    bool performLayout,
    YGConfig config) {
  float originalFreeSpace = collectedFlexItemsValues.remainingFreeSpace;

  YGDistributeFreeSpaceFirstPass(
      collectedFlexItemsValues,
      mainAxis,
      mainAxisownerSize,
      availableInnerMainDim,
      availableInnerWidth);  float distributedFreeSpace = YGDistributeFreeSpaceSecondPass(
      collectedFlexItemsValues,
      node,
      mainAxis,
      crossAxis,
      mainAxisownerSize,
      availableInnerMainDim,
      availableInnerCrossDim,
      availableInnerWidth,
      availableInnerHeight,
      flexBasisOverflows,
      measureModeCrossDim,
      performLayout,
      config);

  collectedFlexItemsValues.remainingFreeSpace =
      originalFreeSpace - distributedFreeSpace;
}

void YGJustifyMainAxis(
    node: YGNode,
    YGCollectFlexItemsRowValues collectedFlexItemsValues,
    uint32_t startOfLineIndex,
    YGFlexDirection mainAxis,
    YGFlexDirection crossAxis,
    YGMeasureMode measureModeMainDim,
    YGMeasureMode measureModeCrossDim,
    float mainAxisownerSize,
    float ownerWidth,
    float availableInnerMainDim,
    float availableInnerCrossDim,
    float availableInnerWidth,
    bool performLayout) {
  YGStyle style = node.getStyle();  if (measureModeMainDim == YGMeasureMode.AtMost 
      collectedFlexItemsValues.remainingFreeSpace > 0) {
    if (style.minDimensions[dim[mainAxis]].unit != YGUnit.Undefined 
        !YGResolveValue(style.minDimensions[dim[mainAxis]], mainAxisownerSize)
             .isUndefined()) {
      collectedFlexItemsValues.remainingFreeSpace = YGFloatMax(
          0,
          YGUnwrapFloatOptional(YGResolveValue(
              style.minDimensions[dim[mainAxis]], mainAxisownerSize)) -
              (availableInnerMainDim -
               collectedFlexItemsValues.remainingFreeSpace));
    } else {
      collectedFlexItemsValues.remainingFreeSpace = 0;
    }
  }

  int numberOfAutoMarginsOnCurrentLine = 0;
  for (i = startOfLineIndex;
       i < collectedFlexItemsValues.endOfLineIndex;
       i++) {
    child: YGNode = node.getChild(i);
    if (child.getStyle().positionType == YGPositionType.Relative) {
      if (child.marginLeadingValue(mainAxis).unit == YGUnit.Auto) {
        numberOfAutoMarginsOnCurrentLine++;
      }
      if (child.marginTrailingValue(mainAxis).unit == YGUnit.Auto) {
        numberOfAutoMarginsOnCurrentLine++;
      }
    }
  }  float leadingMainDim = 0;
  float betweenMainDim = 0;
  YGJustify justifyContent = node.getStyle().justifyContent;

  if (numberOfAutoMarginsOnCurrentLine == 0) {
    switch (justifyContent) {
      case YGJustifyCenter:
        leadingMainDim = collectedFlexItemsValues.remainingFreeSpace / 2;
        break;
      case YGJustifyFlexEnd:
        leadingMainDim = collectedFlexItemsValues.remainingFreeSpace;
        break;
      case YGJustifySpaceBetween:
        if (collectedFlexItemsValues.itemsOnLine > 1) {
          betweenMainDim =
              YGFloatMax(collectedFlexItemsValues.remainingFreeSpace, 0) /
              (collectedFlexItemsValues.itemsOnLine - 1);
        } else {
          betweenMainDim = 0;
        }
        break;
      case YGJustifySpaceEvenly:

        betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
            (collectedFlexItemsValues.itemsOnLine + 1);
        leadingMainDim = betweenMainDim;
        break;
      case YGJustifySpaceAround:

        betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
            collectedFlexItemsValues.itemsOnLine;
        leadingMainDim = betweenMainDim / 2;
        break;
      case YGJustifyFlexStart:
        break;
    }
  }

  float leadingPaddingAndBorderMain = YGUnwrapFloatOptional(
      node.getLeadingPaddingAndBorder(mainAxis, ownerWidth));
  collectedFlexItemsValues.mainDim =
      leadingPaddingAndBorderMain + leadingMainDim;
  collectedFlexItemsValues.crossDim = 0;

  for (i = startOfLineIndex;
       i < collectedFlexItemsValues.endOfLineIndex;
       i++) {
    child: YGNode = node.getChild(i);
    YGStyle childStyle = child.getStyle();
    YGLayout childLayout = child.getLayout();
    if (childStyle.display == YGDisplay.None) {
      continue;
    }
    if (childStyle.positionType == YGPositionType.Absolute 
        child.isLeadingPositionDefined(mainAxis)) {
      if (performLayout) {        child.setLayoutPosition(
            YGUnwrapFloatOptional(
                child.getLeadingPosition(mainAxis, availableInnerMainDim)) +
                node.getLeadingBorder(mainAxis) +
                YGUnwrapFloatOptional(
                    child.getLeadingMargin(mainAxis, availableInnerWidth)),
            pos[mainAxis]);
      }
    } else {      if (childStyle.positionType == YGPositionType.Relative) {
        if (child.marginLeadingValue(mainAxis).unit == YGUnit.Auto) {
          collectedFlexItemsValues.mainDim +=
              collectedFlexItemsValues.remainingFreeSpace /
              numberOfAutoMarginsOnCurrentLine;
        }

        if (performLayout) {
          child.setLayoutPosition(
              childLayout.position[pos[mainAxis]] +
                  collectedFlexItemsValues.mainDim,
              pos[mainAxis]);
        }

        if (child.marginTrailingValue(mainAxis).unit == YGUnit.Auto) {
          collectedFlexItemsValues.mainDim +=
              collectedFlexItemsValues.remainingFreeSpace /
              numberOfAutoMarginsOnCurrentLine;
        }
        bool canSkipFlex =
            !performLayout  measureModeCrossDim == YGMeasureMode.Exactly;
        if (canSkipFlex) {          collectedFlexItemsValues.mainDim += betweenMainDim +
              YGUnwrapFloatOptional(child.getMarginForAxis(
                  mainAxis, availableInnerWidth)) +
              YGUnwrapFloatOptional(childLayout.computedFlexBasis);
          collectedFlexItemsValues.crossDim = availableInnerCrossDim;
        } else {          collectedFlexItemsValues.mainDim += betweenMainDim +
              YGNodeDimWithMargin(child, mainAxis, availableInnerWidth);          collectedFlexItemsValues.crossDim = YGFloatMax(
              collectedFlexItemsValues.crossDim,
              YGNodeDimWithMargin(child, crossAxis, availableInnerWidth));
        }
      } else if (performLayout) {
        child.setLayoutPosition(
            childLayout.position[pos[mainAxis]] +
                node.getLeadingBorder(mainAxis) + leadingMainDim,
            pos[mainAxis]);
      }
    }
  }
  collectedFlexItemsValues.mainDim += YGUnwrapFloatOptional(
      node.getTrailingPaddingAndBorder(mainAxis, ownerWidth));
}
void YGNodelayoutImpl(node: YGNode,
                             float availableWidth,
                             float availableHeight,
                             YGDirection ownerDirection,
                             YGMeasureMode widthMeasureMode,
                             YGMeasureMode heightMeasureMode,
                             float ownerWidth,
                             float ownerHeight,
                             bool performLayout,
                             YGConfig config) {
  YGAssertWithNode(node,
                   YGFloatIsUndefined(availableWidth) ? widthMeasureMode == YGMeasureMode.Undefined
                                                      : true,
                   "availableWidth is indefinite so widthMeasureMode must be "
                   "YGMeasureMode.Undefined");
  YGAssertWithNode(node,
                   YGFloatIsUndefined(availableHeight) ? heightMeasureMode == YGMeasureMode.Undefined
                                                       : true,
                   "availableHeight is indefinite so heightMeasureMode must be "
                   "YGMeasureMode.Undefined");  YGDirection direction = node.resolveDirection(ownerDirection);
  node.setLayoutDirection(direction);

  YGFlexDirection flexRowDirection = YGResolveFlexDirection(YGFlexDirection.Row, direction);
  YGFlexDirection flexColumnDirection =
      YGResolveFlexDirection(YGFlexDirection.Column, direction);

  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getLeadingMargin(flexRowDirection, ownerWidth)),
      YGEdge.Start);
  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getTrailingMargin(flexRowDirection, ownerWidth)),
      YGEdge.End);
  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getLeadingMargin(flexColumnDirection, ownerWidth)),
      YGEdge.Top);
  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getTrailingMargin(flexColumnDirection, ownerWidth)),
      YGEdge.Bottom);

  node.setLayoutBorder(node.getLeadingBorder(flexRowDirection), YGEdge.Start);
  node.setLayoutBorder(node.getTrailingBorder(flexRowDirection), YGEdge.End);
  node.setLayoutBorder(node.getLeadingBorder(flexColumnDirection), YGEdge.Top);
  node.setLayoutBorder(
      node.getTrailingBorder(flexColumnDirection), YGEdge.Bottom);

  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getLeadingPadding(flexRowDirection, ownerWidth)),
      YGEdge.Start);
  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getTrailingPadding(flexRowDirection, ownerWidth)),
      YGEdge.End);
  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getLeadingPadding(flexColumnDirection, ownerWidth)),
      YGEdge.Top);
  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getTrailingPadding(flexColumnDirection, ownerWidth)),
      YGEdge.Bottom);

  if (node.getMeasure() != null) {
    YGNodeWithMeasureFuncSetMeasuredDimensions(node,
                                               availableWidth,
                                               availableHeight,
                                               widthMeasureMode,
                                               heightMeasureMode,
                                               ownerWidth,
                                               ownerHeight);
    return;
  }

  childCount = YGNodeGetChildCount(node);
  if (childCount == 0) {
    YGNodeEmptyContainerSetMeasuredDimensions(node,
                                              availableWidth,
                                              availableHeight,
                                              widthMeasureMode,
                                              heightMeasureMode,
                                              ownerWidth,
                                              ownerHeight);
    return;
  }  if (!performLayout  YGNodeFixedSizeSetMeasuredDimensions(node,
                                                             availableWidth,
                                                             availableHeight,
                                                             widthMeasureMode,
                                                             heightMeasureMode,
                                                             ownerWidth,
                                                             ownerHeight)) {
    return;
  }  node.cloneChildrenIfNeeded();

  node.setLayoutHadOverflow(false);  YGFlexDirection mainAxis =
      YGResolveFlexDirection(node.getStyle().flexDirection, direction);
  YGFlexDirection crossAxis = YGFlexDirectionCross(mainAxis, direction);
  bool isMainAxisRow = YGFlexDirectionIsRow(mainAxis);
  bool isNodeFlexWrap = node.getStyle().flexWrap != YGWrapNoWrap;

  float mainAxisownerSize = isMainAxisRow ? ownerWidth : ownerHeight;
  float crossAxisownerSize = isMainAxisRow ? ownerHeight : ownerWidth;

  float leadingPaddingAndBorderCross = YGUnwrapFloatOptional(
      node.getLeadingPaddingAndBorder(crossAxis, ownerWidth));
  float paddingAndBorderAxisMain = YGNodePaddingAndBorderForAxis(node, mainAxis, ownerWidth);
  float paddingAndBorderAxisCross =
      YGNodePaddingAndBorderForAxis(node, crossAxis, ownerWidth);

  YGMeasureMode measureModeMainDim = isMainAxisRow ? widthMeasureMode : heightMeasureMode;
  YGMeasureMode measureModeCrossDim = isMainAxisRow ? heightMeasureMode : widthMeasureMode;

  float paddingAndBorderAxisRow =
      isMainAxisRow ? paddingAndBorderAxisMain : paddingAndBorderAxisCross;
  float paddingAndBorderAxisColumn =
      isMainAxisRow ? paddingAndBorderAxisCross : paddingAndBorderAxisMain;

  float marginAxisRow = YGUnwrapFloatOptional(
      node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
  float marginAxisColumn = YGUnwrapFloatOptional(
      node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

  float minInnerWidth =
      YGUnwrapFloatOptional(YGResolveValue(node.getStyle().minDimensions[YGDimension.Width], ownerWidth)) -
      paddingAndBorderAxisRow;
  float maxInnerWidth =
      YGUnwrapFloatOptional(YGResolveValue(node.getStyle().maxDimensions[YGDimension.Width], ownerWidth)) -
      paddingAndBorderAxisRow;
  float minInnerHeight =
      YGUnwrapFloatOptional(YGResolveValue(node.getStyle().minDimensions[YGDimension.Height], ownerHeight)) -
      paddingAndBorderAxisColumn;
  float maxInnerHeight =
      YGUnwrapFloatOptional(YGResolveValue(
          node.getStyle().maxDimensions[YGDimension.Height], ownerHeight)) -
      paddingAndBorderAxisColumn;

  float minInnerMainDim = isMainAxisRow ? minInnerWidth : minInnerHeight;
  float maxInnerMainDim = isMainAxisRow ? maxInnerWidth : maxInnerHeight;  float availableInnerWidth = YGNodeCalculateAvailableInnerDim(
      node, YGFlexDirection.Row, availableWidth, ownerWidth);
  float availableInnerHeight = YGNodeCalculateAvailableInnerDim(
      node, YGFlexDirection.Column, availableHeight, ownerHeight);

  float availableInnerMainDim =
      isMainAxisRow ? availableInnerWidth : availableInnerHeight;
  float availableInnerCrossDim =
      isMainAxisRow ? availableInnerHeight : availableInnerWidth;

  float totalOuterFlexBasis = 0;  YGNodeComputeFlexBasisForChildren(
      node,
      availableInnerWidth,
      availableInnerHeight,
      widthMeasureMode,
      heightMeasureMode,
      direction,
      mainAxis,
      config,
      performLayout,
      totalOuterFlexBasis);

  bool flexBasisOverflows = measureModeMainDim == YGMeasureMode.Undefined
      ? false
      : totalOuterFlexBasis > availableInnerMainDim;
  if (isNodeFlexWrap  flexBasisOverflows 
      measureModeMainDim == YGMeasureMode.AtMost) {
    measureModeMainDim = YGMeasureMode.Exactly;
  }  startOfLineIndex = 0;
  endOfLineIndex = 0;  lineCount = 0;  float totalLineCrossDim = 0;  float maxLineMainDim = 0;
  YGCollectFlexItemsRowValues collectedFlexItemsValues;
  for (; endOfLineIndex < childCount;
       lineCount++, startOfLineIndex = endOfLineIndex) {
    collectedFlexItemsValues = YGCalculateCollectFlexItemsRowValues(
        node,
        ownerDirection,
        mainAxisownerSize,
        availableInnerWidth,
        availableInnerMainDim,
        startOfLineIndex,
        lineCount);
    endOfLineIndex = collectedFlexItemsValues.endOfLineIndex;    bool canSkipFlex =
        !performLayout  measureModeCrossDim == YGMeasureMode.Exactly;    bool sizeBasedOnContent = false;

    if (measureModeMainDim != YGMeasureMode.Exactly) {
      if (!YGFloatIsUndefined(minInnerMainDim) 
          collectedFlexItemsValues.sizeConsumedOnCurrentLine <
              minInnerMainDim) {
        availableInnerMainDim = minInnerMainDim;
      } else if (
          !YGFloatIsUndefined(maxInnerMainDim) 
          collectedFlexItemsValues.sizeConsumedOnCurrentLine >
              maxInnerMainDim) {
        availableInnerMainDim = maxInnerMainDim;
      } else {
        if (!node.getConfig().useLegacyStretchBehaviour 
            ((YGFloatIsUndefined(
                  collectedFlexItemsValues.totalFlexGrowFactors) 
              collectedFlexItemsValues.totalFlexGrowFactors == 0) ||
             (YGFloatIsUndefined(node.resolveFlexGrow()) 
              node.resolveFlexGrow() == 0))) {          availableInnerMainDim =
              collectedFlexItemsValues.sizeConsumedOnCurrentLine;
        }

        if (node.getConfig().useLegacyStretchBehaviour) {
          node.setLayoutDidUseLegacyFlag(true);
        }
        sizeBasedOnContent = !node.getConfig().useLegacyStretchBehaviour;
      }
    }

    if (!sizeBasedOnContent  !YGFloatIsUndefined(availableInnerMainDim)) {
      collectedFlexItemsValues.remainingFreeSpace = availableInnerMainDim -
          collectedFlexItemsValues.sizeConsumedOnCurrentLine;
    } else if (collectedFlexItemsValues.sizeConsumedOnCurrentLine < 0) {      collectedFlexItemsValues.remainingFreeSpace =
          -collectedFlexItemsValues.sizeConsumedOnCurrentLine;
    }

    if (!canSkipFlex) {
      YGResolveFlexibleLength(
          node,
          collectedFlexItemsValues,
          mainAxis,
          crossAxis,
          mainAxisownerSize,
          availableInnerMainDim,
          availableInnerCrossDim,
          availableInnerWidth,
          availableInnerHeight,
          flexBasisOverflows,
          measureModeCrossDim,
          performLayout,
          config);
    }

    node.setLayoutHadOverflow(
        node.getLayout().hadOverflow |
        (collectedFlexItemsValues.remainingFreeSpace < 0));    YGJustifyMainAxis(
        node,
        collectedFlexItemsValues,
        startOfLineIndex,
        mainAxis,
        crossAxis,
        measureModeMainDim,
        measureModeCrossDim,
        mainAxisownerSize,
        ownerWidth,
        availableInnerMainDim,
        availableInnerCrossDim,
        availableInnerWidth,
        performLayout);

    float containerCrossAxis = availableInnerCrossDim;
    if (measureModeCrossDim == YGMeasureMode.Undefined ||
        measureModeCrossDim == YGMeasureMode.AtMost) {

      containerCrossAxis =
          YGNodeBoundAxis(
              node,
              crossAxis,
              collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross,
              crossAxisownerSize,
              ownerWidth) -
          paddingAndBorderAxisCross;
    }    if (!isNodeFlexWrap  measureModeCrossDim == YGMeasureMode.Exactly) {
      collectedFlexItemsValues.crossDim = availableInnerCrossDim;
    }    collectedFlexItemsValues.crossDim =
        YGNodeBoundAxis(
            node,
            crossAxis,
            collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross,
            crossAxisownerSize,
            ownerWidth) -
        paddingAndBorderAxisCross;    if (performLayout) {
      for (i = startOfLineIndex; i < endOfLineIndex; i++) {
        child: YGNode = node.getChild(i);
        if (child.getStyle().display == YGDisplay.None) {
          continue;
        }
        if (child.getStyle().positionType == YGPositionType.Absolute) {          bool isChildLeadingPosDefined =
              child.isLeadingPositionDefined(crossAxis);
          if (isChildLeadingPosDefined) {
            child.setLayoutPosition(
                YGUnwrapFloatOptional(child.getLeadingPosition(
                    crossAxis, availableInnerCrossDim)) +
                    node.getLeadingBorder(crossAxis) +
                    YGUnwrapFloatOptional(child.getLeadingMargin(
                        crossAxis, availableInnerWidth)),
                pos[crossAxis]);
          }

          if (!isChildLeadingPosDefined ||
              YGFloatIsUndefined(child.getLayout().position[pos[crossAxis]])) {
            child.setLayoutPosition(
                node.getLeadingBorder(crossAxis) +
                    YGUnwrapFloatOptional(child.getLeadingMargin(
                        crossAxis, availableInnerWidth)),
                pos[crossAxis]);
          }
        } else {
          float leadingCrossDim = leadingPaddingAndBorderCross;          YGAlign alignItem = YGNodeAlignItem(node, child);          if (alignItem == YGAlign.Stretch 
              child.marginLeadingValue(crossAxis).unit != YGUnit.Auto 
              child.marginTrailingValue(crossAxis).unit != YGUnit.Auto) {            if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
              float childMainSize =
                  child.getLayout().measuredDimensions[dim[mainAxis]];
              float childCrossSize =
                  !child.getStyle().aspectRatio.isUndefined()
                  ? ((YGUnwrapFloatOptional(child.getMarginForAxis(
                          crossAxis, availableInnerWidth)) +
                      (isMainAxisRow ? childMainSize /
                               child.getStyle().aspectRatio.getValue()
                                     : childMainSize *
                               child.getStyle().aspectRatio.getValue())))
                  : collectedFlexItemsValues.crossDim;

              childMainSize += YGUnwrapFloatOptional(
                  child.getMarginForAxis(mainAxis, availableInnerWidth));

              YGMeasureMode childMainMeasureMode = YGMeasureMode.Exactly;
              YGMeasureMode childCrossMeasureMode = YGMeasureMode.Exactly;
              YGConstrainMaxSizeForMode(child,
                                        mainAxis,
                                        availableInnerMainDim,
                                        availableInnerWidth,
                                        childMainMeasureMode,
                                        childMainSize);
              YGConstrainMaxSizeForMode(child,
                                        crossAxis,
                                        availableInnerCrossDim,
                                        availableInnerWidth,
                                        childCrossMeasureMode,
                                        childCrossSize);

              float childWidth = isMainAxisRow ? childMainSize : childCrossSize;
              float childHeight = !isMainAxisRow ? childMainSize : childCrossSize;

              YGMeasureMode childWidthMeasureMode =
                  YGFloatIsUndefined(childWidth) ? YGMeasureMode.Undefined
                                                 : YGMeasureMode.Exactly;
              YGMeasureMode childHeightMeasureMode =
                  YGFloatIsUndefined(childHeight) ? YGMeasureMode.Undefined
                                                  : YGMeasureMode.Exactly;

              YGLayoutNodeInternal(
                  child,
                  childWidth,
                  childHeight,
                  direction,
                  childWidthMeasureMode,
                  childHeightMeasureMode,
                  availableInnerWidth,
                  availableInnerHeight,
                  true,
                  "stretch",
                  config);
            }
          } else {
            float remainingCrossDim = containerCrossAxis -
                YGNodeDimWithMargin(child, crossAxis, availableInnerWidth);

            if (child.marginLeadingValue(crossAxis).unit == YGUnit.Auto 
                child.marginTrailingValue(crossAxis).unit == YGUnit.Auto) {
              leadingCrossDim += YGFloatMax(0.0f, remainingCrossDim / 2);
            } else if (
                child.marginTrailingValue(crossAxis).unit == YGUnit.Auto) {

            } else if (
                child.marginLeadingValue(crossAxis).unit == YGUnit.Auto) {
              leadingCrossDim += YGFloatMax(0.0f, remainingCrossDim);
            } else if (alignItem == YGAlign.FlexStart) {

            } else if (alignItem == YGAlignCenter) {
              leadingCrossDim += remainingCrossDim / 2;
            } else {
              leadingCrossDim += remainingCrossDim;
            }
          }

          child.setLayoutPosition(
              child.getLayout().position[pos[crossAxis]] + totalLineCrossDim +
                  leadingCrossDim,
              pos[crossAxis]);
        }
      }
    }

    totalLineCrossDim += collectedFlexItemsValues.crossDim;
    maxLineMainDim =
        YGFloatMax(maxLineMainDim, collectedFlexItemsValues.mainDim);
  }  if (performLayout  (lineCount > 1 || YGIsBaselineLayout(node)) 
      !YGFloatIsUndefined(availableInnerCrossDim)) {
    float remainingAlignContentDim = availableInnerCrossDim - totalLineCrossDim;

    float crossDimLead = 0;
    float currentLead = leadingPaddingAndBorderCross;

    switch (node.getStyle().alignContent) {
      case YGAlign.FlexEnd:
        currentLead += remainingAlignContentDim;
        break;
      case YGAlignCenter:
        currentLead += remainingAlignContentDim / 2;
        break;
      case YGAlign.Stretch:
        if (availableInnerCrossDim > totalLineCrossDim) {
          crossDimLead = remainingAlignContentDim / lineCount;
        }
        break;
      case YGAlignSpaceAround:
        if (availableInnerCrossDim > totalLineCrossDim) {
          currentLead += remainingAlignContentDim / (2 * lineCount);
          if (lineCount > 1) {
            crossDimLead = remainingAlignContentDim / lineCount;
          }
        } else {
          currentLead += remainingAlignContentDim / 2;
        }
        break;
      case YGAlignSpaceBetween:
        if (availableInnerCrossDim > totalLineCrossDim  lineCount > 1) {
          crossDimLead = remainingAlignContentDim / (lineCount - 1);
        }
        break;
      case YGAlign.Auto:
      case YGAlign.FlexStart:
      case YGAlign.Baseline:
        break;
    }

    endIndex = 0;
    for (i = 0; i < lineCount; i++) {
      startIndex = endIndex;
      ii;      float lineHeight = 0;
      float maxAscentForCurrentLine = 0;
      float maxDescentForCurrentLine = 0;
      for (ii = startIndex; ii < childCount; ii++) {
        child: YGNode = node.getChild(ii);
        if (child.getStyle().display == YGDisplay.None) {
          continue;
        }
        if (child.getStyle().positionType == YGPositionType.Relative) {
          if (child.getLineIndex() != i) {
            break;
          }
          if (YGNodeIsLayoutDimDefined(child, crossAxis)) {
            lineHeight = YGFloatMax(
                lineHeight,
                child.getLayout().measuredDimensions[dim[crossAxis]] +
                    YGUnwrapFloatOptional(child.getMarginForAxis(
                        crossAxis, availableInnerWidth)));
          }
          if (YGNodeAlignItem(node, child) == YGAlign.Baseline) {
            float ascent = YGBaseline(child) +
                YGUnwrapFloatOptional(child.getLeadingMargin(
                    YGFlexDirection.Column, availableInnerWidth));
            float descent =
                child.getLayout().measuredDimensions[YGDimension.Height] +
                YGUnwrapFloatOptional(child.getMarginForAxis(
                    YGFlexDirection.Column, availableInnerWidth)) -
                ascent;
            maxAscentForCurrentLine =
                YGFloatMax(maxAscentForCurrentLine, ascent);
            maxDescentForCurrentLine =
                YGFloatMax(maxDescentForCurrentLine, descent);
            lineHeight = YGFloatMax(
                lineHeight, maxAscentForCurrentLine + maxDescentForCurrentLine);
          }
        }
      }
      endIndex = ii;
      lineHeight += crossDimLead;

      if (performLayout) {
        for (ii = startIndex; ii < endIndex; ii++) {
          child: YGNode = node.getChild(ii);
          if (child.getStyle().display == YGDisplay.None) {
            continue;
          }
          if (child.getStyle().positionType == YGPositionType.Relative) {
            switch (YGNodeAlignItem(node, child)) {
              case YGAlign.FlexStart: {
                child.setLayoutPosition(
                    currentLead +
                        YGUnwrapFloatOptional(child.getLeadingMargin(
                            crossAxis, availableInnerWidth)),
                    pos[crossAxis]);
                break;
              }
              case YGAlign.FlexEnd: {
                child.setLayoutPosition(
                    currentLead + lineHeight -
                        YGUnwrapFloatOptional(child.getTrailingMargin(
                            crossAxis, availableInnerWidth)) -
                        child.getLayout().measuredDimensions[dim[crossAxis]],
                    pos[crossAxis]);
                break;
              }
              case YGAlignCenter: {
                float childHeight =
                    child.getLayout().measuredDimensions[dim[crossAxis]];

                child.setLayoutPosition(
                    currentLead + (lineHeight - childHeight) / 2,
                    pos[crossAxis]);
                break;
              }
              case YGAlign.Stretch: {
                child.setLayoutPosition(
                    currentLead +
                        YGUnwrapFloatOptional(child.getLeadingMargin(
                            crossAxis, availableInnerWidth)),
                    pos[crossAxis]);                if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
                  float childWidth = isMainAxisRow
                      ? (child.getLayout()
                             .measuredDimensions[YGDimension.Width] +
                         YGUnwrapFloatOptional(child.getMarginForAxis(
                             mainAxis, availableInnerWidth)))
                      : lineHeight;

                  float childHeight = !isMainAxisRow
                      ? (child.getLayout()
                             .measuredDimensions[YGDimension.Height] +
                         YGUnwrapFloatOptional(child.getMarginForAxis(
                             crossAxis, availableInnerWidth)))
                      : lineHeight;

                  if (!(YGFloatsEqual(
                            childWidth,
                            child.getLayout()
                                .measuredDimensions[YGDimension.Width]) 
                        YGFloatsEqual(
                            childHeight,
                            child.getLayout()
                                .measuredDimensions[YGDimension.Height]))) {
                    YGLayoutNodeInternal(child,
                                         childWidth,
                                         childHeight,
                                         direction,
                                         YGMeasureMode.Exactly,
                                         YGMeasureMode.Exactly,
                                         availableInnerWidth,
                                         availableInnerHeight,
                                         true,
                                         "multiline-stretch",
                                         config);
                  }
                }
                break;
              }
              case YGAlign.Baseline: {
                child.setLayoutPosition(
                    currentLead + maxAscentForCurrentLine - YGBaseline(child) +
                        YGUnwrapFloatOptional(child.getLeadingPosition(
                            YGFlexDirection.Column, availableInnerCrossDim)),
                    YGEdge.Top);

                break;
              }
              case YGAlign.Auto:
              case YGAlignSpaceBetween:
              case YGAlignSpaceAround:
                break;
            }
          }
        }
      }

      currentLead += lineHeight;
    }
  }  node.setLayoutMeasuredDimension(
      YGNodeBoundAxis(
          node,
          YGFlexDirection.Row,
          availableWidth - marginAxisRow,
          ownerWidth,
          ownerWidth),
      YGDimension.Width);

  node.setLayoutMeasuredDimension(
      YGNodeBoundAxis(
          node,
          YGFlexDirection.Column,
          availableHeight - marginAxisColumn,
          ownerHeight,
          ownerWidth),
      YGDimension.Height);  if (measureModeMainDim == YGMeasureMode.Undefined ||
      (node.getStyle().overflow != YGOverflowScroll 
       measureModeMainDim == YGMeasureMode.AtMost)) {    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node, mainAxis, maxLineMainDim, mainAxisownerSize, ownerWidth),
        dim[mainAxis]);

  } else if (
      measureModeMainDim == YGMeasureMode.AtMost 
      node.getStyle().overflow == YGOverflowScroll) {
    node.setLayoutMeasuredDimension(
        YGFloatMax(
            YGFloatMin(
                availableInnerMainDim + paddingAndBorderAxisMain,
                YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
                    node, mainAxis, maxLineMainDim, mainAxisownerSize))),
            paddingAndBorderAxisMain),
        dim[mainAxis]);
  }

  if (measureModeCrossDim == YGMeasureMode.Undefined ||
      (node.getStyle().overflow != YGOverflowScroll 
       measureModeCrossDim == YGMeasureMode.AtMost)) {    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            crossAxis,
            totalLineCrossDim + paddingAndBorderAxisCross,
            crossAxisownerSize,
            ownerWidth),
        dim[crossAxis]);

  } else if (
      measureModeCrossDim == YGMeasureMode.AtMost 
      node.getStyle().overflow == YGOverflowScroll) {
    node.setLayoutMeasuredDimension(
        YGFloatMax(
            YGFloatMin(
                availableInnerCrossDim + paddingAndBorderAxisCross,
                YGUnwrapFloatOptional(YGNodeBoundAxisWithinMinAndMax(
                    node,
                    crossAxis,
                    totalLineCrossDim + paddingAndBorderAxisCross,
                    crossAxisownerSize))),
            paddingAndBorderAxisCross),
        dim[crossAxis]);
  }  if (performLayout  node.getStyle().flexWrap == YGWrapWrapReverse) {
    for (i = 0; i < childCount; i++) {
      child: YGNode = YGNodeGetChild(node, i);
      if (child.getStyle().positionType == YGPositionType.Relative) {
        child.setLayoutPosition(
            node.getLayout().measuredDimensions[dim[crossAxis]] -
                child.getLayout().position[pos[crossAxis]] -
                child.getLayout().measuredDimensions[dim[crossAxis]],
            pos[crossAxis]);
      }
    }
  }

  if (performLayout) {

    for (auto child : node.getChildren()) {
      if (child.getStyle().positionType != YGPositionType.Absolute) {
        continue;
      }
      YGNodeAbsoluteLayoutChild(
          node,
          child,
          availableInnerWidth,
          isMainAxisRow ? measureModeMainDim : measureModeCrossDim,
          availableInnerHeight,
          direction,
          config);
    }    bool needsMainTrailingPos =
        mainAxis == YGFlexDirection.RowReverse || mainAxis == YGFlexDirection.ColumnReverse;
    bool needsCrossTrailingPos =
        crossAxis == YGFlexDirection.RowReverse || crossAxis == YGFlexDirection.ColumnReverse;    if (needsMainTrailingPos || needsCrossTrailingPos) {
      for (i = 0; i < childCount; i++) {
        child: YGNode = node.getChild(i);
        if (child.getStyle().display == YGDisplay.None) {
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

gDepth = 0;
bool gPrintTree = false;
bool gPrintChanges = false;
bool gPrintSkips = false;

char *spacer = "                                                            ";

char *YGSpacer(unsigned long level) {
  size_t spacerLen = strlen(spacer);
  if (level > spacerLen) {
    return spacer[0];
  } else {
    return spacer[spacerLen - level];
  }
}

char *YGMeasureModeName(YGMeasureMode mode, bool performLayout) {
  char *kMeasureModeNames[YGMeasureModeCount] = {"UNDEFINED", "EXACTLY", "AT_MOST"};
  char *kLayoutModeNames[YGMeasureModeCount] = {"LAY_UNDEFINED",
                                                      "LAY_EXACTLY",
                                                      "LAY_AT_"
                                                      "MOST"};

  if (mode >= YGMeasureModeCount) {
    return "";
  }

  return performLayout ? kLayoutModeNames[mode] : kMeasureModeNames[mode];
}

inline bool YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(YGMeasureMode sizeMode,
                                                                     float size,
                                                                     float lastComputedSize) {
  return sizeMode == YGMeasureMode.Exactly  YGFloatsEqual(size, lastComputedSize);
}

inline bool YGMeasureModeOldSizeIsUnspecifiedAndStillFits(YGMeasureMode sizeMode,
                                                                 float size,
                                                                 YGMeasureMode lastSizeMode,
                                                                 float lastComputedSize) {
  return sizeMode == YGMeasureMode.AtMost  lastSizeMode == YGMeasureMode.Undefined 
         (size >= lastComputedSize || YGFloatsEqual(size, lastComputedSize));
}

inline bool YGMeasureModeNewMeasureSizeIsStricterAndStillValid(YGMeasureMode sizeMode,
                                                                      float size,
                                                                      YGMeasureMode lastSizeMode,
                                                                      float lastSize,
                                                                      float lastComputedSize) {
  return lastSizeMode == YGMeasureMode.AtMost 
      sizeMode == YGMeasureMode.AtMost  !YGFloatIsUndefined(lastSize) 
      !YGFloatIsUndefined(size)  !YGFloatIsUndefined(lastComputedSize) 
      lastSize > size 
      (lastComputedSize <= size || YGFloatsEqual(size, lastComputedSize));
}

float YGRoundValueToPixelGrid(float value,
                              float pointScaleFactor,
                              bool forceCeil,
                              bool forceFloor) {
  float scaledValue = value * pointScaleFactor;
  float fractial = fmodf(scaledValue, 1.0f);
  if (YGFloatsEqual(fractial, 0)) {

    scaledValue = scaledValue - fractial;
  } else if (YGFloatsEqual(fractial, 1.0f)) {
    scaledValue = scaledValue - fractial + 1.0f;
  } else if (forceCeil) {

    scaledValue = scaledValue - fractial + 1.0f;
  } else if (forceFloor) {
    scaledValue = scaledValue - fractial;
  } else {

    scaledValue = scaledValue - fractial +
        (!YGFloatIsUndefined(fractial) 
                 (fractial > 0.5f || YGFloatsEqual(fractial, 0.5f))
             ? 1.0f
             : 0.0f);
  }
  return (YGFloatIsUndefined(scaledValue) ||
          YGFloatIsUndefined(pointScaleFactor))
      ? YGUndefined
      : scaledValue / pointScaleFactor;
}

bool YGNodeCanUseCachedMeasurement(YGMeasureMode widthMode,
                                   float width,
                                   YGMeasureMode heightMode,
                                   float height,
                                   YGMeasureMode lastWidthMode,
                                   float lastWidth,
                                   YGMeasureMode lastHeightMode,
                                   float lastHeight,
                                   float lastComputedWidth,
                                   float lastComputedHeight,
                                   float marginRow,
                                   float marginColumn,
                                   YGConfig config) {
  if ((!YGFloatIsUndefined(lastComputedHeight)  lastComputedHeight < 0) ||
      (!YGFloatIsUndefined(lastComputedWidth)  lastComputedWidth < 0)) {
    return false;
  }
  bool useRoundedComparison =
      config != null  config.pointScaleFactor != 0;
  float effectiveWidth =
      useRoundedComparison ? YGRoundValueToPixelGrid(width, config.pointScaleFactor, false, false)
                           : width;
  float effectiveHeight =
      useRoundedComparison ? YGRoundValueToPixelGrid(height, config.pointScaleFactor, false, false)
                           : height;
  float effectiveLastWidth =
      useRoundedComparison
          ? YGRoundValueToPixelGrid(lastWidth, config.pointScaleFactor, false, false)
          : lastWidth;
  float effectiveLastHeight =
      useRoundedComparison
          ? YGRoundValueToPixelGrid(lastHeight, config.pointScaleFactor, false, false)
          : lastHeight;

  bool hasSameWidthSpec =
      lastWidthMode == widthMode  YGFloatsEqual(effectiveLastWidth, effectiveWidth);
  bool hasSameHeightSpec =
      lastHeightMode == heightMode  YGFloatsEqual(effectiveLastHeight, effectiveHeight);

  bool widthIsCompatible =
      hasSameWidthSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(widthMode,
                                                                            width - marginRow,
                                                                            lastComputedWidth) ||
      YGMeasureModeOldSizeIsUnspecifiedAndStillFits(widthMode,
                                                    width - marginRow,
                                                    lastWidthMode,
                                                    lastComputedWidth) ||
      YGMeasureModeNewMeasureSizeIsStricterAndStillValid(
          widthMode, width - marginRow, lastWidthMode, lastWidth, lastComputedWidth);

  bool heightIsCompatible =
      hasSameHeightSpec || YGMeasureModeSizeIsExactAndMatchesOldMeasuredSize(heightMode,
                                                                             height - marginColumn,
                                                                             lastComputedHeight) ||
      YGMeasureModeOldSizeIsUnspecifiedAndStillFits(heightMode,
                                                    height - marginColumn,
                                                    lastHeightMode,
                                                    lastComputedHeight) ||
      YGMeasureModeNewMeasureSizeIsStricterAndStillValid(
          heightMode, height - marginColumn, lastHeightMode, lastHeight, lastComputedHeight);

  return widthIsCompatible  heightIsCompatible;
}
bool YGLayoutNodeInternal(node: YGNode,
                          float availableWidth,
                          float availableHeight,
                          YGDirection ownerDirection,
                          YGMeasureMode widthMeasureMode,
                          YGMeasureMode heightMeasureMode,
                          float ownerWidth,
                          float ownerHeight,
                          bool performLayout,
                          char *reason,
                          YGConfig config) {
  YGLayout* layout = node.getLayout();

  gDepth++;

  bool needToVisitNode =
      (node.isDirty()  layout.generationCount != gCurrentGenerationCount) ||
      layout.lastOwnerDirection != ownerDirection;

  if (needToVisitNode) {

    layout.nextCachedMeasurementsIndex = 0;
    layout.cachedLayout.widthMeasureMode = (YGMeasureMode) -1;
    layout.cachedLayout.heightMeasureMode = (YGMeasureMode) -1;
    layout.cachedLayout.computedWidth = -1;
    layout.cachedLayout.computedHeight = -1;
  }

  YGCachedMeasurement* cachedResults = null;  if (node.getMeasure() != null) {
    float marginAxisRow = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
    float marginAxisColumn = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));    if (YGNodeCanUseCachedMeasurement(widthMeasureMode,
                                      availableWidth,
                                      heightMeasureMode,
                                      availableHeight,
                                      layout.cachedLayout.widthMeasureMode,
                                      layout.cachedLayout.availableWidth,
                                      layout.cachedLayout.heightMeasureMode,
                                      layout.cachedLayout.availableHeight,
                                      layout.cachedLayout.computedWidth,
                                      layout.cachedLayout.computedHeight,
                                      marginAxisRow,
                                      marginAxisColumn,
                                      config)) {
      cachedResults = layout.cachedLayout;
    } else {

      for (i = 0; i < layout.nextCachedMeasurementsIndex; i++) {
        if (YGNodeCanUseCachedMeasurement(widthMeasureMode,
                                          availableWidth,
                                          heightMeasureMode,
                                          availableHeight,
                                          layout.cachedMeasurements[i].widthMeasureMode,
                                          layout.cachedMeasurements[i].availableWidth,
                                          layout.cachedMeasurements[i].heightMeasureMode,
                                          layout.cachedMeasurements[i].availableHeight,
                                          layout.cachedMeasurements[i].computedWidth,
                                          layout.cachedMeasurements[i].computedHeight,
                                          marginAxisRow,
                                          marginAxisColumn,
                                          config)) {
          cachedResults = layout.cachedMeasurements[i];
          break;
        }
      }
    }
  } else if (performLayout) {
    if (YGFloatsEqual(layout.cachedLayout.availableWidth, availableWidth) 
        YGFloatsEqual(layout.cachedLayout.availableHeight, availableHeight) 
        layout.cachedLayout.widthMeasureMode == widthMeasureMode 
        layout.cachedLayout.heightMeasureMode == heightMeasureMode) {
      cachedResults = layout.cachedLayout;
    }
  } else {
    for (i = 0; i < layout.nextCachedMeasurementsIndex; i++) {
      if (YGFloatsEqual(layout.cachedMeasurements[i].availableWidth, availableWidth) 
          YGFloatsEqual(layout.cachedMeasurements[i].availableHeight, availableHeight) 
          layout.cachedMeasurements[i].widthMeasureMode == widthMeasureMode 
          layout.cachedMeasurements[i].heightMeasureMode == heightMeasureMode) {
        cachedResults = layout.cachedMeasurements[i];
        break;
      }
    }
  }

  if (!needToVisitNode  cachedResults != null) {
    layout.measuredDimensions[YGDimension.Width] = cachedResults.computedWidth;
    layout.measuredDimensions[YGDimension.Height] = cachedResults.computedHeight;

    if (gPrintChanges  gPrintSkips) {
      YGLog(node, YGLogLevelVerbose, "%s%d.{[skipped] ", YGSpacer(gDepth), gDepth);
      if (node.getPrintFunc() != null) {
        node.getPrintFunc()(node);
      }
      YGLog(
          node,
          YGLogLevelVerbose,
          "wm: %s, hm: %s, aw: %f ah: %f => d: (%f, %f) %s\n",
          YGMeasureModeName(widthMeasureMode, performLayout),
          YGMeasureModeName(heightMeasureMode, performLayout),
          availableWidth,
          availableHeight,
          cachedResults.computedWidth,
          cachedResults.computedHeight,
          reason);
    }
  } else {
    if (gPrintChanges) {
      YGLog(
          node,
          YGLogLevelVerbose,
          "%s%d.{%s",
          YGSpacer(gDepth),
          gDepth,
          needToVisitNode ? "*" : "");
      if (node.getPrintFunc() != null) {
        node.getPrintFunc()(node);
      }
      YGLog(
          node,
          YGLogLevelVerbose,
          "wm: %s, hm: %s, aw: %f ah: %f %s\n",
          YGMeasureModeName(widthMeasureMode, performLayout),
          YGMeasureModeName(heightMeasureMode, performLayout),
          availableWidth,
          availableHeight,
          reason);
    }

    YGNodelayoutImpl(node,
                     availableWidth,
                     availableHeight,
                     ownerDirection,
                     widthMeasureMode,
                     heightMeasureMode,
                     ownerWidth,
                     ownerHeight,
                     performLayout,
                     config);

    if (gPrintChanges) {
      YGLog(
          node,
          YGLogLevelVerbose,
          "%s%d.}%s",
          YGSpacer(gDepth),
          gDepth,
          needToVisitNode ? "*" : "");
      if (node.getPrintFunc() != null) {
        node.getPrintFunc()(node);
      }
      YGLog(
          node,
          YGLogLevelVerbose,
          "wm: %s, hm: %s, d: (%f, %f) %s\n",
          YGMeasureModeName(widthMeasureMode, performLayout),
          YGMeasureModeName(heightMeasureMode, performLayout),
          layout.measuredDimensions[YGDimension.Width],
          layout.measuredDimensions[YGDimension.Height],
          reason);
    }

    layout.lastOwnerDirection = ownerDirection;

    if (cachedResults == null) {
      if (layout.nextCachedMeasurementsIndex == YG_MAX_CACHED_RESULT_COUNT) {
        if (gPrintChanges) {
          YGLog(node, YGLogLevelVerbose, "Out of cache entries!\n");
        }
        layout.nextCachedMeasurementsIndex = 0;
      }

      YGCachedMeasurement *newCacheEntry;
      if (performLayout) {

        newCacheEntry = layout.cachedLayout;
      } else {

        newCacheEntry = layout.cachedMeasurements[layout.nextCachedMeasurementsIndex];
        layout.nextCachedMeasurementsIndex++;
      }

      newCacheEntry.availableWidth = availableWidth;
      newCacheEntry.availableHeight = availableHeight;
      newCacheEntry.widthMeasureMode = widthMeasureMode;
      newCacheEntry.heightMeasureMode = heightMeasureMode;
      newCacheEntry.computedWidth = layout.measuredDimensions[YGDimension.Width];
      newCacheEntry.computedHeight = layout.measuredDimensions[YGDimension.Height];
    }
  }

  if (performLayout) {
    node.setLayoutDimension(
        node.getLayout().measuredDimensions[YGDimension.Width],
        YGDimension.Width);
    node.setLayoutDimension(
        node.getLayout().measuredDimensions[YGDimension.Height],
        YGDimension.Height);

    node.setHasNewLayout(true);
    node.setDirty(false);
  }

  gDepth--;
  layout.generationCount = gCurrentGenerationCount;
  return (needToVisitNode || cachedResults == null);
}

void YGConfigSetPointScaleFactor(YGConfig config, float pixelsInPoint) {
  YGAssertWithConfig(config, pixelsInPoint >= 0.0f, "Scale factor should not be less than zero");  if (pixelsInPoint == 0.0f) {

    config.pointScaleFactor = 0.0f;
  } else {
    config.pointScaleFactor = pixelsInPoint;
  }
}

void YGRoundToPixelGrid(node: YGNode,
                               float pointScaleFactor,
                               float absoluteLeft,
                               float absoluteTop) {
  if (pointScaleFactor == 0.0f) {
    return;
  }

  float nodeLeft = node.getLayout().position[YGEdgeLeft];
  float nodeTop = node.getLayout().position[YGEdge.Top];

  float nodeWidth = node.getLayout().dimensions[YGDimension.Width];
  float nodeHeight = node.getLayout().dimensions[YGDimension.Height];

  float absoluteNodeLeft = absoluteLeft + nodeLeft;
  float absoluteNodeTop = absoluteTop + nodeTop;

  float absoluteNodeRight = absoluteNodeLeft + nodeWidth;
  float absoluteNodeBottom = absoluteNodeTop + nodeHeight;  bool textRounding = node.getNodeType() == YGNodeTypeText;

  node.setLayoutPosition(
      YGRoundValueToPixelGrid(nodeLeft, pointScaleFactor, false, textRounding),
      YGEdgeLeft);

  node.setLayoutPosition(
      YGRoundValueToPixelGrid(nodeTop, pointScaleFactor, false, textRounding),
      YGEdge.Top);  bool hasFractionalWidth = !YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 0) 
                                  !YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 1.0);
  bool hasFractionalHeight = !YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 0) 
                                   !YGFloatsEqual(fmodf(nodeHeight * pointScaleFactor, 1.0), 1.0);

  node.setLayoutDimension(
      YGRoundValueToPixelGrid(
          absoluteNodeRight,
          pointScaleFactor,
          (textRounding  hasFractionalWidth),
          (textRounding  !hasFractionalWidth)) -
          YGRoundValueToPixelGrid(
              absoluteNodeLeft, pointScaleFactor, false, textRounding),
      YGDimension.Width);

  node.setLayoutDimension(
      YGRoundValueToPixelGrid(
          absoluteNodeBottom,
          pointScaleFactor,
          (textRounding  hasFractionalHeight),
          (textRounding  !hasFractionalHeight)) -
          YGRoundValueToPixelGrid(
              absoluteNodeTop, pointScaleFactor, false, textRounding),
      YGDimension.Height);

  childCount = YGNodeGetChildCount(node);
  for (i = 0; i < childCount; i++) {
    YGRoundToPixelGrid(
        YGNodeGetChild(node, i),
        pointScaleFactor,
        absoluteNodeLeft,
        absoluteNodeTop);
  }
}

void YGNodeCalculateLayout(
    node: YGNode,
    float ownerWidth,
    float ownerHeight,
    YGDirection ownerDirection) {  gCurrentGenerationCount++;
  node.resolveDimension();
  float width = YGUndefined;
  YGMeasureMode widthMeasureMode = YGMeasureMode.Undefined;
  if (YGNodeIsStyleDimDefined(node, YGFlexDirection.Row, ownerWidth)) {
    width = YGUnwrapFloatOptional(
        YGResolveValue(
            node.getResolvedDimension(dim[YGFlexDirection.Row]), ownerWidth) +
        node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
    widthMeasureMode = YGMeasureMode.Exactly;
  } else if (!YGResolveValue(
                  node.getStyle().maxDimensions[YGDimension.Width], ownerWidth)
                  .isUndefined()) {
    width = YGUnwrapFloatOptional(YGResolveValue(
        node.getStyle().maxDimensions[YGDimension.Width], ownerWidth));
    widthMeasureMode = YGMeasureMode.AtMost;
  } else {
    width = ownerWidth;
    widthMeasureMode = YGFloatIsUndefined(width) ? YGMeasureMode.Undefined
                                                 : YGMeasureMode.Exactly;
  }

  float height = YGUndefined;
  YGMeasureMode heightMeasureMode = YGMeasureMode.Undefined;
  if (YGNodeIsStyleDimDefined(node, YGFlexDirection.Column, ownerHeight)) {
    height = YGUnwrapFloatOptional(
        YGResolveValue(
            node.getResolvedDimension(dim[YGFlexDirection.Column]),
            ownerHeight) +
        node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));
    heightMeasureMode = YGMeasureMode.Exactly;
  } else if (!YGResolveValue(
                  node.getStyle().maxDimensions[YGDimension.Height],
                  ownerHeight)
                  .isUndefined()) {
    height = YGUnwrapFloatOptional(YGResolveValue(node.getStyle().maxDimensions[YGDimension.Height], ownerHeight));
    heightMeasureMode = YGMeasureMode.AtMost;
  } else {
    height = ownerHeight;
    heightMeasureMode = YGFloatIsUndefined(height) ? YGMeasureMode.Undefined
                                                   : YGMeasureMode.Exactly;
  }
  if (YGLayoutNodeInternal(
          node,
          width,
          height,
          ownerDirection,
          widthMeasureMode,
          heightMeasureMode,
          ownerWidth,
          ownerHeight,
          true,
          "initial",
          node.getConfig())) {
    node.setPosition(
        node.getLayout().direction, ownerWidth, ownerHeight, ownerWidth);
    YGRoundToPixelGrid(node, node.getConfig().pointScaleFactor, 0.0f, 0.0f);

    if (gPrintTree) {
      YGNodePrint(
          node,
          (YGPrintOptions)(
              YGPrintOptionsLayout | YGPrintOptionsChildren |
              YGPrintOptionsStyle));
    }
  }  if (node.getConfig().shouldDiffLayoutWithoutLegacyStretchBehaviour 
      node.didUseLegacyFlag()) {
    originalNode: YGNode = YGNodeDeepClone(node);
    originalNode.resolveDimension();

    originalNode.markDirtyAndPropogateDownwards();
    gCurrentGenerationCount++;

    originalNode.setAndPropogateUseLegacyFlag(false);
    if (YGLayoutNodeInternal(
            originalNode,
            width,
            height,
            ownerDirection,
            widthMeasureMode,
            heightMeasureMode,
            ownerWidth,
            ownerHeight,
            true,
            "initial",
            originalNode.getConfig())) {
      originalNode.setPosition(
          originalNode.getLayout().direction,
          ownerWidth,
          ownerHeight,
          ownerWidth);
      YGRoundToPixelGrid(
          originalNode,
          originalNode.getConfig().pointScaleFactor,
          0.0f,
          0.0f);      node.setLayoutDoesLegacyFlagAffectsLayout(
          !originalNode.isLayoutTreeEqualToNode(*node));

      if (gPrintTree) {
        YGNodePrint(
            originalNode,
            (YGPrintOptions)(
                YGPrintOptionsLayout | YGPrintOptionsChildren |
                YGPrintOptionsStyle));
      }
    }
    YGConfigFreeRecursive(originalNode);
    YGNodeFreeRecursive(originalNode);
  }
}

void YGConfigSetLogger(YGConfig config, YGLogger logger) {
  if (logger != null) {
    config.logger = logger;
  } else {
#ifdef ANDROID
    config.logger = YGAndroidLog;
#else
    config.logger = YGDefaultLog;
#endif
  }
}

void YGConfigSetShouldDiffLayoutWithoutLegacyStretchBehaviour(
    YGConfig config,
    bool shouldDiffLayout) {
  config.shouldDiffLayoutWithoutLegacyStretchBehaviour = shouldDiffLayout;
}

void YGVLog(YGConfig config,
                   node: YGNode,
                   YGLogLevel level,
                   char *format,
                   va_list args) {
  YGConfig logConfig = config != null ? config : YGConfigGetDefault();
  logConfig.logger(logConfig, node, level, format, args);

  if (level == YGLogLevelFatal) {
    abort();
  }
}

void YGLogWithConfig(YGConfig config, YGLogLevel level, char *format, ...) {
  va_list args;
  va_start(args, format);
  YGVLog(config, null, level, format, args);
  va_end(args);
}

void YGLog(node: YGNode, YGLogLevel level, char *format, ...) {
  va_list args;
  va_start(args, format);
  YGVLog(
      node == null ? null : node.getConfig(), node, level, format, args);
  va_end(args);
}

void YGAssert(bool condition, char *message) {
  if (!condition) {
    YGLog(null, YGLogLevelFatal, "%s\n", message);
  }
}

void YGAssertWithNode(node: YGNode, bool condition, char *message) {
  if (!condition) {
    YGLog(node, YGLogLevelFatal, "%s\n", message);
  }
}

void YGAssertWithConfig(YGConfig config, bool condition, char *message) {
  if (!condition) {
    YGLogWithConfig(config, YGLogLevelFatal, "%s\n", message);
  }
}

void YGConfigSetExperimentalFeatureEnabled(YGConfig config,
                                           YGExperimentalFeature feature,
                                           bool enabled) {
  config.experimentalFeatures[feature] = enabled;
}

inline bool YGConfigIsExperimentalFeatureEnabled(YGConfig config,
                                                 YGExperimentalFeature feature) {
  return config.experimentalFeatures[feature];
}

void YGConfigSetUseWebDefaults(YGConfig config, bool enabled) {
  config.useWebDefaults = enabled;
}

void YGConfigSetUseLegacyStretchBehaviour(YGConfig config,
                                          bool useLegacyStretchBehaviour) {
  config.useLegacyStretchBehaviour = useLegacyStretchBehaviour;
}

bool YGConfigGetUseWebDefaults(YGConfig config) {
  return config.useWebDefaults;
}

void YGConfigSetContext(YGConfig config, void *context) {
  config.context = context;
}

void *YGConfigGetContext(YGConfig config) {
  return config.context;
}

void YGConfigSetCloneNodeFunc(YGConfig config, YGCloneNodeFunc callback) {
  config.cloneNodeCallback = callback;
}

void YGTraverseChildrenPreOrder(YGVector children, std::function<void(node: YGNode)> f) {
  for (node: YGNode : children) {
    f(node);
    YGTraverseChildrenPreOrder(node.getChildren(), f);
  }
}

void YGTraversePreOrder(node: YGNode, std::function<void(node: YGNode)> f) {
  if (!node) {
    return;
  }
  f(node);
  YGTraverseChildrenPreOrder(node.getChildren(), f);
}
