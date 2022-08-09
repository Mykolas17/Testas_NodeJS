const fetchBills = async () => {
	try {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
		const response = await fetch(
			'http://localhost:8080/api/bills/' + params['groupId'],
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		);
		const responseJson = await response.json();
		console.log(responseJson);
		//console.log('veikia');
		return responseJson;
	} catch (err) {
		alert('Unexpected error!');
		localStorage.clear();
		location.replace('../login/login.html');
		console.log(err);
	}
};

const displayBills = (bills) => {
	const container = document.querySelector('.bill-container');
	let html = '';
	bills.forEach((bill) => {
		html += `	
        <div class="bills">
            <h1>${bill.id + bill.amount + bill.description}</h1>
        </div>
        `;
	});
	console.log(html);
	container.innerHTML = html;
};
document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('token')) location.replace('../login/login.html');
	const bills = await fetchBills();
	console.log(bills);
	displayBills(bills);
});

// console.log('http://localhost:8080/api/bills/' + params['groupId']);

const addBill = async (data) => {
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
console.log('http://localhost:8080/api/bills');

document.querySelector('form').addEventListener('submit', async (event) => {
	event.preventDefault();
	const input = {
		amount: event.target.elements.amount.value,
		description: event.target.elements.description.value,
		groupId,
	};
	const bill = await addBill(input);

	if (bill.id) {
		location.replace('../bills/bills.html');
	} else {
		alert('Not added');
	}
});
