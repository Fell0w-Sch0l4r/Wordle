import {expect, it} from "vitest"
import { wordsArray, getRandomArrayString, getRandomWord} from "../src/ts/main";




it("return a random string from an string array", () => {
    const array1: string[] = ["1,2,3,4,5,6,7,8,9,0,", "ujnunun", "jijihhui", "udiddhuh"]
    const randomString: string  = getRandomArrayString(array1)

    expect(array1).toContain(randomString)
})


it("return a random word", () => {
    const randomWord: string = getRandomWord();

    expect(wordsArray).toContain(randomWord);
});