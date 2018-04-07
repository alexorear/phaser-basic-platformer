// This Game only has one state
var mainState = {
	preload: function() {
		game.load.image('player', 'assets/player.png');
		game.load.image('wall', 'assets/wall.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('lava', 'assets/lava.png');
	},

	create: function() {
		// scale and center the game to fit the width of the device
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// center the game vertically and horizontally
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		// make game background blue
		game.stage.backgroundColor = '#7AE2ff'

		// movement and collision detection with the Arcade physic system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// add physics engine to all game objects
		game.world.enableBody = true;

		// variable to store arrow key press
		this.curser = game.input.keyboard.createCursorKeys();

		// create play in middle of Game
		this.player = game.add.sprite(70, 100, 'player')

		// add gravity to effect player
		this.player.body.gravity.y = 600;

		// create 3 groups that will contain the world objects
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.lava = this.add.group();

		// level design: x = wall, 0 = coin; !=lava
		var levelLayout = [
			'xxxxxxxxxxxxxxxxxxxxxx',
			'x         !          x',
			'x                 o  x',
			'X         o          x',
			'x                    x',
			'x     o   !    x     x',
			'xxxxxxxxxxxxxxxx!!!!!x'
		];

		// create the level by iterating through the array
		for (let i = 0; i < levelLayout.length; i++) {
			for (let j = 0; j < levelLayout[i].length; j++) {
				// create walls
				if (levelLayout[i][j] === 'x') {
					let wall = game.add.sprite(30 + (20 * j), 30 + (20 * i));
					// keeps the walls from falling when the player walk on them
					wall.body.immovable = true;
					this.walls.add(wall);
				}
				// create coins
				if (levelLayout[i][j] === 'o') {
					let coin = game.add.sprite(30 + (20 * j), 30 + (20 * i));
					this.coins.add(coin);
				}
				// create lava
				if (levelLayout[i][j] === '!') {
					let lavaBlock = game.add.sprite(30 + (20 * j), 30 + (20 * i));
					this.lava.add(lavaBlock);
				}
			}
		}
	},

	update: function() {
		// move the player when an arrow key is pressed
		if (this.curser.left.isDown) {
			this.player.body.velocity.x = -200;
		} else if (this.curser.right.isDown) {
			this.player.body.velocity.x = 200;
		} else {
			this.player.body.velocity.x = 0;
		}

		// let the player jump if they are touching the ground
		if (this.curser.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -200;
		}
	}
};

// Initialize game and start the main state
var game = new Phaser.Game(500, 200, Phaser.AUTO);
game.state.add('main', mainState);
game.state.start('main');
