
export default class TableRow {
    #row;

    constructor(parent, values) {
        this.#render(parent, values);
    }

    #render(parent, values) {
        this.#row = document.createElement('tr');

        this.#row.innerHTML = values
            .map((value) => this.#template(value))
            .join('');

        parent?.appendChild(this.#row);
    }

    #template(value) {
        return `<td class="table__cell">${value}</td>`
    }

    delete() {
        this.#row.remove();
    }
}