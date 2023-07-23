// import createElement from "../../../assets/lib/create-element";

export default class TableRow {
    elem = null;

    constructor(passenger) {
        this.passenger = passenger;
        this.#render();
    }

    #render() {
        const div = document.createElement('div');
        div.innerHTML = this.#template(this.passenger);
        console.log("Inner HTML", div.innerHTML);
        this.elem = div.firstElementChild;
        // this.elem = createElement(this.#template(this.passenger));
        console.log("row elem >>> ", this.elem)

    }

    #template(passenger) {
        return  `
        <div class="table__content__cell">${passenger.name}</div>
        <div class="table__content__cell">${passenger.gender}</div>
        <div class="table__content__cell">${passenger.age}</div>
        <div class="table__content__cell">${passenger.class}</div>
        <div class="table__content__cell">${passenger.survived}</div>
        `
    }
}