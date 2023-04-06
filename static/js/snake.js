
document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById('case_container');
    for (let i = 0; i < 17; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        gameBoard.appendChild(row);
        
        for (let j = 0; j < 24; j++) {
            const caseElement = document.createElement('div');
            caseElement.classList.add('case');
            caseElement.setAttribute('id', `${j}-${i}`);
            row.appendChild(caseElement);
        }
    }
    
    const snake = [{ x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 2 }];
        
    let direction = 'right';
    let Score = 0;
    GiveScore(Score)
    var end = false;
    var apple = AffRandomApple(snake);
        
    window.addEventListener("keydown", function(event) {

        // Si la touche "d" est enfoncée
        if (event.code === "KeyD" && direction != 'left' && (snake[0].x+1 != snake[1].x)) { // 68 est le code de la touche "d"
            direction = 'right'
        }
            
        // Si la touche "d" est enfoncée
        if (event.code === "KeyW" && direction != 'down' && (snake[0].y+1 != snake[1].y)) { // 122 est le code de la touche "z"
            direction = 'up'
        }
            
        // Si la touche "d" est enfoncée
        if (event.code === "KeyS" && direction != 'up' && (snake[0].y-1 != snake[1].y)) { // 115 est le code de la touche "s"   
            direction = 'down'
        }
            
        // Si la touche "d" est enfoncée
        if (event.code === "KeyA" && direction != 'right' && (snake[0].x-1 != snake[1].x)) { // 113 est le code de la touche "q"
            direction = 'left'
        }
        
    });
        
        
    function update() {
        // Mettre à jour la position du serpent
        const head = { x: snake[0].x, y: snake[0].y };
            
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        snake.unshift(head);
                            
        console.log(snake)
                            
        IsEnd(head,snake);
                            
        if (end != true){
            // Effacer le gameboard
            gameBoard.querySelectorAll('.snake').forEach(segment => {
                segment.classList.remove('snake');
            });
                                
            // Dessiner le serpent sur le gameboard
            snake.forEach(segment => {
                const caseSnake = document.getElementById(`${segment.x}-${segment.y}`);
                caseSnake.classList.add('snake');
            });
                                
            if (head.x == apple.x && head.y == apple.y){
                Score++;
                GiveScore(Score);
                const caseApple = document.getElementById(`${apple.x}-${apple.y}`);
                caseApple.classList.remove('apple');
                apple = AffRandomApple(snake)
            }else{
                snake.pop();
            }
        }                  
    }
                        
    if (!end){
        var jeu = setInterval(update, 100);
    }
    
    //Function
                        
    function IsEnd(head,snake) {
        if (head.x == -1 && direction == "left"){
            end = true;
        } else if (head.x == 24 && direction == "right"){
            end = true;
        }else if (head.y == -1 && direction == "up"){
            end = true;
        }else if (head.y == 17 && direction == "down"){
            end = true;
        }
                            
        for (var i=1; i < snake.length; i++){
            if (head.x == snake[i].x && head.y == snake[i].y){
                end = true
            }
        }
        if (end){
            clearInterval(jeu);
            afficherPopup();
        }
    }
    
    function AffRandomApple(snake){
        var repeat = 1;
        const randomX = Math.floor(Math.random() * 24);
        const randomY = Math.floor(Math.random() * 17);
        while (repeat == 1) {
            const randomX = Math.floor(Math.random() * 24);
            const randomY = Math.floor(Math.random() * 17);
            snake.forEach(segment => {
                if (segment.x == randomX && segment.y == randomY){
                    repeat = 2;
                }
            });
            if (repeat == 1){
                break;
            }
        }
        console.log(randomX,randomY)
        const caseApple = document.getElementById(`${randomX}-${randomY}`);
        caseApple.classList.add('apple');
        console.log(caseApple)
        return  {x: randomX, y: randomY };
    }
    
    function GiveScore(Score){
        var scoreElement = document.getElementById("scoreMenu");
        var scoreElement2 = document.getElementById("scorePopup");
        scoreElement.innerHTML = Score;
        scoreElement2.innerHTML = Score;
    }
    
    function afficherPopup() {
        const popup = document.getElementById("popup");
        const htm = document.getElementById("html");
        popup.style.display = "block";
        htm.style.filter = blur("7px");
    }
});