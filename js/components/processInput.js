// Process input and stores it 

const form = document.querySelector("#expense-income-form"); 
const table = document.querySelector("#table-log");

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(form); 
    const data = Object.fromEntries(formData); 
    
    // Check if valid entry
    if (data['amount'] <= 0) {
        alert(`${data['amount']} is an invalid amount!`)
    }
    else {
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
            console.log(data[key])
            tableData.textContent = data[key].toLowerCase(); 
            tableRow.appendChild(tableData)
        }
        tableBody.appendChild(tableRow)
    }   

})

