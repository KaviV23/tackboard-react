import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useLocalState } from './util/useLocalStorage';
import TodoList from './components/TodoList';
import HomePage from './components/HomePage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
	const [jwt, setJwt] = useLocalState("", "jwt");

	// useEffect(() => {
	// 	if (!jwt) {
	// 		const reqBody = {
	// 			username: "kavi",
	// 			password: "1234",
	// 		};

	// 		fetch("http://localhost:8080/api/auth/login", {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			method: "post",
	// 			body: JSON.stringify(reqBody),
	// 		}).then(response => {
	// 			setJwt(response.headers.get("Authorization"));
	// 		});
	// 	}
	// }, []);


	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage/>} />
				<Route path="/login" element={<Login/>} />
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
