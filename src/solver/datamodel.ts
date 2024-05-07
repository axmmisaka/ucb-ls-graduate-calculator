export const core = ["H", "SS"] as const
export type CoreType = (typeof core)[number]

export const area = [1, 2, 3, 4, 5] as const
export type AreaType = (typeof area)[number]

export const allRequirements = [...core, ...area] as const
export type RequirementType = (typeof allRequirements)[number]

export const requirementToName = (requirement: RequirementType): string => {
    switch (requirement) {
        case "H":
            return "H"
        case "SS":
            return "SS"
        case 1:
            return "I"
        case 2:
            return "II"
        case 3:
            return "III"
        case 4:
            return "IV"
        case 5:
            return "V"
    }
    // Unreachable code here
}

export interface CourseIntf {
    name: string
    satisfies: Set<RequirementType>
}

export interface APRCourseIntf extends CourseIntf {
    name: string
    satisfies: Set<RequirementType>
    requirement: RequirementType | null
}

export type Solver = (courses: APRCourseIntf) => RequirementType[]

export const coursesListToRequirementToCountMap = (assignedCourses: APRCourseIntf[]): Map<RequirementType, number> => {
    const requirementToCountMap = new Map<RequirementType, number>()
    allRequirements.forEach((e) => requirementToCountMap.set(e, 0))

    assignedCourses
        .map((v) => v.requirement)
        .filter((r): r is RequirementType => r != null)
        .forEach((r) => requirementToCountMap.set(r, (requirementToCountMap.get(r) ?? 0) + 1))

    return requirementToCountMap
}

export const requirementToCountMapToAreaCounts = (requirementToCountMap: Map<RequirementType, number>): number[] => area.map((e) => requirementToCountMap.get(e) ?? 0).sort((a, b) => b - a)

// eslint-disable-next-line @typescript-eslint/require-await
export const calculateGraduationOk = async (requirementToCountMap: Map<RequirementType, number>, areaCounts: number[]): Promise<boolean> => {
    return (
        // At least 1 H and at least 1 SS, where H+SS must be geq 4
        // Area with most courses assigned more than 2, and the second/third more than 1
        (requirementToCountMap.get("H") ?? 0) >= 1 && (requirementToCountMap.get("SS") ?? 0) >= 1 && (requirementToCountMap.get("H") ?? 0) + (requirementToCountMap.get("SS") ?? 0) >= 4 && areaCounts.length >= 3 && areaCounts[0] >= 2 && areaCounts[1] >= 1 && areaCounts[2] >= 1
    )
}

export const graduationOk = async (assignedCourses: APRCourseIntf[]): Promise<boolean> => {
    const requirementToCountMap = coursesListToRequirementToCountMap(assignedCourses)
    const areaCounts = requirementToCountMapToAreaCounts(requirementToCountMap)
    return await calculateGraduationOk(requirementToCountMap, areaCounts)
}
