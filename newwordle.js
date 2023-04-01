

let currentColPosition=0;
let currentRowPosition=0;
let row=[];//
let currentGuess=[];


let pickWord = validWords[Math.floor(Math.random() * validWords.length)];
console.log(pickWord);


function initializeRow(){
    let rows=document.querySelectorAll('.fieldBox');
    row=rows[currentRowPosition];
    console.log(row);//pick up which row
   
}


function addLetter(key){
    let fieldBox=row.querySelectorAll(".field")
    console.log(fieldBox[currentColPosition]);//column position
    fieldBox[currentColPosition].textContent=key;//put text in field//

}




function onKeyboardClick(keyElement){//keyboard key click, push into current box.
    let key = keyElement.textContent;

    if (key === "⌫") {//Back space key
        console.log('pressed delete')
        deleteLetter()//delete function work 
    }

    else if (key=== "⏎ Enter") {
        if(currentGuess.length<5){ //check enough letter in guess
            alert("Not enough letter ☝🏽");
            console.log(currentGuess);
            return;
            }   
        else if(currentGuess.length===5){//if the guess word length = 5 length 
             if(!validWords.includes(currentGuess.join(''))){//currentGuess is array(5 elements) make it ane string and check if match with the word list
                 alert('NOT IN WORD LIST')//check the word is in the wordle word list
                
                  }else{
                    checkGuessWord()//check guess word function
                 }

        }}
    else {//other type of key work
        if(currentGuess.length < 5){//stop from going over 5 letters.
            currentGuess.push(key)//add letter to guess array.
            addLetter(key)//add letter to fieldGrid.
            currentColPosition++;
            return;
        }
        else {
            alert("Press enter and check your word")
            return;
        }

    } 

}


function keyboardWork(){//keyboard 
    let keyBtn = document.getElementsByClassName('key');
    
    for (let keyElement of keyBtn) { //get "key"element innerText value
       // console.log(keyElement.textContent);       
        keyElement.addEventListener('click',()=>{
            onKeyboardClick(keyElement)})//click any "key" button the letter push into current box
    }
    }
     keyboardWork();
     initializeRow();




 function deleteLetter(){
    if(currentColPosition>0){// If current box is 0 position 
        currentGuess.pop();   //pop off last array (letter)
        currentColPosition--;
        addLetter('');//empty current box 
        console.log(currentGuess,currentColPosition)//check the current Guess array word & position of col
}}


function correctWord(){//winner
    console.log('Congratulations!!!');
    alert("Congratulation!!! 🍻")
}
function incorrectWord(){//player still have chance to guess
    console.log('incorrect try again')
    alert('Incorrect guess try again ✍🏽')

    currentRowPosition++ //going to the next row
    initializeRow();//function get the row
    currentColPosition=0;//column start 0 position.
    currentGuess=[];//make array empty again.
}



function playAgain(){ // Remove class from each element
    console.log('refresh the game')
    let color=document.querySelectorAll('.field');// remove class from box
    color.forEach(color => {
        color.classList.remove('green','yellow','grey')
    })
    for(let colors of color){
    colors.innerText='';
    }
   
    let keyColor=document.querySelectorAll('.key')//remove class from keyboard
    keyColor.forEach(keyColor => {
            keyColor.classList.remove('green','yellow','grey')})

    currentColPosition=0;
    currentRowPosition=0;
    currentGuess=[];//currentGuess is empty

    initializeRow()//back to first position to restart
     
}



//checkGuess
// Makes sure the guess is 5 letters
// Makes sure the guess is a valid list
// Checks each letter of the word and shades them
// Tells the player about the end of the game
// Tells the player if they retry or not
// checkGuess uses a simple algorithm to decide what color to shade each letter:

// 1)Checks if the letter is in the correct word
// 2)If the letter is in the word list & the right position,turns green
// 3)If the letter is in the word, but wrong position turns Yellow
// 2)Else shades letter grey
// 3)If word correct 100%(correct 5 letters)
// 4)Correct words less than 5
// 5)How many times tried? if 6 times missed Game over
// 6)Try again option 




function checkGuessWord(){
let correctCount=0;  //how many correct letters

for(let i=0;i<5;i++){//pick up each letter from pickWord/currentGuess
    let box=row.querySelectorAll(".field") 
    let key=document.getElementsByClassName('key')
   
   
if(pickWord[i]===currentGuess[i]){//checking if those two letters match.(check position)
//turn box green
    box[i].classList.add("green");
    console.log('green')
    
    updateKeyboardColor('green',currentGuess[i]);//changing keyboard color
    correctCount++;
}

else if(pickWord.includes(currentGuess[i])){//checks in the pickWord or not
//turn to yellow
    console.log('yellow')
    box[i].classList.add("yellow");
    updateKeyboardColor('yellow',currentGuess[i]);
 
}
else{//turn to grey
    console.log('grey')
    box[i].classList.add("grey");
    updateKeyboardColor('grey',currentGuess[i]);
}  

}
if(correctCount===5){//word is 100% match
    correctWord();
    return
  }
  else if(currentRowPosition<5){//if they can guess again or not(Row is not last row or not?)
    incorrectWord();
    return
  } 
  else{
    console.log('game over')
    alert('GAME OVER 💣')//incorrect word tried 6 times = game over
   
    //  setTimeout (function(){
    //     confirm('Do you want to try again ⏰ ⁉️')},2000);

 
        let ask=confirm('Do you want to try again ⏰ ⁉️')
        if(ask===true){
        playAgain();}//if they want to restart 
        return false;
         

   }
}



function updateKeyboardColor(color,letter){//changing the keyboard color
    let key=document.getElementById(letter)//get id ('xxx') from keyboard
    key.className="key" //create new class name same as before but this is for overwrite(over changing the color)
    key.classList.add(color)//add classlist 'green' 'yellow' 'grey'

}



