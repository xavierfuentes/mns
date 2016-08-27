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

    row.classList.add('row');

    // todo: we could add events to every row/cell here

    row.innerHTML = Object.keys(rowData).reduce((tpl, field) => {
      tpl += `<article class="cell">${rowData[field]}</article>`;
      return tpl;
    }, '');

    return row;
  }
}

export default Grid;
