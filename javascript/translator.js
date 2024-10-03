let characters = {
    'A': 'O.....',
    'B': 'O.O...',
    'C': 'OO....',
    'D': 'OO.O..',
    'E': 'O..O..',
    'F': 'OOO...',
    'G': 'OOOO..',
    'H': 'O.OO..',
    'I': '.OO...',
    'J': '.OOO..',
    'K': 'O...O.',
    'L': 'O.O.O.',
    'M': 'OO..O.',
    'N': 'OO.OO.',
    'O': 'O..OO.',
    'P': 'OOO.O.',
    'Q': 'OOOOO.',
    'R': 'O.OOO.',
    'S': '.OO.O.',
    'T': '.OOOO.',
    'U': 'O...OO',
    'V': 'O.O.OO',
    'W': '.OOO.O',
    'X': 'OO..OO',
    'Y': 'OO.OOO',
    'Z': 'O..OOO',
    '.': '..OO.O',
    ',': '..O...',
    '?': '..O.OO',
    '!': '..OOO.',
    ':': '..OO..',
    ';': '..O.O.',
    '-': '....OO',
    '/': '.O..O.',
    '<': '.OO..O',
    '>': 'O..OO.',
    '(': 'O.O..O',
    ')': '.O.OO.',
    ' ': '......',
};
let numbers =
{
    '1': 'O.....',
    '2': 'O.O...',
    '3': 'OO....',
    '4': 'OO.O..',
    '5': 'O..O..',
    '6': 'OOO...',
    '7': 'OOOO..',
    '8': 'O.OO..',
    '9': '.OO...',
    '0': '.OOO..',
    '': '.O.OOO'
};
let follows =
{
    'capital': '.....O',
    'number': '.O.OOO',
}


function main() {
    const args = process.argv.slice(2);
    const input = args.join(' ');

    if (isBraille(input) == true) brailleToEnglish(input);
    else englishToBraille(input);
}

function isBraille(input) {
    if (input.length % 6 != 0) return false;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) != 'O' && input.charAt(i) != '.') return false;
    }

    return true;
}

function englishToBraille(input) {
    let translated = "";

    for (let i = 0; i < input.length; i++) {
        if (input[i] == ' ') {
            translated += characters[' '];
        }
        else if (isCapital(input[i])) translated = translated + follows["capital"] + characters[input[i]];

        else if (isNumber(input[i])) {
            translated += follows["number"];
            let j = i;
            while (j < input.length && input[j] != ' ') {
                translated += numbers[input[j]];
                j++;
                i++;
            }
            if (input[j] === ' ') translated += characters[' '];
        }
        else translated += characters[input[i].toUpperCase()];
    }
    console.log(translated);
}

function brailleToEnglish(input) {
    const brailleSymbols = sliceBrailleSymbols(input);
    let translated = "";

    for (let i = 0; i < brailleSymbols.length; i++) {
        let currentSymbol = brailleSymbols[i];

        if (capitalFollows(currentSymbol)) {
            translated += getKeyByValue(characters, brailleSymbols[i + 1]);
            i++;
        }
        else if (numberFollows(currentSymbol)) {
            for (let j = i + 1; j < brailleSymbols.length; j++) {
                i++;
                if (brailleSymbols[j] == characters[' ']) {
                    translated += ' ';
                    break;
                }
                translated += getKeyByValue(numbers, brailleSymbols[j]);
            }
        }
        else {
            translated += getKeyByValue(characters, currentSymbol).toLowerCase();
        }
    }
    console.log(translated);
}

function sliceBrailleSymbols(input) {
    const brailleSymbols = [];

    for (let i = 0; i < input.length; i += 6) {
        brailleSymbols.push(input.slice(i, i + 6));
    }
    return brailleSymbols;
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function isCapital(input) {
    return input != input.toLocaleLowerCase() && input != ' ' ? true : false;
}

function isNumber(input) {
    return !isNaN(input) ? true : false;
}

function capitalFollows(input) {
    return follows["capital"] === input ? true : false;
}

function numberFollows(input) {
    return follows["number"] === input ? true : false;
}

main();

