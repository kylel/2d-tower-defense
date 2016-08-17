//TODO: remove magic numbers



var screenWidth = 1280;
var screenHeight = 720;
var playWidth = 960;
var playHeight = 640;
var floorHeight = 160;

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
	//var wall = [];
	//var wallCount = 2;
	var leftWall;
	var rightWall;

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
		var test = game.load.image("trap-icon","img/trap-selector.png");
		
	}

	function onCreate() {


		//for (var i=0; i<floorCount; i++) {
			
		//}
		var wallWidth = game.cache.getImage("wall").width;

		platformGroup = game.add.group();

		for(var i=0; i<floorCount; i++) {
			ceilings.push(game.add.sprite(wallWidth,floorHeight*i,'ceiling'));
			floor.push(game.add.sprite(wallWidth,floorHeight*(i+1)-ceilings[0].height,'floor'));
			game.physics.enable(floor[i], Phaser.Physics.ARCADE);
			floor[i].body.allowGravity = false;
			floor[i].body.immovable = true;
			platformGroup.add(floor[i]);	
		}
		towerArea = game.add.sprite(playWidth+40+40,0,'tower-select');
		
		var style = {font: '30px Arial', fill: '#ffffff'};
		var j =1;
		for (var i=0; i<5; i++) {

			game.add.sprite(playWidth+wallWidth+wallWidth+10,20+i*110,'trap-icon');
			game.add.text(playWidth+wallWidth+wallWidth+10,20+i*110, j.toString());
			game.add.sprite(playWidth+wallWidth+wallWidth+10+110,20+i*110,'trap-icon');
			j++;
			game.add.text(playWidth+90+110,20+i*110, j.toString());
			j++;
		}
		//game.add.sprite(playWidth+45,10,'trap-icon');
		//game.add.sprite(playWidth+45+55,10,'trap-icon');
		//game.add.sprite(playWidth+45,10+55,'trap-icon');
		//game.add.sprite(playWidth+45+55,10+55,'trap-icon');
		
		leftWall = game.add.sprite(0,0, 'wall');
		rightWall = game.add.sprite(playWidth+40, 0, 'wall');

		infoArea = game.add.sprite(0,playHeight,'info');

		teleporterGroup = game.add.group();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = enemySpeed;
		enemy = new Enemy(game, 40+12, playHeight-ceilings[1].height-12, 'enemy', enemySpeed, 2);

		addTeleporter(playWidth+40-12, playHeight-ceilings[1].height-12,"teleporter", 
			playWidth+40-12, playHeight-floorHeight-30-12, -1);
		addTeleporter(40+12, playHeight-floorHeight-30-12,"teleporter", 
			40+12, playHeight-floorHeight*2-30-12, 1);
		addTeleporter(playWidth+40-12, playHeight-floorHeight*2-ceilings[1].height-12,"teleporter", 
			playWidth+40-12, playHeight-floorHeight*3-30-12, -1);
		
		addHeart(40+12, floorHeight-12-floor[1].height, "heart");

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




