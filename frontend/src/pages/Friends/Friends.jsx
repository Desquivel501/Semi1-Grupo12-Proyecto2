import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession, getCurrentUser } from '../../auth/auth';
import UserList from '../../components/UserList/UserList';
import { Grid } from '@mui/material';

import { getData } from '../../api/api';

function Friends() {

    const navigate = useNavigate();

    const [notFriends, setNotFriends] = useState([])

    useEffect(() => {
        const checkUser = async () => {
        try {
            const user = await getCurrentUser()
            if (user === null) {
                navigate('/')
            }

            let endpoint = `/friends/not/${user.email}`
            let res = await getData({endpoint})
            console.log(res)
            setNotFriends(res)

            // endpoint = `/friends/not/${user.email}`
            // res = await getData({endpoint})
            // setNotFriends(res)

            

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
            <UserList users={notFriends}/>
            <UserList solicitudes={true}/>
        </Grid>
        
    )
}

export default Friends