const $ = window.jQuery

$(document).ready(function () {
  /* add event listener to all .game-button's
  // will probably have to change the handler in the future
  */
  $('.game.play-button').click((e) => selectButton(e.target))

  /* array holding the pattern the game will play back to the player
  // used to check the validity of the user response, as well
  */
  let gamePattern = []
  let numberOfButtons = $('.game.play-button').length
  /* add index to gamePattern array */
  gamePattern.push(getRandomIndex(numberOfButtons))
})

/* Functions */

function selectButton (targetElement) {
  /* callback function for when a .game-button is clicked
  // it will add, then remove, a .selected class to indicate a button has been pressed
  // - I will use another function to handle whether the button is being presented to the the user as part of the input pattern, or if it is part of the users input
  // - I think the function to remove the .selected class can be abstracted out. I need to read the documentation on .click() and possibly .on() to see what my options are
  */

  let target = $(targetElement)
  target.toggleClass('selected')
  setTimeout(() => target.toggleClass('selected'), 500)
}

function getRandomIndex (upperLimit) {
  /* get random integer between two numbers via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // NOTE: the lower bound is inclusive, the upper bound is exclusive
  so for our purposes, if the upperLimit === 4, then this will return an integer between 0-3 */
  return Math.floor(Math.random() * upperLimit)
}

function playPattern (patternArray) {
  /* read through each element in patternArray, and trigger the button that responds the the corresponding index */
  for (let i = 0; i < patternArray.length; i++) {
    let timeout = i * 1000
    setTimeout(() => {
      selectButton(`[data-index="${patternArray[i]}"]`)
    }, timeout)
  }
}
