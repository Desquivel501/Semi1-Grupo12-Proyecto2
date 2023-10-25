
import { 
    Grid,
    Box,
} from '@mui/material';

import Comments from '../../components/Comments/Comments';

import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../../auth/auth';

import PostPreview from '../../components/PostPreview/PostPreview';
import { getData } from '../../api/api';

function Post() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)

    const [post, setPost] = useState({
        pib_id: 0,
        name: "",
        lastname: "",
        avatar: "",
        date: "",
        description: "",
        image: "",
        Tags: [],
        email: "",
    })

    const { id } = useParams();

    useEffect(() => {
        const start = async () => {
            try {
                const user = await getCurrentUser()
                if (user === null) {
                    navigate('/')
                }

                const endpoint = `/posts/?id=${id}`

                const res = await getData({endpoint})
                console.log(res)

                if(Array.isArray(res)){
                    setPost(res[0])
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
                    sx={{ width: "80%"}}
                    alignItems="top"
                    justifyContent="center"
                >

                    <PostPreview 
                        avatar={post.avatar}
                        name={post.name + " " + post.lastname}
                        text={post.description}
                        picture={post.image}
                        labels={post.Tags}
                        date={post.date}
                        id={post.pib_id}
                        translate={true}
                    />

                    <Comments id={id}/>
                
                </Grid>

            </Box>
        </>
    )
}

export default Post 