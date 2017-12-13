# WDI Project 1: Simon

## Things I Learned

with `Math.random()`, you can get a number between 0 and 1

it is inclusive of 0, meaning you can get 0, but exclusive of 1, so 1 is impossible.

so, for my random index method which implements this:

```js
return Math.floor(Math.random() * $('.game-input').length)
```

If there are 4 buttons, it will only return an integer between 0-3

---
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
At one point, I had **_five_** separate methods that all did effectively the same thing.

So, I refactored them into one `.toggleDisplay` method, that takes `jQNode`, `displayClass`, `duration` as arguments. This way, I can specify what classes I want to toggle where, and how long it should take between adding and removing the class

Yet, can I still benefit from making more methods implementing `toggleDisplay`?

## Bonus Goals

- [ ] SASS. SASS first and foremost
- [ ] adding a modal would be cool <http://jquerymodal.com/>

## MVP Goals

- [x] I have to do something reaaaaally hacky to get the playPattern() function to work
  - because all of the functions run at the same time, I have to set increment a timeout variable based on the current index. Is there a better way?
- [x] making `toggleDisplaySelected` a method and not a global function
- [x] consolidating the `toggleDisplay()` methods into one reusable function
- [x] add a method to check if subinput is valid
- [x] the start button is bugged. It works the first time, and not any time after that
  - refactor the startGame global function, no reason why it can't be an anonymous function handler for the event listener
  - add a 'reset game' feature
- [x] make it so you can't click during animations
  - sources to look at: [animation on cssgarden - look under `.treatment .carrot`](http://cssgridgarden.com/)
    - did not actually use the css animation property. the trasition property made the easing very easy, so I'm just going to leave it as is

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
- [jQuery `.off()`](https://api.jquery.com/off/)
- [make text-shadow go around letters on all sides](https://stackoverflow.com/a/34595679)
- [background textures](https://www.transparenttextures.com/)
