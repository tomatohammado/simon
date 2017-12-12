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
  toggleDisplay (nodejQ, displayClass, duration) {
    /* adds a display class to the give node jQuery object,
    // then removes that class after a duration */
    /* ---------------- */
    nodejQ.toggleClass(displayClass)
    setTimeout(() => nodejQ.toggleClass(displayClass), duration)
  }

  getRandomPatternIndex () {
    /* NOTE: the lower bound is inclusive, the upper bound is exclusive
    // so if the totalPlayButtons === 4, this will return an integer from 0-3 */
    /* ---------------- */
    return Math.floor(Math.random() * $('.game-input').length)
  }

  incrementPattern () {
    /* Adds a random .game-input index to the instance's .pattern array */
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
    let patternLength = this.pattern.length
    let totalDuration = (patternLength + 1) * this.baseTimeout
    let boardNodejQ = $('.container.game-board')
    let inputsContainerNodejQ = $('.container.game-inputs')

    /* 1) add classes to the game containers, to highlight the 'display pattern' phase and make the board unclickable for the duration */
    /* ---------------- */
    this.toggleDisplay(boardNodejQ, 'unclickable', totalDuration)
    this.toggleDisplay(inputsContainerNodejQ, 'display-pattern', totalDuration)

    /* 2) show each element in the pattern */
    /* ---------------- */
    for (let i = 0; i < patternLength; i++) {
      let timeout = (i + 1) * this.baseTimeout
      let patternItemNodejQ = $(`[data-index="${this.pattern[i]}"]`)
      setTimeout(() => {
        this.toggleDisplay(patternItemNodejQ, 'display-selected', this.baseTimeout / 2)
        this.toggleDisplay(patternItemNodejQ, 'unclickable', this.baseTimeout)
      }, timeout)
    }
  }

  getSubInput (e) {
    /* event handler for the `.game-input`s
    // - this method is used to check if a given input matches the pattern whenever the user makes a selection
    /* ---------------- */
    let selected = $(e.target)
    let selectedIndex = parseInt(selected.attr('data-index'))

    this.checkInputMatch(selected, selectedIndex)
  }

  checkInputMatch (inputNodejQ, inputIndex) {
    /* If the selected index is the same as the index for the respective pattern item:
    // - give visual feedback of a valid selection
    // - increment the subCounter so the checkInputMatch method checks the next value in instance.patterns
    // - check to see if the given input is the last match in the pattern
    */
    if (inputIndex === this.pattern[this.subCounter]) {
      this.toggleDisplay(inputNodejQ, 'display-selected', this.baseTimeout / 2)
      this.toggleDisplay(inputNodejQ, 'unclickable', this.baseTimeout)
      this.subCounter++
      this.checkIsFinalInput()
    } else {
      /* if not a match:
      // - give visual feedback the there is a failed match
      // - reset the subCounter, so the next invocation of checkInputMatch starts from the beginning of the .pattern array
      // - show the pattern again
      // - might add functionality if 'strict mode' is on */
      let inputsContainerNodejQ = $('.container.game-inputs')
      this.toggleDisplay(inputsContainerNodejQ, 'display-match-fail', this.baseTimeout)
      this.resetSubCounter()
      setTimeout(() => {
        this.showPattern()
      }, this.baseTimeout * 2)
    }
  }

  checkIsFinalInput () {
    /* Determines if the current match is the final match in the pattern
    // - this is only called after a successful sub-input match */
    /* ---------------- */
    if (this.subCounter === this.pattern.length) {
      let inputsContainerNodejQ = $('.container.game-inputs')
      this.toggleDisplay(inputsContainerNodejQ, 'display-match-success', this.baseTimeout)
      this.incrementPattern()
      this.resetSubCounter()
      setTimeout(() => {
        this.showPattern()
      }, this.baseTimeout * 2)
    }
  }
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
