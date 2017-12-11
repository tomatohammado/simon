const $ = window.jQuery

$(document).ready(function () {
  $('.game-button').click(selectButton)
})

/* Functions */

function selectButton () {
  /* callback function for when a .game-button is clicked
  // it will add, then remove, a .selected class to indicate a button has been pressed
  // - I will use another function to handle whether the button is being presented to the the user as part of the input pattern, or if it is part of the users input
  // - I think the function to remove the .selected class can be abstracted out. I need to read the documentation on .click() and possibly .on() to see what my options are
  */

  let target = $(this)
  target.toggleClass('selected')
  setTimeout(() => target.toggleClass('selected'), 500)
}
