import React from 'react'
import { Grid, Skeleton } from '@mui/material'

export const LayoutLoader = () => {
    return 
        <Grid container height={"calc(100vh)"} spacing={'1rem'}>
            <Grid
                item
                sm={4}
                md={3}
                sx={{
                    display: { xs: "none", sm: "block" },
                }}
                height={"100%"}
            >
                <Skeleton variant="rectangular" height={'100vh'}/>
            </Grid>
            <Grid item xs={12}
                sm={8}
                lg={6}
                md={5}
                height={"100%"} >
                <Stack spacing={'1rem'}>
                    {Array.from({length:10}).map((_,index)=>(
                        <Skeleton key={index} variant='round' height={'5rem'}></Skeleton>
                    ))}
                </Stack>
            </Grid>
            <Grid item
                xs={4}
                md={4}
                lg={3}
                height={"100%"}
                sx={{
                    display: { xs: "none", md: "block" },
                    // padding: "2rem",
                    // bgcolor: "rgba(0,0,0,0.85)",
                }}>
                <Skeleton variant="rectangular" height={'100vh'} />
            </Grid>
        </Grid>
    
}
