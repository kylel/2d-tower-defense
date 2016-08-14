//TODO: remove magic numbers

window.onload = function() {
	
	var game = new Phaser.Game(480,320,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});                

	var enemySpeed = 150;
	var enemy;
	var platformGroup;
	var teleporterGroup;
	var heart;

	function onPreload() {
		game.load.image("enemy", 'img/enemy.png');
		game.load.image("teleporter","img/teleporter.png");
		game.load.image("ground","img/ground.png");
		game.load.image("heart","img/heart.png");
	}

	function onCreate() {
		platformGroup = game.add.group();
		teleporterGroup = game.add.group();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = enemySpeed;
		enemy = new Enemy(game, 24, 320-24-8, 'enemy', enemySpeed);
		
		addPlatform(480/2,316,"ground");
		addPlatform(480/2,116,"ground");
		addPlatform(480/2,216,"ground");
		addTeleporter(480-12, 316-12-4,"teleporter", 480-12, 216-12-4, -1);
		addTeleporter(12, 216-12-4,"teleporter", 12, 116-12-4, 1);
		addHeart(480-12, 116-12-4, "heart");

		game.input.onDown.add(changeDir, this);	
	}
	
	function addPlatform(posX,posY,asset){
		var platform = game.add.sprite(posX,posY,asset)
		platform.anchor.setTo(0.5);
		game.physics.enable(platform, Phaser.Physics.ARCADE);
		platform.body.allowGravity = false;
		platform.body.immovable = true;
		platformGroup.add(platform);	
	}

	function addTeleporter(posX,posY,asset,targetX,targetY,direction){
		var teleporter = new Teleporter(game, posX,posY,asset,targetX,targetY,direction);
		teleporterGroup.add(teleporter);	
	}

	function addHeart(posX,posY,asset){
		heart = game.add.sprite(posX,posY,asset)
		heart.anchor.setTo(0.5);
		game.physics.enable(heart, Phaser.Physics.ARCADE);
		heart.body.allowGravity = false;
		heart.body.immovable = true;
	}
	
	function onUpdate() {
		game.physics.arcade.collide(enemy, platformGroup);
		game.physics.arcade.collide(enemy, teleporterGroup, teleportEnemy);
		game.physics.arcade.collide(enemy, heart, attackHeart);
		enemy.update();
	}
	
	function attackHeart(){     
		enemy.setPos(24, 320-24-8);
		enemy.setDir(1);
	}

	function changeDir(){
		enemy.changeDir();
	}
	
}





var Tower = function (x,y, asset, damage, attackSpeed) {

}

