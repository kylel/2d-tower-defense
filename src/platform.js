
var Platform = function (game, x,y, asset) {
	Phaser.Sprite.call(this, game, x, y, asset);
	this.anchor.setTo(0.5);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.allowGravity = false;
	this.body.immovable = true;
	//this.game = game;
}

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

