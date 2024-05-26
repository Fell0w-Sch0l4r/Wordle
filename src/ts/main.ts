import "../css/tailwind.css";
import { Cursor } from "./types/types";

export const wordsArray: string[] = [
    "APPLE",
    "BASIC",
    "BLADE",
    "BREAD",
    "CLOUD",
    "DANCE",
    "FLUTE",
    "GRAPE",
    "IMAGE",
    "KNIFE",
    "LEMON",
    "MOUSE",
    "NURSE",
    "OCEAN",
    "PASTE",
    "PIZZA",
    "RADIO",
    "RULER",
    "SENSE",
    "SLICE",
    "SPACE",
    "STAMP",
    "TASTE",
    "TOAST",
    "VOICE",
    "WASTE",
    "WATCH",
    "WHEEL",
    "WRIST",
    "ZESTY",
    "BRAID",
];


const word: string[] = []

const ALPHABET: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];



const textArea = document.querySelector(".textArea") as HTMLDivElement;
const doc = document;

const cursor: Cursor = {
    row: 0,
    collum: 0,
};

doc.addEventListener("keypress", (e) => {
    if (cursor.collum < 5 && isLetter(e.key)) {
        console.log(e.key);

        const letter: string = e.key.toUpperCase();

        addLetterToTextArea(letter)

        word.push(letter)
        console.log(word)
        console.log(word.join(""))

        cursor.collum++;

        
    }
});

doc.addEventListener("keypress", (e) => {
    
    if(e.key === "Enter" && word.length === 5){
        if(wordsArray.includes(word.join(""))){
            cursor.row++
            cursor.collum = 0

            word.length = 0
            console.log(word)
        }
    }
});

doc.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && cursor.collum > 0) {
        cursor.collum--;

        textArea.children[cursor.row].children[cursor.collum].textContent = "";

        word.pop()
        console.log(word)
        console.log(word.join(""));
    }
});

export function getRandomArrayString(array: string[]): string {
    let randomIndex: number = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getRandomWord(): string {
    return getRandomArrayString(wordsArray);
}


export function isLetter(letter: string): boolean{
    return ALPHABET.includes(letter)
}


export function addLetterToTextArea(letter: string):void{
    textArea.children[cursor.row].children[cursor.collum].textContent = letter;
}