/*
    Name:
    Tony Matthews

    Course:
    CMP SCI 4010-001

    Date:
    10/16/24

    Description:
    This file contains the SearchBox component which allows users to search for students in the StudentTable component.
    It can be used to filter the table based on studentId, name, or major.
*/

import {useState} from 'react';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

function SearchBox({onSearch}) {
    // State variable
    const [searchTerm, setSearchTerm] = useState(''); // Search term state variable

    // Handle the search box input
    const handleChange = (event) => {
        const value = event.target.value; // Get the value of the input
        setSearchTerm(value); // Set the search term state variable
        onSearch(value); // Call the onSearch prop function with the search term
    };

    return (
        // Search box input
        <div className="search-box">
            <TextField
                label="Search Table..."
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBox;