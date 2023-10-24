import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import conversation from "../../assets/conversation";

import Message from "../Message/Message";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function ChatContainer({ actualUser, friend, conversation, onSubmit }) {
  const conversation_reverse = [...conversation].reverse()
  const [text,setText] = useState("")
  const handleSubmit = () => {
    const send = text
    onSubmit(send)
    setText("")
  };
  return (
    <Grid
      xs={7}
      sx={{
        width: "100%",
        height: "100%",
        mt: 2,
        pb: 3,
        borderRadius: 3,
        px: 3,
        mx: 1,
        backgroundColor: "#38393a",
      }}
      component={Paper}
    >
      <Grid
        xs={12}
        flexGrow={0}
      >
        {friend != null &&
          (
            <Grid
              container
              direction="row"
              justifyContent="left"
              alignItems="center"
              sx={{
                border: 0,
                my: 2,
                backgroundColor: "#737475",
                borderRadius: 3,
                py: 1,
                pl: 1,
              }}
            >
              <Grid
                item
                display="flex"
                xs={2}
                sx={{ border: 0 }}
                justifyContent="center"
              >
                <Box
                  component="img"
                  sx={{
                    maxWidth: "70%",
                    borderRadius: "50%",
                  }}
                  alt="friend"
                  src={friend.image}
                />
              </Grid>

              <Grid item xs={7} sx={{ border: 0, pl: 1 }}>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "left", color: "#ffffff" }}
                >
                  {friend.name + " " + friend.family_name}
                </Typography>
              </Grid>
            </Grid>
          )}
      </Grid>

      <Grid
        xs={12}
        overflow={"auto"}
        sx={{ height: window.innerWidth < 1500 ? "57%" : "70%", px: 1 }}
        display={"flex"}
        flexDirection={"column-reverse"}
      >
        {conversation_reverse.map((message, i) => (
          <Message
            key={i}
            foto={message.Picture}
            message={message.content}
            date={message.message_date}
            left={message.sender != actualUser.email}
          />
        ))}
      </Grid>

      <Grid
        xs={12}
        sx={{
          my: 2,
          border: 1,
          px: 1,
          py: 2,
          borderRadius: 3,
          backgroundColor: "#737475",
        }}
      >
        <Grid
          container
        >
          <Grid item xs={11} sx={{ border: 0 }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              sx={{ borderRadius: 2, backgroundColor: "#909192" }}
              placeholder="What's on your mind?"
              onChange={(e)=>setText(e.target.value)}
              value={text}
            />
          </Grid>

          <Grid item xs={1} sx={{ border: 0 }} 
            onClick={handleSubmit}
          >
            <Tooltip title="Enviar">
              <IconButton sx={{ color: "white", display: "block" }}>
                <SendIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChatContainer;
