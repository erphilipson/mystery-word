const express = require('express');
const router = express.Router();
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

// assign random word ✓
// create text box w/ button and accept input into guess var ✓
// give blank spaces ✓
// if guess != a single letter: error msg ✓
// if letter is correct, replace blank space w/ letter ✓
// store guesses ✓
// if guess has already been made, cannot make again ✓
// tell if guess is correct or not ✓
// give remaining guesses (tries--) ✓
// once guesses run out "you lose" ✓
// once all letters are correctly guessed "you win" ✓
// if letter appears more than once, fill all appropriate spots ✓


let randomWord = (words[Math.floor(Math.random()*words.length)]).split('');
let word = [];
let guessed = [];
let guess;
let tries = 8;
let triesMsg = '';
let wordGuess;
let error;
let state;

console.log(randomWord);


for(let i=0; i<randomWord.length; i++){
  word.push('_');
}

wordGuess = word.join(' ');

router.get('/', function (req, res){
  res.render('index', {wordGuess})
})

router.post('/', function (req, res){

  let guessObj =
  {
    'item': req.body.guess
  };

  guess = guessObj.item.toLowerCase();

  if (randomWord.indexOf(guess) != -1 && guessed.indexOf(guess) === -1){
    guessed.push(guess);
    word[randomWord.indexOf(guess)] = guess;

    for (i in randomWord){
      if (randomWord[i] === guess){
        word[i] = guess;
        }
      }

    wordGuess = word.join(' ');
    if (word.indexOf('_') === -1){
      state = 'won!';
      res.redirect('/end');
    }

  } else if (guessed.indexOf(guess) >= 0){
    error = 'Letter already guessed. Try again!'

  } else if (!guess.match(/[a-z]/i) || guess.length > 1){
    error = 'Not a single letter. Try again!';

  } else {
    error = 'There is no ' + guess + '. ' + 'Try again!';
    guessed.push(guess);
    tries--;
    triesMsg = tries + ' tries left'

    if (tries === 0){
      state = 'lost.';
      res.redirect('/end');
    }
  }
  let guessedDisplay = guessed.join(' ').toUpperCase();
  res.render('index', {guessed: guessed, wordGuess: wordGuess, error: error, triesMsg: triesMsg, guessedDisplay})
});

router.get('/end', function(req, res){
  res.render('end', {state});
})

router.post('/end/', function(req, res){
  if (req.body.button === 'yes'){
  // RESETS GAME
  res.send('This would start a new game were I not still a developing developer. Oh well. Sometimes that just how life goes. I tried req.session.destroy() but that did not work. I tried a whole host of other things, but they seemed to do more harm than good. Google was not particularly helpful in the matter either. Maybe someday I will learn this technique. Maybe...')
  res.redirect('/');
}
})

module.exports = router;
