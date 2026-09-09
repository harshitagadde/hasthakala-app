function calculateFairPricing() {
  const raw = parseFloat(document.getElementById('costRaw').value) || 0;
  const hours = parseFloat(document.getElementById('costHours').value) || 0;
  const rate = parseFloat(document.getElementById('costRate').value) || 0;

  const targetPrice = Math.round(raw + (hours * rate) * 1.5);
  document.getElementById('priceTarget').innerText = '₹' + targetPrice.toLocaleString('en-IN');
}