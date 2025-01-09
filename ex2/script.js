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
        // Store Data
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
}

// Submit
document.querySelector("button").addEventListener("click", (e) => {
    storeData(e);
    // e.preventDefault();
    // const userValue = userInput.value.trim();
    // if (userValue) {
    //     // Store Data
    //     const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    //     const uuid = generateUUID();
    //     const newArray = [{ id: uuid, content: userValue }, ...storedArray];
    //     localStorage.setItem("myArray", JSON.stringify(newArray));
    //     // Reset input field
    //     userInput.value = "";
    // } else {
    //     e.preventDefault();
    //     alert("Please enter a value");
    // }
});

// Reload
document.getElementById("reload").addEventListener("click", reloadPage);

// IIFE
(() => {
    const storedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    storedArray.forEach((item) => {
        const newItem = document.createElement("li");
        const delBtn = document.createElement("button");

        newItem.textContent = item.content;
        newItem.setAttribute("id", item.id);

        delBtn.textContent = "Delete";
        delBtn.classList.add("bg-red-500", "rounded", "mt-5", "text-white", "px-2");
        delBtn.addEventListener("click", () => deleteItem(item.id));

        newItem.append(delBtn);
        itemList.append(newItem);
        itemList.classList.add("flex", "flex-col");
    });
})();
