
window.addEventListener('load', function () {
    var btns = document.querySelectorAll('.touchBtn');
    var game = document.querySelector('#game');

    game.onclick = function () {
        pause();
    };

    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            snake.setDirection(this.innerHTML);
            console.log(this.innerHTML);
        };
    }
    pause();
});