let commandsData = {};

fetch('data/commands.json')
  .then(response => response.json())
  .then(data => {
    commandsData = data;
  });

function showCategory(category) {
  const container = document.getElementById('commands-container');
  container.innerHTML = '';

  if (!commandsData[category]) {
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
