// This Game only has one state
var mainState = {
	preload: function() {

	},

	create: function() {

	},

	update: function() {

	}
};

// Initialize game and start the main state
var game = new Phaser.Game(500, 200);
game.state.add('main', mainState);
game.state.start('main');
