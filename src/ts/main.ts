import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../css/tailwind.css";
import { Colors } from "./enums/Colors";
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

const word: string[] = [];

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

let randomWord: string = getRandomWord();
console.log(randomWord);
//alert(randomWord)

let gameIsOver: boolean = false

const playAgainBtn = document.querySelector("#playAgain") as HTMLButtonElement;
playAgainBtn.addEventListener("click", restartGame);

const textArea = document.querySelector(".textArea") as HTMLDivElement;
const doc = document;

const cursor: Cursor = {
    reset() {
        this.row = 0;
        this.collum = 0;
    },
    row: 0,
    collum: 0,
};

doc.addEventListener("keypress", write);

doc.addEventListener("keypress", submitWord);

doc.addEventListener("keydown", deleteLetter);

// const qBtn = document.querySelector("#Q") as HTMLButtonElement;

// qBtn.addEventListener("click", typeButton)

const keyboard = document.querySelector("#keyboard") as HTMLDivElement;

for (const row of keyboard.children) {
    for (const letter of row.children) {
        if (letter.id !== "Enter" && letter.id !== "Backspace") {
            letter.addEventListener("click", typeButton);
        }
    }
}

const enterBtn = document.querySelector("#Enter") as HTMLButtonElement;

enterBtn.addEventListener("click", () => {
    if (rowIsFull() && !gameIsOver) {
        updateSquareColors();
    }
});

const backSpaceBtn = document.querySelector("#Backspace") as HTMLButtonElement;

backSpaceBtn.addEventListener("click", () => {
    if (cursor.collum > 0 && !gameIsOver) {
        decrementCol();

        writeOnTextArea("");

        word.pop();
        console.log(word);
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

export function isLetter(letter: string): boolean {
    return ALPHABET.includes(letter);
}

export function writeOnTextArea(letter: string): void {
    textArea.children[cursor.row].children[cursor.collum].textContent = letter;
}

export function incrementCol(): void {
    cursor.collum++;
}

export function incrementRow(): void {
    cursor.row++;
}

export function decrementCol(): void {
    cursor.collum--;
}

export function resetCol(): void {
    cursor.collum = 0;
}

function write(e: KeyboardEvent): void {
    if (cursor.collum < 5 && isLetter(e.key) && !gameIsOver) {
        console.log(e.key);

        const letter: string = e.key.toUpperCase();

        displayLetter(letter);
    }
}

function submitWord(e: KeyboardEvent): void {
    if (e.key === "Enter" && rowIsFull() && !gameIsOver) {
        updateSquareColors();
    }
}

function deleteLetter(e: KeyboardEvent): void {
    if (e.key === "Backspace" && cursor.collum > 0 && !gameIsOver) {
        decrementCol();

        writeOnTextArea("");

        word.pop();
        console.log(word);
        console.log(word.join(""));
    }
}

function evaluateWordMatch(): void {
    for (let i = 0; i < 5; i++) {
        if (word[i] === randomWord[i]) {
            applyColor(textArea.children[cursor.row].children[i], Colors.GREEN);
        } else if (randomWord.includes(word[i])) {
            applyColor(
                textArea.children[cursor.row].children[i],
                Colors.YELLOW
            );
        } else {
            applyColor(textArea.children[cursor.row].children[i], Colors.GREY);
        }
    }
}

export function applyColor(div: Element, color: Colors) {
    div.classList.add(color);
}

function typeButton(this: HTMLButtonElement): void {
    if (cursor.collum < 5 && !gameIsOver) {
        console.log(this.id);

        const letter: string = this.id;

        displayLetter(letter);
    }
}

function displayLetter(letter: string): void {
    writeOnTextArea(letter);

    word.push(letter);
    console.log(word);
    console.log(word.join(""));

    incrementCol();
}

function rowIsFull(): boolean {
    return word.length === 5;
}

function updateSquareColors(): void {
    if (word.join("") === randomWord) {
        console.log("Correct");
        //alert("Correct");
        showNotification("Correct", "green");

        let row = textArea.children[cursor.row] as HTMLDivElement;

        markPerfectMatch(row)
        word.length = 0;

        gameIsOver = true
        playAgainBtn.classList.remove("hidden")
    } else {
        console.log("Wrong");
        evaluateWordMatch();

        //alert("Try again");
        
        if(cursor.row < 5){
            incrementRow();
            resetCol();
            showNotification("Wrong", "red");
        }else{
            gameIsOver = true
            showNotification("You Lost", "red")
            playAgainBtn.classList.remove("hidden");
        }
        

        word.length = 0;
        console.log(word);
    }
}

function markPerfectMatch(row: HTMLDivElement): void {
    forEachChild(row, colorDivGreen);
    
}

function colorDivGreen(square: HTMLDivElement): void {
    applyColor(square, Colors.GREEN);
}

function showNotification(notification: string, color: string): void {
    Toastify({
        text: notification,
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
            background: color,
            color: "black",
        },
    }).showToast();
}

function restartGame(): void {
    randomWord = getRandomWord();
    console.log(randomWord);

    clearTextArea();

    cursor.reset();

    showNotification("New Game", "yellow");
    gameIsOver = false
    playAgainBtn.classList.add("hidden");
}
function clearTextArea(): void {
    for (let row = cursor.row; row >= 0; row--) {
        const lettersRow = textArea.children[row] as HTMLDivElement
        forEachChild(lettersRow, resetSquare);
    }
}

// Callback function to reset the textContent and remove the last class added to an element
function resetSquare(element: HTMLDivElement): void {
    // Set the textContent to an empty string
    element.textContent = "";

    // Remove the last class added to the element
    const squareClasses: string[] = [...element.classList];
    const color: string | undefined = squareClasses.at(-1); // Get the last class

    // Check if color is not undefined before attempting to remove it
    if (color!== undefined) {
        element.classList.remove(color);
    }
}


function forEachChild(
    element: HTMLDivElement,
    callback: (child: HTMLDivElement) => void
): void {
    // Check if the element has children
    if (element.children.length > 0) {
        // Loop through each child node
        for (let index = 0; index < element.children.length; index++) {
            const child = element.children[index] as HTMLDivElement
            // Apply the callback function to each child
            callback(child);
        }
    }
}
