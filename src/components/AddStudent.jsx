/*
    Name:
    Tony Matthews

    Course:
    CMP SCI 4010-001

    Date:
    11/12/24

    Description:
    This file contains the AddStudent component which allows users to add a student to the table.
*/

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from "../api/studentAPI";
import AddStudentDialogContent from './AddStudentDialogContent';

function AddStudent({ setStudents, getAxiosConfig }) {

    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        studentId: '',
        name: '',
        major: '',
        year: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    }

    // Modified to handle JWT token
    const fetchStudents = async () => {
        const response = await axios.get(`${API_URL}`, getAxiosConfig()); // returns Promise

        console.log(response.data);
        setStudents(response.data);
    };

    // Also modified to handle JWT token
    const addStudent = async (student) => {
        await axios.post(`${API_URL}`, student, getAxiosConfig());
        fetchStudents();
    };

    const handleSave = () => {
        addStudent(student);
        setStudent({ studentId: '', name: '', major: '', year: 0 });
        handleClose();
    }

    return (
        <>
            <Button data-testid="add-student-button"
                sx={{ textTransform: 'none' }}
                style={{ backgroundColor: '#156082', color: 'white' }}
                onClick={handleClickOpen}>
                Add Student
            </Button>
            <Dialog data-testid="add-student-dialog" open={open} onClose={handleClose}>
                <DialogTitle>New Student</DialogTitle>
                <AddStudentDialogContent student={student} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button data-testid="add-student-save" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddStudent;