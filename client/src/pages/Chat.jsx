import React, {
  Fragment,
  useRef,
} from "react";
import AppLayout from '../component/layout/AppLayout'
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import { InputBox } from "../component/StyledComponents";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../component/shared/MessageComponent";
import FileMenu from "../component/dialogs/FileMenu";

const user={
  _id:"jdsnjknds",
  name:"Utkarsh Jaiswal"
}

const Chat = ({ chatId, user }) => {

  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {/* {userTyping && <TypingLoader />}

        <div ref={bottomRef} /> */}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        // onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.5rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            // onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            // value={message}
            // onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              // rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu  />
    </Fragment>
  );
};

export default AppLayout()(Chat);
