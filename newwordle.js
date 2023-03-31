

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


function onKeyboardClick(keyElement){
    let key = keyElement.textContent;

    if (key === "⌫") {
        console.log('pressed delete')
        deleteLetter()//return
    }

    else if (key=== "⏎ Enter") {
        if(currentGuess.length<5){ //check enough letter in guess
            alert("Not enough letter ☝🏽");
            console.log(currentGuess);
            return;
            }   
        else if(currentGuess.length===5){
             if(!validWords.includes(currentGuess.join(''))){//currentGuess is array(5 elements) make it ane string and check if match with the word list
                 alert('NOT IN WORD LIST')
                
                  }else{
                    checkGuessWord()
                 }

        }}
    else {
        if(currentGuess.length < 5){//stop from going over 5 letters.
            currentGuess.push(key)//add letter to guess array.
            addLetter(key)//add letter to fieldGrid.
            currentColPosition++;
            return;
        }
        return;
        //alert('press enter key')
        console.log('press enter')
    } 

}


function keyboardWork(){
    //let currentRowPosition=document.querySelectorAll('#F0 > .field');
    let keyBtn = document.getElementsByClassName('key');
    
    for (let keyElement of keyBtn) { 
       // console.log(keyElement.textContent);       
        keyElement.addEventListener('click',()=>{
            onKeyboardClick(keyElement)})
    }
    }
     keyboardWork();
     initializeRow();




 function deleteLetter(){
    if(currentColPosition>0){
        currentGuess.pop();   
        currentColPosition--;
        addLetter('');
        console.log(currentGuess,currentColPosition)//check the current Guess array word & position of col
}}


function correctWord(){
    console.log('Congratulations!!!');
    alert("Congratulation!!! 🍻")
}
function incorrectWord(){
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



