var Trap = function (game, x,y, asset, manager) {
	Phaser.Sprite.call(this, game, x,y, asset);
	this.manager = manager;
	this.anchor.setTo(0,1);
	this.animations.add('attack', [0,1,2,3], true);
	this.animations.play('attack', 8, true);
}

Trap.prototype = Object.create(Phaser.Sprite.prototype);
Trap.prototype.constructor = Trap;




var SpikeTrap = function (game, x,y, manager) {
	Trap.call(this, game, x,y, 'spike-trap', manager);
}
SpikeTrap.prototype = Object.create(Trap.prototype);
SpikeTrap.prototype.constructor = SpikeTrap;

var GrinderTrap = function (game, x,y, manager) {
	Trap.call(this, game, x,y, 'grinder-trap', manager);
}
GrinderTrap.prototype = Object.create(Trap.prototype);
GrinderTrap.prototype.constructor = GrinderTrap;

var trapEnum = {
	'spike': SpikeTrap.prototype.constructor,
	'grinder': GrinderTrap.prototype.constructor
};

var TrapManager = function (game, map) {
	this.game = game;
	this.map = map;
	this.trapButtons = game.add.group();
	this.trapPositions = game.add.group();
	this.traps = game.add.group();
	game.input.onDown.add(testCallback, this);
	this.trap_type = '';


	var positions = findObjectsByType('trap-position', map, 'trap-selection');
	for (var i in positions) {
		var pos = positions[i];
		this.createTrapPosition(game, pos.x, pos.y, 'trap-select');
	}

	var buttons = findObjectsByType('trap-button', map, 'trap-selection');
	for (var i in buttons) {
		var but = buttons[i];
		this.createTrapButton(game, but.x, but.y, but.properties.trap_type);
	}


}

function testCallback (one, two) {
	this.trapButtons.forEach(function(element){
		element._selected = false;
	});
	this.hidePositions();
}

TrapManager.prototype.constructor = TrapManager;

TrapManager.prototype.createTrapButton = function (game, x,y, trap_type) {
	this.trapButtons.add(new TrapButton(game,x,y,trap_type,this));
}

TrapManager.prototype.createTrapPosition = function (game, x,y, asset) {
	x,y = convertToBottomLeftAnchor(game,x,y,asset);
	this.trapPositions.add(new TrapPosition(game,x,y,asset, this));
	this.trapPositions.visible = false;
}

TrapManager.prototype.createTrap = function (game, x,y, trap_type) {
	this.traps.add(new trapEnum[trap_type](game,x,y,this));
}

TrapManager.prototype.showPositions = function() {
	this.trapPositions.visible = true;
}

TrapManager.prototype.hidePositions = function() {
	this.trapPositions.visible = false;
}

var TrapButton = function (game, x,y, asset, manager) {
	this._selected = false;
	Phaser.Button.call(this, game, x,y, asset, this.clickAction, this);
	this.manager = manager;
	this.input.priorityID = 1;
	this.trap_type = asset;
}

TrapButton.prototype = Object.create(Phaser.Button.prototype);
TrapButton.prototype.constructor = TrapButton;

TrapButton.prototype.clickAction = function(button, pointer, isOver) {
	button;
	pointer;
	isOver;
	if (this._selected) {
		this.manager.hidePositions();	
		this._selected = false;
	} else {
		this.manager.showPositions();
		this._selected = true;
		this.manager.trap_type = this.trap_type;
	}
	
}

var TrapPosition = function (game, x,y, asset, manager) {
	this._selected = false;
	Phaser.Button.call(this, game, x,y, asset, this.clickAction);
	this.anchor.setTo(0,1);
	//this.visible = false;
	this.manager = manager;
}

TrapPosition.prototype = Object.create(Phaser.Button.prototype);
TrapPosition.prototype.constructor = TrapPosition;

TrapPosition.prototype.clickAction = function() {
	//this.tint = 0xff0000;
	this.manager.trapPositions.remove(this);
	this.manager.createTrap(this.game, this.x, this.y, this.manager.trap_type);
}
