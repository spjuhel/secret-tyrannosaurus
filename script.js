document.getElementById('submit-button').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === 'yourpassword') { // Replace 'yourpassword' with the actual password
        document.getElementById('password-container').classList.add('hidden');
        document.getElementById('matrix-animation').classList.remove('hidden');
        setTimeout(showFinalDisplay, 5000); // Display matrix animation for 5 seconds
    } else {
        alert('Incorrect password');
    }
});

function showFinalDisplay() {
    document.getElementById('matrix-animation').classList.add('hidden');
    document.getElementById('final-display').classList.remove('hidden');
}

// Matrix animation code can be added here using CSS or JavaScript
