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

    // set the HTML content of every row
    row.innerHTML = Object.keys(rowData).reduce((tpl, field, index, props) => {
      // we don't render a column for promotions
      if (field === 'promotion') return tpl;

      return tpl + `<article class="cell ${field}">${rowData[field]}</article>`;
    }, '');

    return row;
  }
}

export default Grid;
