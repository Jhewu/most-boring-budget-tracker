// Handles category switch if type is 'income' or 'expense'

// Fetch the 'type' and 'categories' Selection
const typeSelect = document.querySelector('#type'); 
const categorySelect = document.querySelector('#categories'); 

// Define categories options
const categoryOptions = {
    income: ['Select a Category', 'Active', 'Passive', 'Miscellaneous'],
    expense: ['Select a Category' , 'Bill', 'Utils', 'Health', 'Shopping', 'Entertainment', 'Food', 'Groceries', 'Transportation', 'Miscellaneous']
}                

typeSelect.addEventListener('change', function() {
    const selectedType = this.value; 
    const categories = categoryOptions[selectedType]; 

    // Clear existing options
    categorySelect.innerHTML = ''; 

    // Add new options
    let first = true; 
    for (let cat of categories) {
        const option = document.createElement('option'); 
        if (first) {
            option.disabled = true; 
            first = false;
        }
        
        option.value = cat; 
        option.textContent = cat; 
        categorySelect.appendChild(option); 
    }
    categorySelect.value = 'Select a Category';
})

// Trigger change event on page load to populate initial categories
typeSelect.dispatchEvent(new Event('change'));