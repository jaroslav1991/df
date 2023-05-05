import React, {useRef, useState} from 'react';
import {fetchSignIn} from "../../../shared/api/auth";

function SignIn({onClose, setToken}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
          email: emailRef.current.value,
          hash_password: passwordRef.current.value
        }
        const response = await fetchSignIn(data)
        if (response.status === 'success') {
            const { token } = response.data
            document.cookie = `token=${token}`;
            localStorage.setItem("token", token);
            setToken(token)
            onClose()
        } else {
            setError(response.data.error)
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <div>Confirm your account</div>
            <input
                type="text"
                ref={emailRef}
                placeholder="Email"
            />
            <input
                type="text"
                ref={passwordRef}
                placeholder="Password"
            />
            <button type="submit">Sign in</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default SignIn;
