import TableRow from "../tableRow/table-row.js";


export default class Table {
    #table;
    #header;
    #body;

    #rows = [];

    constructor(parent, headers) {
        this.#render(parent, headers);
    }

    #render(parent, headers) {
        // Table elements creating
        this.#table = document.createElement('table');
        this.#table.classList.add('table');

        if(!parent || typeof parent.append !== "function") {
            console.log('NOT CORRECT');
        }

        parent.append(this.#table);

        // Creating header and body
        this.#header = document.createElement('thead');
        this.#header.classList.add('table__header');

        this.#body = document.createElement('tbody');
        this.#body.classList.add('table__body');

        this.#table.append(this.#header);
        this.#table.append(this.#body);

        // Header' filling with content
        this.#headersRender(headers);
    }


    #headersRender(headers) {
        new TableRow(this.#header, headers);
    }

    // add rows to table
    add(rows) {
        this.#rows.push(
            ...rows.map((row) => new TableRow(this.#body, row))
        );
    }

    // cleaning table
    clear() {
        this.#rows.forEach((row) => row.delete());
    }

    // Delete table
    delete() {
        this.#table.delete();
        this.#table = null;
        this.#body = null;
        this.#header = null;
    }

}