let records = [];

fetch("data.csv")
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split("\n").slice(1); // skip header
    records = lines.map(line => {
      const [ip, username, password, system, note] = line.split(",");
      return { ip, username, password, system, note };
    });
    populateSubnets();
    renderTable(records);
  });

const searchInput = document.getElementById("search");
const subnetFilter = document.getElementById("subnetFilter");
const recordList = document.getElementById("recordList");

function populateSubnets() {
  const subnets = Array.from(new Set(records.map(r => r.ip.split('.').slice(0, 3).join('.'))));
  subnets.forEach(sn => {
    const opt = document.createElement("option");
    opt.value = sn;
    opt.textContent = sn + ".x";
    subnetFilter.appendChild(opt);
  });
}

function renderTable(data) {
  recordList.innerHTML = "";
  data.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.ip}</td>
      <td>${record.username}</td>
      <td>${record.password}</td>
      <td>${record.system}</td>
      <td>${record.note}</td>
    `;
    recordList.appendChild(row);
  });
}

function filterRecords() {
  const keyword = searchInput.value.toLowerCase();
  const subnet = subnetFilter.value;
  const filtered = records.filter(r =>
    (subnet === "all" || r.ip.startsWith(subnet + ".")) &&
    (r.ip.toLowerCase().includes(keyword) || r.system.toLowerCase().includes(keyword))
  );
  renderTable(filtered);
}

searchInput.addEventListener("input", filterRecords);
subnetFilter.addEventListener("change", filterRecords);
