let commandsData = {};

fetch('data/commands.json')
  .then(response => response.json())
  .then(data => {
    commandsData = data;

    // 預設載入 Volume 分類
    showCategory('volume');
  })
  .catch(err => {
    document.getElementById('commands-container').innerHTML = '<p>資料載入失敗</p>';
    console.error(err);
  });

function showCategory(category) {
  const container = document.getElementById('commands-container');
  container.innerHTML = '';

  if (!commandsData[category] || commandsData[category].length === 0) {
    container.innerHTML = '<p>尚無此分類資料</p>';
    return;
  }

  commandsData[category].forEach(cmd => {
    const card = document.createElement('div');
    card.className = 'command-card';
    card.innerHTML = `
      <h3>${cmd.title}</h3>
      <pre>${cmd.command}</pre>
      <p>${cmd.description}</p>
    `;
    container.appendChild(card);
  });
}
