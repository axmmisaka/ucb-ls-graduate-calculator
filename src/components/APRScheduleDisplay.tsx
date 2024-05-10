import { useEffect, useState } from "react"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import CircularProgress from "@mui/material/CircularProgress"

import { allRequirements } from "../solver/datamodel"
import { CourseDatamodel } from "./CoursesContainer"

export const APRScheduleDisplay = ({ aprSchedules, loading }: { aprSchedules: CourseDatamodel[][]; loading: boolean }): JSX.Element => {
    const [scheduleIndex, setScheduleIndex] = useState<number>(0)

    useEffect(() => {
        setScheduleIndex(0)
    }, [aprSchedules])

    if (loading) {
        return <CircularProgress />
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Course Name{" "}
                            <ButtonGroup>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        setScheduleIndex((idx) => (idx === 0 ? aprSchedules.length - 1 : idx - 1))
                                    }}
                                >
                                    {"<"}
                                </Button>
                                <Button size="small" disabled>
                                    {scheduleIndex}/{aprSchedules.length}
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        setScheduleIndex((idx) => (idx === aprSchedules.length - 1 ? 0 : idx + 1))
                                    }}
                                >
                                    {">"}
                                </Button>
                            </ButtonGroup>
                        </TableCell>
                        {allRequirements.map((v) => (
                            <TableCell key={v} align="center">
                                {v}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {aprSchedules.length !== 0 ? (
                        aprSchedules[scheduleIndex].map((v) => (
                            <TableRow key={v.uuid}>
                                <TableCell component="th" scope="row">
                                    {v.name}
                                </TableCell>
                                {allRequirements.map((r) => (
                                    <TableCell key={r} align="center" sx={v.requirement === r ? { bgcolor: "green" } : {}}>
                                        {v.satisfies.has(r) ? r : ""}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8}>No viable graduation plan found. Either these courses cannot meet graduation requirement, or there's a bug in the calculator. If you are absolutely certain that there's a bug, please file a detailed issue on GitHub, or fix the bug by forking it.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
