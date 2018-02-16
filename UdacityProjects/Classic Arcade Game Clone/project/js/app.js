// ------------------------------------------------------------------------
// Basic Variables
// ------------------------------------------------------------------------

// All the Y positions for Enemies and Collectibles (array)
var rowLocations = [60, 145, 230, 315];

// All the X positions for Collectibles (array)
var columnLocations = [0, 100, 200, 300, 400];

// A fixed measure useful for different kind of scopes
var xWidth = 100;

// ------------------------------------------------------------------------
// Scores
// ------------------------------------------------------------------------

var score = 0;
var highScore = 0;

// ------------------------------------------------------------------------
// Enemy Functions
// ------------------------------------------------------------------------

// Defining a function called Enemy
var Enemy = function() {

	// The X position of the Enemy
    this.x = -150;

    // The Y position is random, it depends on the randomRow generated value and on the array: rowLocations
    var randomRow = Math.floor(Math.random()*4);
    this.y = rowLocations[randomRow];

    // The speed of each enemy is defined randomly and >=100 and <400
    this.speed = Math.floor(100 + Math.random()*400);

    // The sprite representing the enemy is defined by the function setSpriteBySpeed
    this.setSpriteBySpeed();
};

// Conditions to generate new enemies and to determine enemy-player collision
Enemy.prototype.update = function(dt) {
	this.x = this.x + (this.speed * dt);

	// This if statement generates a new enemy when the X position of a created enemy is >500, so when an enemy crosses the screen and then disappears a new enemy is created
	if (this.x > 500) {
	    this.x = -100;
	    var randomRow = Math.floor(Math.random()*4);
	    this.y = rowLocations[randomRow];
	    this.speed = Math.floor(100 + Math.random()*400);
        this.setSpriteBySpeed();
	};

	// This if statement defines what happens when an enemy collides with the player: the score get back at 0, the player is reset and the sound "enemyCollision.wav" is played
	if (this.x >= player.x + 25 - xWidth && this.x <= player.x - 25 + xWidth ) {
		if (player.y == this.y) {
			score = 0;
			player.reset();
			sounds[3].play();
		};
	};
};

// Sets the sprite image based on randomly generated speed:
Enemy.prototype.setSpriteBySpeed = function () {
	if (this.speed >= 400) {
        this.sprite = 'images/enemy-bug-yellow.png';
    } else if (this.speed >= 300) {
        this.sprite = 'images/enemy-bug-blue.png';
    } else if (this.speed >= 200) {
        this.sprite = 'images/enemy-bug-purple.png';
    } else {
        this.sprite = 'images/enemy-bug-red.png';
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ------------------------------------------------------------------------
// Player Functions
// ------------------------------------------------------------------------

var Player = function(x, y) {

    // Defining the initial sprite for the player
    this.sprite = 'images/char-boy.png';

    this.x = x;
	this.y = y;
};

// Defining what happens when player reaches water or when it collides with a gem
Player.prototype.update = function(dt) {
	if (this.y <= -25) {

		// The "winner.wav" sound is played when player reaches the water
		sounds[1].play();

		// Increase score when player reaches the water
		score = score + 100;

        // Update Highscore if Score is higher
        highScore = (score > highScore) ? score: highScore;

        // Transform Score and Highscore in text and append the result to the tag in index.html
        $("#score").text(score.toString());
		$("#highScore").text(highScore.toString());

		// Message appearing when player reaches the water
		alert('You are the best!!!');
		player.reset();
	};

	// This if statement defines what happens to score when the player collides with a gem
	if (gem.x >= this.x + 25 - xWidth && gem.x <= this.x - 25 + xWidth) {
		if (this.y === gem.y) {
			score = score + 200;

			// Update Highscore if Score is higher
			highScore = (score > highScore) ? score: highScore;

			// Transform Score and Highscore in text and append the result to the tag in index.html
			$("#score").text(score.toString());
			$("#highScore").text(highScore.toString());
		}
	};

	// The score is updated when player is reset
	if (player.reset) {
		$("#score").text(score.toString());
		$("#highScore").text(highScore.toString())
	}

};

// Draw the player on the screen, required method for game
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update player's position when it's reset
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};

// Define key Inputs to move the player UP, DOWN, LEFT & RIGHT and let the user change the character's sprite by pressing the keys 1, 2, 3, 4 or 5
Player.prototype.handleInput = function(keyInput) {

	// Move player left if LEFT arrow is pressed
    if (keyInput == 'left' && this.x > 0) {

    	// Define range of player's movement
    	this.x = this.x - 100;

    	// The sound "stomp.wav" is played everytime the LEFT arrow is pressed
    	sounds[2].play();
    }

    // Move player up if UP arrow is pressed
    if (keyInput == 'up' && this.y > 0) {

		// Define range of player's movement
    	this.y = this.y - 85;

    	// The sound "stomp.wav" is played everytime the UP arrow is pressed
    	sounds[2].play();
	}

	// Move player right if RIGHT arrow is pressed
    if (keyInput == 'right' && this.x < 400) {

   		// Define range of player's movement
    	this.x = this.x + 100;

    	// The sound "stomp.wav" is played everytime the RIGHT arrow is pressed
    	sounds[2].play();
	}

	// Move player down if DOWN arrow is pressed
    if (keyInput == 'down' && this.y < 400) {

    	// Define range of player's movement
    	this.y = this.y + 85;

    	// The sound "stomp.wav" is played everytime the DOWN arrow is pressed
    	sounds[2].play();
	}

	// Define which sprite appears when one of the keys, associated with keyInput's values, is pressed
	switch(keyInput) {

		case 'char1':
			this.sprite = 'images/char-boy.png';
			break;

		case 'char2':
			this.sprite = 'images/char-cat-girl.png';
			break;

		case 'char3':
			this.sprite = 'images/char-horn-girl.png';
			break;

		case 'char4':
			this.sprite = 'images/char-pink-girl.png';
			break;

		case 'char5':
			this.sprite = 'images/char-princess-girl.png';
			break;
	}
};

// ------------------------------------------------------------------------
// Player Movement & Character Selection Keys
// ------------------------------------------------------------------------

document.addEventListener('keyup', function(e) {
    var keyInput = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: 'char1',
        50: 'char2',
        51: 'char3',
        52: 'char4',
        53: 'char5'
    };
    player.handleInput(keyInput[e.keyCode]);
});

// ------------------------------------------------------------------------
// Collectibles
// ------------------------------------------------------------------------

// Defining a function called Gem
var Gem = function() {

    // The gem X position is random, it depends on the randomCol generated value and on the array: columnLocations
	var randomCol = Math.floor(Math.random()*5);
	this.x = columnLocations[randomCol];

	// The gem Y position is random, it depends on the randomRow generated value and on the array: rowLocations
	var randomRow = Math.floor(Math.random()*4);
	this.y = rowLocations[randomRow];

	// The sprite representing the gem
	this.sprite = 'images/gem-blue.png';
};


// Draw gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update gem position when it collides with the player
Gem.prototype.update = function(dt) {
	if (this.x >= player.x + 25 - xWidth && this.x <= player.x - 25 + xWidth) {
		if (player.y === this.y) {
			gem.reset();
		}
	};
};

// Define what happens when a gem is reset
Gem.prototype.reset = function() {

	// Same as gem function definition
	var randomCol = Math.floor(Math.random()*5);
	var randomRow = Math.floor(Math.random()*4);
	this.x = columnLocations[randomCol];
	this.y = rowLocations[randomRow];

	// When the gem collides with the player the "gem.wav" sound is played
	sounds[0].play();
};


// ------------------------------------------------------------------------
// Sounds
// ------------------------------------------------------------------------

// An array storing all the sounds of the game

var sounds = [
    new Audio('sounds/gem.wav'),
    new Audio('sounds/winner.wav'),
    new Audio('sounds/stomp.wav'),
    new Audio('sounds/enemyCollision.wav'),
];

// ------------------------------------------------------------------------
// Game Entities GENERATION
// ------------------------------------------------------------------------

// Generating Enemies
var allEnemies = [];
var nbrEnemies = 5;

for (i = 0; i < nbrEnemies; i++) {
	allEnemies[i] = new Enemy();
};

// Generating Player
var player = new Player(200, 400);


// Generating Collectibles
var gem = new Gem();
