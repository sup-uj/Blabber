import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'

const AppLayout = () => WrappedComponent => {
    return (props) => {
        return (
            <>
                <Title />
                <Header />
                <Grid container height={"100vh"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                        height={"100%"}
                    >
                        First
                    </Grid>
                    <Grid item xs={12}
                        sm={8}
                        lg={6}
                        md={5}
                        height={"100%"} >
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item
                        xs={4}
                        md={4}
                        lg={3}
                        height={"100%"}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)",
                        }}>
                        Third
                    </Grid>
                    ejdnkjwnss
                </Grid>

            </>
        )
    }
}

export default AppLayout
