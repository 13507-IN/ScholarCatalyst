// Preview photo 
function previewPhoto(event) { 
    const photoPreview = document.getElementById("photoPreview"); 
    photoPreview.style.display = "block"; 
    photoPreview.src = URL.createObjectURL(event.target.files[0]); 
} 
 
// Handle form submission 
document.getElementById("scholarshipForm").addEventListener("submit", function(event) { 
    event.preventDefault(); // Prevent form from submitting 
 
    // Get form data 
    const firstName = document.getElementById("firstName").value; 
    const surname = document.getElementById("surname").value; 
    const caste = document.getElementById("caste").value; 
    const gender = document.querySelector('input[name="gender"]:checked').value; 
    const state = document.getElementById("state").value; 
    const classInfo = document.getElementById("class").value; 
    const language = document.getElementById("language").value; 
    const disability = document.querySelector('input[name="disability"]:checked').value; 
 
    // Display the data (could be used to filter scholarships or save to a database) 
    alert(` 
        First Name: ${firstName} 
        Surname: ${surname} 
        Caste: ${caste} 
        Gender: ${gender} 
        State: ${state} 
        Class: ${classInfo} 
        Language: ${language} 
        Disability: ${disability} 
    `); 
}); 

document.getElementById('submitBtn').addEventListener('click', () => {
    window.location.href = 'scholarApplication.html'; // Redirects to scholarApplication.html
});