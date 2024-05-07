import { Container } from "@mui/material"
import "./App.css"
import { CoursesContainer } from "./components/CoursesContainer"

function App() {
    return (
        <>
            <Container maxWidth="md">
                <CoursesContainer />
            </Container>
        </>
    )
}

export default App
