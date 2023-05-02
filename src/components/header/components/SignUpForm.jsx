import React, {useRef, useState} from 'react';
import {fetchSignUp} from "../../../shared/api/api";

function SignUp({onClose}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
          email: emailRef.current.value,
          password: passwordRef.current.value
        }
        const response = await fetchSignUp(data)
        if (response.status === 'success') {
          onClose()
        } else {
            setError(response.data.error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Sign up</button>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </form>
    );
}

export default SignUp;
