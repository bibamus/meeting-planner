import {useState} from "react";
import {Person} from "../model/Person.ts";
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

import EditIcon from '@mui/icons-material/Edit';

interface PersonViewProps {
    persons: Person[],
    setPersons: (persons: Person[]) => void
}

function PersonView({persons, setPersons}: PersonViewProps) {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
    const [newPerson, setNewPerson] = useState({id: "", name: ""});

    const handleClickOpen = () => {
        setOpen(true);
        setIsEditing(false);
        setNewPerson({id: "", name: ""});
    };

    const handleEditOpen = (person: Person) => {
        setOpen(true);
        setIsEditing(true);
        setCurrentPerson(person);
        setNewPerson({id: person.id, name: person.name});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPerson({...newPerson, [e.target.name]: e.target.value});
    };

    const handleAddPerson = () => {
        setPersons([...persons, {...newPerson, id: newPerson.name + Math.floor(Math.random() * 1000)}]);
        setNewPerson({id: "", name: ""});
        handleClose();
    };

    const handleEditPerson = () => {
        setPersons(persons.map(person => person.id === currentPerson!.id ? newPerson : person));
        setNewPerson({id: "", name: ""});
        handleClose();
    };

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Person
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? "Edit person" : "Add a new person"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newPerson.name}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={isEditing ? handleEditPerson : handleAddPerson} color="primary">
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
                            <TableCell>Last time invited</TableCell>
                            <TableCell>Last time participated</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.id}</TableCell>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(person)}>
                                        <EditIcon/>
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

export default PersonView;