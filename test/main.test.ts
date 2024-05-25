import {expect, it} from "vitest"
import { addNum, subtract, wordsArray } from "../src/ts/main";

it("ads two numbers", () => {
    let num: number = addNum(12, 90)

    expect(num).toBe(102)
})



it("subtracts two numbers", () => {
    let num: number = subtract(12, 2)

    expect(num).toBe(10)
})