/*
    Name:
    Tony Matthews

    Course:
    CMP SCI 4010-001

    Date:
    11/11/24

    Description:
    This file contains the App component which is the root component of the application.
*/

// Default imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StudentTable from './components/StudentTable';
// Material UI imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// Login component import
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a new QueryClient
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StudentTable /> */}

    {/* Copy layout from Chapter 16 notes */}
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            School-Web
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
