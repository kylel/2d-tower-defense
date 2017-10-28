function findObjectsByType(type, map, layer) {
	var result = new Array();
	map.objects[layer].forEach(function(element){
		if(element.type === type) {
		    //Phaser uses top left, Tiled bottom left so we have to adjust the y position
		    element.y -= element.height;
		    result.push(element);
		}      
	});
	return result;
}

function convertToCenterAnchor(game,x,y,asset) {
	var image = game.cache.getImage(asset);
	return x+image.width/2, y+image.height/2;
}

function convertToBottomLeftAnchor(game,x,y,asset) {
	var image = game.cache.getImage(asset);
	return x, y+image.height;
}
