
document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById('case_container');
    for (let i = 0; i < 13; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        gameBoard.appendChild(row);
      
        for (let j = 0; j < 21; j++) {
          const caseElement = document.createElement('div');
          caseElement.classList.add('case');
          row.appendChild(caseElement);
        }
    }

    const snake = [{ x: 4, y: 2 },
                   { x: 3, y: 2 },
                   { x: 2, y: 2 }];
    let direction = 'right';

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
        snake.pop();

        // Effacer le gameboard
        gameBoard.querySelectorAll('.snake').forEach(segment => {
            segment.classList.remove('snake');
        });

        // Dessiner le serpent sur le gameboard
        snake.forEach(segment => {
            const caseElement = gameBoard.querySelector(`[data-x="${segment.x}"][data-y="${segment.y}"]`);
            caseElement.classList.add('snake');
        });
    }

    setInterval(update, 100);
});

