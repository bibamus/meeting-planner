import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {DateTimeField} from "@mui/x-date-pickers";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {Meeting} from "../model/Meeting.ts";
import dayjs from "dayjs";
import SearchIcon from '@mui/icons-material/Search';

interface MeetingOverviewComponentProps {
    meetings: Meeting[];
    setMeetings: (meetings: Meeting[]) => void;
    setSelectedMeeting: (meeting: Meeting) => void;
}

function MeetingOverviewComponent({meetings, setMeetings, setSelectedMeeting}: MeetingOverviewComponentProps) {

    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMeeting, setcurrentMeeting] = useState<Meeting>({id: "", name: "", date: dayjs(), participants: []});

    const handleClickOpen = () => {
        setOpen(true);
        setIsEditing(false);
        setcurrentMeeting({id: "", name: "", date: dayjs(), participants: []});
    };

    const handleEditOpen = (meeting: Meeting) => {
        setOpen(true);
        setIsEditing(true);
        setcurrentMeeting({
            id: meeting.id,
            name: meeting.name,
            date: meeting.date,
            participants: meeting.participants
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setcurrentMeeting({...currentMeeting, [e.target.name]: e.target.value});
    };

    const handleAddMeeting = () => {
        setMeetings([...meetings, {
            ...currentMeeting,
            id: currentMeeting.name + Math.floor(Math.random() * 1000)
        }]);
        setcurrentMeeting({id: "", name: "", date: dayjs(), participants: []});
        handleClose();
    };

    const handleEditMeeting = () => {
        if (currentMeeting !== null && currentMeeting.id !== null) {
            setMeetings(meetings.map(meeting => meeting.id === currentMeeting!.id ? {
                ...currentMeeting,
                date: currentMeeting.date,
            } : meeting));
        }
        setcurrentMeeting({id: "", name: "", date: dayjs(), participants: []});
        handleClose();
    };

    function handleDateChange(newValue: dayjs.Dayjs | null) {
        if (newValue) {
            setcurrentMeeting({...currentMeeting, date: newValue});
        }
    }

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Meeting
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? "Edit meeting" : "Add a new meeting"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentMeeting.name}
                        onChange={handleChange}
                    />
                    <DateTimeField name="date" value={currentMeeting.date} onChange={handleDateChange} label="Date"
                                   fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={isEditing ? handleEditMeeting : handleAddMeeting} color="primary">
                        {isEditing ? "Save" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer>
                <Table>
                    <TableHead sx={{borderBottom: '2px solid grey'}}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Participants</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meetings.map((meeting) => (
                            <TableRow key={meeting.id}>
                                <TableCell>{meeting.id}</TableCell>
                                <TableCell>{meeting.name}</TableCell>
                                <TableCell>{meeting.date.locale('de').format('L LT')}</TableCell>
                                <TableCell>
                                    {meeting.participants.filter(value => value.status === 'accepted').length}/{meeting.participants.length}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(meeting)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => setSelectedMeeting(meeting)}>
                                        <SearchIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default MeetingOverviewComponent