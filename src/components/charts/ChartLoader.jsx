import { CircularProgress } from '@mui/material';
import React from 'react'

function ChartLoader({ loading, children}) {
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
                <CircularProgress />
            </div>
        );
    }
    return children
}
export default ChartLoader
