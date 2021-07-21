import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import { CssBaseline } from '@material-ui/core';
import './assets/css/index.css';
import { SnackbarProvider } from 'notistack';
import config from './config/config';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={config.maxSnackbar}>
            <React.StrictMode>
                <Application />
            </React.StrictMode>
        </SnackbarProvider>
    </ThemeProvider>,
    document.getElementById('root')
);
