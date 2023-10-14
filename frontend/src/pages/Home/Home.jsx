
import { 
    Grid,
    Box,
 } from '@mui/material';
 import PostPreview from '../../components/PostPreview/PostPreview';
 import CreatePost from '../../components/CreatePost/CreatePost';
 import Filtros from '../../components/Filtros/Filtros';

 import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../auth/auth';
 

function Home() {

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
                width="100%"
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
                    sx={{ width: "30%", mx: 1}}
                    alignItems="top"
                    justifyContent="center"
                >
                    <Filtros />
       
                </Grid>
                
                <Grid
                    container
                    spacing={3}
                    sx={{ width: "80%", mx: 1}}
                    alignItems="top"
                    justifyContent="center"
                >
                    <CreatePost key={0}/>
                    
                    <PostPreview key={1}/>

                    <PostPreview key={2}/>

                    <PostPreview key={3}/>
                
                </Grid>

                

            </Box>
        </>
    )
}

export default Home