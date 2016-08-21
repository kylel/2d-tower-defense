//TODO: remove magic numbers

var Rectangle = function(x,y,w,h) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.top = this.y;
	this.bottom = this.y+this.h;
	this.left = this.x;
	this.right = this.x+this.w;
}

var screenWidth = 1280;
var screenHeight = 800;
var playWidth = 1000;
var playHeight = 600;
var topBar = new Rectangle(0,0,screenWidth,100);
var playArea = new Rectangle(0,topBar.h,playWidth,playHeight);
var rightBar = new Rectangle(playWidth,topBar.h,screenWidth-playWidth,screenHeight-topBar.h);
var bottomBar = new Rectangle(0,topBar.h+playHeight,screenWidth-rightBar.h,screenHeight-topBar.h-playHeight);

var floor = [];
var floors = 4;
var floorHeight = playHeight/4;
var floorWidth = playWidth;
for (var i=0; i<floors; i++) {
	floor[i] = new Rectangle(0,screenHeight-bottomBar.h-(i+1)*floorHeight,floorWidth,floorHeight);
}




//TODO: add walls
//TODO: make pixel resolution independent - now depends on 640x360 16:9



window.onload = function() {
	
	var game = new Phaser.Game(screenWidth,screenHeight,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});                

	var enemySpeed = 80;
	var enemy;
	var platformGroup;
	var teleporterGroup;
	//var heart;

	//var ceilings = [];
	//var floor = [];
	//var floorCount = 4;
	//var wall = [];
	//var wallCount = 2;
	//var leftWall;
	//var rightWall;

	//var towerArea;
	//var infoArea;

	function onPreload() {
		game.load.spritesheet("enemy", 'img/enemy.png', 42, 93);
		game.load.image("teleporter","img/teleporter.png");
		game.load.image("entrance","img/entrance.png");
		game.load.image("exit","img/exit.png");
		game.load.image("platform","img/platform.png");
		game.load.image("heart","img/transparent-column.png");

		game.load.image("treasury", 'img/treasury.png');
		//game.load.image("tower-select","img/tower-select-area.png");
		game.load.image("wall","img/wall.png");
		game.load.image("floor","img/floor.png");
		game.load.image("ceiling","img/ceiling.png");
		//game.load.image("trap-icon","img/trap-selector.png");

		game.load.image('background', 'img/background.png');
		
	}

	function onCreate() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var enemyw =  game.cache.getImage("enemy").width;
		var enemyh =  game.cache.getImage("enemy").height;
		var teleporterWidth = game.cache.getImage("teleporter").width;
		var teleporterHeight = game.cache.getImage("teleporter").height;
		var groundHeight = game.cache.getImage("platform").height;

		var background = game.add.sprite(0,0,'background');
		
		game.add.sprite(0,floor[0].y, 'wall');
		game.add.sprite(0,floor[1].y, 'wall');
		game.add.sprite(0,floor[2].y, 'wall');
		game.add.sprite(0,floor[3].y, 'wall');
		game.add.sprite(playWidth-20,floor[0].y, 'wall');
		game.add.sprite(playWidth-20,floor[1].y, 'wall');
		game.add.sprite(playWidth-20,floor[2].y, 'wall');
		game.add.sprite(playWidth-20,floor[3].y, 'wall');

		platformGroup = game.add.group();
		teleporterGroup = game.add.group();
		for (var i=0; i<floors; i++) {
			addPlatform(floor[i].x, floor[i].y+floor[i].h, 'platform');
			game.add.sprite(floor[i].x,floor[i].y, 'ceiling');
		}

		game.physics.arcade.gravity.y = enemySpeed;
		var temp = game.add.sprite(1+teleporterWidth/2+teleporterWidth+20, floor[3].y+floor[3].h-groundHeight-teleporterHeight/2, 'treasury');
		temp.anchor.setTo(0.5);
		enemy = new Enemy(game, 20+enemyw/2, floor[0].y+floor[0].h-20-enemyh/2, 'enemy', enemySpeed, 2);

		

		addTeleporter(floorWidth-teleporterWidth/2-20, floor[0].y+floor[0].h-groundHeight-teleporterHeight/2,"teleporter", floorWidth-teleporterWidth/2-20, floor[1].y+floor[1].h-groundHeight-enemyh/2, -1);
		game.add.sprite(floorWidth-teleporterWidth*2-20, floor[0].y+floor[0].h-groundHeight-teleporterHeight, 'entrance');
		game.add.sprite(floorWidth-teleporterWidth-20, floor[1].y+floor[1].h-groundHeight-teleporterHeight, 'exit');
		
		
		addTeleporter(floorWidth-teleporterWidth/2-20, floor[2].y+floor[2].h-groundHeight-teleporterHeight/2,"teleporter", floorWidth-teleporterWidth/2-20, floor[3].y+floor[3].h-groundHeight-enemyh/2, -1);
		game.add.sprite(floorWidth-teleporterWidth*2-20, floor[2].y+floor[2].h-groundHeight-teleporterHeight, 'entrance');
		game.add.sprite(floorWidth-teleporterWidth-20, floor[3].y+floor[3].h-groundHeight-teleporterHeight, 'exit');
		addTeleporter(0+teleporterWidth/2+20, floor[1].y+floor[1].h-groundHeight-teleporterHeight/2,"teleporter", 20+enemyw/2, floor[2].y+floor[2].h-groundHeight-enemyh/2, 1);
		temp = game.add.sprite(0+teleporterWidth*1.5+20, floor[1].y+floor[1].h-groundHeight-teleporterHeight/2, 'entrance');
		temp.anchor.setTo(0.5);
		temp.scale.x *= -1;

		temp = game.add.sprite(0+teleporterWidth/2+20, floor[2].y+floor[2].h-groundHeight-teleporterHeight/2, 'exit')
		temp.anchor.setTo(0.5);
		temp.scale.x *= -1;

		addHeart(0+20, floor[3].y+floor[3].h-groundHeight-teleporterHeight/2, 'heart');
		temp = game.add.sprite(1+teleporterWidth/2+20, floor[3].y+floor[3].h-groundHeight-teleporterHeight/2, 'teleporter');
		temp.anchor.setTo(0.5);
		temp.scale.x *= -1;

		

		
		//addTeleporter(40+12, playHeight-floorHeight-30-12,"teleporter", 
		//	40+12, playHeight-floorHeight*2-30-12, 1);
		//addTeleporter(playWidth+40-12, playHeight-floorHeight*2-ceilings[1].height-12,"teleporter", 
		//	playWidth+40-12, playHeight-floorHeight*3-30-12, -1);

	}
	
	function addPlatform(posX,posY,asset){
		var platform = new Platform(game, posX,posY,asset);
		platformGroup.add(platform);	
	}

	function addTeleporter(posX,posY,asset,targetX,targetY,direction){
		var teleporter = new Teleporter(game, posX,posY,asset,targetX,targetY,direction);
		teleporterGroup.add(teleporter);
		//return teleporter;	
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




/*

//TODO: remove magic numbers



var screenWidth = 1280;
var screenHeight = 800;
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




*/