import Grid from './grid';

import 'normalize.css';

// todo: use a promise to get the data using an ajax call to a local file.
let data = parseData([
  {title: '8 Ultimate Steak Burgers', price: '£18.00', stars: 4.0},
  {title: 'Tarte Au Citron', price: '£10.00', stars: 3.5},
  {title: 'Mini Rolls Selection (24 Rolls)', price: '£12.50', promotion: true},
  {title: 'Triple-Layer Carrot Cake', price: '£8.50', stars: 4.7},
  {title: '8 Dark Chocolate Cups with Raspberries', price: '£7.00', stars: 2.6},
  {title: 'Ultimate Triple Layer Chocolate Cake', price: '£11.00', stars: 2.0},
  {title: 'Sicilian Lemon & Ricotta Cheesecake', price: '£8.00', stars: 5.0},
  {title: 'Mixed Berry Tart', price: '£7.50', stars: 1.0},
  {title: 'King Prawn Platter with Whisky Marie Rose Sauce', price: '£13.00', stars: 2.8},
  {title: 'Chilli Con Carne', price: '£6.00', stars: 4.0},
  {title: 'Mediterranean Roasting Vegetables', price: '£9.50', stars: 5.0},
  {title: 'Scampi & Tartare Sauce', price: '£5.00', stars: 4.5},
  {title: 'Antipasti Selection', price: '£9.00', stars: 3.5},
  {title: 'Traditional Italian Smoked Meats & Cheese Platter', price: '£9.00', stars: 2.5},
  {title: 'Vegetable Kievs', price: '£8.00', stars: 1.5}
]);

// we make sure ALL elements have the same properties
// even though some will be empty
function parseData(data) {
  // we clone the object so the function has no side effects
  const parsedData = Object.assign([], data);
  let keys = [];

  parsedData.forEach(el => {
    keys = keys.concat(Object.keys(el));
  });

  // turn the array into a new Set -> remove duplicates
  // and turn it back into an array
  keys = Array.from(new Set(keys));

  // make sure all the elements have title, price and stars
  return parsedData.map(el => {
    return Object.assign({
      title: '',
      price: 0,
      stars: 0
    }, el);
  });
}

const newGrid = new Grid(data);

newGrid.render();
