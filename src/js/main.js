import '../css/style.css'
import Table from './components/table/table';
import Filters from './components/filters/filters';

const ADD_COUNTS = 50;

export default class Main {
    // Input data variety
    // Clean data
    #passengers = [];
    // Filtered data
    #filteredPassengers = [];
    // Showed data
    #showedPassengers = [];

    // Global objects
    #table;
    #observer;
    #counter;

    constructor() {
    }


    //Main render method
    async render() {
        const main = document.querySelector('#app');

        try {
            const response = await fetch('src/js/passengers.json');
            this.#passengers = await response.json();
            console.log('success!', this.#passengers.length);
        } catch (err) {
            console.log('Unable to get passangers list from json');
        }

        // Creating conponents
        this.#filtersRender(main);
        this.#tableRender(main);
        this.#addButtonRender(main);

        // rendering initial data at first, then it will be called from filters component
        this.updateRows(this.#passengers);

        // Observer initiation
        this.#initObserver();
    }

    #tableRender(parent) {
        this.#table = new Table(parent, ['Name', 'Gender', 'Age', 'Class', 'Survived']);
    }

    #filtersRender(parent) {
        this.#table = new Filters(
            parent,
            [...this.#passengers],
            // when changing filters UpdateRows method will be called
            (filtered) => this.updateRows(filtered));
    }

    #addButtonRender(parent) {

        this.#counter = document.createElement('div');

        parent.append(this.#counter);
    }

    addRowsToTable() {
        // Slicing array. Taking 50 elements (ADD_COUNTS) each time. Function input value is lenght of 
        // #showedPassengers - Already showed values. 
        const newPassengerIndexStart = this.#showedPassengers.length;
        const newsShowedPassengers = this.#filteredPassengers.slice(newPassengerIndexStart, newPassengerIndexStart + ADD_COUNTS);

        // Adding new values to the table (whithout cleaning previous ones)
        this.#table.add(newsShowedPassengers);
        this.#showedPassengers = [...this.#showedPassengers, ...newsShowedPassengers];

        // updating counter
        this.#counter.innerHTML = `Найдено ${this.#filteredPassengers.length} строчек <br> Показано ${this.#showedPassengers.length} строчек`;
    }

    updateRows(filtered) {
        // call this function when filters changing
        // Cleaning table and variables, calls function to add new rows
        this.#table.clear();
        this.#showedPassengers = [];
        this.#filteredPassengers = this.#processPassengers(filtered);
        this.addRowsToTable();
    }

    // Changing data from object to array
    #processPassengers(passengers) {
        return passengers.map((row) => [row.name, row.gender, Math.floor(row.age), row.class, row.survived ? 'Survived' : 'Not Survived']);
    }


    #initObserver() {
        // Anchor - at the end of the table.
        const anchor = document.querySelector('#bottom_anchor');

        this.#observer = new IntersectionObserver((entries) => {
            // Checking which elements were showed (or dissapeared)
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.addRowsToTable();
                }
            })
        }, {
            threshold: 0,
        });

        // Adding anchor to observer
        this.#observer.observe(anchor);
    }


}
