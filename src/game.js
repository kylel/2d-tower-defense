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

	var ceilings = [];
	var floor = [];
	var floorCount = 4;

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
		for (var i=0; i<floorCount; i++) {
			ceilings.push(game.add.sprite(0,floorHeight*i,'ceiling'));
		}

		platformGroup = game.add.group();

		for(var i=0; i<floorCount; i++) {
			floor.push(game.add.sprite(0,floorHeight*(i+1)-ceilings[1].height,'floor'));
			game.physics.enable(floor[i], Phaser.Physics.ARCADE);
			floor[i].body.allowGravity = false;
			floor[i].body.immovable = true;
			platformGroup.add(floor[i]);	
		}
		towerArea = game.add.sprite(playWidth,0,'tower-select');
		infoArea = game.add.sprite(0,playHeight,'info');

		teleporterGroup = game.add.group();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = enemySpeed;
		enemy = new Enemy(game, 12, playHeight-ceilings[1].height-12, 'enemy', enemySpeed, 2);

		addTeleporter(playWidth-12, playHeight-ceilings[1].height-12,"teleporter", 
			playWidth-12, playHeight-floorHeight-15-12, -1);
		addTeleporter(12, playHeight-floorHeight-15-12,"teleporter", 
			12, playHeight-floorHeight*2-15-12, 1);
		addTeleporter(playWidth-12, playHeight-floorHeight*2-ceilings[1].height-12,"teleporter", 
			playWidth-12, playHeight-floorHeight*3-15-12, -1);
		
		addHeart(12, floorHeight-12-floor[1].height, "heart");

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




