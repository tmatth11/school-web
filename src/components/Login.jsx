/*
    Name:
    Tony Matthews

    Course:
    CMP SCI 4010-001

    Date:
    11/11/24

    Description:
    This file contains the Login component which allows users to login to the application.
*/

// React and Material UI imports
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
// Student Table import
import StudentTable from './StudentTable';

const Login = () => {
    // State variables
    const [user, setUser] = useState({ // User state variable
        username: '',
        password: ''
    }); 
    const [isAuthenticated, setAuth] = useState(false); // Keep track of user authentication
    const [open, setOpen] = useState(false); // Snackbar open state variable

    // Handle input change
    const handleChange = (event) => {
        // Update the user state variable
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    // Handle login and JWT token
    const handleLogin = () => {
        // Send a POST request to the /login endpoint with the user object
        axios.post('http://localhost:8080/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const jwtToken = res.headers.authorization; // Get the JWT token from the response headers
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken.replace('Bearer ', '')); // Store the JWT token in session storage
                console.log(sessionStorage.getItem("jwt"));
                setAuth(true); // Set the authentication state variable to true
            }
        })
        .catch(() => setOpen(true)); // Display a snackbar if the login fails
    };

    // Handle logout functionality
    const handleLogout = () => {
        setAuth(false); // Set the authentication state variable to false
        sessionStorage.setItem("jwt", ""); // Clear the JWT token from session storage
    }

    if (isAuthenticated) {
        return <StudentTable logOut={handleLogout} />; // Render the StudentTable component if the user is authenticated
    }

    // Render the login form if the user is not authenticated
    else {
        return (
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange} />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin}>
                    Login
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </Stack>
        );
    }
}

export default Login