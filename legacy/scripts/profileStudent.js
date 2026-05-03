// Function to handle photo preview
const profileImage = function previewPhoto(event) {
    const photoPreview = document.getElementById("photoPreview");
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}



// Event listener for form submission
document.getElementById("scholarshipForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const firstName = document.getElementById("firstName").value;
    const middleName = document.getElementById("middleName").value;
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const instituteType = document.getElementById("instituteType").value;
    const caste = document.getElementById("caste").value;
    const gender = document.getElementById("gender").value;
    const state = document.getElementById("state").value;
    const selectedClass = document.getElementById("class").value;
    const language = document.getElementById("language").value;
    const disability = document.getElementById("disable").value;

    // Construct the alert message
    const alertMessage = `
        Profile Submitted Successfully!
        
        Name: ${firstName} ${middleName || ""} ${surname}
        Age: ${age}
        Institute: ${instituteType}
        Caste: ${caste}
        Gender: ${gender}
        State: ${state}
        Class: ${selectedClass}
        Language: ${language}
        Disability: ${disability}
    `;

    // Show the alert box with the information
    alert(alertMessage.trim());

    // Redirect to studentDashboard.html after the alert
    setTimeout(() => {
        window.location.href = "studentDashboard.html";
    }, 1000); // Redirects after 1 second
});
