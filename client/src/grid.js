import './grid.scss';

class Grid {
  constructor(data) {
    this.$el = document.getElementById('grid');
    // todo: use localstorage to persist the state
    this.state = {
      data: data,
      orderBy: 'title',
      filterBy: null
    };
  }

  render() {
    const frag = document.createDocumentFragment();

    this.state.data.forEach(row => {
      frag.appendChild(this.buildRow(row));
    });

    this.$el.appendChild(frag);
  }

  buildRow(rowData) {
    const row = document.createElement('section');

    // add a row class
    row.classList.add('row');

    // add a class for promotion rows
    if (rowData.hasOwnProperty('promotion') && rowData.promotion === true) {
      row.classList.add('promotion');
    }

    // todo: we could add events to every row/cell here

    row.innerHTML = `
    <article class="cell title">${rowData.title || ''}</article>
    <article class="cell price">${rowData.price || ''}</article>
    <article class="cell stars">${rowData.stars || 0}</article>
    `;

    return row;
  }
}

export default Grid;
