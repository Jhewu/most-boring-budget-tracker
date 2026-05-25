// Process input and stores it 

const form = document.querySelector("#expense-income-form"); 
const table = document.querySelector("#table-log");

const warning = document.querySelector("#warning"); 
const tableMessage = document.querySelector("#table-message");

function sortTable(tableBody) {
    const sortedRows = Array.from(tableBody.children).sort((rowA, rowB) => {
        // Get the full text from both rows
        const textA = rowA.innerText; 
        const textB = rowB.innerText; 

        // Split the text by spaces into lists of pieces
        const piecesA = textA.split(/\s+/); // '\s+' groups multiple spaces together
        const piecesB = textB.split(/\s+/); 

        // Grab the date (index 4)
        const dateA = piecesA[4]; 
        const dateB = piecesB[4]; 

        // Compare the dates (newest first)
        return dateB.localeCompare(dateA); 

    })

    // Place the sorted rows back together
    sortedRows.forEach(row => tableBody.appendChild(row));

}

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(form); 
    const data = Object.fromEntries(formData); 

    warning.textContent = `${data['amount']} is an invalid amount!`
    
    // Check if valid entry
    if (data['amount'] <= 0) {
        // Toggle warning on
        warning.style.display = 'block';
    }
    else {
        // Toggle warning and message off
        warning.style.display = 'none';

        tableMessage.style.display = 'none'
    
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

        // Sort the tableBody
        sortTable(tableBody);
    }   
})

table.addEventListener('click', function(event) {
    // Check if the clicked element is your remove button
    if (event.target.tagName === 'BUTTON' && event.target.innerText === '-') {
        const row = event.target.closest('tr');
        row.remove();

        // Check if table entries are empty
        const counts = table.querySelector('tbody').querySelectorAll('tr');
        if (counts.length === 0) {
            tableMessage.style.display = 'block';
        }
    }
});
