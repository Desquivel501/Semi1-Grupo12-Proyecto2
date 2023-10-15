import { 
    Grid,
    Box,
} from '@mui/material';


import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../auth/auth';

import ChatContainerBot from '../../components/ChatContainerBot/ChatContainerBot';

function ChatBot() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getCurrentUser = async () => {
        try {
            const user = await getSession()
            setUser(user)
            if (user === null) {
                navigate('/')
            }
        } catch (err) {
            // not logged in
            console.log(err)
            setUser(null)
            navigate('/')
        }
        }
        getCurrentUser()
    }, [])

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

                    <ChatContainerBot />
                
                </Grid>

            </Box>
        </>
    )
}

export default ChatBot