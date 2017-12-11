const $ = window.jQuery

class SimonGame {
  constructor () {
    this.pattern = []
    this.totalPlayButtons = 0
    this.playIteration = 0
    this.isStrict = true
  }
  getRandomIndex () {
    /* get random integer between two numbers via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
    return Math.floor(Math.random() * this.totalPlayButtons)
    /* NOTE: the lower bound is inclusive, the upper bound is exclusive
    // so if the totalPlayButtons === 4, this will return 0-3 */
  }

  playPattern () {
    /* trigger styles on corresponding button for each item in patternArray */
    this.pattern.push(this.getRandomIndex())
    for (let i = 0; i < this.pattern.length; i++) {
      let timeout = i * 1000
      setTimeout(() => {
        selectButtonStyle($(`[data-index="${this.pattern[i]}"]`))
      }, timeout)
    }
  }

  getInput (e) {
    let target = $(e.target)
    let targetIndex = parseInt(target.attr('data-index'))

    if (targetIndex === this.pattern[this.playIteration]) {
      selectButtonStyle(target)
      console.log(targetIndex)
      console.log(this.pattern[this.playIteration])
      this.playIteration++
      // setTimeout(this.getInput, 1000)
    } else {
      console.log('not a match')
      return
    }

    if (this.playIteration === this.pattern.length) {
      console.log(`it's a match`)
      this.playIteration = 0
      console.log(this.pattern)
      setTimeout(this.playPattern, 2000)
    }
  }
}

$(document).ready(function () {
  /* add event listener to all .game-button's
  // will probably have to change the handler in the future
  */
  $('.button.start-game').click((e) => startGame())
})

/* Functions */
function startGame () {
  let gameInstance = new SimonGame()
  gameInstance.totalPlayButtons = $('.game.play-button').length

  $('.game.play-button').click((eventObject) => gameInstance.getInput(eventObject))

  gameInstance.playPattern()
}

function selectButtonStyle (targetElement) {
  /* it will add, then remove, a .selected class to indicate a button has been pressed */
  targetElement.toggleClass('selected')
  setTimeout(() => targetElement.toggleClass('selected'), 500)
}
