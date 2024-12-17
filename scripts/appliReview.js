// Get the form element
const form = document.getElementById('scholarship-form');

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from actually submitting to server

    // Clear previous error or success message
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('error').style.display = 'none';

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const courseName = document.getElementById('course-name').value;
    const statement = document.getElementById('statement').value;

    // Simple client-side validation
    if (!name || !email || !course || !courseName || !statement) {
        document.getElementById('error').textContent = "Please fill out all fields before submitting.";
        document.getElementById('error').style.display = 'block';
        return;
    }

    // Show confirmation message
    document.getElementById('confirmation').textContent = `Thank you for your application, ${name}! We have received your scholarship application for the ${courseName} in the ${course} program.`;
    document.getElementById('confirmation').style.display = 'block';

    // Optionally, reset the form (if not submitting to a server)
    form.reset();
    
});