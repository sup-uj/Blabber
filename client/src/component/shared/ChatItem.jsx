import React from 'react'
import { Link } from '../StyledComponents'
import { Stack, Typography, Box } from '@mui/material'
import { memo } from 'react'

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {

    return (
        <Link
            sx={{
                padding: "0",
            }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: sameSender ? "black" : "unset",
                    color: sameSender ? "white" : "unset",
                    position: "relative"
                }}
            >
                <Stack>
                    <Typography>{name}</Typography>
                    {newMessageAlert &&newMessageAlert.count > 0 && 
                        (<Typography>{newMessageAlert.count} New Message</Typography>)
                    }
                </Stack>

                {isOnline && (
                    <Box
                        sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            transform: "1rem",
                            transform: "translateY(-50%)",
                        }}
                    />
                )

                }
            </div>
        </Link>
    )
}

export default memo(ChatItem);
