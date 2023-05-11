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
        <form className="registration_form" onSubmit={handleSubmit}>
            <input
                className="input_fields"
                type="text"
                ref={emailRef}
                placeholder="Email"
            />
            <input
                className="input_fields"
                type="text"
                ref={passwordRef}
                placeholder="Password"
            />
            <button className="submit_btn" type="submit">Sign in</button>
            <div className="confirm">Confirm your account</div>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default SignIn;
