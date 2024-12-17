// JavaScript to handle search button click
document.querySelector('.search-bar button').addEventListener('click', function () {
    const searchValue = document.querySelector('.search-bar input').value;
    if (searchValue.trim()) {
        alert(`Searching for "${searchValue}"...`);
    } else {
        alert("Please enter a search query.");
    }
});
