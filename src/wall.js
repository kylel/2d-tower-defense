var Wall = function (x,y, asset) {

}

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.collide(enemy) {
	enemy.changeDir();
	//TODO: might have to move it 1 pixel forward
}