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

  iteratePattern () {
    this.pattern.push(this.getRandomIndex())
  }
  playPattern () {
    /* trigger styles on corresponding button for each item in patternArray */
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
      this.playIteration++
    } else {
      console.log('not a match')
      let self = this
      let invokePlayPattern = this.playPattern.bind(self)
      this.playIteration = 0
      setTimeout(invokePlayPattern, 2000)
      return
    }

    this.checkFinalInput()
  }

  checkFinalInput () {
    if (this.playIteration === this.pattern.length) {
      console.log(`it's a match`)
      this.iteratePattern()
      let self = this
      let invokePlayPattern = this.playPattern.bind(self)
      this.playIteration = 0
      setTimeout(invokePlayPattern, 2000)
    }
  }
}

$(document).ready(function () {
  $('.button.start-game').click((e) => startGame())
})

/* Functions */
function startGame () {
  let gameInstance = new SimonGame()
  gameInstance.totalPlayButtons = $('.game.play-button').length

  $('.game.play-button').click((eventObject) => gameInstance.getInput(eventObject))
  gameInstance.iteratePattern()
  gameInstance.playPattern()
}

function selectButtonStyle (targetElement) {
  /* it will add, then remove, a .selected class to indicate a button has been pressed */
  targetElement.toggleClass('selected unclickable')
  setTimeout(() => targetElement.toggleClass('selected'), 500)
  setTimeout(() => targetElement.toggleClass('unclickable'), 1000)
}
