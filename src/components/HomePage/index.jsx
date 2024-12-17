import React from 'react'
import { Navbar, Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div style={{backgroundImage: "url(../../src/assets/background.gif)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
                <Row className="w-100">
                    <Col xs={12} md={6} lg={4} className="mx-auto">
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title>Start using TackBoard</Card.Title>
                                <Button variant="primary" className="mx-2" onClick={() => {window.location.href = "/login"}}>
                                    Login
                                </Button>
                                <Button variant="secondary" className="mx-2" onClick={() => {window.location.href = "/register"}}>
                                    Register
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div>Home</div>
        </div>
    );
}

export default HomePage;