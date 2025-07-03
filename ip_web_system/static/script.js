let records = [];

fetch("/api/data")
  .then(res => res.json())
  .then(data => {
    records = data;
    populateSubnets();
    renderTable(records);
  });

function populateSubnets() {
  const subnets = Array.from(new Set(records.map(r => r.ip.split('.').slice(0, 3).join('.'))));
  const select = document.getElementById("subnetFilter");
  subnets.forEach(sn => {
    const opt = document.createElement("option");
    opt.value = sn;
    opt.textContent = sn + ".x";
    select.appendChild(opt);
  });
}

function renderTable(data) {
  const list = document.getElementById("recordList");
  list.innerHTML = "";
  data.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.ip}</td>
      <td>${record.username}</td>
      <td>${record.password}</td>
      <td>${record.system}</td>
      <td>${record.note}</td>
    `;
    list.appendChild(row);
  });
}

document.getElementById("search").addEventListener("input", filterRecords);
document.getElementById("subnetFilter").addEventListener("change", filterRecords);

function filterRecords() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const subnet = document.getElementById("subnetFilter").value;
  const filtered = records.filter(r =>
    (subnet === "all" || r.ip.startsWith(subnet + ".")) &&
    (r.ip.toLowerCase().includes(keyword) || r.system.toLowerCase().includes(keyword))
  );
  renderTable(filtered);
}

function exportExcel() {
  const ws = XLSX.utils.json_to_sheet(records);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "系統資源");
  XLSX.writeFile(wb, "ip_records.xlsx");
}

function logout() {
  window.location.href = "/logout";
}
