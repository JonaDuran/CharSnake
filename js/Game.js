
function random (limit) {
    return Math.round(Math.random() * (limit - 3)) + 1;
}


// limpia la matriz de carácteres dejando solo los bordes
function clean() {
    for (var i = 0; i < rows; i++) {        // rellena matriz
        for (var j = 0; j < columns; j++) {

            if (i === 0 && j === 0 || i === 0 && j === columns - 1) {
                matriz[i][j] = t.edgeC;

            } else if (i === rows - 1 && j === 0 ||
                    i === rows - 1 && j === columns - 1) {
                matriz[i][j] = t.edgeC;

            } else if (i === 0 || i === rows - 1) {
                matriz[i][j] = t.edgeH;

            } else if (j === 0 || j === columns - 1) {
                matriz[i][j] = t.edgeV;

            } else {
                matriz[i][j] = t.space;
            }
        }
    }
}

// redibuja la matriz en pantalla
function repaint() { 
    var box = '';
    for (var i = 0; i < matriz.length; i++) {
        box += matriz[i].join('') + '<br/>';
    }
    game.innerHTML = box;
}

function pause() {
    stop = !stop;
    if(stop) {
        clearInterval(interval);
    } else {
        interval = setInterval(frame, time);
    }
}