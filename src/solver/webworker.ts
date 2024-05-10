import { CourseDatamodel } from "../components/CoursesContainer"
import { dumbRecursiveSolverAllPlans } from "./solver"

self.onmessage = (event: MessageEvent<CourseDatamodel[]>) => {
    dumbRecursiveSolverAllPlans(event.data)
        .then((v) => {
            postMessage(v)
        })
        .catch((e: unknown) => {
            console.error(e)
        })
}
