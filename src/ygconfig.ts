import {
    YGLogger,
    YGCloneNodeFunc
} from "./yoga";

const kYGDefaultExperimentalFeatures: Array<boolean> = [false, false, false];

class YGConfig {
    public experimentalFeatures: Array<boolean>;
    public useWebDefaults: boolean;
    public useLegacyStretchBehaviour: boolean;
    public shouldDiffLayoutWithoutLegacyStretchBehaviour: boolean;
    public pointScaleFactor: number;
    public logger: YGLogger;
    public cloneNodeCallback: YGCloneNodeFunc = null;
    public context: any;

    constructor(logger: YGLogger) {
        this.experimentalFeatures = kYGDefaultExperimentalFeatures;
        this.useWebDefaults = false;
        this.useLegacyStretchBehaviour = false;
        this.shouldDiffLayoutWithoutLegacyStretchBehaviour = false;
        this.pointScaleFactor = 1.0;
        this.logger = logger;
        this.context = null;
    }
}

export {
    YGConfig
};