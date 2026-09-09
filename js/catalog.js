let catalogList = [];

function publishProductToBuyerPortal() {
  const name = document.getElementById('draftTitleInput').value;
  const price = document.getElementById('priceTarget').innerText;

  catalogList.push({ name, price });
  renderCatalog();
  alert('Product Published!');
}

function renderCatalog() {
  const list = document.getElementById('sellerInventoryList');
  list.innerHTML = catalogList.map(item => `
    <div style="padding: 8px; border-bottom: 1px solid #444;">
      <strong>${item.name}</strong> - ${item.price}
    </div>
  `).join('');
}