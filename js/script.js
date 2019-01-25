window.onload = function() {
  // console.log("window");
  pause();
};

var canvas = document.querySelector(".game-area");
var ctx = canvas.getContext("2d");

// ---------------------------------------------------------------

//// PLAYER ////

var playerImg = new Image();
playerImg.src = "./images/player.png";
playerImg.onLoad = function() {
  drawPlayer();
};

// group up character's variable in an object (easier to detect crashes later)
var player = {
  x: 346,
  y: 460,
  width: 92,
  height: 138,
  // when player crashes the game is over
  isCrashed: true
};

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// People
class People {
  constructor(
    peopleImg,
    peopleX,
    peopleY,
    peopleWidth,
    peopleHeight,
    peopleSpeed
  ) {
    this.img = peopleImg;
    this.x = peopleX;
    this.y = peopleY;
    this.width = peopleWidth;
    this.height = peopleHeight;
    this.speed = peopleSpeed;
    this.isCrashed = false;
  }

  drawPeople() {
    if (!player.isCrashed) {
      this.y += this.speed; // speed
      if (this.y > 600) {
        this.y = 0;
        // give people a random new X coordinate when he's reset
        this.x = Math.floor(Math.random() * 670);
      }
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

//// OBSTACLES ////

// Businesswoman
var businesswomanImg = new Image();
// specify 'src' as if it was from the HTML FILE
businesswomanImg.src = "./images/businesswoman.png";

// Businessman
var businessmanImg = new Image();
// specify 'src' as if it was from the HTML FILE
businessmanImg.src = "./images/businessman.png";
// Tourist
var touristImg = new Image();
// specify 'src' as if it was from the HTML FILE
touristImg.src = "./images/tourist.png";

// Old Woman
var womanImg = new Image();
// specify 'src' as if it was from the HTML FILE
womanImg.src = "./images/woman.png";

var allPeople = [
  // x, y, width, height, speed
  new People(businesswomanImg, 100, -140, 90, 140, 3),
  new People(businessmanImg, 300, -140, 89, 140, 4),
  new People(touristImg, 450, -140, 153, 140, 3),
  new People(womanImg, 660, -140, 124, 140, 1)
];

//// DRAWING LOOP ////

drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(0, 0, 800, 600);

  drawPlayer();

  allPeople.forEach(function(onePerson) {
    onePerson.drawPeople();
  });

  checkWon();
  checkCrashes();

  // ask the browser for a chance to re-draw the scene
  requestAnimationFrame(function() {
    // set up a recursive loop (the function "drawingLoop" calls itself)
    drawingLoop();
  });
}

// ---------------------------------------------------------------

//// KEYBOARD CONTROLS ////

document.onkeydown = function(event) {
  if (player.isCrashed) {
    //exit this function without moving if player is crashed
    return;
  }

  switch (event.keyCode) {
    case 37: // left arrow
      event.preventDefault();
      if (player.x > 10) {
        player.x -= 20;
      }
      break;

    case 38: // up arrow
      event.preventDefault();
      if (player.y > -10) {
        player.y -= 20;
      }
      break;

    case 39: // right arrow
      event.preventDefault();
      if (player.x < 700) {
        // change to new character
        player.x += 20;
      }
      break;

    case 40: // down arrow
      event.preventDefault();
      if (player.y < 460) {
        // change to new character
        player.y += 20;
      }
      break;
  }
};

//// COLLISION ////

function rectangleCollision(rectA, rectB) {
  return (
    rectA.y + rectA.height >= rectB.y &&
    rectA.y <= rectB.y + rectB.height &&
    rectA.x + rectA.width >= rectB.x &&
    rectA.x <= rectB.x + rectB.width
  );
}

function checkCrashes() {
  allPeople.forEach(function(onePerson) {
    if (rectangleCollision(player, onePerson) && player.isCrashed === false) {
      // console.log("check crashes");

      gameOver();
      $(".game-end h1").html("Game Over");
      $(".game-end h2").html("Watch out for the other riders!");
    }
  });
}

//// WINNING ////

function checkWon() {
  if (player.y <= -10) {
    // console.log("WINNING!!!!!");

    gameOver();
    $(".game-end h1").html("🎉 Congratulations! 🎉");
    $(".game-end h2").html("You caught the metro!");
  }
}

// ---------------------------------------------------------------

//// TIMER ////

var element = document.getElementById("timer");
var timerId;
var time = 14;

function myTimer() {
  if (time === -1) {
    // console.log("My timer");

    gameOver();
    // return;
    // $(".game-end h2").html("Time's Up!");
  } else {
    element.innerHTML = "00:" + time;
    time--;
  }
  return;
}

function pause() {
  clearInterval(timerId);
}

function restartTimer() {
  // Update the count down every 1 second
  time = 15;
  element.innerHTML = "00:" + time;
  clearInterval(timerId);
  timerId = setInterval(myTimer, 1000);
}

//// PLAY BUTTONS ////

$(".play-btn").click(function() {
  // console.log("START START");
  timerId = setInterval(myTimer, 1000);
  $(".game-start").addClass("hidden");
  player.isCrashed = false;
});

$(".restart-btn").click(function() {
  hidePopup();
  // console.log("AGAIN AGAIN");
  restartTimer();
  player.x = 346;
  player.y = 460;
  player.isCrashed = false;

  allPeople = [
    // x, y, width, height, speed
    new People(businesswomanImg, 100, -140, 90, 140, 3),
    new People(businessmanImg, 300, -140, 89, 140, 4),
    new People(touristImg, 450, -140, 153, 140, 3),
    new People(womanImg, 660, -140, 124, 140, 1)
  ];
});

function gameOver() {
  $(".game-end").addClass("showing");
  clearInterval(timerId);
  player.isCrashed = true;
}

function hidePopup() {
  $(".game-end").removeClass("showing");
}

// function togglePopup() {
//   if ($(".game-end").hasClass("showing")) {
//     console.log("POP UP END SCREEN already here");
//     $(".game-end").removeClass("showing");
//   } else {
//     $(".game-end").addClass("showing");
//   }
// }
