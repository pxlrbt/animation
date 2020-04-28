# Animation

Very simple vanilla js animation library.

## Installation

```js
npm install @pxlrbt/animation
```

## Usage

```js
import { Animation, EasingFunctions } from '@pxlrbt/animation';

let animation = new Animation();
animation.from(0).to(100).delay(5000).duration(600).easing(EasingFunctions.easeInEaseOut).step((step) => {
    console.log('Current', step.current);
    console.log('Progress', step.progress);
    console.log('From', step.from);
    console.log('To', step.to);
});

animation.animate();
// or
await animation.animate()
console.log('Animation done');
```
