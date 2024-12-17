document.getElementById('studentButton').addEventListener('click' , () => {
    document.getElementById('studentModal').style.display = 'block';
});


document.getElementById('providerButton').addEventListener('click' , () => {
    document.getElementById('providerModal').style.display = 'block';
});

document.getElementById('closeStudent').addEventListener('click' , () => {
    document.getElementById('studentModal').style.display = 'none';
});

document.getElementById('closeProvider').addEventListener('click' , () => {
    document.getElementById('providerModal').style.display = 'none';
});


document.addEventListener("DOMContentLoaded", () => {
    // Student Login Modal
    const studentButton = document.getElementById("studentButton");
    const studentModal = document.getElementById("studentModal");
    const closeStudent = document.getElementById("closeStudent");
    const studentForm = document.getElementById("student-form");

    // Provider Login Modal
    const providerButton = document.getElementById("providerButton");
    const providerModal = document.getElementById("providerModal");
    const closeProvider = document.getElementById("closeProvider");
    const providerForm = document.getElementById("provider-form");

    // Open Student Login Modal
    studentButton.addEventListener("click", () => {
        studentModal.style.display = "block";
    });

    // Close Student Login Modal
    closeStudent.addEventListener("click", () => {
        studentModal.style.display = "none";
    });

    // Open Provider Login Modal
    providerButton.addEventListener("click", () => {
        providerModal.style.display = "block";
    });

    // Close Provider Login Modal
    closeProvider.addEventListener("click", () => {
        providerModal.style.display = "none";
    });

    // Close Modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === studentModal) studentModal.style.display = "none";
        if (e.target === providerModal) providerModal.style.display = "none";
    });

    // Student Login Form Submission
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("student-username").value;
        const password = document.getElementById("student-password").value;

        // Basic Validation (You can replace this with real backend logic)
        if (username && password) {
            alert("Student login successful!");
            window.location.href = "profileStudent.html"; // Redirect to student profile
        } else {
            alert("Please enter valid credentials.");
        }
    });

    // Provider Login Form Submission
    providerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("provider-username").value;
        const password = document.getElementById("provider-password").value;
        const organization = document.getElementById("organization-name").value;

        // Basic Validation (You can replace this with real backend logic)
        if (username && password && organization) {
            alert("Provider login successful!");
            window.location.href = "scholarCreat.html"; // Redirect to provider dashboard
        } else {
            alert("Please enter valid credentials for all fields.");
        }
    });
});


const studUser = document.getElementById(studentUser);
