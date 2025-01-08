// Load DOM Elements
const itemList = document.querySelector("ul");
const userInput = document.getElementById("userInput");

// Submit
document.querySelector("button").addEventListener("click", function (event) {
    event.preventDefault();
    const userValue = userInput.value.trim();

    if (userValue) {
        // Store Data
        const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
        const newArray = [userValue, ...storedArray];
        localStorage.setItem("myArray", JSON.stringify(newArray));

        // Add new data to list
        itemList.innerHTML = "";
        newArray.forEach((item) => {
            const newItem = document.createElement("li");
            newItem.textContent = item;
            itemList.appendChild(newItem);
        });

        // Reset input field
        userInput.value = "";
    } else {
        alert("Please enter a value");
    }
});

// Reload
document.getElementById("reload").addEventListener("click", () => {
    location.reload();
});

// IIFE
(() => {
    const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    storedArray.forEach((item) => {
        const newItem = document.createElement("li");
        newItem.textContent = item;
        itemList.appendChild(newItem);
    });
})();
