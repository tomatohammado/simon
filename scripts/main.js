const $ = window.jQuery

class SimonGame {
  constructor () {
    this.pattern = []
    this.subCounter = 0
    this.baseTimeout = 1000
    this.isStrict = false
  }

  /* Methods */
  /* ================================================= */
  /* Object Utility Methods */
  /* ------------------------------------------------- */
  getRandomPatternIndex () {
    /* NOTE: the lower bound is inclusive, the upper bound is exclusive
    // so if the totalPlayButtons === 4, this will return an integer from 0-3 */
    /* ---------------- */
    return Math.floor(Math.random() * $('.button.game-input').length)
  }

  incrementPattern () {
    /* Adds a random index to the object's .pattern array property */
    /* ---------------- */
    this.pattern.push(this.getRandomPatternIndex())
  }

  resetSubCounter () {
    /* sets subCounter to 0 */
    /* ---------------- */
    this.subCounter = 0
  }

  /* Core Game Methods */
  /* ------------------------------------------------- */
  showPattern () {
    /* This has two major functions that occur concurently..
    // 1) add classes to the game containers, to highlight the 'pattern' phase and make the board unclickable while showing pattern
    // 2) show each element in the pattern */
    /* ---------------- */
    let patternLength = this.pattern.length
    let totalDuration = patternLength * this.baseTimeout

    this.toggleDisplayPatternContainer(totalDuration)

    for (let i = 0; i < patternLength; i++) {
      let timeout = i * this.baseTimeout
      setTimeout(() => {
        toggleDisplaySelected($(`[data-index="${this.pattern[i]}"]`))
      }, timeout)
    }
  }

  getSubInput (e) {
    /* event handler for the .game-input's */
    /* ---------------- */
    let selected = $(e.target)
    let selectedIndex = parseInt(selected.attr('data-index'))

    if (selectedIndex === this.pattern[this.subCounter]) {
      toggleDisplaySelected(selected)
      this.subCounter++
    } else {
      let self = this
      this.toggleDisplayMatchFail(this.baseTimeout)
      this.resetSubCounter()
      setTimeout(this.showPattern.bind(self), this.baseTimeout * 2)
      return
    }

    this.checkFinalSubInput()
  }

  checkFinalSubInput () {
    /* Determines if the current match is the final match in the pattern
    // will only run after a successful subinput match */
    /* ---------------- */
    if (this.subCounter === this.pattern.length) {
      let self = this
      this.toggleDisplayMatchSuccess(this.baseTimeout)
      this.incrementPattern()
      this.resetSubCounter()
      setTimeout(this.showPattern.bind(self), this.baseTimeout * 2)
    }
  }

  /* Display State Methods */
  /* ------------------------------------------------- */
  toggleDisplayPatternContainer (duration) {
    let boardTarget = $('.container.game-board')
    let buttonsTarget = $('.container.game-buttons')

    boardTarget.toggleClass('unclicakble')
    buttonsTarget.toggleClass('displayPattern')
    setTimeout(() => {
      boardTarget.toggleClass('unclicakble')
      buttonsTarget.toggleClass('displayPattern')
    }, duration)
  }

  toggleDisplayMatchFail (duration) {
    let target = $('.container.game-buttons')

    target.toggleClass('match-fail')
    setTimeout(() => target.toggleClass('match-fail'), duration)
  }

  toggleDisplayMatchSuccess (duration) {
    let target = $('.container.game-buttons')

    target.toggleClass('match-success')
    setTimeout(() => target.toggleClass('match-success'), duration)
  }
}

/* Global Functions */
/* ================================================= */
function startGame () {
  let gameInstance = new SimonGame()

  $('.button.game-input').click((eventObject) => gameInstance.getSubInput(eventObject))
  gameInstance.incrementPattern()
  gameInstance.showPattern()
}

function toggleDisplaySelected (selectedInput) {
  /* it will add, then remove, a .selected class to indicate a button has been pressed */
  /* ---------------- */
  selectedInput.toggleClass('selected unclickable')
  setTimeout(() => selectedInput.toggleClass('selected'), 500)
  setTimeout(() => selectedInput.toggleClass('unclickable'), 1000)
}

/* Adding functionality to th DOM */
/* ================================================= */
$(document).ready(function () {
  $('.button.start-game').click((e) => startGame())
})
