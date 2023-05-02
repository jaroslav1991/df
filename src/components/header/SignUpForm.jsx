import React, {useRef, useState} from 'react';

const apiUrlSignUp = "http://127.0.0.1:8080/api/sign-up"

function SignUp({onClose}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        return fetchSignUp(apiUrlSignUp, onClose)
    };

    const fetchSignUp = (apiUrl, onClose) => {
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => {
                response.json().then(r => {
                    if (response.status === 200) {
                        console.log(r)
                        onClose();
                    } else {
                        setError(r.error)
                        console.log(r)
                    }
                });
            })
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