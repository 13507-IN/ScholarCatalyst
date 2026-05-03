document.getElementById('getStartedButton').addEventListener('click', () => {
    window.location.href = 'auth.html'; // Redirects to auth.html
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${name}! We have received your message.`);
        // You can integrate Firebase here to store contact info or use another method
        document.getElementById('contactForm').reset();
    } else {
        alert("Please fill out all fields.");
    }
});

