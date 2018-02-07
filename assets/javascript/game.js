
var wins = 0
var losses = 0

start()
function start() {
    //Start variables
    beer = ['ALE', 'PILSNER', 'PORTER', 'LAGER', 'STOUT', 'WHEAT', 'MALT']
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    secretWord = ""
    listLetters = []
    guessCount = 8
    rightCount = 0
    letterSecretWord = []
    lettersguessed = []
    //At start, randomize a word from beer array and create array with its letters
    secretWord = beer[Math.floor(Math.random() * beer.length)]
    console.log(secretWord)
    //Assigns each letter in randomized word in an array i.e. ['A', 'L', 'E']
    letterSecretWord = secretWord.split("")
    //For each letter in randomized word, replace with "_" and push to empty array lettersguessed i.e ['_', '_', '_']
    for (var i = 0; i < letterSecretWord.length; i++) {
        lettersguessed.push("_")
    }
    document.getElementById("comment").innerHTML = "Press any key to get started"
    //Replace comma separator with a space between underscores
    document.getElementById("secretWord").innerHTML = lettersguessed.join(" ")
    console.log(lettersguessed)
    //Starting count variables
    document.getElementById("guessCount").innerHTML = "You have " + guessCount + " guesses to solve this word!" + "<br>" + "<b>" + "Good luck!" + "</b>"
    document.getElementById("wins").innerHTML = "Your wins: " + wins
    document.getElementById("losses").innerHTML = "Your losses: " + losses
}
/*On key release, if the index of key you pressed is in the randomized word, 
Loop from 0 to less than letterSecretWord.length, and if key you pressed is in an index of the randomized word, 
then replace that index character with key pressed*/
document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase()
    console.log(userGuess)
    document.getElementById("comment").innerHTML = ""
    for (var i = 0; i < alphabet.length; i++) {
        if (userGuess === alphabet[i]) {
            //Prevent duplicate key presses from deducting guessCount
            alphabet.splice(i, 1)
            guessCount--
            console.log("Guess Count: " + guessCount)
            //Pushes keys you press 
            listLetters.push(userGuess)
            document.getElementById("guessCount").innerHTML = "Lives remaining: " + guessCount + "..."
            document.getElementById("lettersguessed").innerHTML = "Letters Guessed: " + "<h3>" + listLetters.join(" ") + "</h3>"
        }
    }
    //Run functions in this parent function
    RightOrWrong(userGuess)
    GameStatus()
}
//If the key you pressed is in the secret word, replace the j index with key you pressed
function RightOrWrong(userGuess) {
    if (secretWord.indexOf(userGuess) > -1) {
        for (var j = 0; j < letterSecretWord.length; j++) {
            if (userGuess === letterSecretWord[j]) {
                lettersguessed[j] = userGuess
                rightCount++
                console.log("Right Count: " + rightCount)
                document.getElementById("secretWord").innerHTML = lettersguessed.join(" ")
            }
        }
    }
}
//Conditions for Winning and Losing
function GameStatus() {
    if (rightCount === secretWord.length) {
        wins++
        lettersguessed.push(secretWord)
        document.getElementById("wins").innerHTML = "Your wins: " + wins
        document.getElementById("image1").style.visibility = "visible"
        alert("Winner winner! The answer is: " + secretWord)
    }
    else if (guessCount === 0) {
        losses++
        lettersguessed.push(secretWord)
        document.getElementById("losses").innerHTML = "Your losses: " + losses
        document.getElementById("image2").style.visibility = "visible"
        alert("You lose!! The answer was: " + secretWord)
    }
}
//Reset Button
function Reset() {
    document.getElementById("lettersguessed").innerHTML = ""
    document.getElementById("image1").style.visibility = "hidden"
    document.getElementById("image2").style.visibility = "hidden"
    start()
}
