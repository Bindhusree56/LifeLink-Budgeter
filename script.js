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

  // Set font and styles
  doc.setFont("helvetica", "normal");

  // Prepare table data
  const table = document.getElementById('transaction-table');
  const tableData = [];

  // Process table rows
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length === 2) {
      const amount = parseFloat(cells[0].textContent.trim()).toFixed(2); // Format Amount
      const type = cells[1].textContent.trim();                         // Trim Type
      tableData.push([amount, type]);                                   // Push data row
    }
  });

  // Add table to PDF
  doc.autoTable({
    head: [['Amount', 'Type']],
    body: tableData,
    startY: 30,
    columnStyles: {
      0: { halign: 'right', cellWidth: 50 }, // Align Amount to the right
      1: { halign: 'left', cellWidth: 40 }  // Align Type to the left
    },
    theme: 'grid'
  });

  // Save PDF
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
function closeNavAfterClick() {
  setTimeout(() => {
      closeNav();
  }, 250); // Adjust the delay if needed
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.querySelector(".openbtn").classList.remove("hidden");
}
function closeNavAfterClick() {
  setTimeout(closeNav, 200); 
}
//theme changing code starts here
document.getElementById('showdiv').addEventListener('click', () => {

  document.getElementById('circle_container').style.display = 'block';
});

// Function to change the theme color >.<
function changeTheme(colorText, colorBg) {
  
  const color1Elements = document.getElementsByClassName('color1');
  for (let i = 0; i < color1Elements.length; i++) {
    color1Elements[i].style.color = colorText;
  }

  const color1BgElements = document.getElementsByClassName('color1_bg');
  for (let i = 0; i < color1BgElements.length; i++) {
    color1BgElements[i].style.backgroundColor = colorBg;
  }

  const color2Elements = document.getElementsByClassName('color2');
  for (let i = 0; i < color2Elements.length; i++) {
    color2Elements[i].style.color = colorText;
  }

  const color2BgElements = document.getElementsByClassName('color2_bg');
  for (let i = 0; i < color2BgElements.length; i++) {
    color2BgElements[i].style.backgroundColor = colorBg;
  }

  // Hide the color container after selection
  document.getElementById('circle_container').style.display = 'none';
}


document.getElementById('circle1').addEventListener('click', () => changeTheme('#6a1b9a', '#f3e5f5'));
document.getElementById('circle2').addEventListener('click', () => changeTheme('#f06292', '#fce4ec'));
document.getElementById('circle3').addEventListener('click', () => changeTheme('#000000', '#e0e0e0'));
document.getElementById('circle4').addEventListener('click', () => changeTheme('#388e3c', '#e8f5e9'));
document.getElementById('circle5').addEventListener('click', () => changeTheme('#fbc02d', '#fffde7'));
document.getElementById('circle6').addEventListener('click', () => changeTheme('#1e88e5', '#e3f2fd'));

//theme changing code ends here

//notes code starts here

   // Notes Functionality
   document.addEventListener('DOMContentLoaded', () => {
    const notesLink = document.getElementById('notesLink');
    const noteTools = document.getElementById('noteTools');
    const addNoteButton = document.getElementById('addNoteButton');
    const colorPicker = document.getElementById('colorPicker');
    const noteContainer = document.getElementById('noteContainer');
  
    // Toggle the visibility of the note tools
    notesLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      // Toggle between `none` and `flex`
      noteTools.style.display = noteTools.style.display === 'none' ? 'flex' : 'none';
    });
  
    // Add a new note
    addNoteButton.addEventListener('click', () => {
      const noteData = {
        color: colorPicker.value,
        content: '',
        date: '',
        top: '50px',
        left: '50px',
        width: '200px',
        height: '250px',
      };
      createNote(noteData);
    });
  
    // Create a new note
    function createNote({ color, content, date, top, left, width, height }) {
      const note = document.createElement('div');
      note.className = 'note';
      note.style.background = color;
      note.style.top = top;
      note.style.left = left;
      note.style.width = width;
      note.style.height = height;
  
      // Add textarea for content
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.placeholder = 'Write here...';
      textarea.addEventListener('input', saveNotes);
      note.appendChild(textarea);
  
      // Add date picker
      const datePicker = document.createElement('div');
      datePicker.className = 'date-picker';
      datePicker.innerHTML = `
        <label>Select Date:</label>
        <input type="date" value="${date}" />
      `;
      datePicker.querySelector('input').addEventListener('change', saveNotes);
      note.appendChild(datePicker);
  
      // Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        note.remove();
        saveNotes();
      });
      note.appendChild(deleteBtn);
  
      // Append note to container
      noteContainer.appendChild(note);
  
      // Enable draggable and resizable functionality
      makeDraggable(note);
      makeResizable(note);
  
      // Save notes
      saveNotes();
    }
  
    // Save notes to localStorage
    function saveNotes() {
      const notes = Array.from(document.querySelectorAll('.note')).map((note) => ({
        color: note.style.background,
        content: note.querySelector('textarea').value,
        date: note.querySelector('input').value,
        top: note.style.top,
        left: note.style.left,
        width: note.style.width,
        height: note.style.height,
      }));
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    // Load notes from localStorage on page load
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(createNote);
  
    // Enable draggable functionality
    function makeDraggable(element) {
      let offsetX = 0, offsetY = 0, startX = 0, startY = 0;
  
      element.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  
        startX = e.clientX;
        startY = e.clientY;
  
        offsetX = element.offsetLeft;
        offsetY = element.offsetTop;
  
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
      });
  
      function drag(e) {
        element.style.left = offsetX + e.clientX - startX + 'px';
        element.style.top = offsetY + e.clientY - startY + 'px';
      }
  
      function stopDrag() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        saveNotes();
      }
    }
  
    // Enable resizable functionality
    function makeResizable(element) {
      const resizeHandle = document.createElement('div');
      resizeHandle.style.width = '10px';
      resizeHandle.style.height = '10px';
      resizeHandle.style.background = '#34495e';
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.bottom = '5px';
      resizeHandle.style.right = '5px';
      resizeHandle.style.cursor = 'se-resize';
      element.appendChild(resizeHandle);
  
      let startX, startY, startWidth, startHeight;
  
      resizeHandle.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(window.getComputedStyle(element).width, 10);
        startHeight = parseInt(window.getComputedStyle(element).height, 10);
  
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
      });
  
      function resize(e) {
        element.style.width = startWidth + e.clientX - startX + 'px';
        element.style.height = startHeight + e.clientY - startY + 'px';
      }
  
      function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
        saveNotes();
      }
    }
  });
  
   // piechart generating code starts here
// Global variable to store expense data by category
let expenseData = {};

// Function to render or update the expense chart
function renderExpenseChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Prepare data for the chart
    const categories = Object.keys(expenseData);
    const amounts = Object.values(expenseData);

    // If no data, show a placeholder chart
    if (categories.length === 0) {
        categories.push('No Data');
        amounts.push(1);
    }

    // Clear existing chart before re-rendering
    if (window.expenseChart && typeof window.expenseChart.destroy === 'function') {
        window.expenseChart.destroy();
    }

    // Render the chart
    window.expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const total = amounts.reduce((sum, val) => sum + val, 0);
                            const value = amounts[tooltipItem.dataIndex];
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${categories[tooltipItem.dataIndex]}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });
}

// Function to add a transaction
function addTransaction() {
    const table = document.getElementById('transaction-table');
    const date = document.getElementById('date').value;
    const category = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const type = document.getElementById('type').value;

    if (!date || !category || amount <= 0) {
        alert('Please enter valid data.');
        return;
    }

    // Add transaction to the table
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button onclick="removeTransaction(this)">Remove</button></td>
    `;
    calculateBalance();

    // Update expense data only for expense transactions
    if (type === 'expense') {
      expenseData[category] = (expenseData[category] || 0) + amount;
      savePieChartDataToLocalStorage(); // Save updated data
  }

  renderExpenseChart(); // Update chart
  calculateBalance();

    // Clear form inputs
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

// Function to remove a transaction
function removeTransaction(button) {
    const row = button.parentElement.parentElement;
    const category = row.cells[1]?.textContent.trim();
    const amount = parseFloat(row.cells[2]?.textContent);
    const type = row.cells[3]?.textContent.trim();

    // Remove the transaction from the table
    row.remove();

    // Update expense data only for expense transactions
    if (type === 'expense') {
        expenseData[category] -= amount;
        if (expenseData[category] <= 0) {
            delete expenseData[category];
        }
        savePieChartDataToLocalStorage(); 
    }

    // Update the chart
    renderExpenseChart();
    calculateBalance();
}
function savePieChartDataToLocalStorage() {
  localStorage.setItem('expenseData', JSON.stringify(expenseData));
}
function loadPieChartDataFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem('expenseData'));
  if (savedData) {
      expenseData = savedData;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadPieChartDataFromLocalStorage(); // Load saved data
  renderExpenseChart();              // Render chart with loaded data
});


// Initialize the chart on page load
document.addEventListener('DOMContentLoaded', renderExpenseChart);
// piechart generating code ends here
let currentBalance = `{amount}`;
let totalEmiAmount = 0;

const emiForm = document.getElementById('emiForm');
const totalAmountInput = document.getElementById('totalAmount');
const durationInput = document.getElementById('duration');
const emiAmountInput = document.getElementById('emiAmount');
const currentBalanceDisplay = document.getElementById('currentBalance');
const totalEmiAmountDisplay = document.getElementById('totalEmiAmount');
const emiTableBody = document.getElementById('emiTableBody');
const errorDisplay = document.getElementById('error');

// Display initial values
currentBalanceDisplay.textContent = currentBalance.toFixed(2);
totalEmiAmountDisplay.textContent = totalEmiAmount.toFixed(2);

emiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const totalAmount = parseFloat(totalAmountInput.value);
    const duration = parseInt(durationInput.value);
    const emiAmount = parseFloat(emiAmountInput.value);

    if (
        isNaN(totalAmount) ||
        isNaN(duration) ||
        isNaN(emiAmount) ||
        totalAmount <= 0 ||
        duration <= 0 ||
        emiAmount <= 0
    ) {
        errorDisplay.textContent = "Please enter valid numbers for Total Amount, Duration, and EMI Amount.";
        return;
    }

    if (emiAmount > currentBalance) {
        errorDisplay.textContent = "Insufficient balance to add this EMI.";
        return;
    }

    errorDisplay.textContent = ""; // Clear any previous errors

    // Update total EMI amount and current balance
    totalEmiAmount += emiAmount;
    currentBalance -= emiAmount;

    // Update UI
    totalEmiAmountDisplay.textContent = totalEmiAmount.toFixed(2);
    currentBalanceDisplay.textContent = currentBalance.toFixed(2);

    // Add row to the table
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${totalAmount.toFixed(2)}</td>
        <td>${emiAmount.toFixed(2)}</td>
        <td>${duration}</td>
        <td><button class="remove-btn">Remove</button></td>
    `;
    emiTableBody.appendChild(row);

    // Add remove functionality
    row.querySelector('.remove-btn').addEventListener('click', () => {
        totalEmiAmount -= emiAmount;
        currentBalance += emiAmount;

        totalEmiAmountDisplay.textContent = totalEmiAmount.toFixed(2);
        currentBalanceDisplay.textContent = currentBalance.toFixed(2);

        row.remove();
    });
});


document.getElementById('cal').addEventListener('click', () => {
    //document.getElementById('cal').style.display = 'none';
    document.getElementById('cal').style.display = 'block';
});
document.getElementById('calen').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default anchor behavior

  // Redirect to the React app
  window.location.href = '/react';
});

// Initialize the chart on page load
function openNav() {
  
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.querySelector(".openbtn").classList.add("hidden");
}
function saveBudgetsToLocalStorage() {
  localStorage.setItem('budgets', JSON.stringify(budgets));
}

function loadBudgetsFromLocalStorage() {
  const savedBudgets = JSON.parse(localStorage.getItem('budgets'));
  if (savedBudgets) {
    budgets = savedBudgets;
    updateBudgetDisplay();
  }
}
updateBudgetDisplay();
saveBudgetsToLocalStorage();
function saveTransactionsToLocalStorage() {
  const rows = Array.from(document.querySelectorAll('#transaction-table tr'));
  const transactions = rows.map(row => ({
    date: row.cells[0].textContent,
    description: row.cells[1].textContent,
    amount: parseFloat(row.cells[2].textContent),
    type: row.cells[3].textContent
  }));
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactionsFromLocalStorage() {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransactions) {
    savedTransactions.forEach(txn => {
      const table = document.getElementById('transaction-table');
      const newRow = table.insertRow();
      newRow.innerHTML = `
        <td>${txn.date}</td>
        <td>${txn.description}</td>
        <td>${txn.amount.toFixed(2)}</td>
        <td>${txn.type}</td>
        <td><button onclick="removeTransaction(this)">Remove</button></td>`;
    });
    calculateBalance();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadTransactionsFromLocalStorage();
});
calculateBalance();
saveTransactionsToLocalStorage();
function savePieChartDataToLocalStorage() {
  localStorage.setItem('expenseData', JSON.stringify(expenseData));
}

function loadPieChartDataFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem('expenseData'));
  if (savedData) {
      expenseData = savedData;
      renderExpenseChart();
  }
}

if (type === 'expense') {
  expenseData[category] = (expenseData[category] || 0) + amount;
  savePieChartDataToLocalStorage();
}
if (type === 'expense') {
  expenseData[category] -= amount;
  if (expenseData[category] <= 0) {
      delete expenseData[category];
  }
  savePieChartDataToLocalStorage();
}
document.addEventListener('DOMContentLoaded', () => {
  loadPieChartDataFromLocalStorage();
  renderExpenseChart();
});

function saveTransactionTableToLocalStorage() {
  const rows = Array.from(document.querySelectorAll('#transaction-table tr'));
  const transactions = rows.map(row => ({
      date: row.cells[0].textContent,
      description: row.cells[1].textContent,
      amount: parseFloat(row.cells[2].textContent),
      type: row.cells[3].textContent
  }));
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactionTableFromLocalStorage() {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransactions) {
      const table = document.getElementById('transaction-table');
      savedTransactions.forEach(txn => {
          const newRow = table.insertRow();
          newRow.innerHTML = `
              <td>${txn.date}</td>
              <td>${txn.description}</td>
              <td>${txn.amount.toFixed(2)}</td>
              <td>${txn.type}</td>
              <td><button onclick="removeTransaction(this)">Remove</button></td>
          `;
      });
      calculateBalance(); // Update the balance
  }
}
saveTransactionTableToLocalStorage();
function saveBudgetTableToLocalStorage() {
  localStorage.setItem('budgets', JSON.stringify(budgets));
}

function loadBudgetTableFromLocalStorage() {
  const savedBudgets = JSON.parse(localStorage.getItem('budgets'));
  if (savedBudgets) {
      budgets = savedBudgets;
      updateBudgetDisplay();
  }
}
saveBudgetTableToLocalStorage();
function saveCurrentBalanceToLocalStorage() {
  const balance = document.getElementById('balance').innerText;
  localStorage.setItem('currentBalance', balance);
}

function loadCurrentBalanceFromLocalStorage() {
  const savedBalance = localStorage.getItem('currentBalance');
  if (savedBalance) {
      document.getElementById('balance').innerText = savedBalance;
  }
}
calculateBalance();
saveCurrentBalanceToLocalStorage();
document.addEventListener('DOMContentLoaded', () => {
  loadPieChartDataFromLocalStorage();       // Load pie chart data
  loadTransactionTableFromLocalStorage();  // Load transaction table
  loadBudgetTableFromLocalStorage();       // Load budget table
  loadCurrentBalanceFromLocalStorage();    // Load current balance
  renderExpenseChart();                    // Render the pie chart
});
emiForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const totalAmount = parseFloat(totalAmountInput.value);
  const duration = parseInt(durationInput.value);
  const emiAmount = parseFloat(emiAmountInput.value);

  if (
      isNaN(totalAmount) ||
      isNaN(duration) ||
      isNaN(emiAmount) ||
      totalAmount <= 0 ||
      duration <= 0 ||
      emiAmount <= 0
  ) {
      errorDisplay.textContent = "Please enter valid numbers for Total Amount, Duration, and EMI Amount.";
      return;
  }

  // Check if the EMI amount exceeds the current balance
  if (emiAmount > currentBalance) {
      alert("The EMI amount exceeds the current balance. Please adjust the EMI amount or top up your balance.");
      return;
  }

  errorDisplay.textContent = ""; // Clear any previous errors

  // Update total EMI amount and current balance
  totalEmiAmount += emiAmount;
  currentBalance -= emiAmount;

  // Update UI
  totalEmiAmountDisplay.textContent = totalEmiAmount.toFixed(2);
  currentBalanceDisplay.textContent = currentBalance.toFixed(2);

  // Add row to the table
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${totalAmount.toFixed(2)}</td>
      <td>${emiAmount.toFixed(2)}</td>
      <td>${duration}</td>
      <td><button class="remove-btn">Remove</button></td>
  `;
  emiTableBody.appendChild(row);

  // Add remove functionality
  row.querySelector('.remove-btn').addEventListener('click', () => {
      totalEmiAmount -= emiAmount;
      currentBalance += emiAmount;

      totalEmiAmountDisplay.textContent = totalEmiAmount.toFixed(2);
      currentBalanceDisplay.textContent = currentBalance.toFixed(2);

      row.remove();
  });

  // Clear form inputs
  totalAmountInput.value = '';
  durationInput.value = '';
  emiAmountInput.value = '';
});
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
  currentBalance = balance; // Update the global balance

  // Check if balance is zero
  if (currentBalance === 0) {
      const addFunds = confirm("Your current balance is zero. Do you want to add funds?");
      if (addFunds) {
          const additionalFunds = parseFloat(prompt("Enter the amount to add to your balance:"));
          if (!isNaN(additionalFunds) && additionalFunds > 0) {
              currentBalance += additionalFunds;
              document.getElementById('balance').innerText = `Current Balance: ₹${currentBalance.toFixed(2)}`;
          } else {
              alert("Invalid amount. No funds were added.");
          }
      }
  }
}


