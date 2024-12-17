import React, { useState, useEffect } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import { Card, Button, Container, Col, Row, Modal, Form } from 'react-bootstrap'

const TodoList = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [todos, setTodos] = useState(null);
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {

        fetch("http://localhost:8080/api/todos", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((todoData) => {
                if (JSON.stringify(todoData) !== JSON.stringify(todos)) {
                    setTodos(todoData);
                }
            });
        
    }, [data]);


    function createTodo(title, description) {
        const reqBody = {
                title: title,
                description: description,
        }

        fetch("http://localhost:8080/api/todos", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) return response.json();
            })
            .then((data) => {
                console.log(data);
                setData(data);
            })
    }


    function handleShowModal() {
        setShowModal(true);
    }


    function handleCloseModal() {
        setShowModal(false);
        setTitle('');
        setDescription('');
    }


    function handleCreateTodo() {
        createTodo(title,description);
        handleCloseModal();
    }


    return (
        <Container >
            <h1 className="gy-4 mt-3 mb-4">Todo List</h1>
            <Row >
                {todos ? todos.map((todo) => {
                    return (
                        <Col key={todo.id} xs={12} md={4} lg={3} className="mb-4">
                            <Card className="d-flex flex-column h-100">
                                <Card.Body className="flex-grow-1">
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text>{todo.description}</Card.Text>
                                    <Button variant="primary" className="mt-auto">Done</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }) : <></>}
            </Row>
            <Row className="mt-5 mb-5 justify-content-center">
                <Button variant="primary" onClick={() => handleShowModal()}>Create To-do</Button>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New To-do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateTodo} disabled={!title.trim()}>
                        Save To-do
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TodoList;