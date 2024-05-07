import { ls100, ls123, ls134, ls138, ls145, ls160, ls190_1, ls190_4 } from "../data/courses"

import { describe, expect, test } from "@jest/globals"
import { dumbRecursiveSolverAllPlans } from "../solver/solver"

describe("Check solver result", () => {
    test("Check Nadeshiko's courses is graduation OK", () => {
        dumbRecursiveSolverAllPlans([
            { ...ls100, requirement: null },
            { ...ls123, requirement: null },
            { ...ls134, requirement: null },
            { ...ls138, requirement: null },
            { ...ls145, requirement: null },
            { ...ls160, requirement: null },
            { ...ls190_1, requirement: null },
            { ...ls190_4, requirement: null },
        ]).then((v): void => {
            expect(v.length).toBeGreaterThan(0)
        })
    })
})
