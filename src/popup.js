async function loadWords() {
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt');
    const text = await response.text();
    return new Set(text.split('\n'));
}

function* permute(word, length) {
    if (length === 1) {
        for (let i = 0; i < word.length; i++) {
            yield word[i];
        }
    } else {
        for (let i = 0; i < word.length; i++) {
            let first = word[i];
            let rest = word.slice(0, i) + word.slice(i + 1);
            for (let permutation of permute(rest, length - 1)) {
                yield first + permutation;
            }
        }
    }
}

async function wordBombSolver(word) {
    const dictionary = await loadWords();
    let foundWords = new Set();

    for (let length = 1; length <= word.length; length++) {
        for (let combination of permute(word, length)) {
            if (dictionary.has(combination)) {
                foundWords.add(combination);
            }
        }
    }

    return foundWords;
}

document.getElementById('solve-button').addEventListener('click', async () => {
    const word = document.getElementById('word-input').value;
    const result = await wordBombSolver(word);
    document.getElementById('result').innerText = Array.from(result).join(', ');
});
