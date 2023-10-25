
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
    const [tags, setTags] = useState([])
    const [search, setSearch] = useState({
        keyword: "",
        categorias: []
    })

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

            const endpoint2 = `/posts/tags`
            const res2 = await getData({endpoint: endpoint2})
            
            if(Array.isArray(res2)){
                let tags = []
                res2.forEach((tag) => {
                    tags.push(tag.name)
                })
                setTags(tags)
            }

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

    const handleSearch = (values) => {
        setSearch(values);
    };

    const filterPosts = (posts) => {

        if(search.categorias.length == 0){
            return true
        }

        if(search.categorias.includes('All')){
            return true
        }

        for(var i = 0; i < search.categorias.length; i++){
            if(posts.Tags.includes(search.categorias[i])){
                return true
            }
        }
    }

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
                    <Filtros tags={tags} onChange={handleSearch}/>
       
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
                            return filterPosts(post) ? 
                                    <PostPreview 
                                        key={i} 
                                        avatar={post.avatar}
                                        name={post.name + " " + post.lastname}
                                        text={post.description}
                                        picture={post.image}
                                        labels={post.Tags}
                                        date={post.date}
                                        id={post.pub_id}
                                    />
                                    : null
                        })
                    }
                
                </Grid>

                

            </Box>
        </>
    )
}

export default Home