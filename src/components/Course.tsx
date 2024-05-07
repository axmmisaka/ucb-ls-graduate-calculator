import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import DeleteIcon from "@mui/icons-material/Delete"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField/TextField"
import FormGroup from "@mui/material/FormGroup/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel"
import IconButton from "@mui/material/IconButton/IconButton"
import Checkbox from "@mui/material/Checkbox/Checkbox"
import FormControl from "@mui/material/FormControl/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select/Select"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import InputLabel from "@mui/material/InputLabel"

import { CourseDatamodel, CourseMutationOperationType } from "./CoursesContainer"
import { ChangeEvent } from "react"
import { RequirementType, allRequirements, requirementToName } from "../solver/datamodel"

const RequirementSatisfySelector = ({ courseData, setCourse }: { courseData: CourseDatamodel; setCourse: (op: CourseMutationOperationType) => void }) => (
    <FormGroup row>
        {allRequirements.map((v) => (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={courseData.satisfies.has(v)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCourse({
                                field: "satisfies",
                                requirement: v,
                                op: event.target.checked ? "add" : "remove",
                            })
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                }
                key={v}
                label={requirementToName(v)}
                labelPlacement="top"
            />
        ))}
    </FormGroup>
)

export const Course = ({ courseData, setCourse, removeCourse }: { courseData: CourseDatamodel; setCourse: (op: CourseMutationOperationType) => void; removeCourse: () => void }): JSX.Element => {
    return (
        <Card variant="outlined">
            <Box sx={{ padding: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <TextField
                        id="outlined-controlled-coursename-textbox"
                        label="Course Name"
                        value={courseData.name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setCourse({ field: "name", name: event.target.value })
                        }}
                    />
                    <Typography gutterBottom component="div">
                        Course UUID: {courseData.uuid}
                    </Typography>
                    <IconButton onClick={removeCourse} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ padding: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <RequirementSatisfySelector courseData={courseData} setCourse={setCourse} />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="course-requirement-select-label">Fix Requirement</InputLabel>
                        <Select
                            labelId="course-requirement-select-label"
                            id="course-requirement-select"
                            value={courseData.requirement ?? ""} // convert null to undefined to make MUI happy
                            renderValue={(val) => (val === "" ? val : requirementToName(val))}
                            label="Fix Requirement"
                            onChange={(event: SelectChangeEvent<RequirementType | "">) => {
                                // This is not needed for code logic itself, but we need this to make tsc happy...
                                const requirementTypeGuard = (
                                    // Disabled otherwise need to exclude "H"/"SS" type
                                    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
                                    v: string | RequirementType
                                ): v is RequirementType => {
                                    return allRequirements.find((req) => req === v) != undefined
                                }
                                setCourse({
                                    field: "requirement",
                                    requirement: requirementTypeGuard(event.target.value) ? event.target.value : null,
                                })
                            }}
                        >
                            <MenuItem value="">
                                <em>Any</em>
                            </MenuItem>
                            {allRequirements
                                .filter((v) => courseData.satisfies.has(v))
                                .map((v) => (
                                    <MenuItem key={v} value={v}>
                                        {requirementToName(v)}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Box>
        </Card>
    )
}
