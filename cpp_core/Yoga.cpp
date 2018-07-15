
int YGDefaultLog(YGConfig config,
                        node: YGNode,
                        YGLogLevel level,
                        char *format,
                        va_list args);

YGValue YGValueZero = {0, YGUnit.Point};
YGValue YGValueUndefined = {YGUndefined, YGUnit.Undefined};
YGValue YGValueAuto = {YGUndefined, YGUnit.Auto};

#define YG_UNUSED(x) (void)(x);

int YGDefaultLog(YGConfig config,
                        node: YGNode,
                        YGLogLevel level,
                        char *format,
                        va_list args) {
  YG_UNUSED(config);
  YG_UNUSED(node);
  switch (level) {
    case YGLogLevelError:
    case YGLogLevelFatal:
      return vfprintf(stderr, format, args);
    case YGLogLevelWarn:
    case YGLogLevelInfo:
    case YGLogLevelDebug:
    case YGLogLevelVerbose:
    default:
      return vprintf(format, args);
  }
}

#undef YG_UNUSED

void YGNodeRemoveChild(owner: YGNode, excludedChild: YGNode) {
  // This algorithm is a forked variant from cloneChildrenIfNeeded in YGNode
  // that excludes a child.
  childCount = YGNodeGetChildCount(owner);

  if (childCount == 0) {
    // This is an empty set. Nothing to remove.
    return;
  }
  firstChild: YGNode = YGNodeGetChild(owner, 0);
  if (firstChild.getOwner() == owner) {
    // If the first child has this node as its owner, we assume that it is already unique.
    // We can now try to delete a child in this list.
    if (owner.removeChild(excludedChild)) {
      excludedChild.setLayout(
          YGNode().getLayout()); // layout is no longer valid
      excludedChild.setOwner(null);
      owner.markDirtyAndPropogate();
    }
    return;
  }
  // Otherwise we have to clone the node list except for the child we're trying to delete.
  // We don't want to simply clone all children, because then the host will need to free
  // the clone of the child that was just deleted.
  YGCloneNodeFunc cloneNodeCallback =
      owner.getConfig().cloneNodeCallback;
  nextInsertIndex = 0;
  for (i = 0; i < childCount; i++) {
    oldChild: YGNode = owner.getChild(i);
    if (excludedChild == oldChild) {
      // Ignore the deleted child. Don't reset its layout or owner since it is still valid
      // in the other owner. However, since this owner has now changed, we need to mark it
      // as dirty.
      owner.markDirtyAndPropogate();
      continue;
    }
    newChild: YGNode = null;
    if (cloneNodeCallback) {
      newChild = cloneNodeCallback(oldChild, owner, nextInsertIndex);
    }
    if (newChild == null) {
      newChild = YGNodeClone(oldChild);
    }
    owner.replaceChild(newChild, nextInsertIndex);
    newChild.setOwner(owner);

    nextInsertIndex++;
  }
  while (nextInsertIndex < childCount) {
    owner.removeChild(nextInsertIndex);
    nextInsertIndex++;
  }
}

void YGNodeRemoveAllChildren(owner: YGNode) {
  childCount = YGNodeGetChildCount(owner);
  if (childCount == 0) {
    // This is an empty set already. Nothing to do.
    return;
  }
  firstChild: YGNode = YGNodeGetChild(owner, 0);
  if (firstChild.getOwner() == owner) {
    // If the first child has this node as its owner, we assume that this child set is unique.
    for (i = 0; i < childCount; i++) {
      oldChild: YGNode = YGNodeGetChild(owner, i);
      oldChild.setLayout(YGNode().getLayout()); // layout is no longer valid
      oldChild.setOwner(null);
    }
    owner.clearChildren();
    owner.markDirtyAndPropogate();
    return;
  }
  // Otherwise, we are not the owner of the child set. We don't have to do anything to clear it.
  owner.setChildren(YGVector());
  owner.markDirtyAndPropogate();
}

void YGNodeSetChildrenInternal(owner: YGNode, std::vector<YGNode> children)
{
  if (!owner) {
    return;
  }
  if (children.size() == 0) {
    if (YGNodeGetChildCount(owner) > 0) {
      for (child: YGNode : owner.getChildren()) {
        child.setLayout(YGLayout());
        child.setOwner(null);
      }
      owner.setChildren(YGVector());
      owner.markDirtyAndPropogate();
    }
  } else {
    if (YGNodeGetChildCount(owner) > 0) {
      for (oldChild: YGNode : owner.getChildren()) {
        // Our new children may have nodes in common with the old children. We don't reset these common nodes.
        if (std::find(children.begin(), children.end(), oldChild) == children.end()) {
          oldChild.setLayout(YGLayout());
          oldChild.setOwner(null);
        }
      }
    }
    owner.setChildren(children);
    for (child: YGNode : children) {
      child.setOwner(owner);
    }
    owner.markDirtyAndPropogate();
  }
}

void YGNodeSetChildren(owner: YGNode, c: YGNode[], count) {
  YGVector children = {c, c + count};
  YGNodeSetChildrenInternal(owner, children);
}

void YGNodeSetChildren(owner: YGNode, std::vector<YGNode> children)
{
  YGNodeSetChildrenInternal(owner, children);
}

YGNodeGetChild: YGNode(node: YGNode, index) {
  if (index < node.getChildren().size()) {
    return node.getChild(index);
  }
  return null;
}

YGNodeGetChildCount(node: YGNode) {
  return static_cast<uint32_t>(node.getChildren().size());
}

YGNodeGetOwner: YGNode(node: YGNode) {
  return node.getOwner();
}

YGNodeGetParent: YGNode(node: YGNode) {
  return node.getOwner();
}

void YGNodeMarkDirty(node: YGNode) {
  YGAssertWithNode(
      node,
      node.getMeasure() != null,
      "Only leaf nodes with custom measure functions"
      "should manually mark themselves as dirty");

  node.markDirtyAndPropogate();
}

void YGNodeCopyStyle(dstNode: YGNode, srcNode: YGNode) {
  if (!(dstNode.getStyle() == srcNode.getStyle())) {
    dstNode.setStyle(srcNode.getStyle());
    dstNode.markDirtyAndPropogate();
  }
}

float YGNodeStyleGetFlexGrow(node: YGNode) {
  return node.getStyle().flexGrow.isUndefined()
      ? kDefaultFlexGrow
      : node.getStyle().flexGrow.getValue();
}

float YGNodeStyleGetFlexShrink(node: YGNode) {
  return node.getStyle().flexShrink.isUndefined()
      ? (node.getConfig().useWebDefaults ? kWebDefaultFlexShrink
                                           : kDefaultFlexShrink)
      : node.getStyle().flexShrink.getValue();
}

#define YG_NODE_STYLE_PROPERTY_SETTER_IMPL(                               \
    type, name, paramName, instanceName)                                  \
  void YGNodeStyleSet##name(node: YGNode, type paramName) { \
    if (node.getStyle().instanceName != paramName) {                     \
      YGStyle style = node.getStyle();                                   \
      style.instanceName = paramName;                                     \
      node.setStyle(style);                                              \
      node.markDirtyAndPropogate();                                      \
    }                                                                     \
  }

#define YG_NODE_STYLE_PROPERTY_SETTER_UNIT_IMPL(                          \
    type, name, paramName, instanceName)                                  \
  void YGNodeStyleSet##name(node: YGNode, type paramName) { \
    YGValue value = {                                                     \
        YGFloatSanitize(paramName),                                       \
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point,    \
    };                                                                    \
    if ((node.getStyle().instanceName.value != value.value             \
         value.unit != YGUnit.Undefined) ||                                \
        node.getStyle().instanceName.unit != value.unit) {               \
      YGStyle style = node.getStyle();                                   \
      style.instanceName = value;                                         \
      node.setStyle(style);                                              \
      node.markDirtyAndPropogate();                                      \
    }                                                                     \
  }                                                                       \
                                                                          \
  void YGNodeStyleSet##name##Percent(                                     \
      node: YGNode, type paramName) {                       \
    YGValue value = {                                                     \
        YGFloatSanitize(paramName),                                       \
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Percent,  \
    };                                                                    \
    if ((node.getStyle().instanceName.value != value.value             \
         value.unit != YGUnit.Undefined) ||                                \
        node.getStyle().instanceName.unit != value.unit) {               \
      YGStyle style = node.getStyle();                                   \
                                                                          \
      style.instanceName = value;                                         \
      node.setStyle(style);                                              \
      node.markDirtyAndPropogate();                                      \
    }                                                                     \
  }

#define YG_NODE_STYLE_PROPERTY_SETTER_UNIT_AUTO_IMPL(                        \
    type, name, paramName, instanceName)                                     \
  void YGNodeStyleSet##name(node: YGNode, type paramName) {    \
    YGValue value = {                                                        \
        YGFloatSanitize(paramName),                                          \
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point,       \
    };                                                                       \
    if ((node.getStyle().instanceName.value != value.value                \
         value.unit != YGUnit.Undefined) ||                                   \
        node.getStyle().instanceName.unit != value.unit) {                  \
      YGStyle style = node.getStyle();                                      \
      style.instanceName = value;                                            \
      node.setStyle(style);                                                 \
      node.markDirtyAndPropogate();                                         \
    }                                                                        \
  }                                                                          \
                                                                             \
  void YGNodeStyleSet##name##Percent(                                        \
      node: YGNode, type paramName) {                          \
    if (node.getStyle().instanceName.value != YGFloatSanitize(paramName) || \
        node.getStyle().instanceName.unit != YGUnit.Percent) {               \
      YGStyle style = node.getStyle();                                      \
      style.instanceName.value = YGFloatSanitize(paramName);                 \
      style.instanceName.unit =                                              \
          YGFloatIsUndefined(paramName) ? YGUnit.Auto : YGUnit.Percent;        \
      node.setStyle(style);                                                 \
      node.markDirtyAndPropogate();                                         \
    }                                                                        \
  }                                                                          \
                                                                             \
  void YGNodeStyleSet##name##Auto(node: YGNode) {                    \
    if (node.getStyle().instanceName.unit != YGUnit.Auto) {                  \
      YGStyle style = node.getStyle();                                      \
      style.instanceName.value = 0;                                          \
      style.instanceName.unit = YGUnit.Auto;                                  \
      node.setStyle(style);                                                 \
      node.markDirtyAndPropogate();                                         \
    }                                                                        \
  }

#define YG_NODE_STYLE_PROPERTY_IMPL(type, name, paramName, instanceName)  \
  YG_NODE_STYLE_PROPERTY_SETTER_IMPL(type, name, paramName, instanceName) \
                                                                          \
  type YGNodeStyleGet##name(node: YGNode) {                       \
    return node.getStyle().instanceName;                                 \
  }

#define YG_NODE_STYLE_PROPERTY_UNIT_IMPL(type, name, paramName, instanceName) \
  YG_NODE_STYLE_PROPERTY_SETTER_UNIT_IMPL(                                    \
      float, name, paramName, instanceName)                                   \
                                                                              \
  type YGNodeStyleGet##name(node: YGNode) {                           \
    YGValue value = node.getStyle().instanceName;                            \
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {          \
      value.value = YGUndefined;                                              \
    }                                                                         \
    return value;                                                             \
  }

#define YG_NODE_STYLE_PROPERTY_UNIT_AUTO_IMPL(                       \
    type, name, paramName, instanceName)                             \
  YG_NODE_STYLE_PROPERTY_SETTER_UNIT_AUTO_IMPL(                      \
      float, name, paramName, instanceName)                          \
                                                                     \
  type YGNodeStyleGet##name(node: YGNode) {                  \
    YGValue value = node.getStyle().instanceName;                   \
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) { \
      value.value = YGUndefined;                                     \
    }                                                                \
    return value;                                                    \
  }

#define YG_NODE_STYLE_EDGE_PROPERTY_UNIT_AUTO_IMPL(type, name, instanceName) \
  void YGNodeStyleSet##name##Auto(node: YGNode, YGEdge edge) { \
    if (node.getStyle().instanceName[edge].unit != YGUnit.Auto) {            \
      YGStyle style = node.getStyle();                                      \
      style.instanceName[edge].value = 0;                                    \
      style.instanceName[edge].unit = YGUnit.Auto;                            \
      node.setStyle(style);                                                 \
      node.markDirtyAndPropogate();                                         \
    }                                                                        \
  }

#define YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL(                           \
    type, name, paramName, instanceName)                                 \
  void YGNodeStyleSet##name(                                             \
      node: YGNode, YGEdge edge, float paramName) {  \
    YGValue value = {                                                    \
        YGFloatSanitize(paramName),                                      \
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point,   \
    };                                                                   \
    if ((node.getStyle().instanceName[edge].value != value.value      \
         value.unit != YGUnit.Undefined) ||                               \
        node.getStyle().instanceName[edge].unit != value.unit) {        \
      YGStyle style = node.getStyle();                                  \
      style.instanceName[edge] = value;                                  \
      node.setStyle(style);                                             \
      node.markDirtyAndPropogate();                                     \
    }                                                                    \
  }                                                                      \
                                                                         \
  void YGNodeStyleSet##name##Percent(                                    \
      node: YGNode, YGEdge edge, float paramName) {  \
    YGValue value = {                                                    \
        YGFloatSanitize(paramName),                                      \
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Percent, \
    };                                                                   \
    if ((node.getStyle().instanceName[edge].value != value.value      \
         value.unit != YGUnit.Undefined) ||                               \
        node.getStyle().instanceName[edge].unit != value.unit) {        \
      YGStyle style = node.getStyle();                                  \
      style.instanceName[edge] = value;                                  \
      node.setStyle(style);                                             \
      node.markDirtyAndPropogate();                                     \
    }                                                                    \
  }                                                                      \
                                                                         \
  WIN_STRUCT(type)                                                       \
  YGNodeStyleGet##name(node: YGNode, YGEdge edge) {        \
    YGValue value = node.getStyle().instanceName[edge];                 \
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {     \
      value.value = YGUndefined;                                         \
    }                                                                    \
    return WIN_STRUCT_REF(value);                                        \
  }

#define YG_NODE_LAYOUT_PROPERTY_IMPL(type, name, instanceName) \
  type YGNodeLayoutGet##name(node: YGNode) {           \
    return node.getLayout().instanceName;                     \
  }

#define YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL(type, name, instanceName) \
  type YGNodeLayoutGet##name(node: YGNode, YGEdge edge) { \
    YGAssertWithNode(                                                   \
        node,                                                           \
        edge <= YGEdgeEnd,                                              \
        "Cannot get layout properties of multi-edge shorthands");       \
                                                                        \
    if (edge == YGEdgeLeft) {                                           \
      if (node.getLayout().direction == YGDirectionRTL) {              \
        return node.getLayout().instanceName[YGEdgeEnd];               \
      } else {                                                          \
        return node.getLayout().instanceName[YGEdgeStart];             \
      }                                                                 \
    }                                                                   \
                                                                        \
    if (edge == YGEdgeRight) {                                          \
      if (node.getLayout().direction == YGDirectionRTL) {              \
        return node.getLayout().instanceName[YGEdgeStart];             \
      } else {                                                          \
        return node.getLayout().instanceName[YGEdgeEnd];               \
      }                                                                 \
    }                                                                   \
                                                                        \
    return node.getLayout().instanceName[edge];                        \
  }

// YG_NODE_PROPERTY_IMPL(void *, Context, context, context);
// YG_NODE_PROPERTY_IMPL(YGPrintFunc, PrintFunc, printFunc, print);
// YG_NODE_PROPERTY_IMPL(bool, HasNewLayout, hasNewLayout, hasNewLayout);
// YG_NODE_PROPERTY_IMPL(YGNodeType, NodeType, nodeType, nodeType);

YG_NODE_STYLE_PROPERTY_IMPL(YGDirection, Direction, direction, direction);
YG_NODE_STYLE_PROPERTY_IMPL(YGFlexDirection, FlexDirection, flexDirection, flexDirection);
YG_NODE_STYLE_PROPERTY_IMPL(YGJustify, JustifyContent, justifyContent, justifyContent);
YG_NODE_STYLE_PROPERTY_IMPL(YGAlign, AlignContent, alignContent, alignContent);
YG_NODE_STYLE_PROPERTY_IMPL(YGAlign, AlignItems, alignItems, alignItems);
YG_NODE_STYLE_PROPERTY_IMPL(YGAlign, AlignSelf, alignSelf, alignSelf);
YG_NODE_STYLE_PROPERTY_IMPL(YGPositionType, PositionType, positionType, positionType);
YG_NODE_STYLE_PROPERTY_IMPL(YGWrap, FlexWrap, flexWrap, flexWrap);
YG_NODE_STYLE_PROPERTY_IMPL(YGOverflow, Overflow, overflow, overflow);
YG_NODE_STYLE_PROPERTY_IMPL(YGDisplay, Display, display, display);

// TODO(T26792433): Change the API to accept YGFloatOptional.
void YGNodeStyleSetFlex(node: YGNode, float flex) {
  if (node.getStyle().flex != flex) {
    YGStyle style = node.getStyle();
    if (YGFloatIsUndefined(flex)) {
      style.flex = YGFloatOptional();
    } else {
      style.flex = YGFloatOptional(flex);
    }
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

// TODO(T26792433): Change the API to accept YGFloatOptional.
float YGNodeStyleGetFlex(node: YGNode) {
  return node.getStyle().flex.isUndefined() ? YGUndefined
                                             : node.getStyle().flex.getValue();
}

// TODO(T26792433): Change the API to accept YGFloatOptional.
void YGNodeStyleSetFlexGrow(node: YGNode, float flexGrow) {
  if (node.getStyle().flexGrow != flexGrow) {
    YGStyle style = node.getStyle();
    if (YGFloatIsUndefined(flexGrow)) {
      style.flexGrow = YGFloatOptional();
    } else {
      style.flexGrow = YGFloatOptional(flexGrow);
    }
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

// TODO(T26792433): Change the API to accept YGFloatOptional.
void YGNodeStyleSetFlexShrink(node: YGNode, float flexShrink) {
  if (node.getStyle().flexShrink != flexShrink) {
    YGStyle style = node.getStyle();
    if (YGFloatIsUndefined(flexShrink)) {
      style.flexShrink = YGFloatOptional();
    } else {
      style.flexShrink = YGFloatOptional(flexShrink);
    }
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

YGValue YGNodeStyleGetFlexBasis(node: YGNode) {
  YGValue flexBasis = node.getStyle().flexBasis;
  if (flexBasis.unit == YGUnit.Undefined || flexBasis.unit == YGUnit.Auto) {
    // TODO(T26792433): Get rid off the use of YGUndefined at client side
    flexBasis.value = YGUndefined;
  }
  return flexBasis;
}

void YGNodeStyleSetFlexBasis(node: YGNode, float flexBasis) {
  YGValue value = {
      YGFloatSanitize(flexBasis),
      YGFloatIsUndefined(flexBasis) ? YGUnit.Undefined : YGUnit.Point,
  };
  if ((node.getStyle().flexBasis.value != value.value 
       value.unit != YGUnit.Undefined) ||
      node.getStyle().flexBasis.unit != value.unit) {
    YGStyle style = node.getStyle();
    style.flexBasis = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

void YGNodeStyleSetFlexBasisPercent(
    node: YGNode,
    float flexBasisPercent) {
  if (node.getStyle().flexBasis.value != flexBasisPercent ||
      node.getStyle().flexBasis.unit != YGUnit.Percent) {
    YGStyle style = node.getStyle();
    style.flexBasis.value = YGFloatSanitize(flexBasisPercent);
    style.flexBasis.unit =
        YGFloatIsUndefined(flexBasisPercent) ? YGUnit.Auto : YGUnit.Percent;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

void YGNodeStyleSetFlexBasisAuto(node: YGNode) {
  if (node.getStyle().flexBasis.unit != YGUnit.Auto) {
    YGStyle style = node.getStyle();
    style.flexBasis.value = 0;
    style.flexBasis.unit = YGUnit.Auto;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL(YGValue, Position, position, position);
YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL(YGValue, Margin, margin, margin);
YG_NODE_STYLE_EDGE_PROPERTY_UNIT_AUTO_IMPL(YGValue, Margin, margin);
YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL(YGValue, Padding, padding, padding);

// TODO(T26792433): Change the API to accept YGFloatOptional.
void YGNodeStyleSetBorder(
    node: YGNode,
    YGEdge edge,
    float border) {
  YGValue value = {
      YGFloatSanitize(border),
      YGFloatIsUndefined(border) ? YGUnit.Undefined : YGUnit.Point,
  };
  if ((node.getStyle().border[edge].value != value.value 
       value.unit != YGUnit.Undefined) ||
      node.getStyle().border[edge].unit != value.unit) {
    YGStyle style = node.getStyle();
    style.border[edge] = value;
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

float YGNodeStyleGetBorder(node: YGNode, YGEdge edge) {
  if (node.getStyle().border[edge].unit == YGUnit.Undefined ||
      node.getStyle().border[edge].unit == YGUnit.Auto) {
    // TODO(T26792433): Rather than returning YGUndefined, change the api to
    // return YGFloatOptional.
    return YGUndefined;
  }

  return node.getStyle().border[edge].value;
}

// Yoga specific properties, not compatible with flexbox specification

// TODO(T26792433): Change the API to accept YGFloatOptional.
float YGNodeStyleGetAspectRatio(node: YGNode) {
  YGFloatOptional op = node.getStyle().aspectRatio;
  return op.isUndefined() ? YGUndefined : op.getValue();
}

// TODO(T26792433): Change the API to accept YGFloatOptional.
void YGNodeStyleSetAspectRatio(node: YGNode, float aspectRatio) {
  if (node.getStyle().aspectRatio != aspectRatio) {
    YGStyle style = node.getStyle();
    style.aspectRatio = YGFloatOptional(aspectRatio);
    node.setStyle(style);
    node.markDirtyAndPropogate();
  }
}

YG_NODE_STYLE_PROPERTY_UNIT_AUTO_IMPL(YGValue, Width, width, dimensions[YGDimensionWidth]);
YG_NODE_STYLE_PROPERTY_UNIT_AUTO_IMPL(YGValue, Height, height, dimensions[YGDimensionHeight]);
YG_NODE_STYLE_PROPERTY_UNIT_IMPL(YGValue, MinWidth, minWidth, minDimensions[YGDimensionWidth]);
YG_NODE_STYLE_PROPERTY_UNIT_IMPL(YGValue, MinHeight, minHeight, minDimensions[YGDimensionHeight]);
YG_NODE_STYLE_PROPERTY_UNIT_IMPL(YGValue, MaxWidth, maxWidth, maxDimensions[YGDimensionWidth]);
YG_NODE_STYLE_PROPERTY_UNIT_IMPL(YGValue, MaxHeight, maxHeight, maxDimensions[YGDimensionHeight]);
YG_NODE_LAYOUT_PROPERTY_IMPL(float, Left, position[YGEdgeLeft]);
YG_NODE_LAYOUT_PROPERTY_IMPL(float, Top, position[YGEdgeTop]);
YG_NODE_LAYOUT_PROPERTY_IMPL(float, Right, position[YGEdgeRight]);
YG_NODE_LAYOUT_PROPERTY_IMPL(float, Bottom, position[YGEdgeBottom]);
YG_NODE_LAYOUT_PROPERTY_IMPL(float, Width, dimensions[YGDimensionWidth]);
YG_NODE_LAYOUT_PROPERTY_IMPL(float, Height, dimensions[YGDimensionHeight]);
YG_NODE_LAYOUT_PROPERTY_IMPL(YGDirection, Direction, direction);
YG_NODE_LAYOUT_PROPERTY_IMPL(bool, HadOverflow, hadOverflow);

YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL(float, Margin, margin);
YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL(float, Border, border);
YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL(float, Padding, padding);

bool YGNodeLayoutGetDidLegacyStretchFlagAffectLayout(node: YGNode) {
  return node.getLayout().doesLegacyStretchFlagAffectsLayout;
}

gCurrentGenerationCount = 0;

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
                          YGConfig config);

void YGNodePrintInternal(node: YGNode,
                                YGPrintOptions options) {
  std::string str;
  facebook::yoga::YGNodeToString(str, node, options, 0);
  YGLog(node, YGLogLevelDebug, str.c_str());
}

void YGNodePrint(node: YGNode, YGPrintOptions options) {
  YGNodePrintInternal(node, options);
}

inline float YGNodePaddingAndBorderForAxis(node: YGNode,
                                                  YGFlexDirection axis,
                                                  float widthSize) {
  return YGUnwrapFloatOptional(
      node.getLeadingPaddingAndBorder(axis, widthSize) +
      node.getTrailingPaddingAndBorder(axis, widthSize));
}

inline YGAlign YGNodeAlignItem(node: YGNode, child: YGNode) {
  YGAlign align = child.getStyle().alignSelf == YGAlignAuto
      ? node.getStyle().alignItems
      : child.getStyle().alignSelf;
  if (align == YGAlignBaseline 
      YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
    return YGAlignFlexStart;
  }
  return align;
}

float YGBaseline(node: YGNode) {
  if (node.getBaseline() != null) {
    float baseline = node.getBaseline()(
        node,
        node.getLayout().measuredDimensions[YGDimensionWidth],
        node.getLayout().measuredDimensions[YGDimensionHeight]);
    YGAssertWithNode(node,
                     !YGFloatIsUndefined(baseline),
                     "Expect custom baseline function to not return NaN");
    return baseline;
  }

  baselineChild: YGNode = null;
  childCount = YGNodeGetChildCount(node);
  for (i = 0; i < childCount; i++) {
    child: YGNode = YGNodeGetChild(node, i);
    if (child.getLineIndex() > 0) {
      break;
    }
    if (child.getStyle().positionType == YGPositionTypeAbsolute) {
      continue;
    }
    if (YGNodeAlignItem(node, child) == YGAlignBaseline) {
      baselineChild = child;
      break;
    }

    if (baselineChild == null) {
      baselineChild = child;
    }
  }

  if (baselineChild == null) {
    return node.getLayout().measuredDimensions[YGDimensionHeight];
  }

  float baseline = YGBaseline(baselineChild);
  return baseline + baselineChild.getLayout().position[YGEdgeTop];
}

bool YGIsBaselineLayout(node: YGNode) {
  if (YGFlexDirectionIsColumn(node.getStyle().flexDirection)) {
    return false;
  }
  if (node.getStyle().alignItems == YGAlignBaseline) {
    return true;
  }
  childCount = YGNodeGetChildCount(node);
  for (i = 0; i < childCount; i++) {
    child: YGNode = YGNodeGetChild(node, i);
    if (child.getStyle().positionType == YGPositionType.Relative 
        child.getStyle().alignSelf == YGAlignBaseline) {
      return true;
    }
  }

  return false;
}

inline float YGNodeDimWithMargin(node: YGNode,
                                        YGFlexDirection axis,
                                        float widthSize) {
  return node.getLayout().measuredDimensions[dim[axis]] +
      YGUnwrapFloatOptional(
             node.getLeadingMargin(axis, widthSize) +
             node.getTrailingMargin(axis, widthSize));
}

inline bool YGNodeIsStyleDimDefined(node: YGNode,
                                           YGFlexDirection axis,
                                           float ownerSize) {
  bool isUndefined =
      YGFloatIsUndefined(node.getResolvedDimension(dim[axis]).value);
  return !(
      node.getResolvedDimension(dim[axis]).unit == YGUnit.Auto ||
      node.getResolvedDimension(dim[axis]).unit == YGUnit.Undefined ||
      (node.getResolvedDimension(dim[axis]).unit == YGUnit.Point 
       !isUndefined  node.getResolvedDimension(dim[axis]).value < 0.0f) ||
      (node.getResolvedDimension(dim[axis]).unit == YGUnit.Percent 
       !isUndefined 
       (node.getResolvedDimension(dim[axis]).value < 0.0f ||
        YGFloatIsUndefined(ownerSize))));
}

inline bool YGNodeIsLayoutDimDefined(node: YGNode, YGFlexDirection axis) {
  float value = node.getLayout().measuredDimensions[dim[axis]];
  return !YGFloatIsUndefined(value)  value >= 0.0f;
}

YGFloatOptional YGNodeBoundAxisWithinMinAndMax(
    node: YGNode,
    YGFlexDirection axis,
    float value,
    float axisSize) {
  YGFloatOptional min;
  YGFloatOptional max;

  if (YGFlexDirectionIsColumn(axis)) {
    min = YGResolveValue(
        node.getStyle().minDimensions[YGDimensionHeight], axisSize);
    max = YGResolveValue(
        node.getStyle().maxDimensions[YGDimensionHeight], axisSize);
  } else if (YGFlexDirectionIsRow(axis)) {
    min = YGResolveValue(
        node.getStyle().minDimensions[YGDimensionWidth], axisSize);
    max = YGResolveValue(
        node.getStyle().maxDimensions[YGDimensionWidth], axisSize);
  }

  if (!max.isUndefined()  max.getValue() >= 0  value > max.getValue()) {
    return max;
  }

  if (!min.isUndefined()  min.getValue() >= 0  value < min.getValue()) {
    return min;
  }

  return YGFloatOptional(value);
}

// Like YGNodeBoundAxisWithinMinAndMax but also ensures that the value doesn't go
// below the
// padding and border amount.
inline float YGNodeBoundAxis(node: YGNode,
                                    YGFlexDirection axis,
                                    float value,
                                    float axisSize,
                                    float widthSize) {
  return YGFloatMax(
      YGUnwrapFloatOptional(
          YGNodeBoundAxisWithinMinAndMax(node, axis, value, axisSize)),
      YGNodePaddingAndBorderForAxis(node, axis, widthSize));
}

void YGNodeSetChildTrailingPosition(node: YGNode,
                                           child: YGNode,
                                           YGFlexDirection axis) {
  float size = child.getLayout().measuredDimensions[dim[axis]];
  child.setLayoutPosition(
      node.getLayout().measuredDimensions[dim[axis]] - size -
          child.getLayout().position[pos[axis]],
      trailing[axis]);
}

void YGConstrainMaxSizeForMode(node: YGNode,
                                      enum YGFlexDirection axis,
                                      float ownerAxisSize,
                                      float ownerWidth,
                                      YGMeasureMode *mode,
                                      float *size) {
  YGFloatOptional maxSize =
      YGResolveValue(
          node.getStyle().maxDimensions[dim[axis]], ownerAxisSize) +
      YGFloatOptional(node.getMarginForAxis(axis, ownerWidth));
  switch (*mode) {
    case YGMeasureMode.Exactly:
    case YGMeasureMode.AtMost:
      *size = (maxSize.isUndefined() || *size < maxSize.getValue())
          ? *size
          : maxSize.getValue();
      break;
    case YGMeasureMode.Undefined:
      if (!maxSize.isUndefined()) {
        *mode = YGMeasureMode.AtMost;
        *size = maxSize.getValue();
      }
      break;
  }
}

void YGNodeComputeFlexBasisForChild(node: YGNode,
                                           child: YGNode,
                                           float width,
                                           YGMeasureMode widthMode,
                                           float height,
                                           float ownerWidth,
                                           float ownerHeight,
                                           YGMeasureMode heightMode,
                                           YGDirection direction,
                                           YGConfig config) {
  YGFlexDirection mainAxis =
      YGResolveFlexDirection(node.getStyle().flexDirection, direction);
  bool isMainAxisRow = YGFlexDirectionIsRow(mainAxis);
  float mainAxisSize = isMainAxisRow ? width : height;
  float mainAxisownerSize = isMainAxisRow ? ownerWidth : ownerHeight;

  float childWidth;
  float childHeight;
  YGMeasureMode childWidthMeasureMode;
  YGMeasureMode childHeightMeasureMode;

  YGFloatOptional resolvedFlexBasis =
      YGResolveValue(child.resolveFlexBasisPtr(), mainAxisownerSize);
  bool isRowStyleDimDefined = YGNodeIsStyleDimDefined(child, YGFlexDirection.Row, ownerWidth);
  bool isColumnStyleDimDefined =
      YGNodeIsStyleDimDefined(child, YGFlexDirection.Column, ownerHeight);

  if (!resolvedFlexBasis.isUndefined()  !YGFloatIsUndefined(mainAxisSize)) {
    if (child.getLayout().computedFlexBasis.isUndefined() ||
        (YGConfigIsExperimentalFeatureEnabled(
             child.getConfig(), YGExperimentalFeatureWebFlexBasis) 
         child.getLayout().computedFlexBasisGeneration !=
             gCurrentGenerationCount)) {
      YGFloatOptional paddingAndBorder = YGFloatOptional(
          YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth));
      child.setLayoutComputedFlexBasis(
          YGFloatOptionalMax(resolvedFlexBasis, paddingAndBorder));
    }
  } else if (isMainAxisRow  isRowStyleDimDefined) {
    // The width is definite, so use that as the flex basis.
    YGFloatOptional paddingAndBorder = YGFloatOptional(
        YGNodePaddingAndBorderForAxis(child, YGFlexDirection.Row, ownerWidth));

    child.setLayoutComputedFlexBasis(YGFloatOptionalMax(
        YGResolveValue(
            child.getResolvedDimension(YGDimensionWidth), ownerWidth),
        paddingAndBorder));
  } else if (!isMainAxisRow  isColumnStyleDimDefined) {
    // The height is definite, so use that as the flex basis.
    YGFloatOptional paddingAndBorder =
        YGFloatOptional(YGNodePaddingAndBorderForAxis(
            child, YGFlexDirection.Column, ownerWidth));
    child.setLayoutComputedFlexBasis(YGFloatOptionalMax(
        YGResolveValue(
            child.getResolvedDimension(YGDimensionHeight), ownerHeight),
        paddingAndBorder));
  } else {
    // Compute the flex basis and hypothetical main size (i.e. the clamped
    // flex basis).
    childWidth = YGUndefined;
    childHeight = YGUndefined;
    childWidthMeasureMode = YGMeasureMode.Undefined;
    childHeightMeasureMode = YGMeasureMode.Undefined;

    float marginRow = YGUnwrapFloatOptional(
        child.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
    float marginColumn = YGUnwrapFloatOptional(
        child.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

    if (isRowStyleDimDefined) {
      childWidth =
          YGUnwrapFloatOptional(YGResolveValue(
              child.getResolvedDimension(YGDimensionWidth), ownerWidth)) +
          marginRow;
      childWidthMeasureMode = YGMeasureMode.Exactly;
    }
    if (isColumnStyleDimDefined) {
      childHeight =
          YGUnwrapFloatOptional(YGResolveValue(
              child.getResolvedDimension(YGDimensionHeight), ownerHeight)) +
          marginColumn;
      childHeightMeasureMode = YGMeasureMode.Exactly;
    }

    // The W3C spec doesn't say anything about the 'overflow' property,
    // but all major browsers appear to implement the following logic.
    if ((!isMainAxisRow  node.getStyle().overflow == YGOverflowScroll) ||
        node.getStyle().overflow != YGOverflowScroll) {
      if (YGFloatIsUndefined(childWidth)  !YGFloatIsUndefined(width)) {
        childWidth = width;
        childWidthMeasureMode = YGMeasureMode.AtMost;
      }
    }

    if ((isMainAxisRow  node.getStyle().overflow == YGOverflowScroll) ||
        node.getStyle().overflow != YGOverflowScroll) {
      if (YGFloatIsUndefined(childHeight)  !YGFloatIsUndefined(height)) {
        childHeight = height;
        childHeightMeasureMode = YGMeasureMode.AtMost;
      }
    }

    if (!child.getStyle().aspectRatio.isUndefined()) {
      if (!isMainAxisRow  childWidthMeasureMode == YGMeasureMode.Exactly) {
        childHeight = marginColumn +
            (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
        childHeightMeasureMode = YGMeasureMode.Exactly;
      } else if (isMainAxisRow  childHeightMeasureMode == YGMeasureMode.Exactly) {
        childWidth = marginRow +
            (childHeight - marginColumn) *
                child.getStyle().aspectRatio.getValue();
        childWidthMeasureMode = YGMeasureMode.Exactly;
      }
    }

    // If child has no defined size in the cross axis and is set to stretch,
    // set the cross
    // axis to be measured exactly with the available inner width

    bool hasExactWidth = !YGFloatIsUndefined(width)  widthMode == YGMeasureMode.Exactly;
    bool childWidthStretch = YGNodeAlignItem(node, child) == YGAlignStretch 
                                   childWidthMeasureMode != YGMeasureMode.Exactly;
    if (!isMainAxisRow  !isRowStyleDimDefined  hasExactWidth  childWidthStretch) {
      childWidth = width;
      childWidthMeasureMode = YGMeasureMode.Exactly;
      if (!child.getStyle().aspectRatio.isUndefined()) {
        childHeight =
            (childWidth - marginRow) / child.getStyle().aspectRatio.getValue();
        childHeightMeasureMode = YGMeasureMode.Exactly;
      }
    }

    bool hasExactHeight = !YGFloatIsUndefined(height)  heightMode == YGMeasureMode.Exactly;
    bool childHeightStretch = YGNodeAlignItem(node, child) == YGAlignStretch 
                                    childHeightMeasureMode != YGMeasureMode.Exactly;
    if (isMainAxisRow  !isColumnStyleDimDefined  hasExactHeight  childHeightStretch) {
      childHeight = height;
      childHeightMeasureMode = YGMeasureMode.Exactly;

      if (!child.getStyle().aspectRatio.isUndefined()) {
        childWidth = (childHeight - marginColumn) *
            child.getStyle().aspectRatio.getValue();
        childWidthMeasureMode = YGMeasureMode.Exactly;
      }
    }

    YGConstrainMaxSizeForMode(
        child, YGFlexDirection.Row, ownerWidth, ownerWidth, childWidthMeasureMode, childWidth);
    YGConstrainMaxSizeForMode(child,
                              YGFlexDirection.Column,
                              ownerHeight,
                              ownerWidth,
                              childHeightMeasureMode,
                              childHeight);

    // Measure the child
    YGLayoutNodeInternal(child,
                         childWidth,
                         childHeight,
                         direction,
                         childWidthMeasureMode,
                         childHeightMeasureMode,
                         ownerWidth,
                         ownerHeight,
                         false,
                         "measure",
                         config);

    child.setLayoutComputedFlexBasis(YGFloatOptional(YGFloatMax(
        child.getLayout().measuredDimensions[dim[mainAxis]],
        YGNodePaddingAndBorderForAxis(child, mainAxis, ownerWidth))));
  }
  child.setLayoutComputedFlexBasisGeneration(gCurrentGenerationCount);
}

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
        YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimensionWidth), width)) +
        marginRow;
  } else {
    // If the child doesn't have a specified width, compute the width based
    // on the left/right
    // offsets if they're defined.
    if (child.isLeadingPositionDefined(YGFlexDirection.Row) 
        child.isTrailingPosDefined(YGFlexDirection.Row)) {
      childWidth = node.getLayout().measuredDimensions[YGDimensionWidth] -
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
        YGUnwrapFloatOptional(YGResolveValue(child.getResolvedDimension(YGDimensionHeight), height)) +
        marginColumn;
  } else {
    // If the child doesn't have a specified height, compute the height
    // based on the top/bottom
    // offsets if they're defined.
    if (child.isLeadingPositionDefined(YGFlexDirection.Column) 
        child.isTrailingPosDefined(YGFlexDirection.Column)) {
      childHeight =
          node.getLayout().measuredDimensions[YGDimensionHeight] -
          (node.getLeadingBorder(YGFlexDirection.Column) +
           node.getTrailingBorder(YGFlexDirection.Column)) -
          YGUnwrapFloatOptional(
              child.getLeadingPosition(YGFlexDirection.Column, height) +
              child.getTrailingPosition(YGFlexDirection.Column, height));
      childHeight = YGNodeBoundAxis(child, YGFlexDirection.Column, childHeight, height, width);
    }
  }

  // Exactly one dimension needs to be defined for us to be able to do aspect ratio
  // calculation. One dimension being the anchor and the other being flexible.
  if (YGFloatIsUndefined(childWidth) ^ YGFloatIsUndefined(childHeight)) {
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
  }

  // If we're still missing one or the other dimension, measure the content.
  if (YGFloatIsUndefined(childWidth) || YGFloatIsUndefined(childHeight)) {
    childWidthMeasureMode =
        YGFloatIsUndefined(childWidth) ? YGMeasureMode.Undefined : YGMeasureMode.Exactly;
    childHeightMeasureMode =
        YGFloatIsUndefined(childHeight) ? YGMeasureMode.Undefined : YGMeasureMode.Exactly;

    // If the size of the owner is defined then try to constrain the absolute child to that size
    // as well. This allows text within the absolute child to wrap to the size of its owner.
    // This is the same behavior as many browsers implement.
    if (!isMainAxisRow  YGFloatIsUndefined(childWidth) 
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
    childWidth = child.getLayout().measuredDimensions[YGDimensionWidth] +
        YGUnwrapFloatOptional(
                     child.getMarginForAxis(YGFlexDirection.Row, width));
    childHeight = child.getLayout().measuredDimensions[YGDimensionHeight] +
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
      ((YGNodeAlignItem(node, child) == YGAlignFlexEnd) ^
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
      node.getMarginForAxis(YGFlexDirection.Column, availableWidth));

  // We want to make sure we don't call measure with negative size
  float innerWidth = YGFloatIsUndefined(availableWidth)
      ? availableWidth
      : YGFloatMax(0, availableWidth - marginAxisRow - paddingAndBorderAxisRow);
  float innerHeight = YGFloatIsUndefined(availableHeight)
      ? availableHeight
      : YGFloatMax(
            0, availableHeight - marginAxisColumn - paddingAndBorderAxisColumn);

  if (widthMeasureMode == YGMeasureMode.Exactly 
      heightMeasureMode == YGMeasureMode.Exactly) {
    // Don't bother sizing the text if both dimensions are already defined.
    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Row,
            availableWidth - marginAxisRow,
            ownerWidth,
            ownerWidth),
        YGDimensionWidth);
    node.setLayoutMeasuredDimension(
        YGNodeBoundAxis(
            node,
            YGFlexDirection.Column,
            availableHeight - marginAxisColumn,
            ownerHeight,
            ownerWidth),
        YGDimensionHeight);
  } else {
    // Measure the text under the current constraints.
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
        YGDimensionWidth);

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
        YGDimensionHeight);
  }
}

// For nodes with no children, use the available values if they were provided,
// or the minimum size as indicated by the padding and border sizes.
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
      YGDimensionWidth);

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
      YGDimensionHeight);
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
        YGDimensionWidth);

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
        YGDimensionHeight);
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
      YGFlexDirectionIsRow(axis) ? YGDimensionWidth : YGDimensionHeight;

  float margin =
      YGUnwrapFloatOptional(node.getMarginForAxis(direction, ownerDim));
  float paddingAndBorder =
      YGNodePaddingAndBorderForAxis(node, direction, ownerDim);

  float availableInnerDim = availableDim - margin - paddingAndBorder;
  // Max dimension overrides predefined dimension value; Min dimension in turn
  // overrides both of the above
  if (!YGFloatIsUndefined(availableInnerDim)) {
    // We want to make sure our available height does not violate min and max
    // constraints
    YGFloatOptional minDimensionOptional = YGResolveValue(node.getStyle().minDimensions[dimension], ownerDim);
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
      YGFlexDirectionIsRow(mainAxis) ? widthMeasureMode : heightMeasureMode;
  // If there is only one child with flexGrow + flexShrink it means we can set
  // the computedFlexBasis to 0 instead of measuring and shrinking / flexing the
  // child to exactly match the remaining space
  if (measureModeMainDim == YGMeasureMode.Exactly) {
    for (auto child : children) {
      if (singleFlexChild != null) {
        if (child.isNodeFlexible()) {
          // There is already a flexible child, abort
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
      // Set the initial position (relative to the owner).
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

    if (child.getStyle().positionType == YGPositionTypeAbsolute) {
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

// This function assumes that all the children of node have their
// computedFlexBasis properly computed(To do this use
// YGNodeComputeFlexBasisForChildren function).
// This function calculates YGCollectFlexItemsRowMeasurement
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
  bool isNodeFlexWrap = node.getStyle().flexWrap != YGWrapNoWrap;

  // Add items to the current line until it's full or we run out of items.
  endOfLineIndex = startOfLineIndex;
  for (; endOfLineIndex < node.getChildrenCount(); endOfLineIndex++) {
    child: YGNode = node.getChild(endOfLineIndex);
    if (child.getStyle().display == YGDisplay.None ||
        child.getStyle().positionType == YGPositionTypeAbsolute) {
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
            mainAxisownerSize));

    // If this is a multi-line flow and this item pushes us over the
    // available size, we've
    // hit the end of the current line. Break out of the loop and lay out
    // the current line.
    if (sizeConsumedOnCurrentLineIncludingMinConstraint +
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
      flexAlgoRowMeasurement.totalFlexGrowFactors += child.resolveFlexGrow();

      // Unlike the grow factor, the shrink factor is scaled relative to the
      // child dimension.
      flexAlgoRowMeasurement.totalFlexShrinkScaledFactors +=
          -child.resolveFlexShrink() *
          YGUnwrapFloatOptional(child.getLayout().computedFlexBasis);
    }

    flexAlgoRowMeasurement.relativeChildren.push_back(child);
  }

  // The total flex factor needs to be floored to 1.
  if (flexAlgoRowMeasurement.totalFlexGrowFactors > 0 
      flexAlgoRowMeasurement.totalFlexGrowFactors < 1) {
    flexAlgoRowMeasurement.totalFlexGrowFactors = 1;
  }

  // The total flex shrink factor needs to be floored to 1.
  if (flexAlgoRowMeasurement.totalFlexShrinkScaledFactors > 0 
      flexAlgoRowMeasurement.totalFlexShrinkScaledFactors < 1) {
    flexAlgoRowMeasurement.totalFlexShrinkScaledFactors = 1;
  }
  flexAlgoRowMeasurement.endOfLineIndex = endOfLineIndex;
  return flexAlgoRowMeasurement;
}

// It distributes the free space to the flexible items and ensures that the size
// of the flex items abide the min and max constraints. At the end of this
// function the child nodes would have proper size. Prior using this function
// please ensure that YGDistributeFreeSpaceFirstPass is called.
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
      // Is this child able to shrink?
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
      flexGrowFactor = currentRelativeChild.resolveFlexGrow();

      // Is this child able to grow?
      if (!YGFloatIsUndefined(flexGrowFactor)  flexGrowFactor != 0) {
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
        YGNodeAlignItem(node, currentRelativeChild) == YGAlignStretch 
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
        YGNodeAlignItem(node, currentRelativeChild) == YGAlignStretch 
        currentRelativeChild.marginLeadingValue(crossAxis).unit !=
            YGUnit.Auto 
        currentRelativeChild.marginTrailingValue(crossAxis).unit != YGUnit.Auto;

    float childWidth = isMainAxisRow ? childMainSize : childCrossSize;
    float childHeight = !isMainAxisRow ? childMainSize : childCrossSize;

    YGMeasureMode childWidthMeasureMode =
        isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;
    YGMeasureMode childHeightMeasureMode =
        !isMainAxisRow ? childMainMeasureMode : childCrossMeasureMode;

    // Recursively call the layout algorithm for this child with the updated
    // main size.
    YGLayoutNodeInternal(
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

// It distributes the free space to the flexible items.For those flexible items
// whose min and max constraints are triggered, those flex item's clamped size
// is removed from the remaingfreespace.
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
          -currentRelativeChild.resolveFlexShrink() * childFlexBasis;

      // Is this child able to shrink?
      if (!YGFloatIsUndefined(flexShrinkScaledFactor) 
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
            baseMainSize != boundMainSize) {
          // By excluding this item's size and flex factor from remaining,
          // this item's
          // min/max constraints should also trigger in the second pass
          // resulting in the
          // item's size calculation being identical in the first and second
          // passes.
          deltaFreeSpace += boundMainSize - childFlexBasis;
          collectedFlexItemsValues.totalFlexShrinkScaledFactors -=
              flexShrinkScaledFactor;
        }
      }
    } else if (
        !YGFloatIsUndefined(collectedFlexItemsValues.remainingFreeSpace) 
        collectedFlexItemsValues.remainingFreeSpace > 0) {
      flexGrowFactor = currentRelativeChild.resolveFlexGrow();

      // Is this child able to grow?
      if (!YGFloatIsUndefined(flexGrowFactor)  flexGrowFactor != 0) {
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
            baseMainSize != boundMainSize) {
          // By excluding this item's size and flex factor from remaining,
          // this item's
          // min/max constraints should also trigger in the second pass
          // resulting in the
          // item's size calculation being identical in the first and second
          // passes.
          deltaFreeSpace += boundMainSize - childFlexBasis;
          collectedFlexItemsValues.totalFlexGrowFactors -= flexGrowFactor;
        }
      }
    }
  }
  collectedFlexItemsValues.remainingFreeSpace -= deltaFreeSpace;
}

// Do two passes over the flex items to figure out how to distribute the
// remaining space.
// The first pass finds the items whose min/max constraints trigger,
// freezes them at those
// sizes, and excludes those sizes from the remaining space. The second
// pass sets the size
// of each flexible item. It distributes the remaining space amongst the
// items whose min/max
// constraints didn't trigger in pass 1. For the other items, it sets
// their sizes by forcing
// their min/max constraints to trigger again.
//
// This two pass approach for resolving min/max constraints deviates from
// the spec. The
// spec (https://www.w3.org/TR/YG-flexbox-1/#resolve-flexible-lengths)
// describes a process
// that needs to be repeated a variable number of times. The algorithm
// implemented here
// won't handle all cases but it was simpler to implement and it mitigates
// performance
// concerns because we know exactly how many passes it'll do.
//
// At the end of this function the child nodes would have the proper size
// assigned to them.
//
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
  // First pass: detect the flex items whose min/max constraints trigger
  YGDistributeFreeSpaceFirstPass(
      collectedFlexItemsValues,
      mainAxis,
      mainAxisownerSize,
      availableInnerMainDim,
      availableInnerWidth);

  // Second pass: resolve the sizes of the flexible items
  float distributedFreeSpace = YGDistributeFreeSpaceSecondPass(
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
  YGStyle style = node.getStyle();

  // If we are using "at most" rules in the main axis. Calculate the remaining
  // space when constraint by the min size defined for the main axis.
  if (measureModeMainDim == YGMeasureMode.AtMost 
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
  }

  // In order to position the elements in the main axis, we have two
  // controls. The space between the beginning and the first element
  // and the space between each two elements.
  float leadingMainDim = 0;
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
        // Space is distributed evenly across all elements
        betweenMainDim = collectedFlexItemsValues.remainingFreeSpace /
            (collectedFlexItemsValues.itemsOnLine + 1);
        leadingMainDim = betweenMainDim;
        break;
      case YGJustifySpaceAround:
        // Space on the edges is half of the space between elements
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
    if (childStyle.positionType == YGPositionTypeAbsolute 
        child.isLeadingPositionDefined(mainAxis)) {
      if (performLayout) {
        // In case the child is position absolute and has left/top being
        // defined, we override the position to whatever the user said
        // (and margin/border).
        child.setLayoutPosition(
            YGUnwrapFloatOptional(
                child.getLeadingPosition(mainAxis, availableInnerMainDim)) +
                node.getLeadingBorder(mainAxis) +
                YGUnwrapFloatOptional(
                    child.getLeadingMargin(mainAxis, availableInnerWidth)),
            pos[mainAxis]);
      }
    } else {
      // Now that we placed the element, we need to update the variables.
      // We need to do that only for relative elements. Absolute elements
      // do not take part in that phase.
      if (childStyle.positionType == YGPositionType.Relative) {
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
        if (canSkipFlex) {
          // If we skipped the flex step, then we can't rely on the
          // measuredDims because
          // they weren't computed. This means we can't call
          // YGNodeDimWithMargin.
          collectedFlexItemsValues.mainDim += betweenMainDim +
              YGUnwrapFloatOptional(child.getMarginForAxis(
                  mainAxis, availableInnerWidth)) +
              YGUnwrapFloatOptional(childLayout.computedFlexBasis);
          collectedFlexItemsValues.crossDim = availableInnerCrossDim;
        } else {
          // The main dimension is the sum of all the elements dimension plus
          // the spacing.
          collectedFlexItemsValues.mainDim += betweenMainDim +
              YGNodeDimWithMargin(child, mainAxis, availableInnerWidth);

          // The cross dimension is the max of the elements dimension since
          // there can only be one element in that cross dimension.
          collectedFlexItemsValues.crossDim = YGFloatMax(
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

//
// This is the main routine that implements a subset of the flexbox layout
// algorithm
// described in the W3C YG documentation: https://www.w3.org/TR/YG3-flexbox/.
//
// Limitations of this algorithm, compared to the full standard:
//  * Display property is always assumed to be 'flex' except for Text nodes,
//  which
//    are assumed to be 'inline-flex'.
//  * The 'zIndex' property (or any form of z ordering) is not supported. Nodes
//  are
//    stacked in document order.
//  * The 'order' property is not supported. The order of flex items is always
//  defined
//    by document order.
//  * The 'visibility' property is always assumed to be 'visible'. Values of
//  'collapse'
//    and 'hidden' are not supported.
//  * There is no support for forced breaks.
//  * It does not support vertical inline directions (top-to-bottom or
//  bottom-to-top text).
//
// Deviations from standard:
//  * Section 4.5 of the spec indicates that all flex items have a default
//  minimum
//    main size. For text blocks, for example, this is the width of the widest
//    word.
//    Calculating the minimum width is expensive, so we forego it and assume a
//    default
//    minimum main size of 0.
//  * Min/Max sizes in the main axis are not honored when resolving flexible
//  lengths.
//  * The spec indicates that the default value for 'flexDirection' is 'row',
//  but
//    the algorithm below assumes a default of 'column'.
//
// Input parameters:
//    - node: current node to be sized and layed out
//    - availableWidth  availableHeight: available size to be used for sizing
//    the node
//      or YGUndefined if the size is not available; interpretation depends on
//      layout
//      flags
//    - ownerDirection: the inline (text) direction within the owner
//    (left-to-right or
//      right-to-left)
//    - widthMeasureMode: indicates the sizing rules for the width (see below
//    for explanation)
//    - heightMeasureMode: indicates the sizing rules for the height (see below
//    for explanation)
//    - performLayout: specifies whether the caller is interested in just the
//    dimensions
//      of the node or it requires the entire node and its subtree to be layed
//      out
//      (with final positions)
//
// Details:
//    This routine is called recursively to lay out subtrees of flexbox
//    elements. It uses the
//    information in node.style, which is treated as a read-only input. It is
//    responsible for
//    setting the layout.direction and layout.measuredDimensions fields for the
//    input node as well
//    as the layout.position and layout.lineIndex fields for its child nodes.
//    The
//    layout.measuredDimensions field includes any border or padding for the
//    node but does
//    not include margins.
//
//    The spec describes four different layout modes: "fill available", "max
//    content", "min
//    content",
//    and "fit content". Of these, we don't use "min content" because we don't
//    support default
//    minimum main sizes (see above for details). Each of our measure modes maps
//    to a layout mode
//    from the spec (https://www.w3.org/TR/YG3-sizing/#terms):
//      - YGMeasureMode.Undefined: max content
//      - YGMeasureMode.Exactly: fill available
//      - YGMeasureMode.AtMost: fit content
//
//    When calling YGNodelayoutImpl and YGLayoutNodeInternal, if the caller passes
//    an available size of
//    undefined then it must also pass a measure mode of YGMeasureMode.Undefined
//    in that dimension.
//
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
                   "YGMeasureMode.Undefined");

  // Set the resolved resolution in the node's layout.
  YGDirection direction = node.resolveDirection(ownerDirection);
  node.setLayoutDirection(direction);

  YGFlexDirection flexRowDirection = YGResolveFlexDirection(YGFlexDirection.Row, direction);
  YGFlexDirection flexColumnDirection =
      YGResolveFlexDirection(YGFlexDirection.Column, direction);

  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getLeadingMargin(flexRowDirection, ownerWidth)),
      YGEdgeStart);
  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getTrailingMargin(flexRowDirection, ownerWidth)),
      YGEdgeEnd);
  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getLeadingMargin(flexColumnDirection, ownerWidth)),
      YGEdgeTop);
  node.setLayoutMargin(
      YGUnwrapFloatOptional(
          node.getTrailingMargin(flexColumnDirection, ownerWidth)),
      YGEdgeBottom);

  node.setLayoutBorder(node.getLeadingBorder(flexRowDirection), YGEdgeStart);
  node.setLayoutBorder(node.getTrailingBorder(flexRowDirection), YGEdgeEnd);
  node.setLayoutBorder(node.getLeadingBorder(flexColumnDirection), YGEdgeTop);
  node.setLayoutBorder(
      node.getTrailingBorder(flexColumnDirection), YGEdgeBottom);

  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getLeadingPadding(flexRowDirection, ownerWidth)),
      YGEdgeStart);
  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getTrailingPadding(flexRowDirection, ownerWidth)),
      YGEdgeEnd);
  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getLeadingPadding(flexColumnDirection, ownerWidth)),
      YGEdgeTop);
  node.setLayoutPadding(
      YGUnwrapFloatOptional(
          node.getTrailingPadding(flexColumnDirection, ownerWidth)),
      YGEdgeBottom);

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
  }

  // If we're not being asked to perform a full layout we can skip the algorithm if we already know
  // the size
  if (!performLayout  YGNodeFixedSizeSetMeasuredDimensions(node,
                                                             availableWidth,
                                                             availableHeight,
                                                             widthMeasureMode,
                                                             heightMeasureMode,
                                                             ownerWidth,
                                                             ownerHeight)) {
    return;
  }

  // At this point we know we're going to perform work. Ensure that each child has a mutable copy.
  node.cloneChildrenIfNeeded();
  // Reset layout flags, as they could have changed.
  node.setLayoutHadOverflow(false);

  // STEP 1: CALCULATE VALUES FOR REMAINDER OF ALGORITHM
  YGFlexDirection mainAxis =
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
      YGUnwrapFloatOptional(YGResolveValue(node.getStyle().minDimensions[YGDimensionWidth], ownerWidth)) -
      paddingAndBorderAxisRow;
  float maxInnerWidth =
      YGUnwrapFloatOptional(YGResolveValue(node.getStyle().maxDimensions[YGDimensionWidth], ownerWidth)) -
      paddingAndBorderAxisRow;
  float minInnerHeight =
      YGUnwrapFloatOptional(YGResolveValue(node.getStyle().minDimensions[YGDimensionHeight], ownerHeight)) -
      paddingAndBorderAxisColumn;
  float maxInnerHeight =
      YGUnwrapFloatOptional(YGResolveValue(
          node.getStyle().maxDimensions[YGDimensionHeight], ownerHeight)) -
      paddingAndBorderAxisColumn;

  float minInnerMainDim = isMainAxisRow ? minInnerWidth : minInnerHeight;
  float maxInnerMainDim = isMainAxisRow ? maxInnerWidth : maxInnerHeight;

  // STEP 2: DETERMINE AVAILABLE SIZE IN MAIN AND CROSS DIRECTIONS

  float availableInnerWidth = YGNodeCalculateAvailableInnerDim(
      node, YGFlexDirection.Row, availableWidth, ownerWidth);
  float availableInnerHeight = YGNodeCalculateAvailableInnerDim(
      node, YGFlexDirection.Column, availableHeight, ownerHeight);

  float availableInnerMainDim =
      isMainAxisRow ? availableInnerWidth : availableInnerHeight;
  float availableInnerCrossDim =
      isMainAxisRow ? availableInnerHeight : availableInnerWidth;

  float totalOuterFlexBasis = 0;

  // STEP 3: DETERMINE FLEX BASIS FOR EACH ITEM

  YGNodeComputeFlexBasisForChildren(
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
  }
  // STEP 4: COLLECT FLEX ITEMS INTO FLEX LINES

  // Indexes of children that represent the first and last items in the line.
  startOfLineIndex = 0;
  endOfLineIndex = 0;

  // Number of lines.
  lineCount = 0;

  // Accumulated cross dimensions of all lines so far.
  float totalLineCrossDim = 0;

  // Max main dimension of all the lines.
  float maxLineMainDim = 0;
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
    endOfLineIndex = collectedFlexItemsValues.endOfLineIndex;

    // If we don't need to measure the cross axis, we can skip the entire flex
    // step.
    bool canSkipFlex =
        !performLayout  measureModeCrossDim == YGMeasureMode.Exactly;

    // STEP 5: RESOLVING FLEXIBLE LENGTHS ON MAIN AXIS
    // Calculate the remaining available space that needs to be allocated.
    // If the main dimension size isn't known, it is computed based on
    // the line length, so there's no more space left to distribute.

    bool sizeBasedOnContent = false;
    // If we don't measure with exact main dimension we want to ensure we don't violate min and max
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
              node.resolveFlexGrow() == 0))) {
          // If we don't have any children to flex or we can't flex the node
          // itself, space we've used is all space we need. Root node also
          // should be shrunk to minimum
          availableInnerMainDim =
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
    } else if (collectedFlexItemsValues.sizeConsumedOnCurrentLine < 0) {
      // availableInnerMainDim is indefinite which means the node is being sized based on its
      // content.
      // sizeConsumedOnCurrentLine is negative which means the node will allocate 0 points for
      // its content. Consequently, remainingFreeSpace is 0 - sizeConsumedOnCurrentLine.
      collectedFlexItemsValues.remainingFreeSpace =
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
        (collectedFlexItemsValues.remainingFreeSpace < 0));

    // STEP 6: MAIN-AXIS JUSTIFICATION  CROSS-AXIS SIZE DETERMINATION

    // At this point, all the children have their dimensions set in the main
    // axis.
    // Their dimensions are also set in the cross axis with the exception of
    // items
    // that are aligned "stretch". We need to compute these stretch values and
    // set the final positions.

    YGJustifyMainAxis(
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
      // Compute the cross axis from the max cross dimension of the children.
      containerCrossAxis =
          YGNodeBoundAxis(
              node,
              crossAxis,
              collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross,
              crossAxisownerSize,
              ownerWidth) -
          paddingAndBorderAxisCross;
    }

    // If there's no flex wrap, the cross dimension is defined by the container.
    if (!isNodeFlexWrap  measureModeCrossDim == YGMeasureMode.Exactly) {
      collectedFlexItemsValues.crossDim = availableInnerCrossDim;
    }

    // Clamp to the min/max size specified on the container.
    collectedFlexItemsValues.crossDim =
        YGNodeBoundAxis(
            node,
            crossAxis,
            collectedFlexItemsValues.crossDim + paddingAndBorderAxisCross,
            crossAxisownerSize,
            ownerWidth) -
        paddingAndBorderAxisCross;

    // STEP 7: CROSS-AXIS ALIGNMENT
    // We can skip child alignment if we're just measuring the container.
    if (performLayout) {
      for (i = startOfLineIndex; i < endOfLineIndex; i++) {
        child: YGNode = node.getChild(i);
        if (child.getStyle().display == YGDisplay.None) {
          continue;
        }
        if (child.getStyle().positionType == YGPositionTypeAbsolute) {
          // If the child is absolutely positioned and has a
          // top/left/bottom/right set, override
          // all the previously computed positions to set it correctly.
          bool isChildLeadingPosDefined =
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
          // If leading position is not defined or calculations result in Nan, default to border + margin
          if (!isChildLeadingPosDefined ||
              YGFloatIsUndefined(child.getLayout().position[pos[crossAxis]])) {
            child.setLayoutPosition(
                node.getLeadingBorder(crossAxis) +
                    YGUnwrapFloatOptional(child.getLeadingMargin(
                        crossAxis, availableInnerWidth)),
                pos[crossAxis]);
          }
        } else {
          float leadingCrossDim = leadingPaddingAndBorderCross;

          // For a relative children, we're either using alignItems (owner) or
          // alignSelf (child) in order to determine the position in the cross
          // axis
          YGAlign alignItem = YGNodeAlignItem(node, child);

          // If the child uses align stretch, we need to lay it out one more
          // time, this time
          // forcing the cross-axis size to be the computed cross size for the
          // current line.
          if (alignItem == YGAlignStretch 
              child.marginLeadingValue(crossAxis).unit != YGUnit.Auto 
              child.marginTrailingValue(crossAxis).unit != YGUnit.Auto) {
            // If the child defines a definite size for its cross axis, there's
            // no need to stretch.
            if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
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
              // No-Op
            } else if (
                child.marginLeadingValue(crossAxis).unit == YGUnit.Auto) {
              leadingCrossDim += YGFloatMax(0.0f, remainingCrossDim);
            } else if (alignItem == YGAlignFlexStart) {
              // No-Op
            } else if (alignItem == YGAlignCenter) {
              leadingCrossDim += remainingCrossDim / 2;
            } else {
              leadingCrossDim += remainingCrossDim;
            }
          }
          // And we apply the position
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
  }

  // STEP 8: MULTI-LINE CONTENT ALIGNMENT
  if (performLayout  (lineCount > 1 || YGIsBaselineLayout(node)) 
      !YGFloatIsUndefined(availableInnerCrossDim)) {
    float remainingAlignContentDim = availableInnerCrossDim - totalLineCrossDim;

    float crossDimLead = 0;
    float currentLead = leadingPaddingAndBorderCross;

    switch (node.getStyle().alignContent) {
      case YGAlignFlexEnd:
        currentLead += remainingAlignContentDim;
        break;
      case YGAlignCenter:
        currentLead += remainingAlignContentDim / 2;
        break;
      case YGAlignStretch:
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
      case YGAlignAuto:
      case YGAlignFlexStart:
      case YGAlignBaseline:
        break;
    }

    endIndex = 0;
    for (i = 0; i < lineCount; i++) {
      startIndex = endIndex;
      ii;

      // compute the line's height and find the endIndex
      float lineHeight = 0;
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
          if (YGNodeAlignItem(node, child) == YGAlignBaseline) {
            float ascent = YGBaseline(child) +
                YGUnwrapFloatOptional(child.getLeadingMargin(
                    YGFlexDirection.Column, availableInnerWidth));
            float descent =
                child.getLayout().measuredDimensions[YGDimensionHeight] +
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
              case YGAlignFlexStart: {
                child.setLayoutPosition(
                    currentLead +
                        YGUnwrapFloatOptional(child.getLeadingMargin(
                            crossAxis, availableInnerWidth)),
                    pos[crossAxis]);
                break;
              }
              case YGAlignFlexEnd: {
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
              case YGAlignStretch: {
                child.setLayoutPosition(
                    currentLead +
                        YGUnwrapFloatOptional(child.getLeadingMargin(
                            crossAxis, availableInnerWidth)),
                    pos[crossAxis]);

                // Remeasure child with the line height as it as been only measured with the
                // owners height yet.
                if (!YGNodeIsStyleDimDefined(child, crossAxis, availableInnerCrossDim)) {
                  float childWidth = isMainAxisRow
                      ? (child.getLayout()
                             .measuredDimensions[YGDimensionWidth] +
                         YGUnwrapFloatOptional(child.getMarginForAxis(
                             mainAxis, availableInnerWidth)))
                      : lineHeight;

                  float childHeight = !isMainAxisRow
                      ? (child.getLayout()
                             .measuredDimensions[YGDimensionHeight] +
                         YGUnwrapFloatOptional(child.getMarginForAxis(
                             crossAxis, availableInnerWidth)))
                      : lineHeight;

                  if (!(YGFloatsEqual(
                            childWidth,
                            child.getLayout()
                                .measuredDimensions[YGDimensionWidth]) 
                        YGFloatsEqual(
                            childHeight,
                            child.getLayout()
                                .measuredDimensions[YGDimensionHeight]))) {
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
              case YGAlignBaseline: {
                child.setLayoutPosition(
                    currentLead + maxAscentForCurrentLine - YGBaseline(child) +
                        YGUnwrapFloatOptional(child.getLeadingPosition(
                            YGFlexDirection.Column, availableInnerCrossDim)),
                    YGEdgeTop);

                break;
              }
              case YGAlignAuto:
              case YGAlignSpaceBetween:
              case YGAlignSpaceAround:
                break;
            }
          }
        }
      }

      currentLead += lineHeight;
    }
  }

  // STEP 9: COMPUTING FINAL DIMENSIONS

  node.setLayoutMeasuredDimension(
      YGNodeBoundAxis(
          node,
          YGFlexDirection.Row,
          availableWidth - marginAxisRow,
          ownerWidth,
          ownerWidth),
      YGDimensionWidth);

  node.setLayoutMeasuredDimension(
      YGNodeBoundAxis(
          node,
          YGFlexDirection.Column,
          availableHeight - marginAxisColumn,
          ownerHeight,
          ownerWidth),
      YGDimensionHeight);

  // If the user didn't specify a width or height for the node, set the
  // dimensions based on the children.
  if (measureModeMainDim == YGMeasureMode.Undefined ||
      (node.getStyle().overflow != YGOverflowScroll 
       measureModeMainDim == YGMeasureMode.AtMost)) {
    // Clamp the size to the min/max size, if specified, and make sure it
    // doesn't go below the padding and border amount.
    node.setLayoutMeasuredDimension(
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
       measureModeCrossDim == YGMeasureMode.AtMost)) {
    // Clamp the size to the min/max size, if specified, and make sure it
    // doesn't go below the padding and border amount.

    node.setLayoutMeasuredDimension(
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
  }

  // As we only wrapped in normal direction yet, we need to reverse the positions on wrap-reverse.
  if (performLayout  node.getStyle().flexWrap == YGWrapWrapReverse) {
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
    // STEP 10: SIZING AND POSITIONING ABSOLUTE CHILDREN
    for (auto child : node.getChildren()) {
      if (child.getStyle().positionType != YGPositionTypeAbsolute) {
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
    }

    // STEP 11: SETTING TRAILING POSITIONS FOR CHILDREN
    bool needsMainTrailingPos =
        mainAxis == YGFlexDirection.RowReverse || mainAxis == YGFlexDirection.ColumnReverse;
    bool needsCrossTrailingPos =
        crossAxis == YGFlexDirection.RowReverse || crossAxis == YGFlexDirection.ColumnReverse;

    // Set trailing position if necessary.
    if (needsMainTrailingPos || needsCrossTrailingPos) {
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
    // First we check if the value is already rounded
    scaledValue = scaledValue - fractial;
  } else if (YGFloatsEqual(fractial, 1.0f)) {
    scaledValue = scaledValue - fractial + 1.0f;
  } else if (forceCeil) {
    // Next we check if we need to use forced rounding
    scaledValue = scaledValue - fractial + 1.0f;
  } else if (forceFloor) {
    scaledValue = scaledValue - fractial;
  } else {
    // Finally we just round the value
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

//
// This is a wrapper around the YGNodelayoutImpl function. It determines
// whether the layout request is redundant and can be skipped.
//
// Parameters:
//  Input parameters are the same as YGNodelayoutImpl (see above)
//  Return parameter is true if layout was performed, false if skipped
//
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
    // Invalidate the cached results.
    layout.nextCachedMeasurementsIndex = 0;
    layout.cachedLayout.widthMeasureMode = (YGMeasureMode) -1;
    layout.cachedLayout.heightMeasureMode = (YGMeasureMode) -1;
    layout.cachedLayout.computedWidth = -1;
    layout.cachedLayout.computedHeight = -1;
  }

  YGCachedMeasurement* cachedResults = null;

  // Determine whether the results are already cached. We maintain a separate
  // cache for layouts and measurements. A layout operation modifies the
  // positions
  // and dimensions for nodes in the subtree. The algorithm assumes that each
  // node
  // gets layed out a maximum of one time per tree layout, but multiple
  // measurements
  // may be required to resolve all of the flex dimensions.
  // We handle nodes with measure functions specially here because they are the
  // most
  // expensive to measure, so it's worth avoiding redundant measurements if at
  // all possible.
  if (node.getMeasure() != null) {
    float marginAxisRow = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Row, ownerWidth));
    float marginAxisColumn = YGUnwrapFloatOptional(
        node.getMarginForAxis(YGFlexDirection.Column, ownerWidth));

    // First, try to use the layout cache.
    if (YGNodeCanUseCachedMeasurement(widthMeasureMode,
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
      // Try to use the measurement cache.
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
    layout.measuredDimensions[YGDimensionWidth] = cachedResults.computedWidth;
    layout.measuredDimensions[YGDimensionHeight] = cachedResults.computedHeight;

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
          layout.measuredDimensions[YGDimensionWidth],
          layout.measuredDimensions[YGDimensionHeight],
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
        // Use the single layout cache entry.
        newCacheEntry = layout.cachedLayout;
      } else {
        // Allocate a new measurement cache entry.
        newCacheEntry = layout.cachedMeasurements[layout.nextCachedMeasurementsIndex];
        layout.nextCachedMeasurementsIndex++;
      }

      newCacheEntry.availableWidth = availableWidth;
      newCacheEntry.availableHeight = availableHeight;
      newCacheEntry.widthMeasureMode = widthMeasureMode;
      newCacheEntry.heightMeasureMode = heightMeasureMode;
      newCacheEntry.computedWidth = layout.measuredDimensions[YGDimensionWidth];
      newCacheEntry.computedHeight = layout.measuredDimensions[YGDimensionHeight];
    }
  }

  if (performLayout) {
    node.setLayoutDimension(
        node.getLayout().measuredDimensions[YGDimensionWidth],
        YGDimensionWidth);
    node.setLayoutDimension(
        node.getLayout().measuredDimensions[YGDimensionHeight],
        YGDimensionHeight);

    node.setHasNewLayout(true);
    node.setDirty(false);
  }

  gDepth--;
  layout.generationCount = gCurrentGenerationCount;
  return (needToVisitNode || cachedResults == null);
}

void YGConfigSetPointScaleFactor(YGConfig config, float pixelsInPoint) {
  YGAssertWithConfig(config, pixelsInPoint >= 0.0f, "Scale factor should not be less than zero");

  // We store points for Pixel as we will use it for rounding
  if (pixelsInPoint == 0.0f) {
    // Zero is used to skip rounding
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
  float nodeTop = node.getLayout().position[YGEdgeTop];

  float nodeWidth = node.getLayout().dimensions[YGDimensionWidth];
  float nodeHeight = node.getLayout().dimensions[YGDimensionHeight];

  float absoluteNodeLeft = absoluteLeft + nodeLeft;
  float absoluteNodeTop = absoluteTop + nodeTop;

  float absoluteNodeRight = absoluteNodeLeft + nodeWidth;
  float absoluteNodeBottom = absoluteNodeTop + nodeHeight;

  // If a node has a custom measure function we never want to round down its size as this could
  // lead to unwanted text truncation.
  bool textRounding = node.getNodeType() == YGNodeTypeText;

  node.setLayoutPosition(
      YGRoundValueToPixelGrid(nodeLeft, pointScaleFactor, false, textRounding),
      YGEdgeLeft);

  node.setLayoutPosition(
      YGRoundValueToPixelGrid(nodeTop, pointScaleFactor, false, textRounding),
      YGEdgeTop);

  // We multiply dimension by scale factor and if the result is close to the whole number, we don't
  // have any fraction
  // To verify if the result is close to whole number we want to check both floor and ceil numbers
  bool hasFractionalWidth = !YGFloatsEqual(fmodf(nodeWidth * pointScaleFactor, 1.0), 0) 
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
      YGDimensionWidth);

  node.setLayoutDimension(
      YGRoundValueToPixelGrid(
          absoluteNodeBottom,
          pointScaleFactor,
          (textRounding  hasFractionalHeight),
          (textRounding  !hasFractionalHeight)) -
          YGRoundValueToPixelGrid(
              absoluteNodeTop, pointScaleFactor, false, textRounding),
      YGDimensionHeight);

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
    YGDirection ownerDirection) {
  // Increment the generation count. This will force the recursive routine to
  // visit
  // all dirty nodes at least once. Subsequent visits will be skipped if the
  // input
  // parameters don't change.
  gCurrentGenerationCount++;
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
                  node.getStyle().maxDimensions[YGDimensionWidth], ownerWidth)
                  .isUndefined()) {
    width = YGUnwrapFloatOptional(YGResolveValue(
        node.getStyle().maxDimensions[YGDimensionWidth], ownerWidth));
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
                  node.getStyle().maxDimensions[YGDimensionHeight],
                  ownerHeight)
                  .isUndefined()) {
    height = YGUnwrapFloatOptional(YGResolveValue(node.getStyle().maxDimensions[YGDimensionHeight], ownerHeight));
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
  }

  // We want to get rid off `useLegacyStretchBehaviour` from YGConfig. But we
  // aren't sure whether client's of yoga have gotten rid off this flag or not.
  // So logging this in YGLayout would help to find out the call sites depending
  // on this flag. This check would be removed once we are sure no one is
  // dependent on this flag anymore. The flag
  // `shouldDiffLayoutWithoutLegacyStretchBehaviour` in YGConfig will help to
  // run experiments.
  if (node.getConfig().shouldDiffLayoutWithoutLegacyStretchBehaviour 
      node.didUseLegacyFlag()) {
    originalNode: YGNode = YGNodeDeepClone(node);
    originalNode.resolveDimension();
    // Recursively mark nodes as dirty
    originalNode.markDirtyAndPropogateDownwards();
    gCurrentGenerationCount++;
    // Rerun the layout, and calculate the diff
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
          0.0f);

      // Set whether the two layouts are different or not.
      node.setLayoutDoesLegacyFlagAffectsLayout(
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
