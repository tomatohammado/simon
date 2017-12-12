const $ = window.jQuery

/* CLASSES */
/* ================================================= */
class Game {
  /* Parent Class */
  /* ------------------------------------------------- */
  constructor (timeoutDuration) {
    this.boardNodejQ = $('.container.game-board')
    this.inputsContainerNodejQ = $('.container.game-inputs')
    this.baseTimeout = timeoutDuration
  }
  /* Utility Methods */
  /* ------------------------------------------------- */
  toggleDisplay (nodejQ, displayClass, duration) {
    /* - adds a display class to the give node jQuery object,
    // - then removes that class after a duration */
    /* ---------------- */
    nodejQ.toggleClass(displayClass)
    setTimeout(() => nodejQ.toggleClass(displayClass), duration)
  }
}

class Simon extends Game {
  /* Child Class */
  /* ------------------------------------------------- */
  constructor (timeoutDuration) {
    super(timeoutDuration)
    this.pattern = []
    this.subCounter = 0
    this.isStrict = false
  }
  /* Utility Methods */
  /* ------------------------------------------------- */
  getRandomPatternIndex () {
    /* Return random index for one of the possible buttons
    // - see README.md for notes on Math.random() */
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

  resetPattern () {
    /* sets pattern to the default empty array */
    /* ---------------- */
    this.pattern = []
  }

  /* Core Simon Game Methods */
  /* ------------------------------------------------- */
  startNewGame () {
    /* pretty straigtfoward: wipe the slate clean and begin the game again */
    /* ---------------- */
    this.resetSubCounter()
    this.resetPattern()
    this.incrementPattern()
    this.showPattern()
  }

  showPattern () {
    let patternLength = this.pattern.length
    let totalDuration = (patternLength + 1) * this.baseTimeout

    /* 1) add classes to the game containers, to highlight the 'display pattern' phase and make the board unclickable for the duration */
    /* ---------------- */
    this.toggleDisplay(this.boardNodejQ, 'unclickable', (totalDuration + this.baseTimeout))
    this.toggleDisplay(this.inputsContainerNodejQ, 'display-pattern', totalDuration)

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
    /* event handler for the `.game-input`s:
    /* ---------------- */
    let selected = $(e.target)
    this.checkInputMatch(selected)
  }

  checkInputMatch (inputNodejQ) {
    /* If the selected index is the same as the index for the respective pattern item:
    // - give visual feedback of a valid selection
    // - increment the subCounter so the checkInputMatch method checks the next value in instance.patterns
    // - check to see if the given input is the last match in the pattern */
    /* ---------------- */
    let inputIndex = parseInt(inputNodejQ.attr('data-index'))
    if (inputIndex === this.pattern[this.subCounter]) {
      this.toggleDisplay(inputNodejQ, 'display-selected', this.baseTimeout / 2)
      this.toggleDisplay(inputNodejQ, 'unclickable', this.baseTimeout)
      this.subCounter++
      this.checkIsFinalInput()
    } else {
      /* If not a match:
      // - give visual feedback the there is a failed match
      // - reset the subCounter, so the next invocation of checkInputMatch starts from the beginning of the .pattern array
      // - show the pattern again
      /* ---------------- */
      this.toggleDisplay(this.inputsContainerNodejQ, 'display-match-fail', this.baseTimeout)
      this.toggleDisplay(this.boardNodejQ, 'unclickable', this.baseTimeout * 2)
      this.resetSubCounter()
      setTimeout(() => {
        this.showPattern()
      }, this.baseTimeout * 2)
    }
    /* - might add functionality if 'strict mode' is on */
  }

  checkIsFinalInput () {
    /* Determines if the current match is the final match in the pattern
    /* ---------------- */
    if (this.subCounter === this.pattern.length) {
      this.toggleDisplay(this.inputsContainerNodejQ, 'display-match-success', this.baseTimeout)
      this.toggleDisplay(this.boardNodejQ, 'unclickable', this.baseTimeout * 2)
      this.incrementPattern()
      this.resetSubCounter()
      setTimeout(() => {
        this.showPattern()
      }, this.baseTimeout * 2)
    }
  }
}

/* GLOBAL FUNCTIONS */
/* ================================================= */
$(document).ready(function () {
  /* create instance of SimonGame */
  let simonInstance = new Simon(1000)

  /* set event listener for starting the game:
  // - remove the click even listener previously on .button-new-game
  // - make the 'New Game' button a 'Reset Game' button */
  /* ---------------- */
  let newGameNodejQ = $('.button.new-game')
  newGameNodejQ.on('click', (e) => {
    newGameNodejQ.off('click')
    newGameNodejQ.attr('data-is-started', 'true')
    newGameNodejQ.text('Reset Game')
    newGameNodejQ.click((e) => simonInstance.startNewGame())

    /* - make .container.game-inputs clickable
    // - add event listeners to `.game-input`s */
    /* ---------------- */
    simonInstance.inputsContainerNodejQ.removeClass('unclickable')
    $('.game-input').click((eventObject) => simonInstance.getSubInput(eventObject))

    /* Begin game */
    simonInstance.startNewGame()
  })
})
