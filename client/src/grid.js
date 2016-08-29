import './grid.scss';

class Grid {
  constructor(data) {
    this.$el = document.getElementById('grid');
    this.data = data;
    // todo: use localstorage to persist the state
    this.state = {
      data: data,
      orderBy: 'title',
      filterBy: null
    };
  }

  render() {
    const frag = document.createDocumentFragment();
    const grid = document.createElement('section');
    const toolbar = this.buildToolbar();

    grid.classList.add('grid-data');

    // toolbar
    frag.appendChild(toolbar);

    // rows
    frag.appendChild(grid);

    // render everything
    this.$el.appendChild(frag);

    // update the data inside the grid
    this.updateGrid(this.state.data);
  }

  buildToolbar() {
    const $toolbar = document.createElement('section');
    const $filter = document.createElement('input');
    const $label = document.createElement('label');

    $toolbar.classList.add('toolbar');

    $label.innerText = 'filter by title:';
    $label.appendChild($filter);
    $filter.addEventListener('keyup', this.handleKeyup.bind(this));

    $toolbar.appendChild($label);

    return $toolbar;
  }

  buildRow(rowData) {
    const $row = document.createElement('section');

    // add a row class
    $row.classList.add('row');

    // add a class for promotion rows
    if (rowData.hasOwnProperty('promotion') && rowData.promotion === true) {
      $row.classList.add('promotion');
    }

    $row.innerHTML = `
    <article class="cell title">${rowData.title || ''}</article>
    <article class="cell price">${rowData.price || ''}</article>
    <article class="cell stars">${rowData.stars || 0}</article>
    `;

    return $row;
  }

  updateGrid(data) {
    const grid = this.$el.querySelector('.grid-data');

    grid.innerHTML = '';

    data.forEach(row => {
      grid.appendChild(this.buildRow(row));
    });
  }

  handleKeyup(e) {
    let data;

    if (e.target.val === '') data = this.data;
    else {
      data = this.state.data.filter(r => {
        return (new RegExp(e.target.value.toLowerCase())).test(r.title.toLowerCase()) && r;
      });
    }

    this.updateGrid(data);
  }
}

export default Grid;
