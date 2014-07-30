function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function (other) {
	return new Vector(this.x + other.x, this.y + other.y);
};

function Grid (width, height) {
	this.space = new Array(width * height);
	this.width = width;
	this.height = height;
}

Grid.prototype.isInside = function (vector) {
	return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function (vector) {
	return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function (vector, value) {
	this.space[vector.x + this.width * vector.y] = value;
};

function elementFromChar (legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function charFromElement (element) {
	if (element === null) {
		return " ";
	}
	else {
		return element.originChar;
	}
}

function World (map, legend) {
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

	map.forEach(function (line, y) {
		for (var x = 0; x < line.length; x++) {
			grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
		}
	});
}

World.prototype.toString = function () {
	var output = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width; x++) {
			var element = this.grid.get(new Vector(x,y));
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
}



