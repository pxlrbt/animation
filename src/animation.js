import EasingFunctions from './easing-functions';

const defaults = {
    easing: EasingFunctions.linear,
    step: function (step) {}
}

export default class Animation
{
    constructor() {
        this.options = Object.assign({}, defaults);
    }

    // Setters
    duration(duration) {
        this.options.duration = duration;
        return this;
    }

    delay(delay) {
        this.options.delay = delay;
        return this;
    }

    easing(easing) {
        if (!easing in EasingFunctions) {
            throw new Error('Easing function ' + easing + " not found");
        }

        this.options.easing = easing;
        return this;
    }

    from(from) {
        this.options.from = from;
        return this;
    }

    to(to) {
        this.options.to = to;
        return this;
    }

    step(callback) {
        this.options.step = callback;
        return this;
    }

    // Methods
    cancel() {
        this.isCancelled = true;
    }

    animate() {
        this.isCancelled = false;
        this.startTime = +new Date() + this.options.delay;

        setTimeout(() => requestAnimationFrame(this.animationStep.bind(this)), this.options.delay);

        this.promise = new Promise((res, rej) => this.resolve = res);
        return this.promise;
    }

    isActive() {
        return this.startTime > +new Date() && this.startTime + this.options.duration < +new Date();
    }

    progress() {
        return Math.min(1, (+new Date() - this.startTime) / this.options.duration);
    }

    animationStep() {
        if (this.isCancelled) return;

        let from = this.options.from;
        let to = this.options.to;
        let easing = this.options.easing;
        let progress = this.progress();
        let current = from + (to - from) * easing(progress);

        this.options.step({
            current,
            progress,
            from,
            to
        });

        if (progress == 1) {
            return this.resolve();
        }

        requestAnimationFrame(this.animationStep.bind(this));
    }
}
