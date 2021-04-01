const form = document.querySelector('#form_ingredients');

form.addEventListener('submit', e => {
	e.preventDefault();
	const value = document
		.getElementById('ingredient')
		.value.replaceAll(', ', '+');
	const url = new URL(window.location);
	let params = new URLSearchParams('');
	params.append('ingredients', value);
	url.search = '?' + params;
	window.location = url;
});
