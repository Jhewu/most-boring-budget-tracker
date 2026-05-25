// Process input and stores it 
const form = document.querySelector("#expense-income-form"); 
const table = document.querySelector("#table-log");
const dashboardComponents = document.querySelectorAll('#top-summary [data-summary]');

// Display properties
const warning = document.querySelector("#warning"); 
const tableMessage = document.querySelector("#table-message");

// Global variables
const budgetData = {
    balance: 0, 
    income: 0, 
    expense: 0}

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

function updateDashboard(type, amount, opposite=false) {
    if (type === 'expense') {
        if (opposite) {budgetData['expense'] -= Number(amount); }
        else {budgetData['expense'] += Number(amount); }
    }
    else {
        if (opposite) {budgetData['income'] -= Number(amount); }
        else {budgetData['income'] += Number(amount);}
    }

    // Update balance
    if (opposite) {
        budgetData['balance'] = budgetData['income'] + budgetData['expense'];}
    else {budgetData['balance'] = budgetData['income'] - budgetData['expense'];}
    

    // Update dashboard
    dashboardComponents.forEach(span => {
    const metric = span.dataset.summary; 
    const value = budgetData[metric];

    if (value < 0) {
        span.style.color = 'red'
    }
    else {
        span.style.color = 'green'
    }

    // Set the text content
    span.textContent = value
    })
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
        tableMessage.style.display = 'none';
    
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
            // Store data to update the dashboard
            if (data['type'] === 'expense') {
                tableData.style.color = 'red';
            }
            else {
                tableData.style.color = 'green';
            }

            tableData.textContent = data[key].toLowerCase(); 
            tableRow.appendChild(tableData)
            
        }
        // Update the dashboard
        updateDashboard(data['type'], data['amount'], false);    

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

        // Update dashboard if an entry is removed
        const rowComponents = Array.from(row.children); 

        const type = rowComponents[0].innerText; 
        const amount = rowComponents[2].innerText;

        updateDashboard(type, amount, true);

        row.remove();

        // Check if table entries are empty
        const counts = table.querySelector('tbody').querySelectorAll('tr');
        if (counts.length === 0) {
            tableMessage.style.display = 'block';
        }
    }
});
