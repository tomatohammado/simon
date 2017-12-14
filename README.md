# WDI Project 1: Simon

## Technologies

In addition to vanilla HTML, CSS, and Javascript, I relied heavily on jQuery.

I also experimented with SASS, but I realized I needed to plan out the file structure for the SASS architecture, and I deferred to work on implementing other features.

I did, however, utilize a simon-sandbox repo where I did use SASS (.scss specifically) to utilize the `darken($color, $amount)` function in order to quickly get nicer colors for the .game-input elements in their default, :hover, and .selected states.

## Approach

I drafted out my plan for implementing the Simon game before I started coding, but I quickly learned I did not do enough.

I initially broke down the game into 'Display Pattern' and 'User Input' phases, and when the user successfully match a complete pattern the pattern would increment by one and the cycle would continue.

I knew I had to check each input against the pattern to verify the validity of the input, but that is about the extent to which I thought about the problem before starting to write the code.

And boy, was it rough at first.

I didn't consider the functions I would need in more detail. For example, I didn't realize at first that I would need some way of starting a game (vs having it start automatically on page load).

That stopped my momentum because I had to go back to the planning stage frequently as I discovered the holes in my original plan.

A few hours in, I realized the whole thing would be easier if I made the game and object and implemented all of my functions as methods. So that was the first major refactoring I had to do.

After I made the decision to use `class` and create an object, things started to click. But I realize looking back that if I had thought more about the problem to begin with, I could have arrived at that conclusion much earlier and save myself time and effort.

## Installation Instructions

There is nothing to install.

Easy, right?

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

I don't think so. There are instances where I repeat the same patterns of calling the `toggleDisplay` method, but in some instances I end up writing more code to create a separate method (write 4 lines to save 2).

Plus, it is always clear what I am doing whenever I call `toggleDisplay`. When something broke in the old methods when I had multiple, it was a little tricky sometimes to keep track of which method I was using at a given time. Once I got the single `toggleDisplay` method to work, I knew the expected behavior and the only thing I had to scrutinize are the arguments I'm passing on a particular line.

---
The [W3 html validator](https://validator.w3.org/) has some opinions I don't fully agree with.

It gives an error if a `<section>` element does not container a header.

I used `<section>` because I like the semantics, and it wouldn't make sense to use a header (unless I hide it with `display:none` or something)

Actually, that is legit, maybe I should have done that.

It also does not like having more than one `<main>`, which I can understand. I don't _like_ it, but I get it.

---
And since we're talking about validators, the [W3 css validator](https://jigsaw.w3.org/css-validator/) doesn't recognize the `pointer-events` property, for whatever reason.

It also does not like when I set the border-color to match the background-color, but I don't have time to fix that so it's staying for now.
---
I feel I learned the most on this project as I was refactoring the MVP. I had a solution that worked, but cleaning up my code and seeing how I could make my classes and methods simpler gave me more insight in the kinds of things I want to make habit as I improve as a developer.

## Bonus Goals

- [x] add styles:
  - [x] 'start game' vs 'reset game'
  - [x] darkend colors for `.game-input` default vs ::hover vs .selected
- [ ] Add Strict Mode: an incorrect input resets the game
  1. [x] javascript
     - [x] implement logic in checkInputMatch() method
     - [x] create toggleStrictMode() method
     - [x] add data attribute for strict mode, implement in toggleStrictMode()
  2. [x] styles
  3. [ ] 'show pattern' feature that only works when not in strict mode
- [ ] SASS
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
- [vertically align text without flexbox}](https://stackoverflow.com/questions/8865458/how-do-i-vertically-center-text-with-css)
