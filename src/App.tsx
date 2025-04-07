import './App.css'
import {Box, Tab, Tabs} from "@mui/material";
import * as React from "react";
import {Person, testPersons} from "./model/Person.ts";
import PersonView from "./views/PersonView.tsx";
import MeetingView from "./views/MeetingView.tsx";
import {Meeting, testMeets} from "./model/Meeting.ts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';


function App() {




    type TabValue = "persons" | "meetings";

    const [tab, setTab] = React.useState<TabValue>("persons");

    const [persons, setPersons] = React.useState<Person[]>(testPersons)
    const [meets, setmeets] = React.useState<Meeting[]>(testMeets)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <Box sx={{width: '100%'}}>
                <Box>
                    <Tabs value={tab} onChange={(_, newValue: TabValue) => setTab(newValue)} centered>
                        <Tab label="Persons" value="persons"/>
                        <Tab label="Meetings" value="meetings"/>
                    </Tabs>
                </Box>
                {tab === "persons" && (
                    <PersonView persons={persons} setPersons={setPersons}/>
                )}
                {tab === "meetings" && (
                    <Box sx={{p: 3}}>
                        <MeetingView meetings={meets} setMeetings={setmeets} persons={persons}/>
                    </Box>
                )}
            </Box>
        </LocalizationProvider>
    )
}

export default App
