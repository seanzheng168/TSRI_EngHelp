let rawData = [];

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
  const categorySet = new Set(data.slice(1).map(row => row[2]));
  const select = document.getElementById("categoryFilter");
  for (const cat of categorySet) {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  }
}

function filterAndSearch() {
  const category = document.getElementById("categoryFilter").value;
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const filtered = [rawData[0], ...rawData.slice(1).filter(row => {
    const matchCategory = category === "全部" || row[2] === category;
    const matchKeyword = row.some(cell => cell.toLowerCase().includes(keyword));
    return matchCategory && matchKeyword;
  })];

  renderTable(filtered);
}

function renderTable(data) {
  const [headers, ...rows] = data;
  const thead = document.getElementById("ipTable").querySelector("thead");
  const tbody = document.getElementById("ipTable").querySelector("tbody");

  thead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join('') + "</tr>";
  tbody.innerHTML = rows.map(r => "<tr>" + r.map(c => `<td>${c}</td>`).join('') + "</tr>").join('');
}

window.onload = loadCSV;