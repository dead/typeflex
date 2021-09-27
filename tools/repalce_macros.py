def YG_NODE_STYLE_PROPERTY_SETTER_IMPL(type, name, paramName, instanceName):
    ret = '''
export function YGNodeStyleSet##name(node: YGNode, paramName: type): void {
    if(node.getStyle().instanceName != paramName) {
        const style: YGStyle = node.getStyle();
        style.instanceName = paramName;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}
'''
    return ret.replace('type', type).replace('##name', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_STYLE_PROPERTY_SETTER_UNIT_IMPL(type, name, paramName, instanceName):
    ret = '''
export function YGNodeStyleSet##name(node: YGNode, paramName: type): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point
    );

    if ((node.getStyle().instanceName.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName.unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSet##name##Percent(node: YGNode, paramName: type): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().instanceName.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName.unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}
'''
    return ret.replace('type', type).replace('##name##', name).replace('##name', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_STYLE_PROPERTY_SETTER_UNIT_AUTO_IMPL(type, name, paramName, instanceName):
    ret = '''
export function YGNodeStyleSet##name##(node: YGNode, paramName: type): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().instanceName.value != value.value && value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName.unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSet##name##Percent(node: YGNode, paramName: type): void {
    if (node.getStyle().instanceName.value != YGFloatSanitize(paramName) ||
        node.getStyle().instanceName.unit != YGUnit.Percent) {
        const style: YGStyle = node.getStyle();
        style.instanceName.value = YGFloatSanitize(paramName);
        style.instanceName.unit = YGFloatIsUndefined(paramName) ? YGUnit.Auto : YGUnit.Percent;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleSet##name##Auto(node: YGNode): void {
    if (node.getStyle().instanceName.unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.instanceName.value = 0;
        style.instanceName.unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}
'''
    return ret.replace('type', type).replace('##name##', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_STYLE_PROPERTY_IMPL(type, name, paramName, instanceName):
    ret = YG_NODE_STYLE_PROPERTY_SETTER_IMPL(type, name, paramName, instanceName)
    ret += '''
export function YGNodeStyleGet##name(node: YGNode): type {
    return node.getStyle().instanceName;
}
'''
    return ret.replace('type', type).replace('##name', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL(type, name, paramName, instanceName):
    ret = '''
export function YGNodeStyleSet##name(node: YGNode, edge: YGEdge, paramName: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Point,
    );

    if ((node.getStyle().instanceName[edge].value != value.value &&
        value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}


export function YGNodeStyleSet##name##Percent(node: YGNode, edge: YGEdge, paramName: number): void {
    const value: YGValue = new YGValue(
        YGFloatSanitize(paramName),
        YGFloatIsUndefined(paramName) ? YGUnit.Undefined : YGUnit.Percent,
    );

    if ((node.getStyle().instanceName[edge].value != value.value &&
         value.unit != YGUnit.Undefined) ||
        node.getStyle().instanceName[edge].unit != value.unit) {
        const style: YGStyle = node.getStyle();
        style.instanceName[edge] = value;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}

export function YGNodeStyleGet##name(node: YGNode, edge: YGEdge): type {
    const value: YGValue = node.getStyle().instanceName[edge];
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }

    return value;
}
'''
    return ret.replace('type', type).replace('##name##', name).replace('##name', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_STYLE_EDGE_PROPERTY_UNIT_AUTO_IMPL(type, name, instanceName):
    ret = '''
export function YGNodeStyleSet##name##Auto(node: YGNode, edge: YGEdge): void {
    if (node.getStyle().instanceName[edge].unit != YGUnit.Auto) {
        const style: YGStyle = node.getStyle();
        style.instanceName[edge].value = 0;
        style.instanceName[edge].unit = YGUnit.Auto;
        node.setStyle(style);
        node.markDirtyAndPropogate();
    }
}'''
    return ret.replace('type', type).replace('##name##', name).replace('instanceName', instanceName)

def YG_NODE_STYLE_PROPERTY_UNIT_AUTO_IMPL(type, name, paramName, instanceName):
    ret = YG_NODE_STYLE_PROPERTY_SETTER_UNIT_AUTO_IMPL('number', name, paramName, instanceName)
    ret += '''
export function YGNodeStyleGet##name(node: YGNode): type {
    const value: YGValue = node.getStyle().instanceName;
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}'''
    return ret.replace('type', type).replace('##name', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_STYLE_PROPERTY_UNIT_IMPL(type, name, paramName, instanceName):
    ret = YG_NODE_STYLE_PROPERTY_SETTER_UNIT_IMPL('number', name, paramName, instanceName)
    ret += '''
export function YGNodeStyleGet##name(node: YGNode): type {
    const value: YGValue = node.getStyle().instanceName;
    if (value.unit == YGUnit.Undefined || value.unit == YGUnit.Auto) {
        value.value = YGUndefined;
    }
    return value;
}'''
    return ret.replace('type', type).replace('##name', name).replace('paramName', paramName).replace('instanceName', instanceName)

def YG_NODE_LAYOUT_PROPERTY_IMPL(type, name, instanceName):
    ret = '''
export function YGNodeLayoutGet##name(node: YGNode): type {
    return node.getLayout().instanceName;
}'''
    return ret.replace('type', type).replace('##name', name).replace('instanceName', instanceName)

def YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL(type, name, instanceName):
    ret = '''
export function YGNodeLayoutGet##name(node: YGNode, edge: YGEdge): type {
    // YGAssertWithNode(node, edge <= YGEdge.End, "Cannot get layout properties of multi-edge shorthands");

    if (edge == YGEdge.Left) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().instanceName[YGEdge.End];
        } else {
            return node.getLayout().instanceName[YGEdge.Start];
        }
    }

    if (edge == YGEdge.Right) {
        if (node.getLayout().direction == YGDirection.RTL) {
            return node.getLayout().instanceName[YGEdge.Start];
        } else {
            return node.getLayout().instanceName[YGEdge.End];
        }
    }

    return node.getLayout().instanceName[edge];
}'''
    return ret.replace('type', type).replace('##name', name).replace('instanceName', instanceName)

cod = ""
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGDirection', 'Direction', 'direction', 'direction')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGFlexDirection', 'FlexDirection', 'flexDirection', 'flexDirection')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGJustify', 'JustifyContent', 'justifyContent', 'justifyContent')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGAlign', 'AlignContent', 'alignContent', 'alignContent')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGAlign', 'AlignItems', 'alignItems', 'alignItems')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGAlign', 'AlignSelf', 'alignSelf', 'alignSelf')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGPositionType', 'PositionType', 'positionType', 'positionType')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGWrap', 'FlexWrap', 'flexWrap', 'flexWrap')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGOverflow', 'Overflow', 'overflow', 'overflow')
cod += YG_NODE_STYLE_PROPERTY_IMPL('YGDisplay', 'Display', 'display', 'display')
cod += YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL('YGValue', 'Position', 'position', 'position')
cod += YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL('YGValue', 'Margin', 'margin', 'margin')
cod += YG_NODE_STYLE_EDGE_PROPERTY_UNIT_IMPL('YGValue', 'Padding', 'padding', 'padding')
cod += YG_NODE_STYLE_EDGE_PROPERTY_UNIT_AUTO_IMPL('YGValue', 'Margin', 'margin')
cod += YG_NODE_STYLE_PROPERTY_UNIT_AUTO_IMPL('YGValue', 'Width', 'width', 'dimensions[YGDimension.Width]')
cod += YG_NODE_STYLE_PROPERTY_UNIT_AUTO_IMPL('YGValue', 'Height', 'height', 'dimensions[YGDimension.Height]')
cod += YG_NODE_STYLE_PROPERTY_UNIT_IMPL('YGValue', 'MinWidth', 'minWidth', 'minDimensions[YGDimension.Width]')
cod += YG_NODE_STYLE_PROPERTY_UNIT_IMPL('YGValue', 'MinHeight', 'minHeight', 'minDimensions[YGDimension.Height]')
cod += YG_NODE_STYLE_PROPERTY_UNIT_IMPL('YGValue', 'MaxWidth', 'maxWidth', 'maxDimensions[YGDimension.Width]')
cod += YG_NODE_STYLE_PROPERTY_UNIT_IMPL('YGValue', 'MaxHeight', 'maxHeight', 'maxDimensions[YGDimension.Height]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('number', 'Left', 'position[YGEdge.Left]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('number', 'Top', 'position[YGEdge.Top]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('number', 'Right', 'position[YGEdge.Right]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('number', 'Bottom', 'position[YGEdge.Bottom]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('number', 'Width', 'dimensions[YGDimension.Width]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('number', 'Height', 'dimensions[YGDimension.Height]')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('YGDirection', 'Direction', 'direction')
cod += YG_NODE_LAYOUT_PROPERTY_IMPL('boolean', 'HadOverflow', 'hadOverflow')
cod += YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL('number', 'Margin', 'margin')
cod += YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL('number', 'Border', 'border')
cod += YG_NODE_LAYOUT_RESOLVED_PROPERTY_IMPL('number', 'Padding', 'padding')

print(cod)
