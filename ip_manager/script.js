const PASSWORD = "1234"; // 更改為你的登入密碼
let rawData = [];

function login() {
  const pw = document.getElementById('password').value;
  if (pw === PASSWORD) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    loadCSV();
  } else {
    document.getElementById('loginError').textContent = "密碼錯誤！";
  }
}

function loadCSV() {
  fetch("data.csv")
    .then(res => res.text())
    .then(text => {
      const rows = text.trim().split("\n").map(r => r.split(","));
      rawData = rows;
      populateCategoryFilter(rows);
      renderTable(rows);
    });
}

function populateCategoryFilter(data) {
  const categorySet = new Set(data.slice(1).map(row => row[0]));
  const select = document.getElementById("categoryFilter");
  for (const cat of categorySet) {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  }
}

function filterTable() {
  const category = document.getElementById("categoryFilter").value;
  const filtered = (category === "全部") ? rawData : [rawData[0], ...rawData.slice(1).filter(r => r[0] === category)];
  renderTable(filtered);
}

function renderTable(data) {
  const [headers, ...rows] = data;
  const thead = document.getElementById("ipTable").querySelector("thead");
  const tbody = document.getElementById("ipTable").querySelector("tbody");

  thead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join('') + "</tr>";
  tbody.innerHTML = rows.map(r => "<tr>" + r.map(c => `<td>${c}</td>`).join('') + "</tr>").join('');
}

function downloadExcel() {
  const [headers, ...rows] = rawData;
  const category = document.getElementById("categoryFilter").value;
  const filtered = (category === "全部") ? rawData : [headers, ...rows.filter(r => r[0] === category)];

  const ws = XLSX.utils.aoa_to_sheet(filtered);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "IP清單");
  XLSX.writeFile(wb, "IP_List.xlsx");
}