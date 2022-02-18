const messageDiv = document.getElementById('message');

const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'Š', 'Z', 'Ž', 'T', 'U', 'V', 'Õ', 'Ä', 'Ö', 'Ü'];
let nextPos = [0, 0];
let words = [];
let randomWord = '';
let guess = '';

fetch('words.txt')
.then(res => res.text())
.then(d => {
    words = d.split('\n');
    randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);

    document.addEventListener('keydown', e => {
    
        const key = e.key.toUpperCase();
        let nextCell = document.querySelector(`.container td[data-x="${nextPos[0]}"][data-y="${nextPos[1]}"]`);
    
        console.log(key, nextPos);
    
        if ( alphabet.includes(key) && nextPos[0] <= 4 ) {
            guess += key;
            nextCell.innerText = key;
            nextPos[0]++;
        } else if ( key == 'ENTER' && nextPos[0] == 5 ) {
            if ( words.includes(guess.toLowerCase()) ) {

                for ( let i = 0; i < guess.length; i++ ) {
                    const testCell = document.querySelector(`.container td[data-x="${i}"][data-y="${nextPos[1]}"]`);
                    if ( randomWord.charAt(i) == guess.charAt(i).toLowerCase() ) {
                        testCell.classList.add('correct-letter');
                    } else {
                        console.log(randomWord.charAt(i), 'pole õige koha peal!');
                    }
                }

                nextPos[0] = 0;
                nextPos[1]++;
                guess = '';
            } else {
                messageDiv.innerText = 'Pole sõna!';
            }
        } else if ( key == 'BACKSPACE' && nextPos[0] > 0 ) {
            nextPos[0] -= 1;
            guess = guess.slice(0, -1);
            nextCell = document.querySelector(`.container td[data-x="${nextPos[0]}"][data-y="${nextPos[1]}"]`);
            nextCell.innerText = '';
            messageDiv.innerText = '';
        }
    
    });

});


