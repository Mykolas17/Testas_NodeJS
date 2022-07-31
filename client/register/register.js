const onRegister = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		alert('err');
		console.log(err);
	}
};

document.querySelector('form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const input = {
		fullName: event.target.elements.fullName.value,
		email: event.target.elements.email.value,
		password: event.target.elements.password.value,
	};
	const user = await onRegister(input);
	if (user.token) {
		localStorage.setItem('token', user.token);
		location.replace('../login/login.html');
	} else {
		alert('Not Registered!');
	}
});
