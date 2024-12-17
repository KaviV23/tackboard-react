import React from "react";
import { useState } from "react";
import { Col, Form, Row, Container, Button } from "react-bootstrap";
import { useLocalState } from "../../util/useLocalStorage";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendRegistrationRequest() {
        if (password != confirmPassword) {
            alert("Passwords dont match!");
            setPassword('');
            setConfirmPassword('');
            return;
        }

        const reqBody = {
            username: username,
            password: password,
        };

        fetch("http://localhost:8080/api/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(reqBody),
        }).then(response => {
            if (response.status == 200) {
                setJwt("");
                return Promise.all([response.json, response.headers]);
            } else {
                return Promise.reject("User exists");
            }
        }).then(([body, headers]) => {
            setJwt(headers.get("Authorization"));
            window.location.href = "todos";
        }).catch((message) => {
            alert(message);
        });
    }


    return (
        <Col className="" style={{ height: "100vh", display: 'flex', alignItems: "center" }}>
            <Container className="p-2" style={{ maxWidth: "500px" }}>
                <h1 className="mb-5">Register</h1>
                <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control required id="username" value={username} placeholder="Enter a username..." onChange={(event) => setUsername(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control required type="password" id="password" placeholder="Enter a password..." value={password} onChange={(event) => setPassword(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control required type="password" id="confirmPassword" placeholder="Re-enter password..." value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}></Form.Control>
                </Form.Group>
                <Row className="mt-5">
                    <Col>
                        <Button className="w-100 btn-secondary" id="back" type="button" onClick={() => window.location.href = '/'}>
                            Back
                        </Button>
                    </Col>
                    <Col className="w-50 pt-10">
                        <Button className="w-100" id="submit" type="button" onClick={() => sendRegistrationRequest()} disabled={!username || !password || !confirmPassword}>
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Col>
    );
}

export default Register;