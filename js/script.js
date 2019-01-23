// window.onload = function() {
//   myStopFunction();
// };

// get the <canvas> tag from the document
var canvas = document.querySelector(".game-area");

// get the context object (has all the methods for drawing things)
var ctx = canvas.getContext("2d");
// ---------------------------------------------------------------

// PLAYER
var celineImg = new Image();
celineImg.src = "./images/celine.jpeg";
celineImg.onLoad = function() {
  drawCeline();
};

// group up character's variable in an object (easier to detect crashes later)
var celine = {
  x: 450,
  y: 500,
  width: 100,
  height: 100,
  // when Celine crashes the game is over
  isCrashed: false
};

function drawCeline() {
  ctx.drawImage(celineImg, celine.x, celine.y, celine.width, celine.height);
}

// People
class People {
  constructor(peopleImg, peopleX, peopleY, peopleWidth, peopleHeight) {
    this.img = peopleImg;
    this.x = peopleX;
    this.y = peopleY;
    this.width = peopleWidth;
    this.height = peopleHeight;
    // when a person crashes it will turn red (starts as green)
    this.isCrashed = false;
  }

  drawPeople() {
    if (!celine.isCrashed) {
      // continue to move only if Celine hasn't crashed
      this.x -= 2;
      if (this.x < -45) {
        this.x = 1200;
      }
    }
  }
}

var allPeople = [
  // new People(ctx.drawImage("./images/businessman.png", 175, 110, 70, 110)),
  // new People(ctx.drawImage("./images/tourist.png", 450, 110, 120, 110)),
  // new People(ctx.drawImage("./images/woman.png", 680, 110, 99, 124))
];

//// OBSTACLES ////
// Businessman
var businessmanImg = new Image();
// specify 'src' as if it was from the HTML FILE
businessmanImg.src = "./images/businessman.png";

// run this fucntion when the image finishes loading
businessmanImg.onload = function() {
  // draw an image (imageObj, x, y, width, height)
  ctx.drawImage(businessmanImg, businessmanX, businessmanY, 70, 110);
};

function drawBusinessman() {
  // AUTOMATICALLY increase businessman's x (he will move top to bottom)
  businessmanY += 4; // speed
  if (businessmanY > 600) {
    businessmanY = 0;
    // give businessman a random new X coordinate when he's reset
    businessmanX = Math.floor(Math.random() * 690);
  }
  ctx.drawImage(businessmanImg, businessmanX, businessmanY, 70, 110);
  //allPeople.push((businessmanImg, businessmanX, businessmanY, 70, 110));
}

var businessmanX = 175;
var businessmanY = 110;

// Tourist
var touristImg = new Image();
// specify 'src' as if it was from the HTML FILE
touristImg.src = "./images/tourist.png";

// run this fucntion when the image finishes loading
touristImg.onload = function() {
  // draw an image (imageObj, x, y, width, height)
  ctx.drawImage(touristImg, touristX, touristY, 150, 140);
};

function drawTourist() {
  // AUTOMATICALLY increase tourist's x (he will move top to bottom)
  touristY += 3; // speed
  if (touristY > 600) {
    touristY = 0;
    // give tourist a random new X coordinate when he's reset
    touristX = Math.floor(Math.random() * 690);
  }
  ctx.drawImage(touristImg, touristX, touristY, 120, 110);
}

var touristX = 450;
var touristY = 110;

// Old Woman
var womanImg = new Image();
// specify 'src' as if it was from the HTML FILE
womanImg.src = "./images/woman.png";

// run this fucntion when the image finishes loading
womanImg.onload = function() {
  // draw an image (imageObj, x, y, width, height)
  ctx.drawImage(womanImg, womanX, womanY, 99, 124);
};

function drawWoman() {
  // AUTOMATICALLY increase woman's x (he will move top to bottom)
  womanY += 1; // speed
  if (womanY > 600) {
    womanY = 0;
    // give woman a random new X coordinate when he's reset
    womanX = Math.floor(Math.random() * 690);
  }
  ctx.drawImage(womanImg, womanX, womanY, 99, 124);
}

var womanX = 680;
var womanY = 110;

//// DRAWING LOOP ////
// call "drawingLoop" for the first time to begin the loop
drawingLoop();

function drawingLoop() {
  // erase the whole canvas before drawing (x, y, width, height)
  ctx.clearRect(0, 0, 1000, 600);

  drawCeline();
  drawBusinessman();
  drawTourist();
  drawWoman();
  // drawAllPeople();

  // console.log(allPeople);

  allPeople.forEach(function(onePerson) {
    onePerson.drawBusinessman();
  });

  checkCrashes();

  // allPeople.forEach(function(onePerson) {
  //   onePerson.drawPeople();
  // });

  if (celine.isCrashed) {
    //
  }

  // ask the browser for a chance to re-draw the scene
  requestAnimationFrame(function() {
    // set up a recursive loop (the function "drawingLoop" calls itself)
    drawingLoop();
  });
}

//// KEYBOARD CONTROLS ////
// keydown event handler (when user press down on ANY KEY)
document.onkeydown = function(event) {
  if (celine.isCrashed) {
    //exit this function without moving if Celine is crashed
    return;
  }

  switch (event.keyCode) {
    case 37: // left arrow
      // prevents the default behavior of keyboard presses (scrolling ↑ ↓)
      event.preventDefault();
      celine.x -= 20;
      break;

    case 38: // up arrow
      // prevents the default behavior of keyboard presses (scrolling ↑ ↓)
      event.preventDefault();
      celine.y -= 20;
      break;

    case 39: // right arrow
      // prevents the default behavior of keyboard presses (scrolling ↑ ↓)
      event.preventDefault();
      celine.x += 20;
      break;

    case 40: // down arrow
      // prevents the default behavior of keyboard presses (scrolling ↑ ↓)
      event.preventDefault();
      celine.y += 20;
      break;
  }
};

//// COLLISION ////
function rectangleCollision(rectA, rectB) {
  return (
    rectA.x + rectA.width <= rectB.width &&
    rectB.x + rectB.width > rectA.x.width
  );
}

//console.log(allPeople);

function checkCrashes() {
  // allPeople.forEach(function(onePerson) {
  //   // console.log(onePerson);
  //   if (rectangleCollision(celine, onePerson)) {
  //     celine.isCrashed = true;
  //     onePerson.isCrashed = true;
  //   }
  // });
}

// ---------------------------------------------------------------

//// TIMER ////

$(".play-btn").click(function() {
  $(".game-start").addClass("hidden");
  console.log("kajhskjfahsf");

  var element = document.getElementById("timer");
  var timerId = setInterval(myTimer, 1000);
  var time = 5;

  function myTimer() {
    // Set the date we're counting down to
    // var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    // Update the count down every 1 second
    if (time === -1) {
      clearInterval(timerId);
      $(".game-end").addClass("showing");
    } else {
      element.innerHTML = time + "s";
      time--;
    }
    // Get todays date and time
    // var now = new Date().getTime();

    // Find the distance between now and the count down date
    // var distance = countDownDate - now;

    // Time calculations for minutes and seconds
    // var minutes = Math.floor((distance % (1000 * 60 * 1)) / (1000 * 60));
    // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // document.getElementById("timer").innerHTML = seconds + "s ";

    // If the count down is finished
    // if (distance === 0) {
    //   clearInterval(x);
    //   $(".game-end").addClass("showing"); // open game-end window
    // }
  }
});

// function myStopFunction() {
//   clearInterval(myVar);
// }

// ---------------------------------------------------------------
// Pop-up message with result
// function updateEndContent() {
//   var isRock = $(".player .selection").hasClass("rock");
//   var isPaper = $(".player .selection").hasClass("paper");
//   var isScissors = $(".player .selection").hasClass("scissors");

//   if (isRock) {
//     //opponent: rock ties, paper we lose, scissors we win
//     playerRock();
//   } else if (isPaper) {
//     //opponent: paper ties, scissors we lose, rock we win
//     playerPaper();
//   } else {
//     //opponent: scissors ties, rock we lose, paper we win
//     playerScissors();
//   }

//   // show the game over screen
//   $(".game-end").addClass("showing");
// }

// function playerRock() {
//   //opponent: rock ties, paper we lose, scissors we win
//   if ($(".game-end h2").hasClass("rock")) {
//     $(".game-end h2").html("It's a tie! 👔");
//   } else if ($(".opponent .selection").hasClass("paper")) {
//     $(".game-end h2").html("Opponent wins. 😕");
//   } else {
//     $(".game-end h2").html("You win! 🎉");
//   }
// }

// ---------------------------------------------------------------

//// START WINDOW ////

// Start window appears by default
// $(document).ready(function() {
//   $(".game-start").addClass(".showing");
// });

// function closeStartWindow() {
//   $(".game-start").removeClass(".start-content");
//   // $(".game-start").addClass(".showing");
//   // // <div class="game-start">
//   // document.getElementById(".game-start").style.display = "none";
// }

// $(".play-btn").click(function() {
//   $(".game-start").addClass("hidden");
//   console.log("kajhskjfahsf");
//   // myTimer();
//   // closeStartWindow();
//   // $(".game-start").addClass(".showing");
//   // checkStartWindow();
// });

// function checkStartWindow() {
//   if ($(".game-start").hasClass());

//   var isWindowUp = $(".game-start").hasClass("showing");

//   if (isWindowUp) {
//     $(".game-start").addClass("showing");
//   }
// }

// $(document).ready(function() {
//   // Show the popup
//   $(".popup-welcome").css({ display: "block" });
//   // // Background is less opaque
//   // $(".flex-header, .flex-middle").css({ opacity: "0.1" });
// });

// $(".play-btn").click(function() {
//   $(".popup-welcome").removeClass(".popup-remove");
// });
