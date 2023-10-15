
import { 
    Grid,
    Box,
} from '@mui/material';

import Comments from '../../components/Comments/Comments';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../auth/auth';

import PostPreview from '../../components/PostPreview/PostPreview';
import CreatePost from '../../components/CreatePost/CreatePost';

function Post() {

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
                    sx={{ width: "80%"}}
                    alignItems="top"
                    justifyContent="center"
                >

                    <PostPreview />

                    <Comments />
                
                </Grid>

            </Box>
        </>
    )
}

export default Post 