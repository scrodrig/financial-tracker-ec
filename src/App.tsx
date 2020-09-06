import ApplicationRoutes from './config/ApplicationRoutes';
import { AuthProvider } from './AuthProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="w-max h-screen">
                        <ApplicationRoutes />
                    </div>
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
