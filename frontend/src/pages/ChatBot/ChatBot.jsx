import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getCurrentUser, getSession } from "../../auth/auth";

import ChatContainerBot from "../../components/ChatContainerBot/ChatContainerBot";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { sendJsonData, sendFormData, postData } from "../../api/api";

function ChatBot() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);

  const [estadoPost, setEstadoPost] = useState({
    creando: false,
    subiendoImagen: false,
    subiendoDescripcion: false,
    subiendo: false,
    error: ""
  });


  const [estadoSolicitud, setEstadoSolicitud] = useState({
    creando: false,
    ingresandoCorreo: false,
    enviando: false,
    error: ""
  });

  const [post, setPost] = useState({
    img: null,
    text: "",
    email: "",
  });

  const [solicitud, setSolicitud] = useState({
    email: "",
    friend: "",
  });

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

  const handleUpload = (image) => {
    setPost({
      ...post,
      img: image.file,
    });

    const endpoint = "/chatBot/send";
    const data = {
      email: user.email,
      text: "imagen",
    };

    console.log(data)

    sendJsonData({ endpoint, data })
    .then((messages) => {

      if(messages.MESSAGE == "Error al enviar mensaje"){
        const prevConversation = [...conversation]
        const updatedConversation = prevConversation.concat({
            content: "Ha ocurrido un error al subir la imagen ⚠️",
            sender: user.email,
            message_date: new Date(),
        })
        setConversation(updatedConversation) 
        return
      }

      setEstadoPost({
        ... estadoPost,
        subiendoImagen: false,
        subiendoDescripcion: true,
        subiendo: false,
      })

      const prevConversation = [...conversation]
      const updatedConversation = prevConversation.concat([
        {
          ... messages[0],
          image: image.preview
        },
        messages[1]
      ])
      setConversation(updatedConversation) 
    });
  }

  const handleSubmit = async (text) => {
    const endpoint = "/chatBot/send";
    const data = {
      email: user.email,
      text,
    };

    sendJsonData({ endpoint, data })
      .then((messages) => {
        
        // console.log(messages)

        if(messages.MESSAGE == "Error al enviar mensaje"){
          const prevConversation = [...conversation]
          const updatedConversation = prevConversation.concat([
            {
              content: text,
              sender: user.email,
              message_date: new Date(),
            },
            {
              content: "Ha ocurrido un error al enviar mensaje ⚠️",
              sender: 'bot',
              message_date: new Date(),
            }
          ])
          setConversation(updatedConversation) 
          return
        }

        if(estadoPost.subiendoDescripcion){
          console.log("Descripcion: " + messages[0].content)
          setEstadoPost({
            ... estadoPost,
            subiendoImagen: false,
            subiendoDescripcion: false,
            subiendo: false,
          })
          setPost({
            ... post,
            text: messages[0].content,
          });
        }

        if(estadoSolicitud.ingresandoCorreo){
          console.log("Correo: " + messages[0].content)
          setEstadoSolicitud({
            ... estadoSolicitud,
            ingresandoCorreo: false,
            enviando: true,
          })
          setSolicitud({
            ... solicitud,
            friend: messages[0].content,
          });
        }

        var creando = false
        var enviando = false

        if(messages.length > 0){
          for(let i = 0; i < messages.length; i++){
            if(messages[i].content == "Okay, puedo ayudarte a crear un post."){
              setEstadoPost({
                ... estadoPost,
                creando: true,
                subiendoImagen: true,
                subiendoDescripcion: false,
                subiendo: false,
              })
            }
            if(messages[i].content == "Ingresa una descripcion para la imagen."){
              setEstadoPost({
                ... estadoPost,
                subiendoImagen: false,
                subiendoDescripcion: true,
                subiendo: false,
              })
            }

            if(messages[i].content == "De acuerdo, el post no sera creado"){
              setEstadoPost({
                creando: false,
                subiendoImagen: false,
                subiendoDescripcion: false,
                subiendo: false,
                error: ""
              })
            }

            if(messages[i].content == "Claro, te puedo ayudar a enviar una solicitud de amistad."){
              setEstadoSolicitud({
                ... estadoSolicitud,
                creando: true,
                ingresandoCorreo: true,
                enviando: false,
              })
            }

            if(messages[i].content == "Creando post..."){
              creando = true
            }

            if(messages[i].content == "Enviando la solicitud..."){
              enviando = true
            }
          }
        }


        if(creando){
          var dataPost = new FormData();
          dataPost.append('img', post.img);
          dataPost.append('text', post.text);
          dataPost.append('email', user.email);
  
          const endpointPost = '/posts/create';
  
          sendFormData({endpoint: endpointPost, data: dataPost})
          .then((res) => {
            console.log(res)

            var response = {}

            if(res.TYPE == 'SUCCESS'){
              response = {
                content: "Post creado con exito! ✅",
                sender: 'bot',
                message_date: new Date(),
              }
            } else {
              response = {
                content: "Ha ocurrido un error al crear el post ⚠️",
                sender: 'bot',
                message_date: new Date(),
              }
            }
            const prevConversation = [...conversation]
            const updatedConversation = prevConversation.concat(response)
            setConversation(updatedConversation) 
          })
        }

        if(enviando){
          const endpoint = '/friends/addFriend'

          const data = {
              email: user.email,
              friend: solicitud.friend
          }
  
  
          postData({endpoint, data}).then((res) => {

            console.log(res)

            var response = {}

            if(res.TYPE == 'SUCCESS'){
                response = {
                  content: "Se ha enviado la solicitud! ✅",
                  sender: 'bot',
                  message_date: new Date(),
                }
            } else {
              response = {
                content: "Ha ocurrido un error al enviar la solicitud ⚠️",
                sender: 'bot',
                message_date: new Date(),
              }
            }
            const prevConversation = [...conversation]
            const updatedConversation = prevConversation.concat(response)
            setConversation(updatedConversation) 
          })
        }
  

        const prevConversation = [...conversation]
        const updatedConversation = prevConversation.concat(messages)
        setConversation(updatedConversation) 
      })
      


  };
  
  return (
    <>
      <Box
        component="main"
        display="flex"
        width="80vw"
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
            onUpload={handleUpload}
            bot={true}
          />
        </Grid>
      </Box>
    </>
  );
}

export default ChatBot;
