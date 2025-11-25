import { Skeleton } from '@mui/material'
import React from 'react'

function PageSkeleton() {
    return (
        <Skeleton
            variant="rectangular"
            height={300}
            animation="pulse"
            sx={{
                bgcolor: '#b182e333', // بنفش کم‌رنگ
                borderRadius: 2,
            }}
        />
    )
}

export default PageSkeleton
