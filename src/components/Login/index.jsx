import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import { Container, Col, Form, Row, Button } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };

        fetch("http://localhost:8080/api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        }).then(response => {
            if (response.status == 200) {
                return Promise.all([response.json, response.headers]);
            } else {
                return Promise.reject("Invalid credentials");
            }}).then(([body, headers]) => {
                setJwt(headers.get("Authorization"));
                window.location.href = "todos";
            }).catch((message) => {
                alert(message);
            });
        };
    return (
        <Col className="" style={{height: "100vh", display:'flex', alignItems:"center"}}>
            <Container className="p-2" style={{maxWidth: "500px"}}>
                <h1 className="mb-5">Login</h1>
                <Form.Group>
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control id="username" value={username} placeholder="Enter your username..." onChange={(event) => setUsername(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" id="password" placeholder="Enter your password..." value={password} onChange={(event) => setPassword(event.target.value)}></Form.Control>
                </Form.Group>
                <Row className="mt-5">
                    <Col>
                        <Button className="w-100 btn-secondary" id="back" type="button" onClick={() => window.location.href = '/'}>
                            Back
                        </Button>
                    </Col>
                    <Col className="w-50 pt-10">
                        <Button className="w-100" id="submit" type="button" onClick={() => sendLoginRequest()} disabled={!username || !password}>
                            Login
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Col>
    )
}

export default Login;