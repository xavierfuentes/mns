import './grid.scss';

class Grid {
  constructor(data) {
    this.$el = document.getElementById('grid');
    this.data = data;
    // todo: use localstorage to persist the state
    this.state = {
      data: Object.assign([], data),
      orderBy: '',
      filterBy: ''
    };
  }

  render() {
    const frag = document.createDocumentFragment();
    const grid = document.createElement('section');

    grid.classList.add('grid-data');

    // toolbar
    frag.appendChild(this.buildToolbar());

    // toolbar
    frag.appendChild(this.buildHeader());

    // rows
    frag.appendChild(grid);

    // render everything
    this.$el.appendChild(frag);

    // update the data inside the grid
    this.updateGrid();
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

  buildHeader() {
    const $header = document.createElement('section');

    $header.classList.add('header');

    $header.innerHTML = `
      <article class="cell title">
        <span>Title</span>
        <section class="actions">
          <button data-action="sort-title-asc">&#x25B2;</button>
          <button data-action="sort-title-des">&#x25BC;</button>
        </section>
      </article>
      <article class="cell price">
        <span>Price</span>
        <section class="actions">
          <button data-action="sort-price-asc">&#x25B2;</button>
          <button data-action="sort-price-des">&#x25BC;</button>
        </section>
      </article>
      <article class="cell stars"><span>Stars</span></article>
    `;

    $header.addEventListener('click', this.handleClick.bind(this));

    return $header;
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

  updateGrid() {
    const grid = this.$el.querySelector('.grid-data');
    const newState = Object.assign({}, this.state);

    grid.innerHTML = '';

    newState.data = newState.filterBy ? this.filterGrid(newState.data, newState.filterBy) : this.data;
    newState.data = this.sortGrid(newState.data, newState.sortBy);

    newState.data.forEach(row => {
      grid.appendChild(this.buildRow(row));
    });

    this.state = newState;

    console.log('state -> ', newState);
  }

  // sort the grid
  sortGrid(data, action) {
    // let data = Object.assign([], this.state.data);

    switch (action) {
      case 'sort-title-asc': {
        data.sort((a, b) => a.title < b.title ? -1 : 1);
        break;
      }

      case 'sort-title-des': {
        data.sort((a, b) => a.title < b.title ? 1 : -1);
        break;
      }

      case 'sort-price-asc': {
        data.sort((a, b) => Number(a.price.substring(1)) < Number(b.price.substring(1)) ? -1 : 1);
        break;
      }

      case 'sort-price-des': {
        data.sort((a, b) => Number(a.price.substring(1)) < Number(b.price.substring(1)) ? 1 : -1);
        break;
      }
    }

    return data;
  }

  // filter the grid
  filterGrid(data, query) {
    if (query !== '') {
      data = data.filter(r => {
        return (new RegExp(query.toLowerCase())).test(r.title.toLowerCase()) && r;
      });
    }

    return data;
  }

  handleKeyup(e) {
    // updates the state
    this.state.filterBy = e.target.value;

    this.updateGrid();
  }

  handleClick(e) {
    // updates the state
    this.state.sortBy = e.target.getAttribute('data-action');

    this.updateGrid();
  }
}

export default Grid;
