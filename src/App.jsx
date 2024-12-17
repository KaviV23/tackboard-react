import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useLocalState } from './util/useLocalStorage';
import TodoList from './components/TodoList';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { Navbar, Container, Nav} from 'react-bootstrap';

function App() {
	const [jwt, setJwt] = useLocalState("", "jwt");

	return (
		<div className="App">
			<Navbar className="" style={{ backgroundColor: "#0d6efd" }}>
				<Container>
					<Navbar.Brand href="/">
						<img
							alt=""
							src="../../src/assets/tack-cropped.png"
							width="30"
							height="30"
							className="d-inline-block align-top bg-"
						/>
						<b style={{ color: "#fff" }}>TackBoard</b>
					</Navbar.Brand>
					<Nav className="me-auto" >
						<Nav.Link href="/" style={{color: "#fff"}}>Home</Nav.Link>
						<Nav.Link href="/todos" style={{color: "#fff"}}>Todos</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/todos" element={
					<PrivateRoute>
						<TodoList />
					</PrivateRoute>
				} />
			</Routes>
		</div>
	)
}

export default App
