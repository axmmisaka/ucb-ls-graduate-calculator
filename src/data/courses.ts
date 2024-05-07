import { CourseIntf } from "../solver/datamodel"
export * from "./courses_bulk"

export const dummy: CourseIntf = {
    name: "LS 114514",
    satisfies: new Set([1, 2, 3, 4, 5, "H", "SS"]),
}

export const ls190_1: CourseIntf = {
    name: "LS 190.1",
    satisfies: new Set([4]),
}

export const ls190_4: CourseIntf = {
    name: "LS 190.4",
    satisfies: new Set([1, 4]),
}
