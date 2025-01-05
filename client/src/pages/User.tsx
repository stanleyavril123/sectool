import './User.css'
import { useState, useRef } from 'react';

function isAuthenticated() {
    const authToken = localStorage.getItem("Auth");
    console.log(authToken);

    return authToken;
}

function storeToken(token : string) {
    if (!token) {
        return
    }
    localStorage.setItem("Auth", token);
}


function User() {
    const formRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // ! to indicate that the value cannot be null when used for FormData object
        const form = new FormData(formRef.current!);
        
        let object: { [key: string]: any } = {};
        form.forEach((value, key) => object[key] = value);

        fetch("http://localhost:5020/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object),
          })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Unauthorized")
                }
                return res.json();
            })
            .then((data) => {
                setSubmitStatus('success');
                storeToken(data.token);
                setLoggedIn(true);
            })
            .catch((error) => {
                console.error("Error:", error);
                setSubmitStatus('error')
            });
        };

    if (!loggedIn && !isAuthenticated()) {
        return ( <div id="login"> 
        <form ref={formRef} onSubmit={handleSubmit}>
            <label>Username:</label>
            <input id="username" name="username"></input>
            <label>Password:</label>
            <input type="password" id="pwd" name="password"></input>
            <button type='submit'>Submit</button>
        </form>

        {submitStatus === 'error' && (
            <p className="submit-error" data-submit="error">
            An error occurred. Please try again.
            </p>
        )} 

        {submitStatus === 'success' && (
            <p className="submit-success" data-submit="success">
            YAY
            </p>
        )} 
        </div>
)}
    else {
        return <div id="login">
        <p>Hello user</p>
    </div>
    }
}

export default User