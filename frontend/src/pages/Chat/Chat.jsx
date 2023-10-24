import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../auth/auth";

import UserChatList from "../../components/UserChatList/UserChatList";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { getData } from "../../api/api";
import { io } from "socket.io-client";
import { useRef } from "react";

function Chat() {
  const socket = useRef(null);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState(null);
  const [conversation, setConversation] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const start = async () => {
      try {
        const user = await getCurrentUser();
        if (user === null) {
          navigate("/");
        }
        setUser(user);

        const data = await getData({ endpoint: "/friends/" + user.email });
        setFriends(data);
        if (socket.current == null) {
          socket.current = io("localhost:3000/chat");
          socket.current.on("change room", (messages) => {
            // console.log(messages);
            setConversation(messages);
          });
          socket.current.on("message", (sender, content, friendship) => {
            // console.log(sender, content, friendship);
            const date = new Date();
            setConversation((
              prev,
            ) => [...prev, {
              sender,
              content,
              message_date: date.toUTCString(),
            }]);
          });
        }
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    start();
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("change room", friend.id_friendship);
    }
  }, [friend]);

  const handleRoom = (friend) => {
    setFriend(friend);
  };
  const handleSubmit = (text) => {
    socket.current.emit("message", user.email, text, friend.id_friendship);
  };
  return (
    <>
      <Box
        component="main"
        display="flex"
        width="100%"
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
          <UserChatList friends={friends} selectFriend={handleRoom} />

          <ChatContainer
            actualUser={user}
            friend={friend}
            conversation={conversation}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Box>
    </>
  );
}

export default Chat;
