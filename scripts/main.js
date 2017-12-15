const $ = window.jQuery

/* CLASSES */
/* ================================================= */
class Game {
  /* Parent Class */
  /* ------------------------------------------------- */
  constructor (timeoutDuration) {
    this.jQBoardNode = $('.container-game-board')
    this.jQContainerInputsNode = $('.container-game-inputs')
    this.baseTimeout = timeoutDuration
  }
  /* Utility Methods */
  /* ------------------------------------------------- */
  toggleDisplay (jQNode, displayClass, duration) {
    /* - adds a display class to the give node jQuery object,
    // - then removes that class after a duration */
    jQNode.toggleClass(displayClass)
    setTimeout(() => jQNode.toggleClass(displayClass), duration)
  }
}

class Simon extends Game {
  /* Child Class */
  /* ------------------------------------------------- */
  constructor (timeoutDuration, isStrict) {
    super(timeoutDuration)
    this.pattern = []
    this.subCounter = 0
    this.strictMode = isStrict
  }
  /* Utility Methods */
  /* ------------------------------------------------- */
  getRandomPatternIndex () {
    /* Return random index for one of the possible buttons */
    return Math.floor(Math.random() * $('.game-input').length)
  }

  incrementPattern () {
    /* Adds a random .game-input index to the instance's .pattern array */
    this.pattern.push(this.getRandomPatternIndex())
  }

  resetSubCounter () {
    /* resets subCounter to default 0 */
    this.subCounter = 0
  }

  resetPattern () {
    /* resets pattern to default empty array */
    this.pattern = []
  }

  toggleStrictMode () {
    // AS: You can simplify this by doing the following!
    this.jQBoardNode.attr('data-is-strict', this.strictMode.toString())
    this.strictMode = !this.strictMode
  }

  /* Core Simon Game Methods */
  /* ------------------------------------------------- */
  startNewGame () {
    this.resetSubCounter()
    this.resetPattern()
    this.incrementPattern()

    /* 1) I flash all of the `game-input`s to visually represent the new game */
    let jQInputNodeList = $('.game-input')
    this.toggleDisplay(jQInputNodeList, 'display-selected', this.baseTimeout / 2)
    /* 2) I make the jQBoardNode unclickable for the same amount of time I delay the call to .showPattern. This lines up with toggling it again in showPattern, so visually the user doesn't see it */
    this.toggleDisplay(this.jQBoardNode, 'unclickable', this.baseTimeout * 1.5)
    setTimeout(() => this.showPattern(), this.baseTimeout * 1.5)
  }

  showPattern () {
    let patternLength = this.pattern.length
    let totalDuration = (patternLength + 1) * this.baseTimeout

    /* 1) visual feedback for the phase of the game where the pattern is being shown. The input container is enlarged, and the entire board is unclickable for the duration */
    this.toggleDisplay(this.jQBoardNode, 'unclickable', (totalDuration + this.baseTimeout))
    this.toggleDisplay(this.jQContainerInputsNode, 'display-pattern', totalDuration)

    /* 2) show each element in the pattern */
    for (let i = 0; i < patternLength; i++) {
      let timeout = (i + 1) * this.baseTimeout
      let jQPatternItemNode = $(`[data-index="${this.pattern[i]}"]`)
      setTimeout(() => {
        this.toggleDisplay(jQPatternItemNode, 'display-selected', this.baseTimeout / 2)
        this.toggleDisplay(jQPatternItemNode, 'unclickable', this.baseTimeout)
      }, timeout)
    }
  }

  getSubInput (e) {
    /* event handler for the `.game-input`s */
    let selected = $(e.target)
    this.checkInputMatch(selected)
  }

  checkInputMatch (jQInputNode) {
    /* If the selected index is the same as the index for the respective pattern item:
    // - give visual feedback of a valid selection
    // - increment the subCounter so the checkInputMatch method checks the next value in instance.patterns
    // - check to see if the given input is the last match in the pattern */
    /* ---------------- */
    let inputIndex = parseInt(jQInputNode.attr('data-index'))
    if (inputIndex === this.pattern[this.subCounter]) {
      this.toggleDisplay(jQInputNode, 'display-selected', this.baseTimeout / 2)
      this.toggleDisplay(jQInputNode, 'unclickable', this.baseTimeout)
      this.subCounter++
      this.checkIsFinalInput()
    } else {
      /* If not a match:
      // - give visual feedback the there is a failed match
      // - reset the subCounter, so the next invocation of checkInputMatch starts from the beginning of the .pattern array
      // - show the pattern again
      /* ---------------- */
      this.toggleDisplay($('.container-game-visible'), 'display-fail', this.baseTimeout)
      this.toggleDisplay(this.jQBoardNode, 'unclickable', this.baseTimeout * 2)

      this.checkIsStrictMode()
    }
  }

  checkIsStrictMode () {
    if (this.strictMode === true) {
    /* If strict mode is true, restart the game after the timeout for
    displaying the failed input match from checkInputMatch() */
      setTimeout(() => {
        this.startNewGame()
      }, this.baseTimeout * 2)
    } else {
    /* otherwise, reset the subcounter and show the same pattern again */
      setTimeout(() => {
        this.resetSubCounter()
        this.showPattern()
      }, this.baseTimeout * 2)
    }
  }

  checkIsFinalInput () {
    /* Determines if the current match is the final match in the pattern */
    if (this.subCounter === this.pattern.length) {
      this.toggleDisplay($('.container-game-visible'), 'display-success', this.baseTimeout)
      this.toggleDisplay(this.jQBoardNode, 'unclickable', this.baseTimeout * 2)
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
  let simonInstance = new Simon(1000, false)

  $('.button.game-strict-toggle').click((eventObject) => simonInstance.toggleStrictMode())

  /* set event listener for starting the game:
  // - remove the click even listener previously on .button-game-start
  // - make the 'New Game' button a 'Reset Game' button */
  /* ---------------- */
  let jQGameStartNode = $('.button.game-start')
  jQGameStartNode.on('click', (e) => {
    /* first, turn off the current event listener and set the -started attribut to true */
    jQGameStartNode.off('click')
    jQGameStartNode.attr('data-is-started', 'true')

    /* Begin Game
    // there is a small delay so make the animations a little smoother
    // I put some of the other events in here to prevent a bug that could have occured in the unlikely even the user clicks the button again within 62.5ms */
    /* ---------------- */
    setTimeout(() => {
      /* new event listener on the .game-start node */
      jQGameStartNode.text('Reset Game')
      jQGameStartNode.click((e) => simonInstance.startNewGame())

      /* - make .container.game-inputs clickable
      // - add event listeners to `.game-input`s */
      simonInstance.jQContainerInputsNode.removeClass('unclickable')
      $('.game-input').click((eventObject) => simonInstance.getSubInput(eventObject))

      /* finally, call the startNewGameMethod */
      simonInstance.startNewGame()
    }, 62.5)
  })
})
