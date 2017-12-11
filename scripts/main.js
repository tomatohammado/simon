const $ = window.jQuery

class SimonGame {
  constructor () {
    this.pattern = []
    this.totalPlayButtons = 0
    this.playIteration = 0
    this.isStrict = false
  }
  /* Object Methods */
  getRandomIndex () {
    /* NOTE: the lower bound is inclusive, the upper bound is exclusive
    // so if the totalPlayButtons === 4, this will return an integer from 0-3 */
    return Math.floor(Math.random() * this.totalPlayButtons)
  }

  iteratePattern () {
    /* Adds a random index to the objects .pattern property */
    this.pattern.push(this.getRandomIndex())
  }

  resetPlayIteration () {
    /* sets playIteration to 0 */
    this.playIteration = 0
  }

  displayPattern () {
    /* This has two major parts that occur concurently... */
    let self = this
    let baseTimeout = 1000
    let patternLength = this.pattern.length
    let totalDuration = patternLength * baseTimeout
    /* 1) add styles to the containers and make them unclickable while animating */
    this.toggleDisplayPattern()
    setTimeout((this.toggleDisplayPattern).bind(self), totalDuration)
    /* 2) display each item in the pattern array */
    for (let i = 0; i < patternLength; i++) {
      let timeout = i * baseTimeout
      setTimeout(() => {
        selectButtonStyle($(`[data-index="${this.pattern[i]}"]`))
      }, timeout)
    }
  }

  getPlayInput (e) {
    /* event handler for the .play-button's */
    let target = $(e.target)
    let targetIndex = parseInt(target.attr('data-index'))

    if (targetIndex === this.pattern[this.playIteration]) {
      selectButtonStyle(target)
      this.playIteration++
    } else {
      let self = this
      this.toggleMatchFail()
      setTimeout(() => self.toggleMatchFail(), 1000)
      this.resetPlayIteration()
      setTimeout(this.displayPattern.bind(self), 2000)
      return
    }

    this.checkInputFinal()
  }

  checkInputFinal () {
    /* Determines if the current match is the final match in the pattern
    // will only run after a successful match */
    if (this.playIteration === this.pattern.length) {
      let self = this
      this.toggleMatchSuccess()
      setTimeout(() => self.toggleMatchSuccess(), 1000)
      this.iteratePattern()
      this.resetPlayIteration()
      setTimeout(this.displayPattern.bind(self), 2000)
    }
  }

  /* These Methods are used to toggle styles for different dislay states */
  toggleDisplayPattern () {
    $('.container.game-board').toggleClass('unclicakble')
    $('.container.play-game-buttons').toggleClass('isPlaying')
  }

  toggleMatchFail () {
    $('.container.play-game-buttons').toggleClass('match-fail')
  }

  toggleMatchSuccess () {
    $('.container.play-game-buttons').toggleClass('match-success')
  }
}

$(document).ready(function () {
  $('.button.start-game').click((e) => startGame())
})

/* Functions */
function startGame () {
  let gameInstance = new SimonGame()
  gameInstance.totalPlayButtons = $('.button.play-game').length

  $('.button.play-game').click((eventObject) => gameInstance.getPlayInput(eventObject))
  gameInstance.iteratePattern()
  gameInstance.displayPattern()
}

function selectButtonStyle (targetElement) {
  /* it will add, then remove, a .selected class to indicate a button has been pressed */
  targetElement.toggleClass('selected unclickable')
  setTimeout(() => targetElement.toggleClass('selected'), 500)
  setTimeout(() => targetElement.toggleClass('unclickable'), 1000)
}
