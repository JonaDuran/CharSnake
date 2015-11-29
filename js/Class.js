// inserta las partes del objeto en la matriz
paint = function() {
    for (var i = this.parts.length - 1; i >= 0; i--) {
        this.parts[i].set();
    }
};

// checa si el char es comida
isFood = function(ch) {
    if (ch === t.space) {
        return false;
    }
    for (var i = 0; i < food.parts.length; i++) {
        if (ch === food.parts[i].ch) {
            return true;
        }
    }
    return false;
};

/**** Clase Snake ****/

// constructor
Snake = function(keys) {    // up,down,left,right
    this.parts = new Array();
    this.newPart = false;
    this.ates = new Array();
    this.lastCorner;
    this.keys = keys.split(',');
    this.direction;
    this.moveX;
    this.moveY;
};

Snake.prototype.paint = paint;

// checa si la cabeza de la serpiente está sobre algo (colisión)
Snake.prototype.colision = function() {
    var parts = this.parts;
    var head = this.parts[0];
    if (head.x === 0 || head.x === columns - 1 ||
            head.y === 0 || head.y === rows - 1) {
        return 'edge';
    }

    for (var i = 1; i < parts.length; i++) {
        if (head.x === parts[i].x && head.y === parts[i].y) {
            return 'snake';
        }
    }

    parts = food.parts;
    for (var i = 0; i < parts.length; i++) {
        if (head.x === parts[i].x && head.y === parts[i].y) {
            return 'food';
        }
    }

    return false;
};

// mueve la serpiente un espacio
Snake.prototype.move = function() {
    var head = this.parts[0];
    for (var i = this.parts.length - 2; i >= 0; i--) {
        this.parts[i + 1].x = this.parts[i].x;
        this.parts[i + 1].y = this.parts[i].y;
        this.parts[i + 1].ch = this.parts[i].ch;
    }

    var part = this.parts[1];
    if (this.direction === 'up' || this.direction === 'down') {
        part.ch = s.bodyV;
    } else {
        part.ch = s.bodyH;
    }

    // alarga la serpiente cuando la comida llega al final
    if (this.newPart) {
        this.ates[0].ch = s.bodyC;
        this.parts.push(this.ates[0]);
        this.ates.shift();
        this.newPart = false;
    }

    head.x += this.moveX;
    head.y += this.moveY;
    head.ch = (this.moveX === 0) ? s.headV : s.headH;

    if (head.y > 0 && head.y < rows - 1) {
        if (isFood(matriz[head.y + 1][head.x])) {
            head.ch = s.eatD;
        } else if (isFood(matriz[head.y - 1][head.x])) {
            head.ch = s.eatU;
        } else if (isFood(matriz[head.y][head.x + 1])) {
            head.ch = s.eatR;
        } else if (isFood(matriz[head.y][head.x - 1])) {
            head.ch = s.eatL;
        }
    }
    return this.colision();
};

// cambia el char de la parte de la serpiente donde va la comida
Snake.prototype.paitAtesAndCorners = function() {
    var ates = this.ates;
    if (ates.length > 0) {
        for (var i = 0; i < ates.length; i++) {
            var x = ates[i].x;
            var y = ates[i].y;
            if (matriz[y][x] === s.bodyH || matriz[y][x] === s.bodyV) {
                matriz[y][x] = ates[i].ch;
            }
        }

        if (ates[0].x === this.parts[this.parts.length - 1].x &&
                ates[0].y === this.parts[this.parts.length - 1].y) {
            this.newPart = true;
        }
    }
};

// establese la dirección de la serpiente
Snake.prototype.setDirection = function(key) {
    switch (key) {
        case this.keys[0]:
            if (this.direction !== 'down') {
                this.direction = 'up';
                this.moveX = 0;
                this.moveY = -1;
            }
            break;
        case this.keys[1]:
            if (this.direction !== 'up') {
                this.direction = 'down';
                this.moveX = 0;
                this.moveY = 1;
            }
            break;
        case this.keys[2]:
            if (this.direction !== 'right') {
                this.direction = 'left';
                this.moveX = -1;
                this.moveY = 0;
            }
            break;
        case this.keys[3]:
            if (this.direction !== 'left') {
                this.direction = 'right';
                this.moveX = 1;
                this.moveY = 0;
            }
    }
};


/*** Clase Food ***/

// constructor
Food = function() {
    this.parts = new Array();
    this.paint = paint;
    this.ch = function(ch) {
        return '<b class="food">' + ch + '</b>';
    };
};



/* Clase Part (carácteres) */

// constructor
Part = function(x, y, ch) {
    this.x = x;
    this.y = y;
    this.ch = ch;
};

// inseta el char en la matriz
Part.prototype.set = function() {
    matriz[this.y][this.x] = this.ch;
};