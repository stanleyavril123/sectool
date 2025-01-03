import './User.css'

function isAuthenticated() {
    localStorage.setItem("Auth", "1234");
    const authToken = localStorage.getItem("Auth");
    console.log(authToken);

    return authToken;
}


function User() {

    if (isAuthenticated()) {
        return <div id="login">
            <p>Username</p>
            <p>Password</p>
        </div>
    }
    else {
        return <div id="login">
        <p>GET OUTTTTT</p>
    </div>
    }
}

export default User