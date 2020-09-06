let button = document.getElementById('addIngredientsButton'); 
button.onclick = () => {
    const value = document.getElementById('ingredient').value.replaceAll(', ', '+'); 
    window.location = `${window.location}?ingredients=${value}`; 
}; 