# WDI Project 1: Simon

## Things I Learned
The `this` keyword behaves a differently depending on the context in which it is used.

One example is within callback functions. `this` often refers to the global `Window` object, which is not what I want let me tell you.

So you can use Function methods like `.bind()` (`.call()` and `.apply()` are also options, but they all are used for different purposes and use cases).

Take this code for example:
```js
somePropertyMethod () {
  let self = this
  setTimeout(this.showPattern.bind(self), this.baseTimeout)
}
```

This works great! Now, passing the `this.showPattern` method in the setTimeout higher order function will use the reference `self`, refering to the object instance the method is being invoked under, for the `this` in `.showPattern()`

Yet, this _also_ works:
```js
somePropertyMethod () {
  setTimeout(() => {
    this.showPattern()
  }, this.baseTimeout)
}
```

This surprised me. Using the arrow function expression, the `this` in the nested function still refers to the object instance.

Note, there are some gotchas with this. [This is a good resource showing when `this` isn't what you'd expect with arrow function expressions](https://derickbailey.com/2015/09/28/do-es6-arrow-functions-really-solve-this-in-javascript/)

---
Refactoring `toggleDisplay` methods

At one point, I had *five* separate methods that all did effectively the same thing.

So, I refactored them.

## Reach Goals
1. consolidating the `toggleDisplay()` methods into one reusable function
2. make it so you can't click a button while it is animating
   - I think I am better off using the `animate` property vs `transition`, but it's not important for the MVP so I'll save it for later
   - sources to look at: [animation on cssgarden - look under `.treatment .carrot`](http://cssgridgarden.com/)
3. the start button is bugged. It works the first time, and not any time after that
   - so, I should work on the reset-buttons
4. adding a modal would be cool (http://jquerymodal.com/)

## Completed Goals
~~- I have to do something reaaaaally hacky to get the playPattern() function to work
    - because all of the functions run at the same time, I have to set increment a timeout variable based on the current index
    - is there a better way to get a function to run on each element in an array sequentially?~~
~~- making `toggleDisplaySelected` a method and not a global function~~

## Sources
- [Google Logo, used as reference for button colors](https://en.wikipedia.org/wiki/Google_logo#/media/File:Google-favicon-2015.png)
- [css attribute selectors](https://www.w3schools.com/css/css_attribute_selectors.asp)
- [jQuery `$(document).ready()`](https://learn.jquery.com/using-jquery-core/document-ready/)
- [difference between `.ready()` and `.onload()`](https://stackoverflow.com/a/3698214)
- [jQuery `.toggleClass()`](https://api.jquery.com/toggleclass/)
- [jQuery `.click()`](https://api.jquery.com/click/)
- [difference between `$(this)` and `event.target`](https://stackoverflow.com/a/21667010)
- [jQuery setTimeout](https://www.sitepoint.com/jquery-settimeout-function-examples/)
- [css transition property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [make element unclickable in css](https://stackoverflow.com/a/37216892)
- [get random numbers in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [pass arguments to callback in event listener](https://stackoverflow.com/a/979344)
- [jQuery select element by attribute, specifically `[data-]`](https://stackoverflow.com/a/29906777)

