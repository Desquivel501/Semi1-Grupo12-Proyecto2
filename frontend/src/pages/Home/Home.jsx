
import { 
    Grid,
    Box,
} from '@mui/material';
import PostPreview from '../../components/PostPreview/PostPreview';
import CreatePost from '../../components/CreatePost/CreatePost';
import Filtros from '../../components/Filtros/Filtros';

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession, getCurrentUser } from '../../auth/auth';
import { getData } from '../../api/api';

function Home() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const start = async () => {
        try {
            const user = await getCurrentUser()
            if (user === null) {
                navigate('/')
            }

            const endpoint = `/posts/${user.email}`

            const res = await getData({endpoint})
            console.log(res)

            if(Array.isArray(res)){
                res.reverse()
                setPosts(res)
            }

        } catch (err) {
            // not logged in
            console.log(err)
            navigate('/')
        }
        }
        start()
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
                    

                    {
                        posts.map((post, i) => {
                            return <PostPreview 
                                        key={i} 
                                        avatar={post.avatar}
                                        name={post.name + " " + post.lastname}
                                        text={post.description}
                                        picture={post.image}
                                        labels={post.Tags}
                                        date={post.date}
                                    />
                        })
                    }
                
                </Grid>

                

            </Box>
        </>
    )
}

export default Home