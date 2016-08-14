
function teleportEnemy(enemy, teleporter){     
	teleporter.teleport(enemy);
}

var Teleporter = function (game, x,y, asset, targetX, targetY, targetDir) {//TODO: add target asset
	Phaser.Sprite.call(this, game, x, y, asset);
	this.anchor.setTo(0.5);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.allowGravity = false;
	this.body.immovable = true;
	this.targetX = targetX;
	this.targetY = targetY;
	this.targetDir = targetDir;
}

Teleporter.prototype = Object.create(Phaser.Sprite.prototype);
Teleporter.prototype.constructor = Teleporter;

Teleporter.prototype.teleport = function(enemy) {
	enemy.setPos(this.targetX, this.targetY);
	enemy.setDir(this.targetDir);		
}