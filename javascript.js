//Always starts with the starterQuestion
let starterQuestion = "Hey, how are you? What's it like living in Barca??! Any good? I'm jealous.";

// List of possible questions
const questionList = [
"What's the weather like? Is the sun shining?",
"How's the political situation out there?",
"I heard the jamon there is good. Is that true?",
"Have you been swimming in the sea yet?",
"What part of town did you decide to live in?",
"Are you picking up any Spanish? I heard it was an easy language to learn.",
"Is anyone coming to visit you?",
"Did you see Messi play yet?? The stadium is meant to be amazing!",
"What's the architecture like?",
"When's the next Barcelona game? I heard all the locals watch them...",
"Did you go to Park Guell yet?",
"Did you know you can get the train to Andorra and go snowboarding?",
"Have you done any skateboarding?",
"What's your favourite thing about Barcelona?",
"Did you try the paella?",
"How cold does it get at this time of year?"
];

let numOfQuestions = 16 - 1;

/* This function makes sure that the same question will not be asked twice in a row.
It counts the number of "send" clicks and adds a random number to an array.
It uses the number in the last array item to choose a question from the list,
but not before checking if the new random number is the same as the previous array item.
If the number is different, use it, if it's the same use questionList item 16 */

let sendCount = 0;
    let numArr = [];
    let uniqueRandomNum = 0;
    function onSendClick(){
        let randomNum = Math.floor((Math.random() * numOfQuestions - 1) + 1);
        sendCount += 1;
            if (randomNum !== numArr[numArr.length - 1]){
                numArr.splice(sendCount, 1, randomNum)   
            }else{
                numArr.splice(sendCount, 1, 15)
            }    
        uniqueRandomNum = numArr[numArr.length - 1];
        console.log(uniqueRandomNum);
        console.log(numArr);

        return uniqueRandomNum;
    };
    onSendClick();

$(document).ready(function(){

    // Click the get started button and ask the starter question
    $("#getStarted").click(function(){
        $('#q1').html(starterQuestion).delay(500).fadeIn(800);
        $('#getStarted').html("Started!").addClass("getStartedButtonPressed").fadeIn(800); 
    });

    // Disable send button until text has been written in the textarea 
    $("#sendButton").attr('disabled','disabled');
    $("textarea").keydown(function(){
        $("#sendButton").removeAttr('disabled');
    });

    // Allow the enter key to send a message
    $("textarea").keypress(function(event){
        if (event.which === 13){
            event.preventDefault();
            $('#sendButton').click();
        }; 
    });    

    // On send button click create a new div in the chatbody sing the textarea value
    $("#sendButton").click(function(){

        let newAnswer = $("textarea").val();

        $('<div class="answers">' + newAnswer + '</div>').fadeIn(400).appendTo("#chatbody"); 
        setTimeout(function(){$('<div class="questions">' + questionList[uniqueRandomNum] + '</div>').fadeIn(600).appendTo("#chatbody"); }, 2500);

        // Automatically scroll down when the chat body becomes full
        $("#chatbody").stop().animate({scrollTop: $('#chatbody')[0].scrollHeight}, 1400);
    
        // Clear the textarea after send
        $("textarea").val("")
    });    
});

