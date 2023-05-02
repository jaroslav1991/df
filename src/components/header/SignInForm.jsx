import React, {useRef, useState} from 'react';
const apiUrlSignIn = "http://127.0.0.1:8080/api/sign-in"

function SignIn({onClose}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()

        return fetchSignIn(apiUrlSignIn, onClose)
    };

    const fetchSignIn = (apiUrl, onClose) => {
        const data = {
            email: emailRef.current.value,
            hash_password: passwordRef.current.value
        }
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => {
                response.json().then(r => {
                    if (response.status === 200) {
                        document.cookie = `token=${r.token}`;
                        onClose(r.token);
                    } else {
                        setError(r.error);
                        console.log(r)
                    }
                });
            })
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