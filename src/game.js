//TODO: remove magic numbers



var screenWidth = 640;
var screenHeight = 360;
var playWidth = 480;
var playHeight = 320;
var floorHeight = 80;

//TODO: add walls
//TODO: make pixel resolution independent - now depends on 640x360 16:9



window.onload = function() {
	
	var game = new Phaser.Game(screenWidth,screenHeight,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});                

	var enemySpeed = 150;
	var enemy;
	var platformGroup;
	var teleporterGroup;
	var heart;

	var ceiling1;
	var ceiling2;
	var ceiling3;
	var ceiling4;

	var floor1;
	var floor2;
	var floor3;
	var floor4;

	var towerArea;
	var infoArea;

	function onPreload() {
		game.load.image("enemy", 'img/enemy.png');
		game.load.image("teleporter","img/teleporter.png");
		game.load.image("ground","img/ground.png");
		game.load.image("heart","img/heart.png");

		game.load.image("info", 'img/info-area.png');
		game.load.image("tower-select","img/tower-select-area.png");
		game.load.image("wall","img/wall.png");
		game.load.image("floor","img/floor.png");
		game.load.image("ceiling","img/ceiling.png");
	}

	function onCreate() {
		ceiling1 = game.add.sprite(0,0,'ceiling');
		ceiling2 = game.add.sprite(0,floorHeight,'ceiling');
		ceiling3 = game.add.sprite(0,floorHeight*2,'ceiling');
		ceiling4 = game.add.sprite(0,floorHeight*3,'ceiling');

		platformGroup = game.add.group();

		floor1 = game.add.sprite(0,floorHeight-ceiling1.height,'floor');
		game.physics.enable(floor1, Phaser.Physics.ARCADE);
		floor1.body.allowGravity = false;
		floor1.body.immovable = true;
		platformGroup.add(floor1);
		floor2 = game.add.sprite(0,floorHeight*2-ceiling1.height,'floor');
		game.physics.enable(floor2, Phaser.Physics.ARCADE);
		floor2.body.allowGravity = false;
		floor2.body.immovable = true;
		platformGroup.add(floor2);
		floor3 = game.add.sprite(0,floorHeight*3-ceiling1.height,'floor');
		game.physics.enable(floor3, Phaser.Physics.ARCADE);
		floor3.body.allowGravity = false;
		floor3.body.immovable = true;
		platformGroup.add(floor3);
		floor4 = game.add.sprite(0,floorHeight*4-ceiling1.height,'floor');
		game.physics.enable(floor4, Phaser.Physics.ARCADE);
		floor4.body.allowGravity = false;
		floor4.body.immovable = true;
		platformGroup.add(floor4);

		towerArea = game.add.sprite(playWidth,0,'tower-select');
		infoArea = game.add.sprite(0,playHeight,'info');



		
		teleporterGroup = game.add.group();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = enemySpeed;
		enemy = new Enemy(game, 12, playHeight-ceiling1.height-12, 'enemy', enemySpeed, 2);
		
		//addPlatform(game.width/2,game.height-4,"ground");
		//addPlatform(game.width/2,116,"ground");
		//addPlatform(game.width/2,216,"ground");
		addTeleporter(playWidth-12, playHeight-ceiling1.height-12,"teleporter", 
			playWidth-12, playHeight-floorHeight-15-12, -1);
		addTeleporter(12, playHeight-floorHeight-15-12,"teleporter", 
			12, playHeight-floorHeight*2-15-12, 1);
		addTeleporter(playWidth-12, playHeight-floorHeight*2-ceiling1.height-12,"teleporter", 
			playWidth-12, playHeight-floorHeight*3-15-12, -1);
		
		addHeart(12, floorHeight-12-floor1.height, "heart");

		game.input.onDown.add(changeDir, this);	
	}
	
	function addPlatform(posX,posY,asset){
		var platform = new Platform(game, posX,posY,asset);
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




