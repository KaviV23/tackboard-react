import './App.css'

function App() {
	const reqBody = {
		username: "kavi",
		password: "1234",
	};

	fetch("http://localhost:8080/api/auth/login", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "post",
		body: JSON.stringify(reqBody),
	});

	return (
		<h1>Hello</h1>
	)
}

export default App
