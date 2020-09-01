let button = document.getElementById('addIngredientsButton'); 
button.onclick = () => {
    const value = document.getElementById('ingredient').value.replaceAll(', ', '+');
    window.location = `http://localhost:3666/?ingredients=${value}`; 
}; 