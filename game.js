window.onload = function() {
	
	var game = new Phaser.Game(480,320,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});                

	var playerSpeed = 150;
	var player;
	var platformGroup;
	var teleporterGroup;
	var heart;

	function onPreload() {
		game.load.image("platform180","platform180.png");
		game.load.image("platform120","platform120.png");
		game.load.image("player","player.png");
		game.load.image("teleporter","teleporter.png");
		game.load.image("ground","ground.png");
		game.load.image("heart","heart.png");
	}

	function onCreate() {
		platformGroup = game.add.group();
		teleporterGroup = game.add.group();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		player = game.add.sprite(24, 320-24-8, "player");
		player.anchor.setTo(0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = playerSpeed;
		//addPlatform(240,60,"platform180");  
		//addPlatform(340,140,"platform120");  
		//addPlatform(140,140,"platform120");
		//addPlatform(420,220,"platform120"); 
		//addPlatform(60,220,"platform120");
		addPlatform(480/2,316,"ground");
		addPlatform(480/2,116,"ground");
		addPlatform(480/2,216,"ground");
		addTeleporter(480-12, 316-12-4,"teleporter", 480-12, 216-12-4, -1);
		addTeleporter(12, 216-12-4,"teleporter", 12, 116-12-4, 1);
		addHeart(480-12, 116-12-4, "heart");
		//addPlatform(380,316,"ground");

		game.input.onDown.add(changeDir, this);	
		player.body.velocity.x = playerSpeed;
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
		var teleporter = game.add.sprite(posX,posY,asset)
		teleporter.anchor.setTo(0.5);
		game.physics.enable(teleporter, Phaser.Physics.ARCADE);
		teleporter.body.allowGravity = false;
		teleporter.body.immovable = true;
		teleporter.targetX = targetX;
		teleporter.targetY = targetY;
		teleporter.direction = direction;
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
		player.body.velocity.y = Math.abs(playerSpeed);
		
		//player.body;
		game.physics.arcade.collide(player, platformGroup, movePlayer);
		game.physics.arcade.collide(player, teleporterGroup, teleportPlayer);
		game.physics.arcade.collide(player, heart, attackHeart);
		//if(player.y>320){
		//	player.y = 0;
		//}
		if(player.x<12){
			player.x=12;
			player.body.velocity.x = playerSpeed;
		}
		if(player.x>468){
			player.x=468;
			player.body.velocity.x = -playerSpeed;
		}
	}
	
	function movePlayer(){     
		//player.body.velocity.x = playerSpeed;
	}

	function attackHeart(){     
		//player.body.velocity.x = playerSpeed;
		player.x = 24;
		player.y = 320-24-8;
	}

	function teleportPlayer(player, teleporter){     
		//player.body.velocity.x = playerSpeed
		
		player.x = teleporter.targetX;
		player.y = teleporter.targetY;
		player.body.velocity.x = playerSpeed * teleporter.direction;
		//player.body.velocity.x *= -1;
		//changeDir();
	}
	
	function changeDir(){
		player.body.velocity.x *= -1;
	}
	
}