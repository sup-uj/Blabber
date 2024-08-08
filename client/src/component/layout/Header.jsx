import React from 'react'
import { AppBar,Box, Toolbar, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'

const Header = () => {
  return <>
    <Box sx={{flexGrow:1}} height={"4rem"}>
        <AppBar position='"static' sx={{
            bgcolor:orange,
        }}>
            <Toolbar>
                <Typography
                variant='h6'
                sx={{
                    dispaly:{xs:"none",sm:"block"},
                }}>
                    BLABBER
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
  </>
}

export default Header
