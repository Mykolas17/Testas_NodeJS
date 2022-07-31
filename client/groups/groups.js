const fetchGroups = async () => {
	try {
		const response = await fetch('http://localhost:8080/api/groups', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		alert('Unexpected error!');
		localStorage.clear();
		location.replace('../login/login.html');
		console.log(err);
	}
};

const displayGroups = (data) => {
	const container = document.querySelector('.groups-container');
	let html = '';
	data.forEach((groups) => {
		html += `
        <div class="groups">
            <h1>${groups.name}</h1>
        </div>
        
        `;
	});
	container.innerHTML = html;
};
document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('../login/login.html');
	const groups = await fetchGroups();
	displayGroups(groups);
});

const addGroup = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/groups', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
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
		name: event.target.elements.name.value,
	};
	const userData = await addGroup(input);

	if (userData.id) {
		location.replace('../groups/groups.html');
	} else {
		alert('Not added');
	}
});
