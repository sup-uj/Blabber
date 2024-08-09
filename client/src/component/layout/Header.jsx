import React, { Suspense, lazy } from 'react'
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography , Backdrop} from '@mui/material'
import { orange } from '../../constants/color'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SearchDialog=lazy(()=>import("../specific/Search"));
const NotificationDialog=lazy(()=>import("../specific/Notifications"));
const NewGroupDialog=lazy(()=>import("../specific/NewGroup"));


const Header = () => {

    const navigate= useNavigate();

    const [isMobile, setIsMobile]=useState(false);
    const [isSearch, setisSearch]=useState(false);
    const [isNewGroup, setIsNewGroup]=useState(false);
    const [isNotification, setisNotification]=useState(false);


    const handleMobile = () => {
        setIsMobile((prev)=>!prev);
    }
    const openSearch = () => {
        setisSearch((prev)=>!prev);
    }
    const openNewGroup = () => {
        setIsNewGroup((prev)=>!prev);
    }

    const openNotification=()=>{
        setisNotification((prev=>!prev));
    }
    const navigateToGroup=()=>navigate("/group");

    const logoutHandler=()=>{
        console.log("logoutHandler");
    }

    return <>
        <Box sx={{ flexGrow: 1 }} height={"4rem"}>
            <AppBar position='"static' sx={{
                bgcolor: orange,
            }}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}>
                        BLABBER
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        <IconButton color='inherit' onClick={handleMobile}>
                            <MenuIcon />
                        </IconButton>

                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                    }}
                    ></Box>
                    <Box>
                        <IconBtn title={"Search"} icon={<SearchIcon/>} onClick={openSearch}/>
                        <IconBtn title={"New Group"} icon={<AddIcon/> } onClick={openNewGroup}/>
                        <IconBtn title={"Manage Group"} icon={<GroupIcon /> } onClick={navigateToGroup}/>
                        <IconBtn title={"Notification"} icon={<NotificationsIcon /> } onClick={openNotification}/>

                        <IconBtn title={"Logout"} icon={<LogoutIcon /> } onClick={logoutHandler}/>
                    

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>

    {
        isSearch&&
        (
            <Suspense fallback={<Backdrop open/>}>
                <SearchDialog/>
            </Suspense>
        )
        
    }
    {
        isNotification&&
        (
            <Suspense fallback={<Backdrop open/>}>
                <NotificationDialog/>
            </Suspense>
        )
        
    }
    {
        isNewGroup&&
        (
            <Suspense fallback={<Backdrop open/>}>
                <NewGroupDialog/>
            </Suspense>
        )
        
    }
    </>
}


const  IconBtn=({title,icon,onClick})=>{
    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}
export default Header
