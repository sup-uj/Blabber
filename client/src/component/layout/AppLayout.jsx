import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../specific/ChatList'
import { samepleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'

const AppLayout = () => WrappedComponent => {
    return (props) => {

        const params = useParams();
        const chatId = params.chatId;

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("Delete Chat",_id,groupChat);
        };

        return (
            <>
                <Title />
                <Header />
                <Grid container height={"calc(100vh)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                        height={"100%"}
                    >
                        <ChatList chats={samepleChats} chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                        />
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
                        <Profile/>
                    </Grid>
                </Grid>

            </>
        )
    }
}

export default AppLayout
