import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/lib/tours_data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('Adjusting tour prices in tours_data.json...');

Object.entries(data).forEach(([slug, tour]) => {
  const d = parseInt(tour.duration);
  if (isNaN(d)) return;

  let newPrice = 150;
  if (d === 1) {
    newPrice = 120;
  } else if (d === 2) {
    newPrice = 290;
  } else if (d === 3) {
    newPrice = 420;
  } else if (d === 4) {
    newPrice = 550;
  } else if (d === 5) {
    newPrice = 680;
  } else {
    newPrice = Math.round((d * 130 + 150) / 10) * 10;
  }

  // Update in JSON
  tour.priceFrom = newPrice;
  console.log(`- ${tour.title} (${d} days): ${newPrice} GBP`);
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully adjusted all tour prices in tours_data.json!');
