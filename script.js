function controller(event) {
    if (event.key == "Enter") {
        if (runWorker == 0) {
            run();
            runSound.play();
            moveBackground();
            updateScore();
            flameLocation.forEach(genarateFlames);
        }
    }
    if (event.key == " ") {
        if (jumpWoker == 0) {
            if (runWorker != 0) {
                clearInterval(runWorker);
                runSound.pause();
                jump();
                jumpSound.play();
            }
        }
    }
}

var x = 1;
var runWorker = 0;

var runSound = new Audio("run.mp3");
runSound.loop = true;

var jumpSound = new Audio("jump.mp3");

function run() {
    runWorker = setInterval(() => {
        x = x + 1;
        if (x == 9) {
            x = 1;
        }
        document.getElementById("boy").src = "run" + x + ".png";
    }, 150);
}

var jumpImage = 1;
var jumpWoker = 0;
var boyMarginTop = 315;

function jump() {
    jumpWoker = setInterval(() => {
        jumpImage = jumpImage + 1;
        if (jumpImage < 8) {
            boyMarginTop = boyMarginTop - 30;

        }
        if (jumpImage > 7) {
            boyMarginTop = boyMarginTop + 30;
        }
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        if (jumpImage == 13) {
            jumpImage = 1;
            clearInterval(jumpWoker);
            jumpWoker = 0;
            run();
            runSound.play();

        }
        document.getElementById("boy").src = "jump" + jumpImage + ".png";

    }, 150);
}

var z = 0;
var backgoundWoker = 0;

function moveBackground() {
    backgoundWoker = setInterval(() => {
        z = z - 10;
        document.getElementById("background").style.backgroundPositionX = z + "px";
    }, 100);
}

var score = 0;
var scoreWorker = 0;

function updateScore() {
    scoreWorker = setInterval(() => {
        score = score + 5;

        if (score == 1000) {
            alert("You Win!!!");
            location.reload();

        }
        document.getElementById("score").innerHTML = score;
    }, 100);
}

var deadImage = 0;
var deadWoker = 0;

var deadSound = new Audio("dead.mp3");

function dead() {
    deadWoker = setInterval(() => {
        deadImage = deadImage + 1;

        if (deadImage == 11) {
            clearInterval(deadWoker);
            alert("You are dead!!! Try Again");
            location.reload();
        }
        document.getElementById("boy").src = "dead" + deadImage + ".png";

    }, 150);
}

var flameLocation = [800, 1600, 2400, 3600];
var flameWoker = 0;

function genarateFlames(x) {
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    flameWoker = setInterval(() => {
        if (flameWoker != 0) {
            x = x - 10;
            i.style.marginLeft = x + "px";

        }
        if (x == 180) {
            if (jumpWoker == 0) {
                clearInterval(runWorker);
                runSound.pause();
                clearInterval(backgoundWoker);
                clearInterval(scoreWorker);
                clearInterval(flameWoker);
                runWorker = 0;
                dead();
                deadSound.play();

            }
        }
    }, 50);
}