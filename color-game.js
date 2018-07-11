var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var headersDisplay = document.querySelectorAll("#headers");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

inti();

resetButton.addEventListener("click", function() {
	reset(); 
});

//Loads start screen
function inti() {
	setUpModeButtons();
	setUpSquares();
	reset();
};

//Sets up mode buttons
function setUpModeButtons() {
	//mode buttons event listeners
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			//change Easy and Hard button to respective number of squares (3 and 6)
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //equivalent to if statement below
			// if(this.textContent === "Easy") {
			// 	numSquares = 3;
			// } else {
			// 	numSquares = 6;
			// }

			reset();
			
		});
	};
};

//Sets up initial squares
function setUpSquares() {
	for(var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of picked square
			var clickedColor = this.style.backgroundColor;

			//compare picked color to pickedColor and executes actions below
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "That's right!";
				resetButton.textContent = "Play Again??"
				changeColors(clickedColor);
				changeHeaderBackground(clickedColor);
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	};
};

//Changes colors of square to chosen one
function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	};
};

//Changes headers' background color
function changeHeaderBackground(pickedColor) {
	//loop through all squares
	for(var i = 0; i < headersDisplay.length; i++) {
		if(pickedColor !== (headersDisplay[i].style.backgroundColor = "#6B8E23")) {
			headersDisplay[i].style.backgroundColor = pickedColor;
		}
	};
};

//Generates a color
function pickColor() {
	var randomColor = Math.floor(Math.random() * colors.length);
	return colors[randomColor];
};

//Calls randomColor and pushes into an array
function generateRandomColors(num) {
	//make array
	var arr = [];

	//repeat num times and add num random colors to array
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	};

	//return array
	return arr;
};

//Generates randomColor and returns into string
function randomColor() {
	//pick "red" from 0 - 255
	var r = Math.floor(Math.random() * 255);

	//pick "green" from 0 - 255
	var g = Math.floor(Math.random() * 255);

	//pick "blue" from 0 - 255
	var b = Math.floor(Math.random() * 255);

	return "rgb(" + r + ", " + g + ", " + b + ")";
};

//Reset squares to original start
function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);

	//pick a new random color
	pickedColor = pickColor();

	//change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;

	//clears messageDisplay
	messageDisplay.textContent = "";

	//changes button text back to original
	resetButton.textContent = "New Colors";

	//change colors of squares
	for(var i = 0; i < squares.length; i++) {
		//changes squares to 3 or 6
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	};

	//change h1 and h2 color back in original
	changeHeaderBackground();
};


