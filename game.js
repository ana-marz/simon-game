
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;


//if A key is pressed -> startGame  
$(document).keypress(function(event) {
    if ((event.key == "A" || event.key == "a") && (started == false)){ 
        $("#level-title").html("Level" + 0); 
        started = true;
        nextSequence(); 
    };
} )


$(".btn").click(function () { //detecta btn clicado
    var userChosenColor = $(this).attr("id"); //guarda id del boton clicado
    userClickedPattern.push(userChosenColor); //añade al array de user

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //mismo indice
        console.log("ok");
        if(gamePattern.length == userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
                
        
    }
    else {
        console.log("wrong");
        userClickedPattern = [];
        $("#level-title").html("GAME OVER, press Any Key to Restart");      
        gameOver();
        
    }
    
}


function nextSequence() { 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //Busca el #red, #blue... y hace la animacion
    
    playSound(randomChosenColor);

    level++;
    $("#level-title").html("Level " + level);

    userClickedPattern = [];
}

function playSound(name) { 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() { //setTimeout(function, time ms)
        $("#" + currentColor).removeClass("pressed");   
    }, 100);
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() { //setTimeout(function, time ms)
        $("body").removeClass("game-over");   
    }, 200);

}