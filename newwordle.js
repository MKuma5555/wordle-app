//create filed
function createEachRow () {
    const filedDiv = document.getElementById("game");

    for(let i = 1; i <= 6; i++){
        let eachRow = document.createElement("div");
        eachRow.setAttribute("class","fieldBox");
        eachRow.setAttribute("id",`F${i}`)

        for(let j = 1; j <= 5; j++){
            let eachFiled = document.createElement("div");
            eachFiled.setAttribute("class","field");
            eachRow.appendChild(eachFiled)
        }
        filedDiv.appendChild(eachRow)
    }
};

//create keyboard
function createKeyboard () {
    const keyboardDiv = document.getElementById("keyboard");

    const line1 = ["q","w","e","r","t","y","u","i","o","p"];
    const line2 = ["a","s","d","f","g","h","j","k","l"];
    const line3 = ["⏎ Enter","z","x","c","v","b","n","m","⌫"];

    const mainSection = () => {
        for(let i = 0; i < 3; i++){
            let eachRowKeyboard = document.createElement("div");
            eachRowKeyboard.setAttribute("class","row");
            eachRowKeyboard.setAttribute("id",`row-${i}`);
            keyboardDiv.appendChild(eachRowKeyboard)
        } 
    }  
    mainSection()   

    const addButtonsToRow = (line,rowId) => {
        for (let j = 0; j < line.length; j++) {
            const createButton = document.createElement("button");
            createButton.setAttribute("class", "key");
            createButton.setAttribute("id", `${line[j].toUpperCase()}`);
            createButton.innerHTML = `${line[j].toUpperCase()}`;
            if (line[j] !== "⏎ ENTER" && line[j] !== "⌫") {
                createButton.setAttribute("class", "key");
            };
            document.getElementById(`row-${rowId}`).appendChild(createButton);
        }
        
    };

    addButtonsToRow(line1,0);
    addButtonsToRow(line2,1);
    addButtonsToRow(line3,2);
}

//Create pop up Div box
function instractionBox () {
    const infoDiv = document.getElementById("gameInfo");
    const closeBtn = document.getElementById("closeBtn");

    closeBtn.addEventListener('click',() => {
        infoDiv.style.display = 'none';
    });

    const popupMsgBtn = document.getElementById("popupMsgBtn")
    popupMsgBtn.addEventListener('click', () => {
        infoDiv.style.display ='';  
    });
}

document.getElementById("gameInfo").addEventListener("click", instractionBox);





//keyboard 
let currentColPosition=0;
let currentRowPosition=0;
let row=[];
let currentGuess=[];

 
let pickWord = validWords[Math.floor(Math.random() * validWords.length)];
console.log(pickWord);


function initializeRow(){
    let rows=document.querySelectorAll('.fieldBox');
    console.log('checking rows',rows)
    row = rows[currentRowPosition];
    console.log('checking row',row);//pick up which row
   
}


function initializeGame() {
    createEachRow();
    createKeyboard();
    initializeRow();
}
initializeGame()



function addLetter(key){
    let fieldBox=row.querySelectorAll(".field")
    console.log('add letter',fieldBox[currentColPosition]);//column position
    fieldBox[currentColPosition].textContent = key;//put text in field//
};



function onKeyboardClick(keyElement) {
    let key = keyElement.textContent;
    
    console.log('this is key', key);

    if (key === "⌫") {
        console.log('pressed delete');
        deleteLetter();
    } else if (key === "⏎ ENTER") {
        if (currentGuess.length < 5) {
            alert("Not enough letters ☝🏽");
            console.log(currentGuess);
            return;
        } else if (currentGuess.length === 5) {
            if (!validWords.includes(currentGuess.join(''))) {
                alert('NOT IN WORD LIST');
            } else {
                checkGuessWord();
            }
        }
    } else {
        if (currentGuess.length < 5) {
            currentGuess.push(key);
            addLetter(key)
            currentColPosition++;
        } else {
            alert("You have already 5 letters, Press enter and check your word");
            return;
        }
    };
}

function keyboardWork(){//keyboard 
    const keyBtn = document.getElementsByClassName('key');
    const infoDiv = document.getElementById("gameInfo");
    
   
        for (let keyElement of keyBtn) { //get "key"element innerText value
            console.log('keyElement',keyElement.textContent);       
            keyElement.addEventListener('click',()=>{
                if(infoDiv.style.display !=='none'){
                    return;
                };
                onKeyboardClick(keyElement)
            })//click any "key" button the letter push into current box
        }
    
   
};
keyboardWork();

function deleteLetter(){
    if(currentColPosition > 0){// If current box is 0 position 
        currentGuess.pop();   //pop off last array (letter)
        currentColPosition--;
        addLetter('');//empty current box 
        console.log(currentGuess,currentColPosition)//check the current Guess array word & position of col
    }
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



let correctCount = 0; 
function checkGuessWord(){
 //how many correct letters

    for(let i = 0; i < 5; i++){//pick up each letter from pickWord/currentGuess
        let box = row.querySelectorAll(".field") 
        let key = document.getElementsByClassName('key')
    
        if(pickWord[i] === currentGuess[i]){//checking if those two letters match.(check position)
    //turn box green
            box[i].classList.add("green");
            console.log('green')
            updateKeyboardColor('green',currentGuess[i]);//changing keyboard color
            correctCount++;

        } else if(pickWord.includes(currentGuess[i])){//checks in the pickWord or not
            //turn to yellow
            console.log('yellow')
            box[i].classList.add("yellow");
            updateKeyboardColor('yellow',currentGuess[i]);
        
        } else {
            //turn to grey
            console.log('grey')
            box[i].classList.add("grey");
            updateKeyboardColor('grey',currentGuess[i]);
        }  
    }

    if(correctCount === 5){//word is 100% match
        // correctWord();
        console.log('Congratulations!!!');
        alert("Congratulation!!! 🍻")
        return;

    } else if (currentRowPosition < 5){//if they can guess again or not(Row is not last row or not?)
        incorrectWord();
        return;

    } else {
        console.log('game over')
        alert('GAME OVER 💣')//incorrect word tried 6 times = game over
    
        //  setTimeout (function(){
        //     confirm('Do you want to try again ⏰ ⁉️')},2000);

    
            let ask=confirm('Do you want to try again ⏰ ⁉️')
            if(ask===true){
            playAgain();}//if they want to restart 
            return false;
    };
}





function updateKeyboardColor(color,letter){//changing the keyboard color
    console.log('updateKeyboardColor',color,letter)
    let key = document.getElementById(letter.toUpperCase())//get id ('xxx') from keyboard
    key.classList.add(color)//add classlist 'green' 'yellow' 'grey'
};