// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/log.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/log.cpp

import { YGLogLevel } from './enums';
import { YGConfig } from './ygconfig';
import { YGNode } from './ygnode';
import { YGConfigGetDefault } from './yoga';

function vlog(config: YGConfig, node: YGNode, level: YGLogLevel, context: any, format: string, ...args: any[]): void {
    const logConfig: YGConfig = config != null ? config : YGConfigGetDefault();
    logConfig.log(logConfig, node, level, context, format, ...args);
}

export class Log {
    static log(using: YGNode | YGConfig, level: YGLogLevel, context: any, format: string, ...args: any[]): void {
        if (using instanceof YGNode) {
            const node: YGNode = using;
            vlog(node == null ? null : node.getConfig(), node, level, context, format, args);
        } else if (using instanceof YGConfig) {
            const config: YGConfig = using;
            vlog(config, null, level, context, format, args);
        }
    }
}
