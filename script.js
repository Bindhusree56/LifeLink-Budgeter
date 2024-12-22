// Function to scroll to Features section
function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Function to add a transaction
function addTransaction() {
  // Get input values
  const table = document.getElementById('transaction-table');
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value)||0;
  const type = document.getElementById('type').value;

  // Error container
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = ''; // Clear previous errors

  // Validate inputs
  if (!date) {
    showError('Please select a valid date.');
    return;
  }
  if (!description) {
    showError('Description cannot be empty.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    showError('Amount must be a positive number.');
    return;
  }

  // Add transaction row
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${date}</td>
    <td>${description}</td>
    <td>${amount.toFixed(2)}</td>
    <td>${type}</td>
    <td><button onclick="removeTransaction(this)">Remove</button></td>`;

  calculateBalance();
}

// Function to calculate the balance
function calculateBalance() {
  let balance = 0;
  const rows = document.querySelectorAll('#transaction-table tr');

  rows.forEach(row => {
    const type = row.cells[3].textContent;
    const amount = parseFloat(row.cells[2].textContent);
    if (type === 'income') {
      balance += amount;
    } else if (type === 'expense') {
      balance -= amount;
    }
  });

  document.getElementById('balance').innerText = `Current Balance: ₹${balance.toFixed(2)}`;
}

// Function to remove a transaction
function removeTransaction(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  calculateBalance();
}

// Function to export transactions to PDF with proper alignment
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Set font and styles for the PDF
  doc.setFont("helvetica", "normal");

  // Add table header
  doc.autoTable({
    head: [['Date', 'Description', 'Amount', 'Type']],
    body: [],
    startY: 30,
    columnStyles: {
      0: { halign: 'left', cellWidth: 30 },   // Date column
      1: { halign: 'left', cellWidth: 60 },   // Description column
      2: { halign: 'right', cellWidth: 35 },  // Amount column
      3: { halign: 'left', cellWidth: 30 }    // Type column
    }
  });

  // Populate the table body with transaction data
  const table = document.getElementById('transaction-table');
  for (let row of table.rows) {
    const cells = row.cells;
    const date = cells[0].textContent.trim();         // Extracted and trimmed for clarity
    const description = cells[1].textContent.trim();  // Extracted and trimmed for clarity
    const amount = parseFloat(cells[2].textContent).toFixed(2);
    const type = cells[3].textContent.trim();

    doc.autoTable({
      body: [[date, description, amount, type]]
    });
  }

  // Save the PDF
  doc.save('transactions.pdf');
}



// Function to show error messages
function showError(message) {
  const errorContainer = document.getElementById('error-container');
  const errorMsg = document.createElement('p');
  errorMsg.className = 'error-message';
  errorMsg.innerText = message;
  errorContainer.appendChild(errorMsg);
}

// Handle smooth scrolling for sections
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-scroll');

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

 // budget ki js anta mowas
  // Initialize an empty budget object
// Initialize an empty budget object
let budgets = {};

// Function to update the budget display
function updateBudgetDisplay() {
  const budgetTableBody = document.querySelector('#budget-table tbody');
  budgetTableBody.innerHTML = ''; // Clear existing rows

  for (const category in budgets) {
    const spent = budgets[category].amount - budgets[category].remaining;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${category}</td>
      <td>₹${budgets[category].amount.toFixed(2)}</td>
      <td>₹${spent.toFixed(2)}</td>
      <td>₹${budgets[category].remaining.toFixed(2)}</td>
    `;
    budgetTableBody.appendChild(row);
  }
}

// Handle budget form submission
document.getElementById('add-budget-btn').addEventListener('click', function () {
  const category = document.getElementById('budget-category').value.trim();
  const amount = parseFloat(document.getElementById('budget-amount').value);

  if (category && !isNaN(amount) && amount > 0) {
    if (budgets[category]) {
      alert(`Budget for ${category} already exists. Please modify it instead.`);
    } else {
      budgets[category] = { amount: amount, remaining: amount };
      alert(`Budget set for ${category}: ₹${amount.toFixed(2)}`);
      document.getElementById('budget-form').reset();
      updateBudgetDisplay();
    }
  } else {
    alert('Please enter a valid category and amount.');
  }
});

// Handle spending form submission
document.getElementById('spending-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const category = document.getElementById('spending-category').value.trim();
  const amount = parseFloat(document.getElementById('spending-amount').value);

  if (category && !isNaN(amount) && amount > 0) {
    if (budgets[category]) {
      if (amount <= budgets[category].remaining) {
        budgets[category].remaining -= amount;
        alert(`Spent ₹${amount.toFixed(2)} on ${category}. Remaining budget: ₹${budgets[category].remaining.toFixed(2)}`);
        updateBudgetDisplay();
      } else {
        alert(`Insufficient budget for ${category}. Remaining: ₹${budgets[category].remaining.toFixed(2)}`);
      }
    } else {
      alert(`No budget set for ${category}. Please set a budget first.`);
    }
    document.getElementById('spending-form').reset();
  } else {
    alert('Please enter a valid category and amount.');
  }
});

// Initial update of the budget display
updateBudgetDisplay();