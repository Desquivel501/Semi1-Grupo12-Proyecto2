
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSession } from '../../auth/auth';

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
        <h1>ChatBot</h1>
        </>
    )
}

export default ChatBot