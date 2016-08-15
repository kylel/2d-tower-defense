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
		enemy = new Enemy(game, 24, 320-24-8, 'enemy', enemySpeed, 2);
		
		addPlatform(game.width/2,game.height-4,"ground");
		addPlatform(game.width/2,116,"ground");
		addPlatform(game.width/2,216,"ground");
		addTeleporter(game.width-12, 316-12-4,"teleporter", game.width-12, 216-12-4, -1);
		addTeleporter(12, 216-12-4,"teleporter", 12, 116-12-4, 1);
		addHeart(game.width-12, 116-12-4, "heart");

		game.input.onDown.add(changeDir, this);	
	}
	
	function addPlatform(posX,posY,asset){
		var platform = new Teleporter(game, posX,posY,asset);
		platformGroup.add(platform);	
	}

	function addTeleporter(posX,posY,asset,targetX,targetY,direction){
		var teleporter = new Teleporter(game, posX,posY,asset,targetX,targetY,direction);
		teleporterGroup.add(teleporter);	
	}

	function addHeart(posX,posY,asset){
		heart = new Core(game, posX,posY, asset, 2);
	}
	
	function onUpdate() {
		game.physics.arcade.collide(enemy, platformGroup);
		game.physics.arcade.collide(enemy, teleporterGroup, teleportEnemy);
		game.physics.arcade.collide(enemy, heart, attackHeart);
		enemy.update();
	}
	
	function attackHeart(enem, core){     
		core.takeDamage(enem);
	}

	function changeDir(){
		enemy.changeDir();
	}
	
}




