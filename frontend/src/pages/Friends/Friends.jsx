import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession, getCurrentUser } from '../../auth/auth';
import UserList from '../../components/UserList/UserList';
import { Grid } from '@mui/material';

import { getData } from '../../api/api';

function Friends() {

    const navigate = useNavigate();

    const [friends, setFriends] = useState([])

    useEffect(() => {
        const checkUser = async () => {
        try {
            const user = await getCurrentUser()
            if (user === null) {
                navigate('/')
            }

            let endpoint = `/friends/${user.email}`
            let res = await getData({endpoint})
            if(res === null){
                res = []
            }
            setFriends(res)

        } catch (err) {
            // not logged in
            console.log(err)
            navigate('/')
        }
        }
        checkUser()
    }, [])
    
    return (
        <Grid
            display={'flex'}
            justifyContent={'center'}
        >
            <UserList users={friends} friends={true}/>
        </Grid>
        
    )
}

export default Friends