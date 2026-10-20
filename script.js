
const expenseForm = document.getElementById("expenseForm");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");
const submitButton = document.getElementById("submitButton");

// Store expenses in memory only
let expenses = [];
let editingId = null;

// Display all expenses
function displayExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function (expense) {
        total += expense.amount;

        const li = document.createElement("li");

        const expenseText = document.createElement("span");

        expenseText.textContent =
            `${expense.amount} - ${expense.category} - ${expense.description}`;

        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete Expense";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {
            expenses = expenses.filter(function (item) {
                return item.id !== expense.id;
            });

            // If the expense being edited is deleted, reset the form
            if (editingId === expense.id) {
                editingId = null;
                expenseForm.reset();
                submitButton.textContent = "Add Expense";
            }

            displayExpenses();
        });

        // Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit Expense";
        editButton.className = "edit-button";

        editButton.addEventListener("click", function () {
            amountInput.value = expense.amount;
            descriptionInput.value = expense.description;
            categoryInput.value = expense.category;

            editingId = expense.id;
            submitButton.textContent = "Update Expense";

            amountInput.focus();
        });

        li.appendChild(expenseText);
        li.appendChild(deleteButton);
        li.appendChild(editButton);

        expenseList.appendChild(li);
    });

    // Calculate total expenses
    totalExpense.textContent =
        `Total Expense: ₹${total.toFixed(2)}`;
}

// Add or update an expense
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;

    // Validate input
    if (
        !Number.isFinite(amount) ||
        amount <= 0 ||
        description === ""
    ) {
        alert("Please enter a valid amount and description.");
        return;
    }

    if (editingId !== null) {
        // Update existing expense
        expenses = expenses.map(function (expense) {
            if (expense.id === editingId) {
                return {
                    ...expense,
                    amount: amount,
                    description: description,
                    category: category
                };
            }

            return expense;
        });

        editingId = null;
        submitButton.textContent = "Add Expense";

    } else {
        // Create a new expense
        const newExpense = {
            id: Date.now(),
            amount: amount,
            description: description,
            category: category
        };

        expenses.push(newExpense);
    }

    // Clear the form and refresh the list
    expenseForm.reset();
    displayExpenses();
});

// Initial display
displayExpenses();
