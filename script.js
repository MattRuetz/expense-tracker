const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyTransactions;

const addTransaction = (e) => {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a transaction name and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = '';
        amount.value = '';
    }
};

// Generate a random ID num
const generateID = () => {
    return Math.floor(Math.random() * 100000000);
};

// Add transactions to DOM ul
const addTransactionDOM = (transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on val > 0
    item.classList.add(sign === '-' ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">✕</button>`;

    list.appendChild(item);
};

// Remove a transaction by ID from DOM and array
const removeTransaction = (id) => {
    // Filter out the transaction with id in question
    transactions = transactions.filter((trans) => trans.id !== id);

    init();
};

// Update balance, income and expense
const updateValues = () => {
    const amounts = transactions.map((transaction) => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `${total}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`;
};

const init = () => {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
};

init();

form.addEventListener('submit', addTransaction);
