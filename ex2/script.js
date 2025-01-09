// Load DOM Elements
const itemList = document.querySelector("ul");
const userInput = document.getElementById("userInput");

// Functions
// Generate random UUID
function generateUUID() {
    const uuid = self.crypto.randomUUID();
    return "task-" + uuid.replaceAll("-", "");
}

// Store Data
function storeData(e) {
    const userValue = userInput.value.trim();

    if (userValue) {
        const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
        const uuid = generateUUID();
        const newArray = [{ id: uuid, content: userValue }, ...storedArray];
        localStorage.setItem("myArray", JSON.stringify(newArray));

        // Reset input field
        userInput.value = "";
    } else {
        e.preventDefault();
        alert("Please enter a value");
    }
}

// Load Data
// function loadData() {
//     const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
//     storedArray.forEach((item) => {
//         const newItem = document.createElement("li");
//         const delBtn = document.createElement("button");

//         // New Item
//         newItem.innerHTML = `<span>${item.content}</span>`;
//         newItem.setAttribute("id", item.id);
//         newItem.classList.add("bg-white", "mx-2", "my-1", "px-2", "py-2", "flex", "justify-between", "content-center");

//         // Delete Button
//         delBtn.textContent = "Delete";
//         delBtn.classList.add("bg-red-500", "rounded", "text-white", "px-2", "py-auto");
//         delBtn.addEventListener("click", () => deleteItem(item.id));

//         // Append
//         newItem.append(delBtn);
//         itemList.append(newItem);
//     });
// }

// Delete Item
function deleteItem(id) {
    const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    const newStorage = storedArray.filter((item) => {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("myArray", JSON.stringify(newStorage));
    reloadPage();
}

// Reload Page
function reloadPage() {
    location.reload();
    // loadData();
}

// Submit
document.querySelector("button").addEventListener("click", (e) => {
    storeData(e);
    // loadData();
});

// Reload
document.getElementById("reload").addEventListener("click", reloadPage);

// IIFE
(() => {
    const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    storedArray.forEach((item) => {
        const newItem = document.createElement("li");
        const delBtn = document.createElement("button");

        // New Item
        newItem.innerHTML = `<span>${item.content}</span>`;
        newItem.setAttribute("id", item.id);
        newItem.classList.add("bg-white", "mx-2", "my-1", "px-2", "py-2", "flex", "justify-between", "content-center");

        // Delete Button
        delBtn.textContent = "Delete";
        delBtn.classList.add("bg-red-500", "rounded", "text-white", "px-2", "py-auto");
        delBtn.addEventListener("click", () => deleteItem(item.id));

        // Append
        newItem.append(delBtn);
        itemList.append(newItem);
    });
})();
