# wordle-app
![](https://i.pinimg.com/564x/24/0e/e0/240ee0ffbf9576e6e95ff52547b56d4a.jpg)
## first my project1

This is my first project to create "Wordle Game"
Wardle itself is such a simple game However It was very hard to create for me.

# What are the my Wordle rules?

* To submit a guess, type any five-letter word and press enter.
* You have to guess the Wordle "Word" in six times or less
* All of your guesses must be real words & must be in the word list. (There are  12,971 words in this list.)
* A correct letter in right position **turns green**
* A correct letter in the wrong position **turns yellow**
* An incorrect letter **turns gray**
* Letters can be used more than once
* Answers are never plurals
* You must be type five-letter
* Six-times missed, It's Game over
* You can try again as much as you want to restart 

# My Steps
1. create boxes use HTML & CSS first(able to see visually first)
2. box set in right position
3. JS: keyboard button click and letter get into the box (first-Row/first-column)
4. create new js just add word list array.
5. set "Enter key" & "Back space key"
6. check the guess word is matching with random word.
7. changing box letter color (use add classList)
8. add color chang for keyboard
9. create replay rule(delete pre data )
10. checking the guess word is in the word list.
11. arranging CSS



# Need to fix part
If we confirm to play again, it is not showing last row result and delete all of data.
Tried to set the "setTimeout" for confirm prompt.However,if i set as blow code couldn't set "if" to check true or false

```````js
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
````````````````````````````

# wanted add more structure
Add animations!!!
Also pop up message not use prompt.