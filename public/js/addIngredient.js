let button = document.getElementById('addIngredientsButton'); 
button.onclick = () => {
    const value = document.getElementById('ingredient').value.replaceAll(', ', '+');
    window.location = `https://agile-river-60574.herokuapp.com/?ingredients=${value}`; 
}; 