var Enemy = function (game, x,y, asset, speed) {
	Phaser.Sprite.call(this, game, x, y, asset);
	this.anchor.setTo(0.5);
	this.speed = speed;
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.velocity.x = speed;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	if(this.x<12){
		this.x=12;
		this.body.velocity.x = this.speed;
	}
	if(this.x>468){
		this.x=468;
		this.body.velocity.x = -this.speed;
	}
}

Enemy.prototype.changeDir = function() {
	this.body.velocity.x *= -1;
}

Enemy.prototype.setDir = function(direction) {
	this.body.velocity.x = this.speed * direction;
}

Enemy.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}