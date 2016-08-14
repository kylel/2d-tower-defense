/*var teleporterGroup;
var teleporters = [];

function initializeTeleporters(game) {
	teleporterGroup = game.add.group();
}

function createTeleporter(game, x,y, asset, targetX, targetY, targetDir) {
	teleporters.push(new Teleporter(game, x,y, asset, targetX, targetY, targetDir));
}
*/
function teleportEnemy(enemy, teleporter){     
	teleporter.teleport(enemy);
	//enemy.setPos(teleporter.targetX, teleporter.targetY);
	//enemy.setDir(teleporter.direction);
}

var Teleporter = function (game, x,y, asset, targetX, targetY, targetDir) {//TODO: add target asset
	Phaser.Sprite.call(this, game, x, y, asset);
	this.anchor.setTo(0.5);
	//this.direction = speed;
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.allowGravity = false;
	this.body.immovable = true;
	this.targetX = targetX;
	this.targetY = targetY;
	this.targetDir = targetDir;
	//teleporterGroup.add(this);	
}

Teleporter.prototype = Object.create(Phaser.Sprite.prototype);
Teleporter.prototype.constructor = Teleporter;

Teleporter.prototype.teleport = function(enemy) {
	enemy.setPos(this.targetX, this.targetY);
	enemy.setDir(this.targetDir);		
}