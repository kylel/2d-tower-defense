
var Core = function (game, x,y, asset, lives) {
	Phaser.Sprite.call(this, game, x, y, asset);
	this.anchor.setTo(0.5);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.allowGravity = false;
	this.body.immovable = true;
	this.lives = lives;
	//this.game = game;
}

Core.prototype = Object.create(Phaser.Sprite.prototype);
Core.prototype.constructor = Core;

Core.prototype.takeDamage = function(enemy) {
	this.lives -= enemy.damage;
	if (this.lives <= 0) {
		this.die();
	}
	enemy.die();
}

Core.prototype.die = function() {
	alert('game over');
		//TODO: add game states
}