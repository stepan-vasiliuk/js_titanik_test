import createElement from "../../../assets/lib/create-element.js"
import TableRow from "../tableRow/table-row.js";

export default class Table {

    constructor(passengers) {
        this.passengers = passengers;
        this.filters = {};
        this.#render();
    }

    #render() {
        this.elem = document.querySelector('#dynamic-content');
        console.log("elem (table.js)", this.elem);
        // this.#initElements();
        this.#mainTemplate(this.passengers);
    }

    // #mainTemplate() {
    //     return `
    //     <section class="table__content table__content-dynamic" id="dynamic-content"></section>
    //     `
    // }

    // #initElements() {
    //     this.tableElement = this.elem.querySelector('.table__content-dynamic');

    // }

    #mainTemplate(passengers) {
        this.elem.innerHTML = '';
        let html = '';
        passengers.forEach(passenger => {
            html += (this.#rowTemplate(passenger));
            // let tableRow = new TableRow(passenger);
            // this.elem.append(tableRow.elem);
            // this.tableElement.append(tableRow.elem);
        });

        this.elem.innerHTML = html;

    }

    #rowTemplate(passenger) {
        return `
        <div class="table__content__cell">${passenger.name}</div>
        <div class="table__content__cell">${passenger.gender}</div>
        <div class="table__content__cell">${Math.floor(passenger.age)}</div>
        <div class="table__content__cell">${passenger.class}</div>
        <div class="table__content__cell">${passenger.survived ? 'Survived' : 'Not Survived'}</div>
        `
    }

    updateFilters(filterName, filterValue) {
        this.#initFilters();

        this.filters[filterName] = filterValue;
        console.log(this.filters);

        let filteredPassengers = this.passengers;

        for(const [key, value] of Object.entries(this.filters)){
            if(key === 'name' && value.length) {
                filteredPassengers = this.#filterByName(value, filteredPassengers);
            }
            if(key === 'age' && value.length) {
                filteredPassengers = this.#filterByAge(value, filteredPassengers);
            }
        }

        // if (key === 'name') {
        //     filteredPassengers = this.#filterByName(value, filteredPassengers);
        // }
        // if (key === 'age') {
        //     filteredPassengers = this.#filterByAge(value, filteredPassengers);
        // }

        this.#mainTemplate(filteredPassengers);

    }

    #filterByName(name, filteredPassengers) {
        return filteredPassengers.filter((item) => {
            return item.name.includes(name);
        })
        // this.#mainTemplate(filtered);
    }

    #filterByAge(age, filteredPassengers) {
        return filteredPassengers.filter((item) => {
            return Math.floor(item.age) == age;
        })
        // this.#mainTemplate(filtered);
    }

    #initFilters() {
        if(Object.keys(this.filters).length === 0){
            this.filters = {
                name: '',
                age: '',
                gender: '',
                survived: undefined,
            }
        }
    }
}