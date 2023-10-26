import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getCurrentUser, getSession } from "../../auth/auth";

import ChatContainerBot from "../../components/ChatContainerBot/ChatContainerBot";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { sendJsonData } from "../../api/api";

function ChatBot() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const botInfo = {
    image:
      "https://t4.ftcdn.net/jpg/03/51/61/49/360_F_351614912_nhPej8tYdn8gytfBnBPag8HBUt2vaznE.jpg",
    name: "USAC",
    family_name: "Bot",
  };

  useEffect(() => {
    const start = async () => {
      try {
        const user = await getCurrentUser();
        if (user === null) {
          navigate("/");
        }
        setUser(user);
        console.log(user);
      } catch (err) {
        // not logged in
        console.log(err);
        setUser(null);
        navigate("/");
      }
    };
    start();
  }, []);
  const handleSubmit = (text) => {
    const endpoint = "/chatBot/send";
    const data = {
      email: user.email,
      text,
    };
    sendJsonData({ endpoint, data })
      .then((messages) => {
        const prevConversation = [...conversation]
        const updatedConversation = prevConversation.concat(messages)
        setConversation(updatedConversation) 
      });
  };
  return (
    <>
      <Box
        component="main"
        display="flex"
        width="45vw"
        height="80vh"
        sx={{
          flexGrow: 1,
          border: 0,
          borderColor: "primary.main",
          mt: "70px",
        }}
        justifyContent="center"
      >
        <Grid
          container
          spacing={3}
          sx={{ width: "100%" }}
          alignItems="top"
          justifyContent="center"
        >
          {/* <ChatContainerBot />*/}

          <ChatContainer
            actualUser={user}
            friend={botInfo}
            conversation={conversation}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Box>
    </>
  );
}

export default ChatBot;
