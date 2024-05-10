import CalculateIcon from "@mui/icons-material/Calculate"
import { APRCourseIntf, RequirementType } from "../solver/datamodel"
import { Course } from "./Course"
import { useEffect, useState } from "react"

import Divider from "@mui/material/Divider"
import Fab from "@mui/material/Fab"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"

import { dumbRecursiveSolverAllPlans } from "../solver/solver"
import { APRScheduleDisplay } from "./APRScheduleDisplay"
import { Contribute, Disclaimer, License } from "./License"
import { CAROL_COURSE_NAME, PreFilledCourseSelector } from "./PreFilledCourseSelector"
import { allCourses } from "../data/courses_bulk"
import { dummy } from "../data/courses"

export interface CourseDatamodel extends APRCourseIntf {
    uuid: string
    name: string
    satisfies: Set<RequirementType>
    requirement: RequirementType | null
}

export type CourseMutationOperationType =
    | {
          field: "name"
          name: string
      }
    | {
          field: "satisfies"
          requirement: RequirementType
          op: "add" | "remove"
      }
    | {
          field: "requirement"
          requirement: RequirementType | null
      }

const solveAPRRequirement = async (courses: CourseDatamodel[], setWip: React.Dispatch<React.SetStateAction<boolean>>, setSchedule: React.Dispatch<React.SetStateAction<CourseDatamodel[][]>>) => {
    setWip(true)
    const calculationResult = await dumbRecursiveSolverAllPlans([...courses])
    setSchedule(calculationResult.map((u) => u.map((v) => ({ ...v, uuid: crypto.randomUUID() })))) // Add a UUID to convert back to CourseDataModel
    setWip(false)
}

export const CoursesContainer = (): JSX.Element => {
    const [courses, setCourses] = useState<CourseDatamodel[]>([])
    const [aprSchedules, setAprSchedule] = useState<CourseDatamodel[][]>([])
    const [aprSchedulesLoading, setAprSchedulesLoading] = useState<boolean>(false)
    // Here we use string since we know there won't be collision
    const [selectedPreFilledCourseName, setSelectedPreFilledCourseName] = useState<string>("")

    const setCourseWithUUID = (uuid: string, op: CourseMutationOperationType): void => {
        setCourses((origArr) =>
            // If matching UUID, modify provided the given operation
            origArr.map((origCourse) =>
                origCourse.uuid === uuid
                    ? (() => {
                          switch (op.field) {
                              case "name":
                                  return { ...origCourse, name: op.name }
                              case "satisfies": {
                                  const s = new Set(origCourse.satisfies)
                                  switch (op.op) {
                                      case "add":
                                          s.add(op.requirement)
                                          break
                                      case "remove":
                                          s.delete(op.requirement)
                                          break
                                  }
                                  return { ...origCourse, satisfies: s }
                              }
                              case "requirement":
                                  return { ...origCourse, requirement: op.requirement }
                          }
                      })()
                    : // if not keep original
                      origCourse
            )
        )
    }

    const removeCourseWithUUID = (uuid: string) => {
        setCourses((origArr) => origArr.filter((c) => c.uuid !== uuid))
    }
    const addCourse = (course?: Partial<CourseDatamodel>): void => {
        const newCourse: CourseDatamodel = {
            uuid: crypto.randomUUID(),
            name: "LS ",
            satisfies: new Set(),
            requirement: null,
        }

        if (course?.name != null) {
            newCourse.name = course.name
        }

        if (course?.satisfies != null) {
            newCourse.satisfies = course.satisfies
        }

        if (course?.requirement != null) {
            newCourse.requirement = course.requirement
        }

        setCourses((origArr) => origArr.concat([newCourse]))
    }

    const addSelectedCourse = () => {
        selectedPreFilledCourseName === "" ? addCourse() : selectedPreFilledCourseName === CAROL_COURSE_NAME ? addCourse(dummy) : addCourse(allCourses.get(selectedPreFilledCourseName))
    }

    useEffect(() => {
        // construction only
        setCourses(() => {
            return [
                {
                    uuid: "ddf66d41-4f4e-4d62-8e54-6ddb2bf50f7a",
                    name: "LS 199",
                    satisfies: new Set(),
                    requirement: null,
                },
            ]
        })
    }, [])

    return (
        <Stack spacing={3}>
            <Disclaimer />
            <Stack spacing={2}>
                {courses.map((val) => (
                    <Course
                        key={val.uuid}
                        courseData={val}
                        setCourse={(op: CourseMutationOperationType) => {
                            setCourseWithUUID(val.uuid, op)
                        }}
                        removeCourse={() => {
                            removeCourseWithUUID(val.uuid)
                        }}
                    />
                ))}
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Fab
                        onClick={() => {
                            addSelectedCourse()
                        }}
                        variant="extended"
                    >
                        <AddIcon />
                        Add Course
                    </Fab>
                    <PreFilledCourseSelector selectedCourse={selectedPreFilledCourseName} setSelectedCourse={setSelectedPreFilledCourseName} />
                    <Typography>Debug info for developers: {selectedPreFilledCourseName === "" ? `<empty string>` : selectedPreFilledCourseName}</Typography>
                </Stack>
            </Stack>
            <Divider />
            <Typography>
                Debug info for developers: <br />
                {JSON.stringify(courses, (_key, value): unknown => (value instanceof Set ? [...value] : value))}
            </Typography>
            <Divider />
            <Fab
                onClick={() => {
                    void (async () => {
                        await solveAPRRequirement(courses, setAprSchedulesLoading, setAprSchedule)
                    })()
                }}
                variant="extended"
            >
                <CalculateIcon />
                Calculate APR
            </Fab>
            <APRScheduleDisplay aprSchedules={aprSchedules} loading={aprSchedulesLoading} />
            <Divider />
            <Contribute />
            <License />
        </Stack>
    )
}
