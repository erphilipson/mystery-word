const express = require('express');
const bodyParser = require('body-parser');

module.exports = {
  test: function (req, res) {
    let guessArr =
    {
      'item': req.body.guess
    };

    guess = guessArr.item;
    return;
  },

  test1: function() {
    if (randomWord.indexOf(guessed) >= 0){
      console.log('Yay');
    } else {
      console.log ('Too bad');
    }

  }

}
