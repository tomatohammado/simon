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
    return Math.floor(Math.random() * $('.game-input').length)
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
    let totalDuration = (patternLength + 1) * this.baseTimeout
    let boardNodejQ = $('.container.game-board')
    let inputsNodejQ = $('.container.game-inputs')

    // this.toggleDisplayPatternContainer(totalDuration)
    this.toggleDisplay(boardNodejQ, 'unclickable', totalDuration)
    this.toggleDisplay(inputsNodejQ, 'display-pattern', totalDuration)

    for (let i = 0; i < patternLength; i++) {
      let timeout = (i + 1) * this.baseTimeout
      let patternItemNodejQ = $(`[data-index="${this.pattern[i]}"]`)
      setTimeout(() => {
        // this.toggleDisplaySelected($(`[data-index="${this.pattern[i]}"]`))
        this.toggleDisplay(patternItemNodejQ, 'display-selected', this.baseTimeout / 2)
        this.toggleDisplay(patternItemNodejQ, 'unclickable', this.baseTimeout)
      }, timeout)
    }
  }

  getSubInput (e) {
    /* event handler for the `.game-input`s */
    /* ---------------- */
    let selected = $(e.target)
    let selectedIndex = parseInt(selected.attr('data-index'))

    if (selectedIndex === this.pattern[this.subCounter]) {
      // this.toggleDisplaySelected(selected)
      this.toggleDisplay(selected, 'display-selected', this.baseTimeout / 2)
      this.toggleDisplay(selected, 'unclickable', this.baseTimeout)
      this.subCounter++
      this.checkFinalSubInput()
    } else {
      // this.toggleDisplayMatchFail(this.baseTimeout)
      let inputsNodejQ = $('.container.game-inputs')
      this.toggleDisplay(inputsNodejQ, 'display-match-fail', this.baseTimeout)
      this.resetSubCounter()
      setTimeout(() => {
        this.showPattern()
      }, this.baseTimeout * 2)
    }
  }

  checkFinalSubInput () {
    /* Determines if the current match is the final match in the pattern
    // this is only called after a successful subinput match */
    /* ---------------- */
    if (this.subCounter === this.pattern.length) {
      // this.toggleDisplayMatchSuccess(this.baseTimeout)
      let inputsNodejQ = $('.container.game-inputs')
      this.toggleDisplay(inputsNodejQ, 'display-match-success', this.baseTimeout)
      this.incrementPattern()
      this.resetSubCounter()
      setTimeout(() => {
        this.showPattern()
      }, this.baseTimeout * 2)
    }
  }

  /* Display State Methods */
  /* ------------------------------------------------- */

  toggleDisplay (nodejQ, displayClass, duration) {
    nodejQ.toggleClass(displayClass)
    setTimeout(() => nodejQ.toggleClass(displayClass), duration)
  }
  // toggleDisplaySelected (selectedInput) {
  //   /* it will add, then remove, a .selected class to indicate a button has been pressed */
  //   /* ---------------- */
  //   selectedInput.toggleClass('selected unclickable')
  //   setTimeout(() => selectedInput.toggleClass('selected'), this.baseTimeout / 2)
  //   setTimeout(() => selectedInput.toggleClass('unclickable'), this.baseTimeout)
  // }

  // toggleDisplayPatternContainer (duration) {
  //   let boardTarget = $('.container.game-board')
  //   let buttonsTarget = $('.container.game-inputs')

  //   boardTarget.toggleClass('unclicakble')
  //   buttonsTarget.toggleClass('displayPattern')
  //   setTimeout(() => {
  //     boardTarget.toggleClass('unclicakble')
  //     buttonsTarget.toggleClass('displayPattern')
  //   }, duration)
  // }

  // toggleDisplayMatchFail (duration) {
  //   let target = $('.container.game-inputs')

  //   target.toggleClass('match-fail')
  //   setTimeout(() => target.toggleClass('match-fail'), duration)
  // }

  // toggleDisplayMatchSuccess (duration) {
  //   let target = $('.container.game-inputs')

  //   target.toggleClass('match-success')
  //   setTimeout(() => target.toggleClass('match-success'), duration)
  // }
}

/* Global Functions */
/* ================================================= */
function startGame () {
  let gameInstance = new SimonGame()

  $('.game-input').click((eventObject) => gameInstance.getSubInput(eventObject))
  gameInstance.incrementPattern()
  gameInstance.showPattern()
}

/* Adding functionality to th DOM */
/* ================================================= */
$(document).ready(function () {
  $('.button.start-game').click((e) => startGame())
})
