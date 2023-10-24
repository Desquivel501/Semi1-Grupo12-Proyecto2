
import { 
    Grid,
    Box,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession, getCurrentUser } from '../../auth/auth';

import UserChatList from '../../components/UserChatList/UserChatList';
import ChatContainer from '../../components/ChatContainer/ChatContainer';

function Chat() {

    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
        try {
            const user = await getCurrentUser()
            if (user === null) {
                navigate('/')
            }
            setUser(user)
        } catch (err) {
            console.log(err)
            navigate('/')
        }
        }
        checkUser()
    }, [])

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
                    borderColor: 'primary.main',
                    mt:'70px',
                }}
                justifyContent='center'
            >
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "100%"}}
                    alignItems="top"
                    justifyContent="center"
                >

                    <UserChatList />

                    <ChatContainer />
                
                </Grid>

            </Box>
        </>
    )
}

export default Chat