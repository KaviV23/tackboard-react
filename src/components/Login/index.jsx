import React from "react";

const Login = () => {
    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username"></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"></input>
            </div>
        </>
    )
}

export default Login;