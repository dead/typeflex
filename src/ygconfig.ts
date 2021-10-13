// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGConfig.h
// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGConfig.cpp

import { YGLogLevel } from './enums';
import { YGNode } from './ygnode';
import { YGLogger, YGCloneNodeFunc, YGNodeClone } from './yoga';

const kYGDefaultExperimentalFeatures: () => Array<boolean> = () => [false, false, false];

class YGConfig {
    public experimentalFeatures: Array<boolean>;
    public useWebDefaults: boolean;
    public useLegacyStretchBehaviour: boolean;
    public shouldDiffLayoutWithoutLegacyStretchBehaviour: boolean;
    public printTree: boolean;
    public pointScaleFactor: number;
    public logger: YGLogger;
    public cloneNodeCallback: YGCloneNodeFunc = null;
    public context: any;

    constructor(logger: YGLogger) {
        this.experimentalFeatures = kYGDefaultExperimentalFeatures();
        this.useWebDefaults = false;
        this.useLegacyStretchBehaviour = false;
        this.shouldDiffLayoutWithoutLegacyStretchBehaviour = false;
        this.printTree = false;
        this.pointScaleFactor = 1.0;
        this.logger = logger;
        this.context = null;
    }

    log(config: YGConfig, node: YGNode, logLevel: YGLogLevel, logContext: any, format: string, ...args: any[]): void {
        this.logger(config, node, logLevel, logContext, format, ...args);
    }

    cloneNode(node: YGNode, owner: YGNode, childIndex: number, cloneContext?: any): YGNode {
        let clone: YGNode = null;
        if (this.cloneNodeCallback != null) {
            clone = this.cloneNodeCallback(node, owner, childIndex, cloneContext);
        }
        if (clone == null) {
            clone = YGNodeClone(node);
        }
        return clone;
    }

    setLogger(logger?: YGLogger): void {
        this.logger = logger;
    }

    setCloneNodeCallback(cloneNode?: YGCloneNodeFunc): void {
        this.cloneNodeCallback = cloneNode;
    }
}

export { YGConfig };
