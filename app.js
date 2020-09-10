// Name - Ramesh Malka
// Student ID - C0765496

// ---------------------------
// 1. Game setup
// ---------------------------

// constants
const DEFAULT_IMAGE = "001-face.png"
const POSSIBLE_WORDS = ["TORONTO", "PARIS", "ROME", "MISSISSIPPI"]; // @NOTE: your game must work for any size array!
const MAX_CHANCES = 6

// game variables
let chancesRemaining = MAX_CHANCES;
let selectedWord = ""; 
let wordToDisplaypush = [], wordToDisplaypushSliced = [];
let imageNum = 1;
let finishedLetters = 0;

const restartGame = function() {
  // 1. reset game logic variables
  chancesRemaining = MAX_CHANCES;
  selectedWord = "";
  
  // 2. reset letter divs UI
  let letterDivs = document.querySelectorAll("div.letter.already-selected");
  for (let i = 0; i < letterDivs.length; i++) {
    let elem = letterDivs[i];
    elem.classList.remove("already-selected");
  }

  // 3. Reset images
  document.getElementById("img-hangperson-status").src = "img/" + DEFAULT_IMAGE;

  // 4. Reset chances remaining label
  document.querySelector(".chancesLabel").innerText = MAX_CHANCES;

  // 5. Reset messages labels
  let resultsLabel = document.querySelector("#results");
  resultsLabel.innerText = "";
  resultsLabel.classList.remove("highlight");

  // 6. Reset  _ _ _ ui
  document.querySelector("#word").innerText = "";
}

const saveGame = function() {
  alert("SAVING THE GAME!");
  console.log("Save Game button pressed");

  let objToLS = {
    "selectedWord" : selectedWord,
    "chancesRemaining": chancesRemaining
  }

  localStorage.setItem("hangManInLS", JSON.stringify(objToLS));

  // @TODO: Write the code to save the game to local storage
  // - save the selected word
  // - save the number of chances remaining
  // You must put these details into a Javascript object, then save it to local storage.
}

const startGame = function(event) {
  alert("game start");
  console.log("game start");

  // 1. @TODO: When player starts the game, you should reset all the UI and game logic variables.
  restartGame();

  // 2. @TODO: select a word
  selectedWord = chooseRandomWord();  //@TODO: You will need to update this function to actually pick a random word.
  
  // 3. @TODO: display the word as _ in the UI 
  // document.querySelector("#word").innerText = "_ _ _";    //@TODO: update this to dynamically show the dashes _ _ _ _ 

  let dashes = "";
  for(let i = 0; i< selectedWord.length; i++){
    dashes +="_ "
  }

  document.querySelector("#word").innerText = dashes;
  
  // @DEBUG: for debugging purposes, show the actual word in the ui 
  document.querySelector("#debug-actual-word").innerText = "DEBUG: Selected word is: " +selectedWord;
  
}

// Function should return a random word
const chooseRandomWord = function() {
  // @TODO: Write the code to randomly select a word from the word bank
  // let randomWord = "PIG";
  
  let randomWord = POSSIBLE_WORDS[Math.floor(Math.random(10)*4)];

  return randomWord;
}

// Helper function to handle game over
// @param didPlayerWin   boolean variable that indicates if the player wins or loses
const doGameOver = function(didPlayerWin) {
  // -----------------------------------------------
  // 1. UI: disable all buttons
  // -----------------------------------------------
  // 1a. get all <div class="letter"> elements.

    let list;
    list = document.querySelectorAll(".row .letter");
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.add("already-selected");
    }
    // .classList.toggle("already-selected");
  // 1b. For each element, disable the button by adding the .already-selected CSS selector

  // -----------------------------------------------
  // 2. @TODO: LOGIC: display a message in the results label
  // -----------------------------------------------
  // The message should change depending on whether the person won or lost the game
  let resultsLabel = document.querySelector("#results");
  if (didPlayerWin === true) {
    // set the resultsLabel to show a winning message
    // add yellow highlighting to the label (see the .highlight CSS style in styles.css)
    resultsLabel.innerHTML = "GAME OVER! YOU WIN!";
    resultsLabel.style.backgroundColor = "yellow";
    
  }
  else if (didPlayerWin === false) {
    // set the resultsLabel to show a losing message
    // add yellow highlighting to the label (see the .highlight CSS style in styles.css)
    resultsLabel.innerHTML = "GAME OVER! YOU LOSE!";
    resultsLabel.style.backgroundColor = "yellow"
    
  }
  
}


const letterPressed = function(event) {
  
  // get the specific element on the page that the user pressed
  const pushedElement = event.target

  // if the person did NOT press a <div class="letter"> item, then ignore the click and move on
  if (pushedElement.classList.contains("letter") === false) {
    console.log("Ignoring your click. Reason: you didn't click on a <div class='letter'> element")
    return;
  }

  // if the person DID click a <div class="letter"> element, check to see if is a letter they already selected
  if (pushedElement.classList.contains("already-selected")) {
    console.log("You already selected this letter!");
    return;
  }

  // -----------------------------------
  // @TODO: At this point, you have a valid "click". Therefore, start writing your game logic here!
  // -----------------------------------

  // 1. UI: Visually "disable" the <div class="letter"> element that the person clicked on
  pushedElement.classList.add("already-selected");

  // 2. @TODO: LOGIC: Get the letter they clicked on
  let letter = pushedElement.innerText;
  console.log("You clicked on: " + letter);

  // @TODO This should be replaced with a "correct!" or "incorrect!" message. See below.
  document.querySelector("#results").innerText = "You clicked on: " + letter;   
  

  // 3. @TODO: LOGIC: If letter is in the word, then:
  
  if(selectedWord.includes(letter) == true){
    console.log("letter correct!");
    
    let str = selectedWord;
    
    let visited = [];

    for(let i = 0;i<str.length;i++){
        visited[i] = false
    }
    for(let i=0; i<str.length;i++) {
        if ((str[i] === letter) && visited[i] == false){
   
                   
            wordToDisplaypush[i]=letter;
            finishedLetters++;
            visited[i] = true;
            if(finishedLetters == str.length){
              doGameOver(true);
            }
        }
        else {
          if(wordToDisplaypush.length < str.length){
            wordToDisplaypush.push("_ ");
          }
          
        } 
        
    }

    document.querySelector("#word").innerText = wordToDisplaypush.join("");
        
    console.log("Word to display - ", wordToDisplaypush);
        
    

  }
  else{
    console.log("Wrong! " + letter + " is not in the word");
    chancesRemaining--;
    document.querySelector(".chancesLabel").innerText = chancesRemaining;
    imageNum++;

    document.getElementById("img-hangperson-status").src = "img/" + "00"+imageNum+"-face.png";

    if(chancesRemaining == 0){
      doGameOver(false);

    }

  }

  //    - output "letter correct!" message

  //    - update the UI so it shows the letter in the correct position of the word


  //    - check if the game is over 

  // 4. @TODO: LOGIC: If letter is NOT in word, then:
  //    - output "letter wrong!" message
  //    - update chancesRemaining variable
  //    - update hangperson image
  //    - check if game is over
}

// -------------------
// EVENT LISTENERES
// -------------------

// start button: when clicked, start a new game
document.querySelector(".btn-start-game").addEventListener("click", startGame);

// save button: when clicked, save game to local storage
document.querySelector(".btn-save-game").addEventListener("click", saveGame);

// Letter buttons: detect when person clicks anywhere inside the <div class="letter-bank"> element
// See comments inside letterPressed() function for documentation on how this works
document.querySelector(".letter-bank").addEventListener("click", letterPressed);