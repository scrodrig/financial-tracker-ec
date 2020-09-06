import React from 'react';
import { CircularProgress } from '@material-ui/core';

const LoadingBar = () => {
    return (
        <div className="Loading bar w-max h-screen">
            <div className="flex justify-center items-center h-full">
                <CircularProgress color="primary" />
            </div>
        </div>
    );
};

export default LoadingBar;
