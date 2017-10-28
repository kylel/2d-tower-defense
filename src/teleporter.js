
function sortByNum(teleporters, exits) {
	teleporters.sort(function (a,b) {return a.properties.num - b.properties.num});
	exits.sort(function (a,b) {return a.properties.num - b.properties.num});
}

function createTeleporters(game, map, group) {
	var teleporters = findObjectsByType('teleporter', map, 'spawneranddoors');
	var exits = findObjectsByType('teleporter-exit', map, 'spawneranddoors');
	sortByNum(teleporters, exits);
	for (var i=0; i<teleporters.length; i++) { //TODO: remove .length
		var x = teleporters[i].x;
		var y = teleporters[i].y + teleporters[i].height;
		var targetX = exits[i].x;
		var targetY = exits[i].y + exits[i].height;
		var teleporter = new Teleporter(game, x,y, targetX, targetY, exits[i].properties.direction, exits[i].width, exits[i].height);
		group.add(teleporter);
	}
}


function teleportEnemy(enemy, teleporter){     
	teleporter.teleport(enemy);
}

var Teleporter = function (game, x,y, targetX, targetY, targetDir, w, h) {//TODO: add target asset
	Phaser.Sprite.call(this, game, x, y);
	//this.anchor.setTo(0,0);
	//this.scale.x *= targetDir*-1;
	//this.anchor.setTo(0,1);
	game.add.existing(this);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.allowGravity = false;
	this.body.immovable = true;
	this.targetX = targetX;
	this.targetY = targetY;
	this.targetDir = targetDir;
	this.body.setSize(w,h);
	//this.game = game;
}

Teleporter.prototype = Object.create(Phaser.Sprite.prototype);
Teleporter.prototype.constructor = Teleporter;

Teleporter.prototype.teleport = function(enemy) {
	enemy.setPos(this.targetX, this.targetY);
	enemy.setDir(this.targetDir);		
}