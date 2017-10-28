//helloS

window.onload = function() {
	
	var game = new Phaser.Game(1280,800,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});                
	var trapSelectorGroup;
	var buttonGroup;
	var manager;
	var enemy;
	var floorGroup;
	var kyle;
	var enemySpeed = 150;
	var teleporterGroup;

	function onPreload() {
		
		game.load.image("bgrnd","img/background/background.png");
		game.load.image("background-tile","img/background/background-tiles.png");
		game.load.image("construction-tile","img/construction/construction-tiles.png");
		game.load.image("door-tile","img/doors/door-tiles.png");
		game.load.image('trap-select', 'img/traps/Ceiling Trap Selector.png');
		game.load.image('spike', 'img/traps/button-spike-01.png');
		game.load.image('grinder', 'img/traps/button-grinder-01.png');
		game.load.spritesheet('spike-trap', 'img/traps/spike-trap.png', 100, 50);
		game.load.spritesheet('grinder-trap', 'img/traps/grinder-trap.png', 100, 50);
		game.load.tilemap('level1', '/map/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet("enemy", 'img/enemies/axe-man.png', 42, 93);

		
	}

function createFloors(map) {
	var floors = findObjectsByType('floor', map, 'floors');
	floorGroup = game.add.group();
	for (var i=0; i<floors.length; i++) {
		var floor = game.add.sprite(floors[i].x,floors[i].y+20);
		floor.width = floors[i].width;floor.height = floors[i].height;
		game.physics.enable(floor, Phaser.Physics.ARCADE);
		floor.body.allowGravity = false;
		floor.body.immovable = true;	
		floorGroup.add(floor);
	}
}

	function onCreate() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = enemySpeed;
		game.add.sprite(0,0,'bgrnd');
		var map = game.add.tilemap('level1');
		map.addTilesetImage('background-tiles', 'background-tile');
		map.addTilesetImage('construction-tiles', 'construction-tile');
		map.addTilesetImage('door-tiles', 'door-tile');


		
		createFloors(map);
		teleporterGroup = game.add.group();
		createTeleporters(game, map, teleporterGroup);
		
		//floor = game.add.sprite(floors[0].x,floors[0].y);
		//kyle = game.add.sprite(0,680);
			//floor.width = floors[0].width;floor.height = floors[0].height;
			//floor.width = 1000;
			//floor.height = 20;



		//game.physics.enable(kyle, Phaser.Physics.ARCADE);
		//floor.scale.x = 1000;
		//floor.scale.y = 20;
		//kyle.body.setSize(1000,20);
		//floor.body.debug = true;
		//kyle.body.allowGravity = false;
		//kyle.body.immovable = true;	
		
		


		//map.addTilesetImage('background-image', 'bgrnd')
		//var layer0 = map.createLayer('background-image');
		var layer1 = map.createLayer('background');
		enemy = new Enemy(game, 200, 500, 'enemy', enemySpeed, 2);
		var layer2 = map.createLayer('doors');
		var layer3 = map.createLayer('construction');



		//var objectLayer = map.createLayer('trap-selection');
		//trapSelectorGroup = game.add.group();
		//map.createFromObjects('trap-selection', 537, 'trap-select', 0, true, false, trapSelectorGroup, Phaser.Sprite, true);
		//trapSelectorGroup.visible = false;

		buttonGroup = game.add.group();
		manager = new TrapManager(game, map);
		

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
		  
		
		//console.log(findObjectsByType('test', map, 'trap-selection'));

		//map.createFromObjects('trap-selection', 538, 'spike-trap-select', 0, true, false, buttonGroup, Phaser.Button, true);

		//buttonGroup.callAll('onInputUp.add', 'onInputUp', showTrapSelectors);//TODO: understand how the f this works
		//buttonGroup.onInputUp.add(showTrapSelectors, this);

		//game.input.onDown.add(showTrapSelectors, this);	
	}

	//function showTrapSelectors() {
		//trapSelectorGroup.visible = !trapSelectorGroup.visible;
	//	manager.showPositions();
	//}

	function onUpdate() {
		game.physics.arcade.collide(enemy, floorGroup);
		game.physics.arcade.collide(enemy, teleporterGroup, teleportEnemy);
	}
}

function test() {
	console.log('test');
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