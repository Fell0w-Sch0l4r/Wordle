import "../css/tailwind.css";

export const wordsArray: string[] = [
    "Apple",
    "Basic",
    "Blade",
    "Bread",
    "Cloud",
    "Dance",
    "Flute",
    "Grape",
    "Image",
    "Knife",
    "Lemon",
    "Mouse",
    "Nurse",
    "Ocean",
    "Paste",
    "Pizza",
    "Radio",
    "Ruler",
    "Sense",
    "Slice",
    "Space",
    "Stamp",
    "Taste",
    "Toast",
    "Voice",
    "Waste",
    "Watch",
    "Wheel",
    "Wife",
    "Wine",
    "Wrist",
    "Xavier",
    "Yellow",
    "Zebra",
    "Zesty",
    "Braid",
];



export function getRandomArrayString(array: string[]): string{
    let randomIndex: number = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}


export function getRandomWord(): string {
    return getRandomArrayString(wordsArray)
}