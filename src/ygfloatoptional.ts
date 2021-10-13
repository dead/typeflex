// upstream: https://github.com/facebook/yoga/blob/v1.19.0/yoga/YGFloatOptional.h

import { YGFloatIsUndefined } from './yoga';

class YGFloatOptional {
    private value_: number;
    private isUndefined_: boolean;

    constructor(value: number | YGFloatOptional = undefined) {
        if (value instanceof YGFloatOptional) {
            this.value_ = value.getValue();
            this.isUndefined_ = value.isUndefined();
            return;
        }

        if (YGFloatIsUndefined(value)) {
            this.value_ = 0;
            this.isUndefined_ = true;
        } else {
            this.value_ = value;
            this.isUndefined_ = false;
        }
    }

    unwrap(): number {
        return !this.isUndefined_ ? this.value_ : NaN;
    }

    clone(): YGFloatOptional {
        return new YGFloatOptional(this.isUndefined_ ? undefined : this.value_);
    }

    getValue(): number {
        if (this.isUndefined_) {
            throw 'Tried to get value of an undefined YGFloatOptional';
        }

        return this.value_;
    }

    setValue(value: number): void {
        this.value_ = value;
        this.isUndefined_ = false;
    }

    isUndefined(): boolean {
        return this.isUndefined_;
    }

    add(op: YGFloatOptional): YGFloatOptional {
        if (!this.isUndefined_ && !op.isUndefined()) {
            return new YGFloatOptional(this.value_ + op.getValue());
        }
        return new YGFloatOptional();
    }

    isBigger(op: YGFloatOptional): boolean {
        if (this.isUndefined_ || op.isUndefined()) {
            return false;
        }

        return this.value_ > op.getValue();
    }

    isSmaller(op: YGFloatOptional): boolean {
        if (this.isUndefined_ || op.isUndefined()) {
            return false;
        }

        return this.value_ < op.getValue();
    }

    isBiggerEqual(op: YGFloatOptional): boolean {
        return this.isEqual(op) ? true : this.isBigger(op);
    }

    isSmallerEqual(op: YGFloatOptional): boolean {
        return this.isEqual(op) ? true : this.isSmaller(op);
    }

    isEqual(op: YGFloatOptional): boolean {
        if (this.isUndefined_ == op.isUndefined()) {
            return this.isUndefined_ ? true : this.value_ == op.getValue();
        }
        return false;
    }

    isDiff(op: YGFloatOptional): boolean {
        return !this.isEqual(op);
    }

    isEqualValue(val: number): boolean {
        if (YGFloatIsUndefined(val) == this.isUndefined_) {
            return this.isUndefined_ || val == this.value_;
        }
        return false;
    }

    isDiffValue(val: number): boolean {
        return !this.isEqualValue(val);
    }
}

export { YGFloatOptional };
