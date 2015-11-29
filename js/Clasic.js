
window.onload = function() {
    game = document.getElementById('game');
    scoreTag = document.getElementById('score');

    rows = 17;
    columns = 27;

    matriz = new Array(rows);       // carácteres

    for (var i = 0; i < matriz.length; i++) {       // genera matriz
        matriz[i] = new Array(columns);
    }
    clean();

    food = new Food();
    food.parts.push(new Part(random(columns), random(rows), food.ch('+')));
    food.paint();
    snake = new Snake('W,S,A,D');
    snake.setDirection('D');

    snake.parts.push(new Part(10, 15, s.headH));
    for (var i = 9; i > 0; i--) {
        snake.parts.push(new Part(i, 15, s.bodyH));
    }
    snake.paint();

    repaint();
    score = 0;
    stop = false;
    time = 120;     // velocidad inicial ( + chico + velocidad)
    div = 30;       // + chico + incremento de velocidad
    growing = 3;    // crecimiento por comida
    interval = setInterval(frame, time);
    
    pause();
};

function frame() {
    var colision = snake.move();

    if (colision === 'edge' || colision === 'snake') {
        console.log('game over');
        snake.parts[0].ch = s.headX;
        pause();
        window.onkeydown = null;
    } else if (colision === 'food') {
        var head = snake.parts[0];
        var ate;
        //head.ch = (head.ch.indexOf('rotate') > 0)? s.jamV : s.jamH;
        if (head.ch.indexOf('rotate') > 0) {
            head.ch = s.jamV;
            ate = s.paunchV;
        } else {
            head.ch = s.jamH;
            ate = s.paunchH;
        }
        
        for (var i = 0; i < 4; i++) {
            snake.ates.push(new Part(head.x, head.y, ate));
        }

        var space = false;
        while (!space) {
            var x = random(columns);
            var y = random(rows);
            if (matriz[y][x] === t.space) {
                space = true;
            }
        }
        food.parts[0].x = x;
        food.parts[0].y = y;

        clearInterval(interval);
        interval = setInterval(frame, time -= (time / div));

        scoreTag.innerHTML = 'Puntos: ' + ++score;
        console.log(time + ' - ' + time / div);
    }
    clean();
    food.paint();
    snake.paint();
    snake.paitAtesAndCorners();
    repaint();
}

window.onkeydown = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key === 'P') {
        pause();
    }
    snake.setDirection(key);
};