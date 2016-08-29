import Grid from './grid';

import 'normalize.css';

const request = new XMLHttpRequest();
let grid;

request.onreadystatechange = function() {
  if (request.status === 200 && request.readyState === 4) {
    grid = new Grid(JSON.parse(request.response));
    grid.render();
  }
};

request.open('GET', 'http://localhost:8080/data.json');
request.send();
