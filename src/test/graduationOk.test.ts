import { ls100, ls123, ls134, ls138, ls145, ls160, ls190_1, ls190_4 } from "../data/courses"

import { APRCourseIntf, graduationOk } from "../solver/datamodel"

import { describe, expect, test } from "@jest/globals"

export const ls190_1apr: APRCourseIntf = {
    ...ls190_1,
    requirement: 4,
}
export const ls160apr: APRCourseIntf = {
    ...ls160,
    requirement: "H",
}
export const ls145apr: APRCourseIntf = {
    ...ls145,
    requirement: "SS",
}
export const ls138apr: APRCourseIntf = {
    ...ls138,
    requirement: "SS",
}
export const ls100apr: APRCourseIntf = {
    ...ls100,
    requirement: "H",
}
export const ls123apr: APRCourseIntf = {
    ...ls123,
    requirement: 1,
}
export const ls134apr: APRCourseIntf = {
    ...ls134,
    requirement: 2,
}
export const ls190_4apr: APRCourseIntf = {
    ...ls190_4,
    requirement: 4,
}

describe("Check graduationOk is indeed OK", () => {
    test("Check Nadeshiko's courses is graduation OK", () => {
        expect(graduationOk([ls100apr, ls123apr, ls134apr, ls138apr, ls145apr, ls160apr, ls190_1apr, ls190_4apr])).resolves.toBeTruthy()
    })

    test("Check missing course is graduation not OK", () => {
        graduationOk([ls123apr, ls134apr, ls138apr, ls145apr, ls160apr, ls190_1apr, ls190_4apr]).then((v) => expect(v).toBeFalsy())
    })
})
