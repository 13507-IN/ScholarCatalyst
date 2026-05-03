document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scholarshipForm');
    const fileInput = document.getElementById('poster');
    const fileNote = document.querySelector('.file-note');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const scholarshipName = document.getElementById('scholarshipName').value.trim();
        const providerName = document.getElementById('providerName').value.trim();
        const eligibility = document.getElementById('eligibility').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const deadline = document.getElementById('deadline').value.trim();
        const description = document.getElementById('description').value.trim();
        const file = fileInput.files[0];

        // Validate form inputs
        if (!scholarshipName || !providerName || !eligibility || !amount || !deadline || !description || !file) {
            alert('Please fill out all fields and upload a poster.');
            return;
        }

        // Validate poster file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload an image (JPEG, PNG, GIF).');
            return;
        }

        // Simulate form submission
        const formData = {
            scholarshipName,
            providerName,
            eligibility,
            amount,
            deadline,
            description,
            poster: file.name, // In real-world use, upload file to a server
        };

        console.log('Scholarship Submitted:', formData);

        // Display success message
        alert('Scholarship has been successfully submitted!');

        // Reset form
        form.reset();
    });

    // Display selected file name
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNote.textContent = `Selected file: ${fileInput.files[0].name}`;
            fileNote.style.color = 'green';
        } else {
            fileNote.textContent = 'No file selected.';
            fileNote.style.color = 'red';
        }
    });
});

document.getElementById('scholarCreat').addEventListener('click', () => {
    window.location.href = 'appliReview.html'; // Redirects to auth.html
});