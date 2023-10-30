document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8007/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

document
  .querySelector("table tbody")
  .addEventListener("click", function (event) {
    if (event.target.className === "delete-row-btn") {
      deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
      handleEditRow(event.target.dataset.id);
    }
  });

const updateBtn = document.querySelector("#update-row-btn");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = function () {
  const searchValue = document.querySelector("#search-input").value;

  fetch("http://localhost:8007/search/" + searchValue)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
};

function deleteRowById(id) {
  fetch("http://localhost:8007/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

function handleEditRow(id) {
  const updateSection = document.querySelector("#update-row");
  updateSection.hidden = false;
  document.querySelector("#update-name-input").dataset.id = id;
}

updateBtn.onclick = function () {
  const updateNameInput = document.querySelector("#update-name-input");
  const updateExpenseName = document.querySelector("#update-expense-input");
  const updateAmount = document.querySelector("#update-Amount-input");

  // console.log(updateNameInput);

  fetch("http://localhost:8007/update", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: updateNameInput.dataset.id,
      username: updateNameInput.value,
      expensename: updateExpenseName.value,
      amount: updateAmount.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};

const addBtn = document.querySelector("#add-name-btn");

addBtn.onclick = function () {
  const nameInput = document.querySelector("#user-name-input");
  const ExpenseInput = document.querySelector("#expense-name-input");
  const AmountInput = document.querySelector("#Amount-input");
  const username = nameInput.value;
  const expensename = ExpenseInput.value;
  const amount = AmountInput.value;
  nameInput.value = "";
  ExpenseInput.value = "";
  AmountInput.value = "";
  location.reload();

  fetch("http://localhost:8007/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      expensename: expensename,
      amount: amount,
    }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
};

function insertRowIntoTable(data) {
  console.log(data);
  const table = document.querySelector("table tbody");
  const isTableData = table.querySelector(".no-data");
  let tableHtml = "<tr>";
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "dateAdded") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }
  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
  tableHtml += "</tr>";
  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";

  data.forEach(function ({ id, username, expensename, amount, date_add }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${username}</td>`;
    tableHtml += `<td>${expensename}</td>`;
    tableHtml += `<td>${amount}</td>`;
    tableHtml += `<td>${new Date(date_add).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}
