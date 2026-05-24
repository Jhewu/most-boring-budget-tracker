// Process input and stores it 

const form = document.querySelector("#expense-income-form"); 
const table = document.querySelector("#table-log");
const warning = document.querySelector("#warning"); 

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(form); 
    const data = Object.fromEntries(formData); 

    warning.textContent = `${data['amount']} is an invalid amount!`
    
    // Check if valid entry
    if (data['amount'] <= 0) {
        warning.style.display = 'block';
    }
    else {
        warning.style.display = 'none';
    
        // Reset the amount and descripton field        
        const amount = form.elements['amount']; 
        const description = form.elements['description'];
        const category = form.elements['categories']; 

        amount.value = ""; 
        description.value = ""; 
        category.value = ''; 

        // Add to Table
        const tableBody = table.tBodies[0];

        const tableRow = document.createElement("tr"); 
        const columns = ['type', 'categories', 'amount', 'description', 'date'];
        for (const key of columns) {
            const tableData = document.createElement('td');

            // Red for expenses and green for income
            if (data['type'] === 'expense') {
                tableData.style.color = 'red';
            }
            else {
                tableData.style.color = 'green';
            }
            
            tableData.textContent = data[key].toLowerCase(); 
            tableRow.appendChild(tableData)
            
        }
        // Create button for removal logic
        const button = document.createElement('button'); 
        button.innerText = '-';
        tableRow.appendChild(button);

        tableBody.appendChild(tableRow);
    }   
})

table.addEventListener('click', function(event) {
    // Check if the clicked element is your remove button
    if (event.target.tagName === 'BUTTON' && event.target.innerText === '-') {
        const row = event.target.closest('tr');
        row.remove();
    }
});
