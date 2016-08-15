var Enemy = function (game, x,y, asset, speed, damage) {
	Phaser.Sprite.call(this, game, x, y, asset);
	this.anchor.setTo(0.5);
	this.speed = speed;
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.velocity.x = speed;
	this.damage = damage || 1;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	//TODO
}

Enemy.prototype.changeDir = function() {
	this.body.velocity.x *= -1;
}

Enemy.prototype.die = function() {
	//TODO
	this.destroy(true);
}

Enemy.prototype.setDir = function(direction) {
	this.body.velocity.x = this.speed * direction;
}

Enemy.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}