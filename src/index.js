import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import { CssBaseline } from '@material-ui/core';
import './assets/css/index.css';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Application />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
