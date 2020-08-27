let button = document.getElementById('addIngredientsButton'); 
button.onclick = () => {
    const value = document.getElementById('ingredient').value;
    window.location = `http://localhost:3666/?ings=${value}`; 
}; 