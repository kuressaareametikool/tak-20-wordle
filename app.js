const messageDiv = document.getElementById('message');

const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'Õ', 'Ä', 'Ö', 'Ü'];
let nextPos = [0, 0];
let words = [];
let randomWord = '';
let guess = '';
let isGameOver = false;

fetch('words.txt')
.then(res => res.text())
.then(d => {
    words = d.split('\n');
    randomWord = words[Math.floor(Math.random() * words.length)];

    document.addEventListener('keydown', e => {
        
        if ( !isGameOver ) {

            const key = e.key.toUpperCase();
            let nextCell = document.querySelector(`.container td[data-x="${nextPos[0]}"][data-y="${nextPos[1]}"]`);
        
            if ( alphabet.includes(key) && nextPos[0] <= 4 ) {
                guess += key;
                nextCell.innerText = key;
                nextPos[0]++;
            } else if ( key == 'ENTER' && nextPos[0] == 5 ) {
                testWord();
            } else if ( key == 'BACKSPACE' && nextPos[0] > 0 ) {
                nextPos[0] -= 1;
                guess = guess.slice(0, -1);
                nextCell = document.querySelector(`.container td[data-x="${nextPos[0]}"][data-y="${nextPos[1]}"]`);
                nextCell.innerText = '';
                messageDiv.innerText = '';
            }

        }
    
    });

});

function testWord () {
    if ( words.includes(guess.toLowerCase()) ) {
    
        const correctWord = randomWord.split('');

        for ( let i = 0; i < guess.length; i++ ) {
            const testCell = document.querySelector(`.container td[data-x="${i}"][data-y="${nextPos[1]}"]`);
            if ( correctWord[i] == guess.charAt(i).toLowerCase() ) {
                testCell.classList.add('correct-letter');
                correctWord[i] = '*';
            }
        }

        for ( let i = 0; i < guess.length; i++ ) {
            const letter = guess.charAt(i).toLowerCase();

            testCell = document.querySelector(`.container td[data-x="${i}"][data-y="${nextPos[1]}"]`);
            if ( correctWord.includes(letter) && !testCell.classList.contains('correct-letter') ) {
                testCell.classList.add('present-letter');
                correctWord[correctWord.indexOf(letter)] = '*';
            } else {
                testCell.classList.add('missing-letter');
            }
        }
        
        if ( nextPos[1] == 5 || guess.toLowerCase() == randomWord ) {
            isGameOver = true;
        }

        if ( isGameOver ) {
            showAnswer(randomWord);
        }

        nextPos[0] = 0;
        nextPos[1]++;
        guess = '';
    } else {
        messageDiv.innerText = 'Pole sõna!';
    }
}

function showAnswer ( word ) {
    fetch('http://localhost:8080/?q=' + word)
    .then(res => res.text())
    .then(definition => {
        messageDiv.innerHTML = 'Õige sõna: ' + randomWord.toUpperCase() + '<span class="tooltiptext">' + definition + '</span>';
    });
}