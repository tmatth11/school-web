/*
    Name:
    Tony Matthews

    Course:
    CMP SCI 4010-001

    Date:
    10/16/24

    Description:
    This file contains the StudentTable component which displays a table of students fetched from the school api.
    It allows for user's to search, add, edit, and delete students from the table.
*/

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/studentAPI";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import SearchBox from "./SearchBox";
import "./StudentTable.css";

function StudentTable() {
    // State variables
    const [students, setStudents] = useState([]); // Array of student objects
    const [filteredStudents, setFilteredStudents] = useState([]); // Array of filtered student objects

    // Fetch students from the API
    const fetchStudents = async () => {
        const response = await axios.get(`${API_URL}`); // Returns Promise

        console.log(response.data); // Log the response data
        setStudents(response.data); // Set the students state variable
        setFilteredStudents(response.data); // Set the filteredStudents state variable
    };

    // Delete a student from the API
    const deleteStudent = async (studentId) => {
        await axios.delete(`${API_URL}/${studentId}`); // Returns Promise to delete student from API
        fetchStudents(); // Fetch students again to update the table
    };

    useEffect(() => {
        fetchStudents(); // Fetch students when the component mounts
    }, []);

    // Update the filtered students when the students state variable changes (FORGOT TO DO IN HW4)
    useEffect(() => {
        setFilteredStudents(students);
    }, [students]);

    // Event handlers

    // Handle the delete button click
    const handleClickDelete = (studentId) => {
        deleteStudent(studentId); // Delete the student from the API
    };

    // Handle the search box input
    const handleSearch = (searchTerm) => {
        const lowercasedTerm = searchTerm.toLowerCase(); // Convert the search term to lowercase

        // Filter the students based on the search term
        const filtered = students.filter(student =>
            student.studentId.toString().includes(lowercasedTerm) ||
            student.name.toLowerCase().includes(lowercasedTerm) ||
            student.major.toLowerCase().includes(lowercasedTerm)
        );

        // Set the filtered students state variable
        setFilteredStudents(filtered);
    };

    // Table columns
    const columns = [
        // Student ID column
        { field: 'studentId', headerName: 'Student ID', width: 120, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
        // Name column
        { field: 'name', headerName: 'Name', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
        // Major column
        { field: 'major', headerName: 'Major', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
        // Year column
        { field: 'year', headerName: 'Year', width: 80, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
        // Edit column
        {
            field: 'edit',
            headerName: '',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
                <EditStudent studentData={params.row} setStudents={setStudents} />
        },
        // Delete column
        {
            field: 'delete',
            headerName: '',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Tooltip title="Delete Student">
                    <IconButton
                        data-testid={`delete-button-row-${params.row.studentId}`}
                        aria-label="delete"
                        size="small"
                        onClick={() => handleClickDelete(params.row.studentId)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    return (
        // Student table container
        <div className="bg-container">
            <div className="tbl-container">
                {/* Search box */}
                <SearchBox onSearch={handleSearch} />
                <div className="btn-container">
                    {/* Add student button */}
                    <AddStudent setStudents={setStudents} />
                </div>
                {/* DataGrid component with student details */}
                <DataGrid data-testid="student-table"
                    rows={filteredStudents}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.studentId}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'hot' : 'cold'
                    }
                    sx={{
                        boxShadow: 2,
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .cold': {
                            backgroundColor: '#e7f0f7',
                            color: 'black',
                        },
                        '& .hot': {
                            backgroundColor: '#ccdfef',
                            color: 'black',
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default StudentTable;