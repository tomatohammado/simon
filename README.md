# simon
WDI Project 1

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

## Reach goals:
- make it so you can't click a button while it is animating
  - I think I am better off using the `animate` property vs `transition`, but it's not important for the MVP so I'll save it for later
  - sources to look at: [animation on cssgarden - look under `.treatment .carrot`](http://cssgridgarden.com/)
- I have to do something reaaaaally hacky to get the playPattern() function to work
  - because all of the functions run at the same time, I have to set increment a timeout variable based on the current index
  - is there a better way to get a function to run on each element in an array sequentially?
