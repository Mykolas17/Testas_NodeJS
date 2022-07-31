const fetchCompanies = async () => {
	try {
		const response = await fetch('http://localhost:8080/api/bills', {
			//headers: {	Authorization: `Bearer ${localStorage.getItem('token')}`,},
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

const displayBills = (data) => {
	const container = document.querySelector('.bills-container');
	let html = '';
	data.forEach((bills) => {
		html += `
        <div class="bills">
            <h1>${bills.name}</h1>
        </div>
        
        `;
	});
	container.innerHTML = html;
};
document.addEventListener('DOMContentLoaded', async () => {
	//if (!localStorage.getItem('token')) location.replace('../login/login.html');
	const bills = await fetchCompanies();
	displayCompanies(companies);
});

const onAddBill = async (data) => {
	try {
		const response = await fetch('http://localhost:8080/api/bills', {
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
		name: event.target.elements.name.value,
	};
	onAddBill(input);
	if (user.insertId) {
		console.log(input);
	}
});
