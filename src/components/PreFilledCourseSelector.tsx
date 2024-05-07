import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select/Select"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import { allCourses } from "../data/courses"
import { Stack, Typography } from "@mui/material"

export const CAROL_COURSE_NAME = "carolchrist"

export const PreFilledCourseSelector = ({ selectedCourse, setSelectedCourse }: { selectedCourse: string; setSelectedCourse: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
    return (
        <>
            <Stack>
                <Typography align="left">Hint: "Carol's Watching You" is a fictional class that could fit ANY requirement, which could help you choose which class to look for?</Typography>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="course-requirement-select-label">Select Pre-Filled Course</InputLabel>
                    <Select
                        labelId="course-requirement-select-label"
                        id="course-requirement-select"
                        value={selectedCourse} // convert null to undefined to make MUI happy
                        label="Select Pre-Filled Course"
                        onChange={(event: SelectChangeEvent) => {
                            setSelectedCourse(event.target.value)
                        }}
                    >
                        <MenuItem value="">Empty</MenuItem>
                        <MenuItem value={CAROL_COURSE_NAME}>Carol's Watching You</MenuItem>
                        {[...allCourses].map(([k, v]) => (
                            <MenuItem key={k} value={k}>
                                {v.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </>
    )
}
