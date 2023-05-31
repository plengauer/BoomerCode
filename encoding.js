
const buttons = [
  '2abc', '3def', '4ghi', '5jkl', '6mno', '7pqrs', '8tuv', '9wxyz', '0 '
];

let encoder = {};
let decoder = {};

for (let button of buttons) {
  let number = button.charAt(0);
  for (let letter_index = 1; letter_index < button.length; letter_index++) {
    let letter = button.charAt(letter_index);
    let boomer = Array(letter_index).fill(number).join('');
    encoder[letter] = boomer;
    decoder[boomer] = letter;
  }
}

function encode(text, separator = '-') {
  let boomer = [];
  for (let i = 0; i < text.length; i++) {
    let character = text.charAt(i);
    if (character != character.toLowerCase()) {
      boomer.push('#');
      character = character.toLowerCase();
    }
    let encoded = encoder[character];
    if (!encoded) throw new Error('Unencodable character: "' + character + '"');
    boomer.push(encoded);
  }
  return boomer.join(separator);
}

function decode(boomer) {
  let text = '';
  let upper = false;
  for (let token of boomer.match(/(\d+|#)/g)) {
    if (token == '#') {
      upper = true;
      continue;
    }
    let character = decoder[token];
    if (!character) throw new Error('Undecodable token: "' + token + '"');
    if (upper) character = character.toUpperCase();
    text += character;
    upper = false;
  }
  return text;
}

module.exports = { encode, decode };

