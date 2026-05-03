document.addEventListener("DOMContentLoaded", function () {
    // Simulate scholarship API data
    const scholarships = [
        { name: "National Merit Scholarship", amount: "$2000" },
        { name: "Science and Tech Scholarship", amount: "$1500" },
        { name: "Leadership Excellence Award", amount: "$3000" }
    ];

    const scholarshipList = document.getElementById("scholarship-list");

    // Display scholarships
    scholarships.forEach(scholarship => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${scholarship.name}</strong> - <span>${scholarship.amount}</span>`;
        scholarshipList.appendChild(li);
    });

    // Handle Logout
    document.getElementById("logout-btn").addEventListener("click", () => {
        alert("You have been logged out.");
        window.location.href = "index.html";
    });

    // Edit Profile Modal Logic
    const modal = document.getElementById("edit-profile-modal");
    const editBtn = document.getElementById("edit-profile-btn");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("edit-profile-form");

    const studentName = document.getElementById("student-name");
    const studentEmail = document.getElementById("student-email");
    const studentCourse = document.getElementById("student-course");
    const profileImage = document.getElementById("profile-image");

    editBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get updated values
        const newName = document.getElementById("edit-name").value;
        const newEmail = document.getElementById("edit-email").value;
        const newCourse = document.getElementById("edit-course").value;
        const newImageFile = document.getElementById("edit-image").files[0];

        // Update profile details
        if (newName) studentName.textContent = newName;
        if (newEmail) studentEmail.textContent = newEmail;
        if (newCourse) studentCourse.textContent = newCourse;

        // Update profile image
        if (newImageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                localStorage.setItem("studentImage", e.target.result);
            };
            reader.readAsDataURL(newImageFile);
        }

        alert("Profile updated successfully!");
        modal.style.display = "none";
    });

    // Load stored profile image
    const storedImage = localStorage.getItem("studentImage");
    if (storedImage) {
        profileImage.src = storedImage;
    }
});