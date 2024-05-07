import { APRCourseIntf, graduationOk } from "./datamodel"

export const dumbRecursiveSolverAllPlans = async (courses: APRCourseIntf[]): Promise<APRCourseIntf[][]> => {
    const plans: APRCourseIntf[][] = []

    // It is crucial to maintain that determined, undetermined, and everything contained within is immutable!
    const recurse = async (determined: APRCourseIntf[], undetermined: APRCourseIntf[]): Promise<void> => {
        if (await graduationOk(determined)) {
            plans.push([...determined.map((v) => ({ ...v }))])
            return
        }

        if (undetermined.length === 0) return

        const c = undetermined[0]
        for (const r of c.satisfies.values()) {
            await recurse(
                determined.concat([{ ...c, requirement: r }]),
                undetermined.filter((v) => v !== c)
            )
        }
    }

    await recurse(
        courses.filter((v) => v.requirement != null),
        courses.filter((v) => v.requirement == null)
    )
    return plans
}
