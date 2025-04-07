import {useState} from "react";
import {Meeting, PersonWithStatus} from "../model/Meeting.ts";
import {Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, List, ListItem, ListItemText} from "@mui/material";
import {Person} from "../model/Person.ts";

interface MeetingDetailComponentProps {
    meeting: Meeting;
    persons: Person[];
    updateMeeting: (updatedMeeting: Meeting) => void;
}

function MeetingDetailComponent({meeting, persons, updateMeeting}: MeetingDetailComponentProps) {
    const [open, setOpen] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);

    function participantsIds(){
        return meeting.participants.map((participant) => participant.person.id);
    }

    function missingParticipants(){
        return persons.filter((person) => !participantsIds().includes(person.id));
    }

    const handleInviteClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (person: Person) => {
        const currentIndex = selectedPersons.indexOf(person);
        const newSelectedPersons = [...selectedPersons];

        if (currentIndex === -1) {
            newSelectedPersons.push(person);
        } else {
            newSelectedPersons.splice(currentIndex, 1);
        }

        setSelectedPersons(newSelectedPersons);
    };

    const handleInvite = () => {
        const updatedParticipants = [
            ...meeting.participants,
            ...selectedPersons.map(person => ({ person, status: 'invited' }  satisfies PersonWithStatus))
        ]
        const updatedMeeting = { ...meeting, participants: updatedParticipants }
        updateMeeting(updatedMeeting);
        setOpen(false);
    };

    return (
        <Box>
            <TextField label="name" value={meeting.name} disabled />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meeting.participants.map((participant) => (
                            <TableRow key={participant.person.id}>
                                <TableCell>{participant.person.id}</TableCell>
                                <TableCell>{participant.person.name}</TableCell>
                                <TableCell>{participant.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleInviteClick}>
                Invite Missing Participants
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Invite Missing Participants</DialogTitle>
                <DialogContent>
                    <List>
                        {missingParticipants().map((person) => (
                            <ListItem key={person.id}  onClick={() => handleToggle(person)}>
                                <Checkbox checked={selectedPersons.indexOf(person) !== -1} />
                                <ListItemText primary={person.name} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleInvite} color="primary">
                        Invite
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default MeetingDetailComponent;