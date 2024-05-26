import {describe, expect, it} from "vitest"
import { wordsArray, getRandomArrayString, getRandomWord, isLetter} from "../src/ts/main";




it("return a random string from an string array", () => {
    const array1: string[] = ["1,2,3,4,5,6,7,8,9,0,", "ujnunun", "jijihhui", "udiddhuh"]
    const randomString: string  = getRandomArrayString(array1)

    expect(array1).toContain(randomString)
})


it("return a random word", () => {
    const randomWord: string = getRandomWord();

    expect(wordsArray).toContain(randomWord);
});


describe("isLetter", () => {
    it("should return true for uppercase letters", () => {
        expect(isLetter("A")).toBeTruthy();
        expect(isLetter("Z")).toBeTruthy();
    });

    it("should return true for lowercase letters", () => {
        expect(isLetter("a")).toBeTruthy();
        expect(isLetter("z")).toBeTruthy();
    });

    it("should return false for numbers", () => {
        expect(isLetter("1")).toBeFalsy();
        expect(isLetter("9")).toBeFalsy();
    });

    it("should return false for special characters", () => {
        expect(isLetter("+")).toBeFalsy();
        expect(isLetter("-")).toBeFalsy();
    });

    it("should return false for whitespace", () => {
        expect(isLetter(" ")).toBeFalsy();
    });
});