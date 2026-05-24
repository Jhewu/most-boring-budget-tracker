// Set date to today by default

const dateElement = document.querySelector("#date")

if (dateElement.value === "") {
    const today = new Date().toISOString().split("T")[0]; 
    dateElement.value = today; 
}