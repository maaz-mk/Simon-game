let gameStarts = false;

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $("h1").titleContent = "Clicking";

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    document.getElementById("level-title").textContent = "Level - " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    let colourSound = new Audio("sounds/" + name + ".mp3");
    colourSound.play();
}

function animatePress(currentColour) {
    document.getElementById(currentColour).classList.add("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
        }, 100);
}

document.addEventListener("keydown", function() {

    if(!gameStarts) {
        nextSequence();
        gameStarts = false;
    }
    
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        console.log("wrong");
        playSound("wrong");
        // $("body").addClass("game-over");
        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarts = false;
}








