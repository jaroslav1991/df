import React, {useRef, useState} from 'react';
import {fetchSignUp} from "../../../shared/api/auth";
import "../styles/header.css"

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
            <button className="submit_btn" type="submit">Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default SignUp;
